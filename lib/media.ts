import type { Video } from "./youtube";

/**
 * ── ADDING YOUR OWN CONTENT ──────────────────────────────────────────────
 *
 * VIDEOS
 *   You don't need to do anything. The video wall reads your YouTube channels
 *   directly, so anything you post shows up here on its own within the hour.
 *   The list below is only a safety net for when YouTube can't be reached.
 *
 * PHOTOS
 *   1. Drop the image file into  public/photos/
 *   2. Add a line to PHOTOS below — file name, a short description for screen
 *      readers, and the caption you want printed underneath.
 *
 *   Keep them under about 1MB each so the page stays quick. Landscape shots
 *   sit best in the grid.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Shown only if YouTube's feed is unreachable. */
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

export type Photo = {
  /** File name inside public/photos/ */
  file: string;
  /** Described for anyone who can't see it. */
  alt: string;
  /** Printed under the picture. */
  caption: string;
};

export const PHOTOS: Photo[] = [
  // Example — delete this comment and add real ones:
  // { file: "workshop.jpg", alt: "Abby re-rooting a Cabbage Patch doll at her bench",
  //   caption: "Halfway through a rescue. That hair took four hours." },
];
