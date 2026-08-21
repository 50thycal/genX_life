import type { Video } from "./youtube";

/**
 * ── WHERE PHOTOS AND VIDEO GO ────────────────────────────────────────────
 *
 * Images live in  public/photos/  and video in  public/video/ , referenced
 * below by file name. Every slot is optional. An empty one renders nothing
 * and the layout holds without it.
 *
 * File names: lowercase, hyphens, no spaces or apostrophes. Spaces have to be
 * escaped in a URL and break on some hosts.
 *
 * Prep: JPG or WebP for photographs (PNG only when transparency is needed),
 * about 1600px on the long edge, under 1MB each.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Photo = {
  /** File name inside public/photos/ */
  file: string;
  /** Described for anyone who can't see it. Say what's happening. */
  alt: string;
  /** Printed under the picture. Optional for the single-slot photos. */
  caption?: string;
  /**
   * "contain" letterboxes the whole image on black instead of cropping it.
   * Use it for banner artwork, whose shape never matches the frame.
   */
  fit?: "cover" | "contain";
};

/** SLOT 1 — the banner across the top of the hero. Both of them, plus the logo. */
export const HERO_BANNER: Photo | null = {
  file: "genx-banner-long.jpg",
  alt: "Keith and Abby beside the Our Gen X Life logo",
};

/** SLOT 2 — a still on each channel card. Keys match the names in links.ts. */
export const CHANNEL_IMAGES: Record<string, Photo> = {
  "Our Gen X Life": {
    file: "genx-logo.png",
    alt: "The Our Gen X Life logo",
    fit: "contain",
  },
  "Abby's Retro Rescue": {
    file: "retro-rescue-card.jpg",
    alt: "Abby holding rescued plush toys, beside the Abby's Retro Rescue logo",
    fit: "contain",
  },
  "Your Life On Tape": {
    file: "your-life-on-tape.jpg",
    alt: "A VHS cassette labelled Your Life On Tape",
    fit: "contain",
  },
};

/** SLOT 3 — the gallery grid. Workshop shots, finds, rescues in progress. */
export const PHOTOS: Photo[] = [
  // Nothing here yet — these want photographs rather than brand artwork.
];

/** SLOT 4 — beside the tape-submission form. */
export const TAPES_PHOTO: Photo | null = null;

/** SLOT 5 — beside the shop. */
export const BENCH_PHOTO: Photo | null = null;

/** SLOT 5b — the artwork on each of the two shop cards. */
export const SHOP_IMAGES: { etsy: Photo | null; merch: Photo | null } = {
  etsy: {
    file: "etsy-shop.jpg",
    alt: "Abby holding rescued plush toys, beside the Abby's Retro Rescue logo",
  },
  merch: {
    file: "merch-shop.jpg",
    alt: "A retro television showing the words Our Gen X Life",
  },
};

/** SLOT 6 — heading the Gen X Files section. */
export const GENXFILES_IMAGE: Photo | null = {
  file: "gen-x-files-logo.jpg",
  alt: "The Gen X Files logo, a glowing green X on black",
};

/** SLOT 7 — the About window. */
export const PORTRAIT: Photo | null = {
  file: "genx-banner-long.jpg",
  alt: "Keith and Abby beside the Our Gen X Life logo",
  fit: "contain",
};

/**
 * SLOT 8 — the show's cover art.
 *
 * Note this is still the OUR 80s LIFE artwork. It's what Apple and Spotify
 * show today, so it's the honest thing to display — but it's the one asset
 * left carrying the old brand, and it wants redoing when the show is renamed.
 */
export const PODCAST_IMAGE: Photo | null = {
  file: "podcast-cover.jpg",
  alt: "The podcast cover: Keith and Abby beside the Our 80s Life logo",
};

export type HeroVideoSlot = {
  /** File name inside public/video/ */
  file: string;
  /** Described for anyone who can't play it. */
  alt: string;
  /** Optional still shown before it starts, also in public/video/ */
  poster?: string;
  /** Set when the file has no audio track — hides the sound button. */
  silent?: boolean;
};

/**
 * SLOT 9 — the intro, top right of the hero.
 *
 * Autoplays muted on a loop with a button to turn sound on, so keep it short:
 * an intro bumper, not a full episode. Under 10MB and it stays snappy; GitHub
 * refuses anything over 100MB outright.
 *
 * Export MP4 (H.264 + AAC), 1280x720 is plenty at this size on the page.
 */
export const HERO_VIDEO: HeroVideoSlot | null = {
  file: "genx-opener.mp4",
  alt: "The Our Gen X Life channel opener",
  // This export carries no audio track, so there's nothing to unmute.
  silent: true,
};

/** Shown only if YouTube's feed is unreachable. Not something you need to edit. */
export const FALLBACK_VIDEOS: Video[] = [
  {
    id: "FnAlXwpI1Fg",
    title: "Our Gen X Life, Episode 1",
    channel: "Our Gen X Life",
    published: null,
  },
  {
    id: "RCoH8BsSCOw",
    title: "Gen X to the Rescue",
    channel: "Our Gen X Life",
    published: null,
  },
];

export function photoUrl(photo: Photo): string {
  return `/photos/${photo.file}`;
}
