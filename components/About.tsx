import { PORTRAIT } from "@/lib/media";
import { Framed } from "./Framed";
import { Section } from "./Section";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Keith & Abby"
      intro={
        <>
          <p>
            A couple of 80s kids in Andover, Kansas, who never quite got over it. Abby is
            the one at the estate sale at seven in the morning; Keith is the one carrying
            the box to the car.
          </p>
          <p>
            What started as one podcast about growing up in the 80s turned into three
            channels, a workshop full of half-restored dolls, and a slowly growing archive
            of other people&apos;s memories. Everyone thinks the decade they grew up in was
            the best one. They just happen to be right.
          </p>
        </>
      }
    >
      <Framed
        photo={PORTRAIT}
        title="genx-banner-long.png"
        aspect="aspect-[16/5]"
        className="mb-6 max-w-xl"
      />

    </Section>
  );
}
