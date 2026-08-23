/**
 * Mine the back catalogue for watchlist terms.
 *
 * The best seed vocabulary isn't one I can guess — it's the one Keith and Abby
 * have already been using for years in their own video titles. This reads every
 * title across all three channels, pulls out the recurring phrases, drops the
 * ones already on the watchlist, and writes the rest out as proposals.
 *
 * It proposes; it never edits the watchlist. A human reads the list and moves
 * the good ones across by hand, which is also the moment to decide a term's era,
 * category, and whether it's a shirt or an object.
 *
 * Worth running once before the first weekly run, and again any time the
 * channels move into new territory.
 *
 *   npm run bot:mine
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { BOT_DIR } from "./paths";
import { fetchChannelTitles, resolveChannelId } from "./sources/youtube";
import { WATCHLIST } from "./watchlist";

/**
 * The three channels. IDs come from the website's own link list where they're
 * known; Your Life On Tape only has a handle, so it gets resolved at runtime.
 */
const CHANNELS: Array<{ name: string; id?: string; handle?: string }> = [
  { name: "Our Gen X Life", id: "UCMJh6uOm80WByahFlweGz0g" },
  { name: "Abby's Retro Rescue", id: "UCXybtY7smTIi1fVjRiZa7_Q" },
  { name: "Your Life On Tape", handle: "@YourLifeOnTape" },
];

/**
 * Words that describe the *format* of a video rather than its subject. These
 * are the most common words in any creator's titles and none of them is a
 * trend — "haul" tells you nothing about what was in the haul.
 */
const FORMAT_WORDS = new Set([
  "the", "and", "for", "with", "our", "your", "you", "this", "that", "was", "were", "are", "from",
  "out", "all", "his", "her", "its", "how", "why", "what", "when", "who", "did", "does", "got",
  "get", "can", "will", "just", "not", "but", "one", "two", "new", "old", "more", "most", "very",
  "haul", "vlog", "video", "episode", "part", "podcast", "shorts", "short", "live", "full",
  "review", "unboxing", "update", "channel", "subscribe", "watch", "day", "week", "time", "first",
  "best", "top", "favorite", "favourite", "look", "looking", "come", "lets", "let", "make",
  "making", "made", "back", "again", "ever", "before", "after", "into", "over", "about",
  "80s", "90s", "70s", "retro", "vintage", "nostalgia", "nostalgic", "genx", "gen",
]);

function phrases(title: string): string[] {
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !FORMAT_WORDS.has(w) && !/^\d+$/.test(w));

  const out = [...words];
  for (let i = 0; i < words.length - 1; i++) out.push(`${words[i]} ${words[i + 1]}`);
  return out;
}

async function main(): Promise<void> {
  if (!process.env.YOUTUBE_API_KEY) {
    console.error("YOUTUBE_API_KEY is not set — see bot/README.md");
    process.exit(1);
  }

  const known = new Set(WATCHLIST.map((t) => t.term.toLowerCase()));
  const counts = new Map<string, { count: number; channels: Set<string>; example: string }>();
  let totalTitles = 0;

  for (const channel of CHANNELS) {
    let id = channel.id;
    if (!id && channel.handle) {
      try {
        id = (await resolveChannelId(channel.handle)) ?? undefined;
      } catch (error) {
        console.warn(`${channel.name}: could not resolve ${channel.handle} — ${(error as Error).message}`);
      }
    }
    if (!id) {
      console.warn(`${channel.name}: no channel ID, skipping`);
      continue;
    }

    try {
      const titles = await fetchChannelTitles(id);
      totalTitles += titles.length;
      console.log(`${channel.name}: ${titles.length} videos`);

      for (const { title } of titles) {
        for (const phrase of new Set(phrases(title))) {
          if (known.has(phrase)) continue;
          // A phrase that's just a fragment of an existing term isn't new.
          if ([...known].some((k) => k.includes(phrase))) continue;

          const entry = counts.get(phrase) ?? { count: 0, channels: new Set<string>(), example: title };
          entry.count += 1;
          entry.channels.add(channel.name);
          counts.set(phrase, entry);
        }
      }
    } catch (error) {
      console.warn(`${channel.name}: ${(error as Error).message}`);
    }
  }

  // Appearing twice is the bar: once is a one-off video, twice is a theme they
  // return to — which is exactly what makes a term worth tracking weekly.
  const proposed = [...counts.entries()]
    .filter(([, e]) => e.count >= 2)
    .map(([phrase, e]) => ({
      phrase,
      videos: e.count,
      channels: [...e.channels],
      example: e.example,
    }))
    .sort((a, b) => b.videos - a.videos);

  const outPath = path.join(BOT_DIR, "proposed-terms.json");
  await writeFile(
    outPath,
    `${JSON.stringify({ minedAt: new Date().toISOString(), totalTitles, proposed }, null, 2)}\n`,
    "utf8",
  );

  console.log(`\n${totalTitles} titles read, ${proposed.length} phrases proposed`);
  console.log(`→ ${path.relative(process.cwd(), outPath)}\n`);

  for (const item of proposed.slice(0, 40)) {
    console.log(`  ${String(item.videos).padStart(3)}×  ${item.phrase.padEnd(28)} ${item.example.slice(0, 50)}`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
