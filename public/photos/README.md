# Photos

Drop image files straight into this folder, then list them in `lib/media.ts`.

## Uploading without using git

1. Open the repo on GitHub and switch to the working branch.
2. Navigate to `public/photos/`.
3. **Add file → Upload files**, drag the images in, and commit.

That's it — the files are in. Tell me the file names and which slot each one
belongs to and I'll wire them up, or edit `lib/media.ts` yourself following the
comments at the top of that file.

## Where a photo can go

| Slot | Where it appears | How many | Shape |
| --- | --- | --- | --- |
| `PORTRAIT` | About window, bottom of the page | 1 | Landscape 3:2 |
| `CHANNEL_IMAGES` | On each of the three channel cards | up to 3 | Landscape 16:9 |
| `PHOTOS` | The gallery grid — the main one | any number | Landscape 4:3 |
| `TAPES_PHOTO` | Beside the tape-submission form | 1 | Landscape 4:3 |
| `BENCH_PHOTO` | Beside the shop | 1 | Landscape 16:9 |

Any slot left empty simply doesn't render. Nothing breaks.

## Preparing the files

- **JPG** for photographs, **PNG** only if it needs transparency.
- About **1600px on the long edge** — bigger than that just slows the page down.
- **Under 1MB each.**
- **Lowercase file names, hyphens instead of spaces**: `cabbage-patch-before.jpg`,
  not `Cabbage Patch Before.JPG`. Spaces and capitals cause broken images on
  some hosts.

## Two things every photo needs

- **alt** — a plain description of what's in the shot, for anyone using a screen
  reader. Say what's happening: "Abby re-rooting a Cabbage Patch doll at her
  bench", not "photo1".
- **caption** — the line printed underneath, in your voice. Optional for the
  single-slot photos, worth writing for the gallery.
