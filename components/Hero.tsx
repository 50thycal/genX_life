import { CONTACT } from "@/lib/links";

/**
 * The page opens on the most characteristic object in this brand's world:
 * a home-recorded tape with a handwritten label. Everything else on the page
 * stays quiet so this can carry the personality.
 */
export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12">
        <nav className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mb-14">
          <span className="label-strip text-ink-faint">Andover, Kansas</span>
          <div className="hidden flex-1 border-t border-rule sm:block" />
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              ["Channels", "#channels"],
              ["Gen X Files", "#genxfiles"],
              ["Podcast", "#podcast"],
              ["Shop", "#shop"],
              ["Tapes", "#tapes"],
            ].map(([text, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="label-strip text-ink transition-colors hover:text-rec"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* The tape */}
        <div className="shadow-lift">
          {/* Shell: the dark plastic top edge, with the record light and reel windows */}
          <div className="flex items-center gap-4 border-2 border-ink bg-shell px-4 py-3 sm:px-6">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rec opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rec" />
            </span>
            <span className="label-strip text-paper/90">Rec</span>
            <div className="ml-auto flex items-center gap-2" aria-hidden="true">
              <span className="h-4 w-4 rounded-full border-2 border-paper/25" />
              <span className="h-4 w-4 rounded-full border-2 border-paper/25" />
            </div>
          </div>

          {/* Label */}
          <div className="border-x-2 border-b-2 border-ink bg-card px-5 py-8 sm:px-10 sm:py-12">
            <p className="label-strip mb-5 text-ink-faint">
              1970s <span className="mx-2 text-rec">/</span> 1980s{" "}
              <span className="mx-2 text-rec">/</span> 1990s
            </p>

            <h1 className="font-display text-[13vw] uppercase leading-[0.86] tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl">
              Our Gen X Life
            </h1>

            <p className="measure mt-7 text-lg leading-relaxed text-ink-soft sm:text-xl">
              Keith and Abby spend their weekends at estate sales rescuing the things
              everyone else threw out — the toys, the tapes, the whole decade. Then they
              bring it back here, so you can remember it with them.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#channels"
                className="inline-flex items-center justify-center border-2 border-ink bg-rec px-6 py-3 font-display text-sm uppercase tracking-wide text-card transition-transform hover:-translate-y-0.5"
              >
                Watch the channels
              </a>
              <a
                href="#genxfiles"
                className="inline-flex items-center justify-center border-2 border-ink bg-card px-6 py-3 font-display text-sm uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
              >
                Send us your story
              </a>
            </div>

            <p className="label-strip mt-8 text-ink-faint">
              {CONTACT.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
