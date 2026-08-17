import { CONTACT } from "@/lib/links";

const SHORTCUTS = [
  { label: "Videos", href: "#videos", glyph: "📺" },
  { label: "Channels", href: "#channels", glyph: "🎬" },
  { label: "Gen X Files", href: "#genxfiles", glyph: "🗂️" },
  { label: "Podcast", href: "#podcast", glyph: "🎧" },
  { label: "Shop", href: "#shop", glyph: "🛍️" },
  { label: "Photos", href: "#photos", glyph: "📷" },
  { label: "Tapes", href: "#tapes", glyph: "📼" },
];

/** Rebuilt from their logo: OUR and LIFE plain, GEN on colour blocks, big X. */
function Wordmark() {
  const blocks = [
    { letter: "G", bg: "bg-rec" },
    { letter: "E", bg: "bg-purple" },
    { letter: "N", bg: "bg-cyan" },
  ];

  return (
    <h1 className="font-display leading-[0.9] tracking-tight">
      <span className="sr-only">Our Gen X Life</span>
      <span aria-hidden="true" className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
        <span className="text-[9vw] text-ink sm:text-4xl lg:text-5xl">OUR</span>
        <span className="flex gap-1.5">
          {blocks.map((block) => (
            <span
              key={block.letter}
              className={`ransom ${block.bg} text-[10vw] text-white sm:text-5xl lg:text-6xl`}
            >
              {block.letter}
            </span>
          ))}
        </span>
        <span className="text-[14vw] text-rec sm:text-[4.5rem] lg:text-[5.5rem]">X</span>
        <span className="text-[9vw] text-ink sm:text-4xl lg:text-5xl">LIFE</span>
      </span>
    </h1>
  );
}

export function Hero() {
  return (
    <header className="px-3 pb-6 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto w-full max-w-6xl">
        {/* Desktop shortcuts */}
        <nav aria-label="Sections" className="mb-5">
          <ul className="flex flex-wrap gap-x-2 gap-y-3">
            {SHORTCUTS.map((shortcut) => (
              <li key={shortcut.href}>
                <a
                  href={shortcut.href}
                  className="flex w-[78px] flex-col items-center gap-1 p-1 text-center hover:bg-white/15"
                >
                  <span aria-hidden="true" className="text-2xl leading-none">
                    {shortcut.glyph}
                  </span>
                  <span className="text-[12px] font-bold leading-tight text-white drop-shadow-[1px_1px_0_rgba(36,28,61,0.9)]">
                    {shortcut.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="window">
          <div className="title-bar">
            <span className="title-bar-text flex-1 truncate">
              Our Gen X Life — Welcome
            </span>
            <div className="flex shrink-0 gap-0.5" aria-hidden="true">
              <span className="title-bar-button">_</span>
              <span className="title-bar-button">□</span>
              <span className="title-bar-button">✕</span>
            </div>
          </div>

          <div className="grid gap-6 px-4 py-7 sm:px-8 sm:py-9 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <p className="label-strip mb-4 text-rec-deep">
                1970s <span className="text-purple">★</span> 1980s{" "}
                <span className="text-purple">★</span> 1990s
              </p>

              <Wordmark />

              <p className="measure mt-6 text-[16px] leading-relaxed">
                Keith and Abby spend their weekends at estate sales rescuing the things
                everyone else threw out — the toys, the tapes, the whole decade. Then they
                bring it back here, so you can remember it with them.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#videos" className="btn-hot">
                  Watch the latest
                </a>
                <a href="#genxfiles" className="btn-sun">
                  Send us your story
                </a>
              </div>

              <p className="label-strip mt-6 text-ink-faint">{CONTACT.email}</p>
            </div>

            <div className="bevel-in p-1">
              <div className="terminal p-3">
                <p>C:\&gt; DIR *.MEMORIES</p>
                <p className="mt-2">CHANNELS &nbsp;&nbsp;&lt;DIR&gt; &nbsp;&nbsp;3</p>
                <p>GENXFILE &nbsp;&nbsp;TXT &nbsp;&nbsp;&nbsp;&nbsp;∞</p>
                <p>PODCAST &nbsp;&nbsp;&nbsp;MP3 &nbsp;&nbsp;&nbsp;98</p>
                <p>TAPES &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VHS &nbsp;&nbsp;????</p>
                <p className="mt-2">&nbsp;&nbsp;&nbsp;&nbsp;4 FILE(S) FOUND</p>
                <p className="mt-2">
                  C:\&gt; <span className="animate-pulse">█</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-1 px-1 pb-1">
            <p className="status-field flex-1">Ready</p>
            <p className="status-field w-40 shrink-0">Andover, Kansas</p>
          </div>
        </div>
      </div>
    </header>
  );
}
