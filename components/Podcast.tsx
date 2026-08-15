import { PODCAST } from "@/lib/links";
import type { Show } from "@/lib/podcast";
import { Section } from "./Section";

export function Podcast({ show }: { show: Show | null }) {
  return (
    <Section
      id="podcast"
      eyebrow="The podcast"
      title={show?.title || "Listen to the show"}
      tone="kraft"
      intro={
        <p>
          {show?.description ||
            "Keith and Abby, a microphone, and a couple of hours of the decade you grew up in. Have a listen before you subscribe to anything."}
        </p>
      }
    >
      {show && show.episodes.length > 0 ? (
        <ul className="space-y-4">
          {show.episodes.map((episode) => (
            <li key={episode.title} className="card-surface p-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="label-strip text-ink-faint">{episode.published}</p>
                {episode.duration ? (
                  <p className="label-strip text-ink-faint">{episode.duration}</p>
                ) : null}
              </div>

              <h3 className="mt-2 font-display text-lg uppercase leading-tight tracking-tight text-balance sm:text-xl">
                {episode.link ? (
                  <a
                    href={episode.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={`episode:${episode.title}`}
                    className="hover:text-rec"
                  >
                    {episode.title}
                  </a>
                ) : (
                  episode.title
                )}
              </h3>

              {episode.description ? (
                <p className="measure mt-3 text-[16.5px] leading-relaxed text-ink-soft">
                  {episode.description.length > 260
                    ? `${episode.description.slice(0, 260).trimEnd()}…`
                    : episode.description}
                </p>
              ) : null}

              {episode.audioUrl ? (
                <audio
                  controls
                  preload="none"
                  src={episode.audioUrl}
                  className="mt-4 w-full"
                >
                  Your browser can&apos;t play audio — use one of the platform links below.
                </audio>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-2 border-dashed border-rule p-8">
          <p className="measure text-[16.5px] leading-relaxed text-ink-soft">
            Episodes load straight from the podcast feed, so this list stays current on its
            own. It isn&apos;t reachable from here at the moment — pick a platform below in
            the meantime.
          </p>
        </div>
      )}

      <div className="mt-10">
        <p className="label-strip mb-4 text-ink-faint">Or subscribe wherever you listen</p>
        <ul className="flex flex-wrap gap-3">
          {PODCAST.platforms.map((platform) => (
            <li key={platform.href}>
              <a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                data-track={`podcast:${platform.name}`}
                className="inline-flex border-2 border-ink bg-card px-5 py-2.5 font-display text-xs uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
              >
                {platform.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
