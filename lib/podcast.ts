import { XMLParser } from "fast-xml-parser";
import { PODCAST } from "./links";

export type Episode = {
  title: string;
  description: string;
  published: string;
  duration: string | null;
  audioUrl: string | null;
  link: string | null;
};

export type Show = {
  title: string;
  description: string;
  artwork: string | null;
  episodes: Episode[];
};

/** Strip tags and collapse whitespace — feed descriptions arrive as loose HTML. */
function toPlainText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(pubDate: unknown): string {
  if (typeof pubDate !== "string") return "";
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Anchor reports duration as either seconds or HH:MM:SS. Normalise to H:MM. */
function formatDuration(raw: unknown): string | null {
  if (raw === undefined || raw === null) return null;
  const value = String(raw).trim();
  if (!value) return null;

  let totalSeconds: number;
  if (value.includes(":")) {
    const parts = value.split(":").map((p) => parseInt(p, 10));
    if (parts.some(Number.isNaN)) return null;
    totalSeconds = parts.reduce((acc, part) => acc * 60 + part, 0);
  } else {
    totalSeconds = parseInt(value, 10);
    if (Number.isNaN(totalSeconds)) return null;
  }

  const minutes = Math.round(totalSeconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hr ${minutes % 60} min`;
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Reads the show straight from the feed rather than from anything hardcoded,
 * so a rename in Spotify for Creators lands here on its own — nobody has to
 * remember to update the site.
 *
 * Returns null when the feed can't be reached. The podcast section renders its
 * platform buttons regardless, so an outage degrades instead of breaking.
 */
export async function getShow(): Promise<Show | null> {
  try {
    const response = await fetch(PODCAST.rss, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "ourgenxlife.com" },
    });
    if (!response.ok) return null;

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      cdataPropName: "__cdata",
      textNodeName: "#text",
    });

    const parsed = parser.parse(await response.text());
    const channel = parsed?.rss?.channel;
    if (!channel) return null;

    const read = (node: unknown): string => {
      if (node === undefined || node === null) return "";
      if (typeof node === "string" || typeof node === "number") return String(node);
      if (typeof node === "object") {
        const record = node as Record<string, unknown>;
        return read(record.__cdata ?? record["#text"] ?? "");
      }
      return "";
    };

    const episodes: Episode[] = asArray<Record<string, unknown>>(channel.item)
      .slice(0, 6)
      .map((item) => ({
        title: toPlainText(read(item.title)),
        description: toPlainText(read(item.description)),
        published: formatDate(read(item.pubDate)),
        duration: formatDuration(read(item["itunes:duration"])),
        audioUrl:
          (item.enclosure as Record<string, string> | undefined)?.["@_url"] ?? null,
        link: read(item.link) || null,
      }));

    return {
      title: toPlainText(read(channel.title)),
      description: toPlainText(read(channel["itunes:summary"]) || read(channel.description)),
      artwork:
        (channel["itunes:image"] as Record<string, string> | undefined)?.["@_href"] ?? null,
      episodes,
    };
  } catch {
    // Network blocked, feed malformed, host down — all the same to the page.
    return null;
  }
}
