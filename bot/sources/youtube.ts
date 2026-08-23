/**
 * YouTube Data API v3.
 *
 * Deliberately does not touch `chart=mostPopular`. In July 2025 that chart was
 * narrowed to feed from Trending Music, Movies and Gaming, which makes the
 * endpoint everyone reaches for first structurally incapable of surfacing a
 * nostalgia channel.
 *
 * The metric that earns its place here is the outlier score:
 *
 *     (views ÷ days since publish) ÷ channel subscribers
 *
 * Raw view count only tells you a big channel published something. A video from
 * a twelve-thousand-subscriber channel pulling three hundred thousand views in a
 * fortnight tells you the topic is hungry *and* that you don't need a big
 * channel to catch it. That second half is the part Keith and Abby can act on.
 *
 * Quota shapes the design. The daily allowance is 10,000 units and a single
 * search costs 100, so the real budget is about a hundred searches — while
 * fetching stats for videos already found costs one unit per fifty. Hence: one
 * search per term, then everything else in batches, and a rotation so the
 * watchlist can grow past what one run can search.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { YOUTUBE } from "../config";
import { CACHE_DIR } from "../paths";
import type { Outlier, Signal, Term } from "../types";

const API = "https://www.googleapis.com/youtube/v3";
const ROTATION_FILE = path.join(CACHE_DIR, "youtube-rotation.json");

type Rotation = Record<string, string>;

/** Units spent this run. The guard against silently blowing the daily quota. */
let unitsSpent = 0;

async function call<T>(endpoint: string, params: Record<string, string>, cost: number): Promise<T> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error("YOUTUBE_API_KEY is not set");

  const url = new URL(`${API}/${endpoint}`);
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, value);
  url.searchParams.set("key", key);

  const response = await fetch(url);
  unitsSpent += cost;

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`YouTube ${endpoint} ${response.status}: ${body.slice(0, 200)}`);
  }
  return (await response.json()) as T;
}

/**
 * Pick which terms get searched this run, oldest-searched first.
 *
 * Rotation means the watchlist isn't capped by quota. A term that misses a week
 * keeps its history — the gap just widens the interval between its readings,
 * which the baseline handles fine.
 */
async function selectTerms(terms: Term[]): Promise<{ selected: Term[]; rotation: Rotation }> {
  let rotation: Rotation = {};
  try {
    rotation = JSON.parse(await readFile(ROTATION_FILE, "utf8")) as Rotation;
  } catch {
    // No rotation file yet; every term is equally overdue.
  }

  const affordable = Math.floor(YOUTUBE.unitBudget / (YOUTUBE.searchCost + 2));
  const ordered = [...terms].sort((a, b) => {
    const seenA = rotation[a.term] ?? "";
    const seenB = rotation[b.term] ?? "";
    return seenA.localeCompare(seenB);
  });

  return { selected: ordered.slice(0, affordable), rotation };
}

async function saveRotation(rotation: Rotation): Promise<void> {
  await mkdir(path.dirname(ROTATION_FILE), { recursive: true });
  await writeFile(ROTATION_FILE, `${JSON.stringify(rotation, null, 2)}\n`, "utf8");
}

type SearchResponse = {
  items?: Array<{ id?: { videoId?: string } }>;
  pageInfo?: { totalResults?: number };
};

type VideoResponse = {
  items?: Array<{
    id: string;
    snippet: { title: string; channelId: string; channelTitle: string; publishedAt: string };
    statistics: { viewCount?: string };
  }>;
};

