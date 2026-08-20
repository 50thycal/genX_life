import { CONTACT } from "@/lib/links";
import { TAPES_PHOTO } from "@/lib/media";
import { Framed } from "./Framed";
import { Section } from "./Section";
import { SubmitForm } from "./SubmitForm";

export function Tapes() {
  return (
    <Section
      id="tapes"
      eyebrow="Your Life On Tape"
      title="There's a box of tapes in your closet nobody can play"
      intro={
        <>
          <p>
            Birthdays, holidays, a school concert someone filmed badly from the back row.
            The camcorder&apos;s long gone and the VCR went to the curb years ago, so
            they&apos;ve sat there ever since.
          </p>
          <p>
            Send them to us. We&apos;ll digitise them, send the files back to you, and — only
            if you say yes — share the best bits on the channel so somebody else gets to
            remember it too.
          </p>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(320px,420px)_1fr]">
        <aside className="space-y-5 lg:order-2">
          <Framed photo={TAPES_PHOTO} title="tapes.jpg" />
          <div className="card-surface p-5">
            <p className="label-strip mb-3 text-rec">The deal</p>
            <ul className="space-y-3 text-[16.5px] leading-relaxed text-ink-soft">
              <li>
                <strong className="text-ink">Your tapes come back.</strong> Along with
                digital copies you can actually watch.
              </li>
              <li>
                <strong className="text-ink">Nothing goes public without a yes.</strong>{" "}
                You decide, after you&apos;ve seen it.
              </li>
              <li>
                <strong className="text-ink">Faces can be left out.</strong> Tell us
                what&apos;s private and it stays private.
              </li>
            </ul>
          </div>

          <div className="bevel-in p-5">
            <p className="label-strip mb-2 text-ink-faint">Mail to</p>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Our Gen X Life
              <br />
              {CONTACT.poBox}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-faint">
              Fill in the form first so we know to look out for them.
            </p>
          </div>
        </aside>

        <SubmitForm
          kind="tapes"
          submitLabel="Tell us about your tapes"
          successTitle="Got it."
          successBody="We'll be in touch with where to send them and what to expect. Don't post anything until you hear back."
          fields={[
            {
              name: "tapes",
              label: "What have you got?",
              type: "textarea",
              rows: 6,
              required: true,
              placeholder:
                "Roughly how many, what format if you know it (VHS, VHS-C, Hi8, MiniDV), and anything you remember being on them.",
            },
            {
              name: "name",
              label: "Your name",
              type: "text",
              required: true,
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
              hint: "So we can arrange the details before anything goes in the post.",
            },
          ]}
        />
      </div>
    </Section>
  );
}
