import { CHANNELS } from "@/lib/links";
import { Section } from "./Section";

export function Channels() {
  return (
    <Section
      id="channels"
      eyebrow="Three channels"
      title="One household, three obsessions"
      intro={
        <p>
          They cover different ground, so here&apos;s what each one is actually for — pick
          the one that sounds like your childhood.
        </p>
      }
    >
      <ul className="grid gap-5 md:grid-cols-3">
        {CHANNELS.map((channel) => (
          <li key={channel.href} className="flex">
            <a
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`channel:${channel.name}`}
              className="card-surface group flex w-full flex-col p-5"
            >
              <span
                className={`label-strip bevel-in mb-4 inline-flex w-fit items-center gap-2 px-2 py-1 ${
                  channel.active ? "text-tape" : "text-rec-deep"
                }`}
              >
                {channel.cadence}
              </span>

              <h3 className="font-display text-[17px] leading-tight text-balance">
                {channel.name}
              </h3>

              <p className="mt-3 flex-1 text-[16.5px] leading-relaxed text-ink-soft">
                {channel.pitch}
              </p>

              <span className="label-strip mt-6 inline-flex items-center gap-2 text-rec">
                Watch
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
