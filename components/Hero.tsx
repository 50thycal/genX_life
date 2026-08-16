import { CONTACT } from "@/lib/links";

/**
 * The wordmark is rebuilt from their logo rather than approximated: OUR and
 * LIFE plain, GEN as letters on colour blocks, and the oversized yellow X.
 */
function Wordmark() {
  const blocks = [
    { letter: "G", bg: "bg-rec" },
    { letter: "E", bg: "bg-[#9B5DE5]" },
    { letter: "N", bg: "bg-cyan" },
  ];

  return (
    <h1 className="font-display leading-[0.9] tracking-tight">
      <span className="sr-only">Our Gen X Life</span>

      <span aria-hidden="true" className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-[10vw] text-white sm:text-5xl lg:text-6xl">OUR</span>

        <span className="flex gap-1.5">
          {blocks.map((block) => (
            <span
              key={block.letter}
              className={`ransom ${block.bg} text-[11vw] text-white sm:text-6xl lg:text-7xl`}
            >
              {block.letter}
            </span>
          ))}
        </span>

        <span className="text-[16vw] text-kodak sm:text-[5.5rem] lg:text-[7rem]">X</span>

        <span className="text-[10vw] text-white sm:text-5xl lg:text-6xl">LIFE</span>
      </span>
    </h1>
  );
}

export function Hero() {
  return (
    <header className="px-4 pt-5 sm:px-6 sm:pt-7">
      <div className="mx-auto w-full max-w-6xl">
        <nav className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="label-strip text-ink-faint">Andover, Kansas</span>
          <ul className="ml-auto flex flex-wrap gap-x-4 gap-y-2">
            {[
              ["Channels", "#channels"],
              ["Gen X Files", "#genxfiles"],
              ["Podcast", "#podcast"],
              ["Shop", "#shop"],
              ["Tapes", "#tapes"],
            ].map(([text, href]) => (
              <li key={href}>
                <a href={href} className="label-strip text-ink hover:text-rec">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="confetti overflow-hidden rounded-2xl border-[3px] border-ink bg-shell shadow-lift">
          {/* Holographic strip, straight off the podcast cover */}
          <div className="h-3 w-full bg-holo" />

          <div className="px-5 py-10 sm:px-10 sm:py-14">
            <p className="label-strip mb-5 text-cyan">
              1970s <span className="text-rec">★</span> 1980s{" "}
              <span className="text-rec">★</span> 1990s
            </p>

            <Wordmark />

            <p className="measure mt-8 text-lg leading-relaxed text-white/90 sm:text-xl">
              Keith and Abby spend their weekends at estate sales rescuing the things
              everyone else threw out — the toys, the tapes, the whole decade. Then they
              bring it back here, so you can remember it with them.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#channels" className="btn-pop bg-rec text-white">
                Watch the channels
              </a>
              <a href="#genxfiles" className="btn-pop bg-kodak text-ink">
                Send us your story
              </a>
            </div>

            <p className="label-strip mt-8 text-white/55">{CONTACT.email}</p>
          </div>

          <div className="h-3 w-full bg-holo" />
        </div>
      </div>
    </header>
  );
}
