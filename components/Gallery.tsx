import { PHOTOS } from "@/lib/media";
import { Section } from "./Section";

export function Gallery() {
  return (
    <Section
      id="photos"
      eyebrow="The shoebox"
      title="Photos from the workshop"
      intro={
        <p>
          Rescues halfway through, the good finds, the boxes that turned out to be worth
          the six a.m. start.
        </p>
      }
    >
      {PHOTOS.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((photo) => (
            <li key={photo.file} className="window">
              <div className="title-bar">
                <span className="title-bar-text flex-1 truncate">{photo.file}</span>
              </div>
              <div className="bevel-in m-1 p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/photos/${photo.file}`}
                  alt={photo.alt}
                  loading="lazy"
                  className="block aspect-[4/3] w-full object-cover"
                />
              </div>
              <p className="px-2 pb-2 text-[13px] leading-snug text-ink-soft">
                {photo.caption}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bevel-in p-6">
          <p className="measure text-[15px] leading-relaxed">
            <strong>No photos loaded yet.</strong> To add some: drop the image files into{" "}
            <code className="bg-kodak/50 px-1">public/photos/</code>, then add a line for
            each one in <code className="bg-kodak/50 px-1">lib/media.ts</code> with the file
            name, a short description and the caption you want underneath.
          </p>
          <p className="measure mt-3 text-[15px] leading-relaxed text-ink-soft">
            Send them over and I&apos;ll wire them in — and once the database goes in,
            this becomes a proper upload screen rather than a file to edit.
          </p>
        </div>
      )}
    </Section>
  );
}
