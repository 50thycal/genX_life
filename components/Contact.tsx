import { CONTACT, PODCAST, SOCIALS } from "@/lib/links";

/**
 * Contact details, at the foot of the About window. With every page now a
 * window of its own there's no page-wide footer to put them in, and About is
 * where somebody looking for an address goes anyway.
 */
export function Contact() {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-3">
      <div className="card-surface p-5">
        <p className="label-strip mb-3 text-rec-deep">Get in touch</p>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Story, question, or a box of tapes.{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-medium text-tape underline underline-offset-2"
          >
            {CONTACT.email}
          </a>
        </p>
      </div>

      <div className="card-surface p-5">
        <p className="label-strip mb-3 text-rec-deep">Send something</p>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Our Gen X Life
          <br />
          {CONTACT.poBox}
        </p>
      </div>

      <div className="card-surface p-5">
        <p className="label-strip mb-3 text-rec-deep">Follow along</p>
        <ul className="space-y-1.5">
          {SOCIALS.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-track={`social:${social.name}`}
                className="text-[15px] text-tape underline underline-offset-2"
              >
                {social.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href={PODCAST.rss}
              target="_blank"
              rel="noopener noreferrer"
              data-track="podcast:rss"
              title="Podcast RSS feed, for podcast apps"
              className="text-[13px] text-ink-faint underline underline-offset-2"
            >
              RSS feed
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
