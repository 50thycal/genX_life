import { CONTACT } from "@/lib/links";

const CONTENTS = [
  ["01", "The channels", "#channels"],
  ["02", "The Gen X Files", "#genxfiles"],
  ["03", "The podcast", "#podcast"],
  ["04", "The shop", "#shop"],
  ["05", "Your tapes", "#tapes"],
];

export function Hero() {
  return (
    <header>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Folio line */}
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 py-3 label-strip text-ink-faint">
          <span>Andover, Kansas</span>
          <span aria-hidden="true">·</span>
          <span>The 70s, 80s &amp; 90s</span>
          <span className="ml-auto">{CONTACT.email}</span>
        </div>

        {/* Nameplate */}
        <div className="border-y-2 border-ink py-6 sm:py-8">
          <h1 className="font-display text-[13vw] font-black leading-[0.84] tracking-[-0.03em] text-balance sm:text-7xl lg:text-[6.5rem]">
            Our Gen X Life
          </h1>
        </div>

        {/* Contents bar */}
        <nav aria-label="Contents" className="border-b border-rule">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 py-3">
            {CONTENTS.map(([num, text, href]) => (
              <li key={href}>
                <a href={href} className="group flex items-baseline gap-2">
                  <span className="label-strip text-rec">{num}</span>
                  <span className="label-strip text-ink group-hover:text-rec">{text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Opening spread */}
        <div className="grid gap-x-12 gap-y-8 py-12 sm:py-16 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="label-strip mb-4 text-rec">The premise</p>

            <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-balance sm:text-5xl">
              Everything your parents threw out,{" "}
              <span className="marker">rescued on camera</span>.
            </h2>

            <p className="drop-cap measure mt-7 text-[19px] leading-[1.7] text-ink-soft">
              Keith and Abby spend their weekends at estate sales, in the back rooms of
              church basements and at the far end of somebody&apos;s driveway at seven in the
              morning. They come home with dolls nobody wanted, videotapes nobody can play,
              and the specific plastic smell of a decade that is not coming back. Then they
              bring all of it here, so you can remember it with them.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#channels" className="btn-ed-solid">
                Watch the channels
              </a>
              <a href="#genxfiles" className="btn-ed-ghost">
                Send us your story
              </a>
            </div>
          </div>

          {/* Standfirst column — the pitch, set like a sidebar */}
          <aside className="border-t-2 border-ink pt-5 lg:border-l lg:border-t-0 lg:border-rule-firm lg:pl-8 lg:pt-0">
            <p className="label-strip mb-4 text-ink-faint">In this issue</p>
            <p className="font-display text-2xl font-bold leading-snug text-balance">
              &ldquo;Everyone thinks the decade they grew up in was the best one. We just
              happen to be right.&rdquo;
            </p>
            <p className="label-strip mt-5 text-ink-faint">Keith &amp; Abby</p>

            <dl className="mt-8 space-y-3 border-t border-rule pt-5">
              {[
                ["Channels", "Three"],
                ["Podcast", "Since 2022"],
                ["Stories filed", "Always open"],
              ].map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-4">
                  <dt className="label-strip text-ink-faint">{term}</dt>
                  <dd className="font-display text-lg font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </header>
  );
}