type ChannelResponse = {
  items?: Array<{ id: string; statistics: { subscriberCount?: string } }>;
};

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export async function collectYouTube(
  terms: Term[],
): Promise<{ signals: Signal[]; outliers: Outlier[]; searched: string[]; available: boolean }> {
  unitsSpent = 0;

  // Checked once here rather than discovered per term — otherwise a missing key
  // produces a hundred identical warnings and buries anything else worth reading.
  if (!process.env.YOUTUBE_API_KEY) {
    console.warn("  youtube: no API key — skipping (see bot/README.md)");
    return { signals: [], outliers: [], searched: [], available: false };
  }

  const { selected, rotation } = await selectTerms(terms);
  const signals: Signal[] = [];
  const outliers: Outlier[] = [];
  const searched: string[] = [];
  const today = new Date().toISOString().slice(0, 10);

  const publishedAfter = new Date();
  publishedAfter.setUTCDate(publishedAfter.getUTCDate() - YOUTUBE.lookbackDays);

  for (const term of selected) {
    if (unitsSpent + YOUTUBE.searchCost > YOUTUBE.unitBudget) {
      console.warn(`  youtube: budget reached, ${selected.length - searched.length} terms deferred`);
      break;
    }

    try {
      const search = await call<SearchResponse>(
        "search",
        {
          part: "id",
          q: term.term,
          type: "video",
          order: "viewCount",
          publishedAfter: publishedAfter.toISOString(),
          maxResults: String(YOUTUBE.resultsPerTerm),
        },
        YOUTUBE.searchCost,
      );

      rotation[term.term] = today;
      searched.push(term.term);

      const videoIds = (search.items ?? [])
        .map((item) => item.id?.videoId)
        .filter((id): id is string => typeof id === "string");
      if (videoIds.length === 0) continue;

      const videos = await call<VideoResponse>(
        "videos",
        { part: "snippet,statistics", id: videoIds.join(",") },
        1,
      );
      const items = videos.items ?? [];
      if (items.length === 0) continue;

      // One channels.list covers every channel in this term's results.
      const channelIds = [...new Set(items.map((v) => v.snippet.channelId))];
      const subscribers = new Map<string, number>();
      for (const batch of chunk(channelIds, 50)) {
        const channels = await call<ChannelResponse>(
          "channels",
          { part: "statistics", id: batch.join(",") },
          1,
        );
        for (const channel of channels.items ?? []) {
          subscribers.set(channel.id, Number(channel.statistics.subscriberCount ?? 0));
        }
      }

      let bestOutlier: Outlier | null = null;
      let totalViews = 0;

      for (const video of items) {
        const views = Number(video.statistics.viewCount ?? 0);
        const subs = subscribers.get(video.snippet.channelId) ?? 0;
        totalViews += views;

        if (subs < YOUTUBE.minSubscribers) continue;

        const ageDays = Math.max(
          1,
          (Date.now() - new Date(video.snippet.publishedAt).getTime()) / 86_400_000,
        );
        const viewsPerDay = views / ageDays;
        const outlierScore = viewsPerDay / subs;

        if (!bestOutlier || outlierScore > bestOutlier.outlierScore) {
          bestOutlier = {
            term: term.term,
            videoId: video.id,
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            subscribers: subs,
            views,
            publishedAt: video.snippet.publishedAt,
            viewsPerDay: Math.round(viewsPerDay),
            outlierScore,
          };
        }
      }

      if (bestOutlier) outliers.push(bestOutlier);

      // `level` is total recent views on the topic — the thing whose week-to-week
      // movement we care about. Competition rides along as detail; it's a
      // property of the topic, not something that should move the momentum score.
      signals.push({
        term: term.term,
        source: "youtube",
        level: totalViews,
        ratio: 1, // Filled in by the scorer, which has the history this doesn't.
        z: 0,
        detail: {
          recentVideoCount: search.pageInfo?.totalResults ?? items.length,
          topOutlierScore: bestOutlier?.outlierScore ?? 0,
        },
      });
    } catch (error) {
      console.warn(`  youtube: ${term.term} — ${(error as Error).message}`);
    }
  }

  await saveRotation(rotation);
  console.log(`  youtube: ${searched.length} terms searched, ~${unitsSpent} quota units used`);

  return { signals, outliers, searched, available: true };
}

/**
 * Turn an @handle into a channel ID.
 *
 * Only needed for channels the plan doesn't already record an ID for. Cheap
 * enough (1 unit) not to bother caching.
 */
export async function resolveChannelId(handle: string): Promise<string | null> {
  const response = await call<{ items?: Array<{ id: string }> }>(
    "channels",
    { part: "id", forHandle: handle.replace(/^@/, "") },
    1,
  );
  return response.items?.[0]?.id ?? null;
}

/**
 * Every video title on a channel, for the seed miner.
 *
 * Uploads live in a playlist whose ID is the channel ID with the second
 * character switched from C to U — an old quirk of the API that saves a lookup.
 * playlistItems costs 1 unit per page of 50, so a full back catalogue is
 * essentially free next to a single search.
 */
export async function fetchChannelTitles(
  channelId: string,
  max = 500,
): Promise<Array<{ title: string; publishedAt: string }>> {
  const uploads = `UU${channelId.slice(2)}`;
  const titles: Array<{ title: string; publishedAt: string }> = [];
  let pageToken: string | undefined;

  do {
    const params: Record<string, string> = {
      part: "snippet",
      playlistId: uploads,
      maxResults: "50",
    };
    if (pageToken) params.pageToken = pageToken;

    const page = await call<{
      items?: Array<{ snippet: { title: string; publishedAt: string } }>;
      nextPageToken?: string;
    }>("playlistItems", params, 1);

    for (const item of page.items ?? []) {
      titles.push({ title: item.snippet.title, publishedAt: item.snippet.publishedAt });
    }
    pageToken = page.nextPageToken;
  } while (pageToken && titles.length < max);

  return titles;
}
