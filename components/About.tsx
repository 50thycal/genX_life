import { CONTACT } from "@/lib/links";
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
        title="keith-and-abby.jpg"
        aspect="aspect-[3/2]"
        className="mb-6 max-w-xl"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="card-surface p-5">
          <p className="label-strip mb-3 text-rec">Get in touch</p>
          <p className="text-[16.5px] leading-relaxed text-ink-soft">
            Story, question, or a box of tapes —{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-medium text-tape underline underline-offset-2"
            >
              {CONTACT.email}
            </a>
          </p>
        </div>

        <div className="card-surface p-5">
          <p className="label-strip mb-3 text-rec">Send something</p>
          <p className="text-[15px] leading-relaxed text-ink-soft">
            Our Gen X Life
            <br />
            {CONTACT.poBox}
          </p>
        </div>
      </div>
    </Section>
  );
}
