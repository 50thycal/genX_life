import type { Video } from "./youtube";

/**
 * ── WHERE PHOTOS GO ──────────────────────────────────────────────────────
 *
 * Every image file lives in  public/photos/  and gets referenced below by
 * file name. There are five places a photo can appear on the page:
 *
 *   SLOT 1  PORTRAIT        Keith and Abby, in the About window at the bottom.
 *                           One landscape or square shot of the two of them.
 *
 *   SLOT 2  CHANNEL_IMAGES  A still for each of the three channel cards.
 *                           Landscape, roughly 16:9. Optional per channel.
 *
 *   SLOT 3  PHOTOS          The gallery grid — "the shoebox". As many as you
 *                           like. Landscape sits best. This is the main one.
 *
 *   SLOT 4  TAPES_PHOTO     One shot beside the tape-submission form. A stack
 *                           of VHS tapes or a camcorder does the job.
 *
 *   SLOT 5  BENCH_PHOTO     One shot beside the shop — a rescue in progress
 *                           at Abby's bench.
 *
 * Any slot left empty just doesn't render; the page still works without it.
 *
 * Prep: JPG, about 1600px on the long edge, under 1MB each.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Photo = {
  /** File name inside public/photos/ */
  file: string;
  /** Described for anyone who can't see it. Say what's happening. */
  alt: string;
  /** Printed under the picture. Optional for the single-slot photos. */
  caption?: string;
};

/** SLOT 1 — Keith and Abby, in the About window. */
export const PORTRAIT: Photo | null = null;
// e.g. { file: "keith-and-abby.jpg", alt: "Keith and Abby in the workshop" }

/** SLOT 2 — one still per channel card. Keys must match the names in links.ts. */
export const CHANNEL_IMAGES: Record<string, Photo> = {
  // "Our Gen X Life": { file: "channel-main.jpg", alt: "Keith and Abby filming an episode" },
  // "Abby's Retro Rescue": { file: "channel-rescue.jpg", alt: "A half-restored doll on the bench" },
  // "Your Life On Tape": { file: "channel-tape.jpg", alt: "A stack of unlabelled VHS tapes" },
};

/** SLOT 3 — the gallery grid. Add as many as you like. */
export const PHOTOS: Photo[] = [
  // { file: "cabbage-patch-before.jpg",
  //   alt: "A matted 1980s Cabbage Patch doll before restoration",
  //   caption: "Found at an estate sale outside Wichita. Four hours of hair to go." },
];

/** SLOT 4 — beside the tape-submission form. */
export const TAPES_PHOTO: Photo | null = null;

/** SLOT 5 — beside the shop. */
export const BENCH_PHOTO: Photo | null = null;

/** Shown only if YouTube's feed is unreachable. Not something you need to edit. */
export const FALLBACK_VIDEOS: Video[] = [
  {
    id: "FnAlXwpI1Fg",
    title: "Our Gen X Life — Episode 1",
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
