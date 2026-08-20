# Video

The channel intro that plays in the hero, top right — where the DOS box is now.

## Uploading without using git

1. Open the repo on GitHub and switch to the working branch.
2. Navigate to `public/video/`.
3. **Add file → Upload files**, drag the MP4 in, and commit.
4. Tell me the file name, or set `HERO_VIDEO` yourself in `lib/media.ts`:

```ts
export const HERO_VIDEO: HeroVideoSlot | null = {
  file: "genx-intro.mp4",
  alt: "The Our Gen X Life channel intro",
  poster: "genx-intro-poster.jpg", // optional
};
```

Until that's set, the DOS box shows there instead. Nothing breaks either way.

## How it plays

It **autoplays muted and loops**, with a speaker button to turn sound on. That's
not a preference — every browser blocks autoplay with sound, so a silent loop is
the only version that starts on its own. Anyone who's asked for reduced motion in
their system settings gets the poster frame and normal play controls instead.

Because it loops silently on arrival, **keep it short** — an intro bumper of a few
seconds, not a full episode.

## Exporting the file

- **MP4**, H.264 video + AAC audio. That combination plays everywhere.
- **1280×720** is plenty — it renders in a panel a few hundred pixels wide.
- **Under 10MB.** It's on the critical path for the homepage, so every megabyte
  is felt. GitHub refuses anything over 100MB outright and warns above 50MB.
- **Lowercase file name, hyphens instead of spaces.**

If the only copy is a big export, it's worth re-encoding smaller before upload —
send it over and I can advise on settings.

## A poster frame is worth adding

A single JPG of the first frame, dropped in this folder alongside the MP4 and
named in `poster`. It's what fills the panel while the video loads, so the hero
doesn't sit as a black rectangle on a slow connection.
