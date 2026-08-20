import { PHOTOS } from "@/lib/media";
import { Framed } from "./Framed";
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
            <li key={photo.file}>
              <Framed photo={photo} title={photo.file} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="bevel-in p-6">
          <p className="measure text-[15px] leading-relaxed">
            <strong>No photos loaded yet.</strong> Files go in{" "}
            <code className="bg-kodak/50 px-1">public/photos/</code> and get listed in{" "}
            <code className="bg-kodak/50 px-1">lib/media.ts</code>, which has the five
            places a photo can sit written out at the top.
          </p>
        </div>
      )}
    </Section>
  );
}
