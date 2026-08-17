/**
 * Wikipedia pageviews.
 *
 * The most useful source in the build and the cheapest: no key, no quota worth
 * counting, no terms-of-service exposure. It suits this brand specifically
 * because every Gen X artifact has an article — Teddy Ruxpin, Zima, Blockbuster,
 * Pyrex — and a spike means something reminded a lot of people of that object
 * this week.
 *
 * It's also the only source that arrives with its own history. One call returns
 * 90 days of dailies, so a term has a real baseline the first time it runs,
 * while YouTube and Reddit have to accumulate one week by week.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { USER_AGENT, WIKIPEDIA } from "../config";
import { mean, stdDev } from "../history";
import { CACHE_DIR } from "../paths";
import type { Signal, Term } from "../types";

const CACHE_FILE = path.join(CACHE_DIR, "wikipedia-articles.json");

type ArticleCache = Record<string, string | null>;

function yyyymmdd(date: Date): string {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

async function loadCache(): Promise<ArticleCache> {
  try {
    return JSON.parse(await readFile(CACHE_FILE, "utf8")) as ArticleCache;
  } catch {
    return {};
  }
}

async function saveCache(cache: ArticleCache): Promise<void> {
  await mkdir(path.dirname(CACHE_FILE), { recursive: true });
  await writeFile(CACHE_FILE, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

/**
 * Find the article a term refers to.
 *
 * Resolutions are cached and committed, which matters for more than speed: a
 * term that silently starts resolving to a different article would break its
 * history without anything looking wrong. Pinning the answer means a change
 * shows up as a diff someone can question.
 */
async function resolveArticle(term: Term, cache: ArticleCache): Promise<string | null> {
  if (term.wikipedia) return term.wikipedia;
  if (term.term in cache) return cache[term.term];

  const url = new URL("https://en.wikipedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("list", "search");
  url.searchParams.set("srsearch", term.term);
  url.searchParams.set("srlimit", "1");
  url.searchParams.set("format", "json");
  url.searchParams.set("origin", "*");

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`Wikipedia search ${response.status} for "${term.term}"`);

  const data = (await response.json()) as {
    query?: { search?: Array<{ title: string }> };
  };
  const title = data.query?.search?.[0]?.title ?? null;

  cache[term.term] = title === null ? null : title.replace(/ /g, "_");
  return cache[term.term];
}

async function dailyViews(article: string): Promise<number[]> {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1); // Today is never complete.
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - WIKIPEDIA.windowDays);

  const url =
    "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia" +
    `/all-access/user/${encodeURIComponent(article)}/daily/${yyyymmdd(start)}/${yyyymmdd(end)}`;

  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });

  // A 404 means the article exists but has no pageview record for the window —
  // normal for very obscure pages, and not an error worth failing the run over.
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`Wikipedia pageviews ${response.status} for ${article}`);

  const data = (await response.json()) as { items?: Array<{ views: number }> };
  return (data.items ?? []).map((item) => item.views);
}

export async function collectWikipedia(terms: Term[]): Promise<Signal[]> {
  const cache = await loadCache();
  const signals: Signal[] = [];

  for (const term of terms) {
    try {
      const article = await resolveArticle(term, cache);
      if (!article) continue;

      const views = await dailyViews(article);
      if (views.length < WIKIPEDIA.recentDays * 2) continue;

      const recent = views.slice(-WIKIPEDIA.recentDays);
      const baseline = views.slice(0, -WIKIPEDIA.recentDays);

      const level = mean(recent);
      const baseAvg = mean(baseline);
      const baseSd = stdDev(baseline);

      // Tiny articles produce enormous percentage swings on a handful of views.
      // Dropping them here is cheaper than trying to explain them in the report.
      if (level < WIKIPEDIA.minDailyViews) continue;

      signals.push({
        term: term.term,
        source: "wikipedia",
        level,
        ratio: baseAvg > 0 ? level / baseAvg : 1,
        z: baseSd > 0 ? (level - baseAvg) / baseSd : 0,
        detail: {
          article,
          recentDailyAvg: Math.round(level),
          baselineDailyAvg: Math.round(baseAvg),
        },
      });
    } catch (error) {
      console.warn(`  wikipedia: ${term.term} — ${(error as Error).message}`);
    }
  }

  await saveCache(cache);
  return signals;
}
