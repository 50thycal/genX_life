import { CONTACT, SOCIALS } from "@/lib/links";
import { HERO_BANNER, HERO_VIDEO, photoUrl } from "@/lib/media";
import { HeroVideo } from "./HeroVideo";

const SHORTCUTS = [
  { label: "Videos", href: "#videos", glyph: "📺" },
  { label: "Channels", href: "#channels", glyph: "🎬" },
  { label: "Gen X Files", href: "#genxfiles", glyph: "🗂️" },
  { label: "Podcast", href: "#podcast", glyph: "🎧" },
  { label: "Shop", href: "#shop", glyph: "🛍️" },
  { label: "About", href: "#about", glyph: "📼" },
];

/** Fallback wordmark, rebuilt in CSS. Used only when no banner image is set. */
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
              Our Gen X Life
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

              {HERO_BANNER ? (
                <h1>
                  <span className="sr-only">Our Gen X Life</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoUrl(HERO_BANNER)}
                    alt={HERO_BANNER.alt}
                    className="block w-full max-w-2xl"
                  />
                </h1>
              ) : (
                <Wordmark />
              )}

              <p className="measure mt-6 text-[16px] leading-relaxed">
                We are the generation who survived the untamed decades of the 70s, 80s and
                90s, the before times of yesteryear. Raised on hose water and little to no
                supervision, we&apos;ve been adulting since elementary school. We are the
                last individuals who grew up off-line. These are our stories.
              </p>

              <p className="measure mt-4 text-[16px] leading-relaxed">
                Welcome to OUR GEN X LIFE! Come join the party and subscribe to our vlog
                and podcast.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#videos" className="btn-hot">
                  Watch the latest
                </a>
                <a href="#genxfiles" className="btn-sun">
                  Send us your story
                </a>
              </div>

              {/* Socials up front, so nobody has to reach the footer to find them. */}
              <div className="mt-8">
                <p className="label-strip mb-3 text-ink-faint">Follow along</p>
                <ul className="flex flex-wrap gap-2">
                  {SOCIALS.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-track={`social:${social.name}`}
                        className="btn-95 !min-w-0 !px-4 !py-1.5 inline-flex text-[12px]"
                      >
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="label-strip mt-6 text-ink-faint">{CONTACT.email}</p>
            </div>

            {HERO_VIDEO ? (
              <HeroVideo video={HERO_VIDEO} />
            ) : (
              /* Placeholder until the intro MP4 lands in public/video/ */
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
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
