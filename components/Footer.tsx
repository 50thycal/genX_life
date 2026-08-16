import { CONTACT, PODCAST, SOCIALS } from "@/lib/links";

export function Footer() {
  return (
    <footer className="px-4 pb-6 sm:px-6">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border-[3px] border-ink bg-shell">
        <div className="h-3 w-full bg-holo" />

        <div className="px-6 py-12 sm:px-10">
          <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
            <div>
              <p className="font-display text-2xl uppercase tracking-tight text-white">
                Our Gen X Life
              </p>
              <p className="label-strip mt-3 text-cyan">
                1970s <span className="text-rec">★</span> 1980s{" "}
                <span className="text-rec">★</span> 1990s
              </p>
            </div>

            <nav aria-label="Social links">
              <p className="label-strip mb-4 text-kodak">Find them</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIALS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track={`social:${social.name}`}
                      className="text-[16.5px] font-semibold text-white/90 underline-offset-4 hover:text-rec hover:underline"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t-2 border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] leading-relaxed text-white/60">
              {CONTACT.email} · {CONTACT.poBox}
            </p>

            <div className="flex items-center gap-5">
              <a
                href={PODCAST.rss}
                target="_blank"
                rel="noopener noreferrer"
                data-track="podcast:rss"
                title="Podcast RSS feed — for podcast apps"
                className="label-strip text-white/50 hover:text-kodak"
              >
                RSS
              </a>
              <p className="label-strip text-white/50">
                © {new Date().getFullYear()} Our Gen X Life
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
