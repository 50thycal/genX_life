import { XMLParser } from "fast-xml-parser";

/**
 * Latest uploads, straight from YouTube's public per-channel RSS feed.
 *
 * No API key and no quota — the feed at /feeds/videos.xml is open. Which means
 * Keith and Abby never add a video to this site: they post to YouTube and it
 * shows up here within the hour. That is the whole point.
 *
 * Falls back to the hand-picked list in lib/media.ts when the feed can't be
 * reached, so the wall is never empty.
 */

export type Video = {
  id: string;
  title: string;
  channel: string;
  published: string | null;
};

export const CHANNEL_IDS = {
  main: "UCMJh6uOm80WByahFlweGz0g",
  retroRescue: "UCXybtY7smTIi1fVjRiZa7_Q",
  // Your Life On Tape — only the @handle is known so far. Drop the UC… id in
  // here and its uploads join the wall automatically.
  yourLifeOnTape: null as string | null,
} as const;

export function thumbnailFor(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function watchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

async function fetchChannel(channelId: string, channelName: string): Promise<Video[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) return [];

    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
    const parsed = parser.parse(await response.text());
    const entries = asArray<Record<string, unknown>>(parsed?.feed?.entry);

    return entries
      .map((entry) => {
        const id = entry["yt:videoId"];
        if (typeof id !== "string" || !id) return null;
        return {
          id,
          title: String(entry.title ?? "").trim(),
          channel: channelName,
          published: typeof entry.published === "string" ? entry.published : null,
        } satisfies Video;
      })
      .filter((video): video is Video => video !== null);
  } catch {
    return [];
  }
}

/** Newest first, interleaved across whichever channels responded. */
export async function getLatestVideos(limit = 8): Promise<Video[]> {
  const sources: Array<[string, string]> = [
    [CHANNEL_IDS.main, "Our Gen X Life"],
    [CHANNEL_IDS.retroRescue, "Abby's Retro Rescue"],
  ];
  if (CHANNEL_IDS.yourLifeOnTape) {
    sources.push([CHANNEL_IDS.yourLifeOnTape, "Your Life On Tape"]);
  }

  const results = await Promise.all(sources.map(([id, name]) => fetchChannel(id, name)));

  return results
    .flat()
    .sort((a, b) => {
      if (!a.published || !b.published) return 0;
      return new Date(b.published).getTime() - new Date(a.published).getTime();
    })
    .slice(0, limit);
}
