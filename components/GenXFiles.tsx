import { CONTACT } from "@/lib/links";
import { GENXFILES_IMAGE } from "@/lib/media";
import { Framed } from "./Framed";
import { Section } from "./Section";
import { SubmitForm } from "./SubmitForm";

export function GenXFiles() {
  return (
    <Section
      id="genxfiles"
      eyebrow="The Gen X Files"
      title="Tell us what you remember"
      tone="kraft"
      intro={
        <>
          <p>
            Everyone who grew up in the 70s, 80s and 90s is carrying a story nobody has
            asked them about in thirty years. The arcade in the mall. The teacher everyone
            was scared of. The summer nobody came looking for you until the streetlights
            came on.
          </p>
          <p>
            Send yours in and Keith and Abby will read it on the show. It takes two
            minutes, and it&apos;s the best part of what they do.
          </p>
        </>
      }
    >
      <Framed
        photo={GENXFILES_IMAGE}
        title="gen-x-files-logo.png"
        aspect="aspect-[5/2]"
        className="mb-6 max-w-lg"
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(320px,420px)]">
        <SubmitForm
          kind="genxfiles"
          submitLabel="Send it in"
          successTitle="Filed."
          successBody="Thanks — that's in the pile. Keith and Abby read every one, and if yours makes it onto the show you'll hear from them first."
          fields={[
            {
              name: "story",
              label: "Your story",
              type: "textarea",
              rows: 9,
              required: true,
              placeholder:
                "It doesn't have to be tidy. Just tell it the way you'd tell it out loud.",
            },
            {
              name: "name",
              label: "Your name",
              type: "text",
              required: true,
              placeholder: "First name is plenty",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
              hint: "Only used to let you know when your story is on the show. No list, no spam.",
            },
          ]}
        />

        <aside className="space-y-5">
          <div className="card-surface p-5">
            <p className="label-strip mb-3 text-rec">What happens next</p>
            <ol className="space-y-3 text-[16.5px] leading-relaxed text-ink-soft">
              <li>
                <strong className="text-ink">1.</strong> Keith and Abby read every
                submission that comes in.
              </li>
              <li>
                <strong className="text-ink">2.</strong> The ones that stick get read aloud
                on the podcast and the channel.
              </li>
              <li>
                <strong className="text-ink">3.</strong> You get an email the morning it
                goes live, so you can hear it first.
              </li>
            </ol>
          </div>

          <div className="bevel-in p-5">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              Rather just email it? That works too —{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-medium text-tape underline underline-offset-2"
              >
                {CONTACT.email}
              </a>
              . Say whether we can use your name.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
