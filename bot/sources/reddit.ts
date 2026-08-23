/**
 * Reddit — the discovery layer.
 *
 * The other two sources can only tell you about terms you already thought of.
 * This one is how the watchlist grows: it reads what the nostalgia subreddits
 * are actually posting about and proposes phrases that aren't on the list yet.
 * When "Caboodles" starts showing up across several subs at once, that's a term
 * to add, and nobody had to think of it.
 *
 * Deliberately cheap. Rather than searching once per watchlist term — which
 * would be over a thousand calls — it pulls each subreddit's top posts once and
 * mines that corpus for both jobs at the same time. Twelve subreddits, two
 * listings each, well inside the free non-commercial allowance of 100 queries
 * a minute.
 *
 * Credentials are the long pole on this whole project: new API clients go
 * through manual review rather than self-service signup. Everything here
 * degrades to "skipped" without them so the rest of the report still ships.
 */

import { REDDIT } from "../config";
import { SUBREDDITS } from "../watchlist";
import type { Candidate, Signal, Term } from "../types";

type Post = { title: string; selftext: string; subreddit: string; score: number };

/**
 * Words that carry no signal in this corpus. The era words are in here on
 * purpose — r/80s posts say "80s" constantly, so it would top every list while
 * meaning nothing. Those live in the watchlist as barometers instead.
 */
const STOPWORDS = new Set([
  "the", "and", "for", "that", "this", "with", "was", "were", "have", "has", "had", "you", "your",
  "our", "his", "her", "its", "they", "them", "their", "what", "when", "where", "who", "why", "how",
  "any", "all", "some", "not", "but", "can", "will", "just", "one", "two", "out", "got", "get",
  "from", "about", "into", "over", "back", "then", "than", "these", "those", "there", "here",
  "anyone", "anybody", "someone", "everyone", "remember", "found", "does", "did", "doing", "been",
  "being", "would", "could", "should", "know", "think", "like", "really", "still", "even", "much",
  "more", "most", "very", "look", "looking", "looks", "made", "make", "makes", "new", "old",
  "first", "last", "today", "yesterday", "week", "year", "years", "day", "days", "time", "times",
  "thing", "things", "stuff", "kids", "kid", "guys", "post", "posted", "photo", "photos", "pic",
  "pics", "picture", "pictures", "video", "help", "please", "thanks", "sure", "also", "want",
  "need", "see", "saw", "went", "come", "came", "take", "took", "found", "find", "finds",
  "80s", "90s", "70s", "eighties", "nineties", "seventies", "vintage", "retro", "nostalgia",
  "nostalgic", "childhood", "growing", "grew", "generation", "genx", "gen",
]);

async function token(): Promise<string | null> {
  const id = process.env.REDDIT_CLIENT_ID;
  const secret = process.env.REDDIT_CLIENT_SECRET;
  if (!id || !secret) return null;

  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": process.env.REDDIT_USER_AGENT ?? "nostalgia-desk/1.0",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) throw new Error(`Reddit auth ${response.status}`);
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

async function listing(
  accessToken: string,
  subreddit: string,
  sort: "top" | "hot",
): Promise<Post[]> {
  const url = new URL(`https://oauth.reddit.com/r/${subreddit}/${sort}`);
  url.searchParams.set("limit", String(REDDIT.postsPerSub));
  if (sort === "top") url.searchParams.set("t", "week");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": process.env.REDDIT_USER_AGENT ?? "nostalgia-desk/1.0",
    },
  });
  if (!response.ok) throw new Error(`Reddit r/${subreddit} ${response.status}`);

  const data = (await response.json()) as {
    data?: { children?: Array<{ data: Post }> };
  };
  return (data.data?.children ?? []).map((child) => child.data);
}

/** One- and two-word phrases from a title, minus the noise. */
function phrases(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w) && !/^\d+$/.test(w));

  const out: string[] = [...words];
  for (let i = 0; i < words.length - 1; i++) out.push(`${words[i]} ${words[i + 1]}`);
  return out;
}

export async function collectReddit(
  terms: Term[],
): Promise<{ signals: Signal[]; candidates: Candidate[]; available: boolean }> {
  const accessToken = await token();
  if (!accessToken) {
    console.warn("  reddit: no credentials — skipping (see bot/README.md)");
    return { signals: [], candidates: [], available: false };
  }

  const posts: Post[] = [];
  for (const subreddit of SUBREDDITS) {
    for (const sort of ["top", "hot"] as const) {
      try {
        posts.push(...(await listing(accessToken, subreddit, sort)));
      } catch (error) {
        console.warn(`  reddit: r/${subreddit} ${sort} — ${(error as Error).message}`);
      }
    }
  }

  const corpus = posts.map((post) => ({
    text: `${post.title} ${post.selftext ?? ""}`.toLowerCase(),
    title: post.title,
    subreddit: post.subreddit,
  }));

  // Watchlist terms: how many of this week's posts mention each one.
  const signals: Signal[] = [];
  for (const term of terms) {
    const needle = term.term.toLowerCase();
    const hits = corpus.filter((post) => post.text.includes(needle));
    if (hits.length === 0) continue;

    signals.push({
      term: term.term,
      source: "reddit",
      level: hits.length,
      ratio: 1, // The scorer supplies movement; this call only sees now.
      z: 0,
      detail: {
        mentions: hits.length,
        subreddits: [...new Set(hits.map((h) => h.subreddit))],
        example: hits[0]?.title ?? "",
      },
    });
  }

  // Everything else: phrases the watchlist doesn't already cover.
  const known = new Set(terms.map((t) => t.term.toLowerCase()));
  const seen = new Map<string, { posts: number; subs: Set<string>; example: string }>();

  for (const post of corpus) {
    for (const phrase of new Set(phrases(post.title))) {
      if (known.has(phrase)) continue;
      // Skip phrases already contained in a watchlist term — "patch kids" is
      // just Cabbage Patch Kids wearing a disguise.
      if ([...known].some((k) => k.includes(phrase))) continue;

      const entry = seen.get(phrase) ?? { posts: 0, subs: new Set<string>(), example: post.title };
      entry.posts += 1;
      entry.subs.add(post.subreddit);
      seen.set(phrase, entry);
    }
  }

  const candidates: Candidate[] = [...seen.entries()]
    .filter(([, e]) => e.posts >= REDDIT.minMentions && e.subs.size >= REDDIT.minSubreddits)
    .map(([phrase, e]) => ({
      phrase,
      mentions: e.posts,
      subreddits: [...e.subs],
      example: e.example,
    }))
    .sort((a, b) => b.mentions - a.mentions);

  console.log(`  reddit: ${posts.length} posts, ${candidates.length} candidate terms`);
  return { signals, candidates, available: true };
}
