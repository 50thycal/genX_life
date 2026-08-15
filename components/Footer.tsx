import { CONTACT, PODCAST, SOCIALS } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-shell text-paper">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-2xl uppercase tracking-tight">Our Gen X Life</p>
            <p className="label-strip mt-3 text-paper/60">
              1970s <span className="mx-1.5 text-rec">/</span> 1980s{" "}
              <span className="mx-1.5 text-rec">/</span> 1990s
            </p>
          </div>

          <nav aria-label="Social links">
            <p className="label-strip mb-4 text-paper/50">Find them</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={`social:${social.name}`}
                    className="font-body text-[16.5px] text-paper/85 underline-offset-4 hover:text-kodak hover:underline"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label text-[12px] leading-relaxed text-paper/55">
            {CONTACT.email} · {CONTACT.poBox}
          </p>

          <div className="flex items-center gap-5">
            <a
              href={PODCAST.rss}
              target="_blank"
              rel="noopener noreferrer"
              data-track="podcast:rss"
              title="Podcast RSS feed — for podcast apps"
              className="label-strip text-paper/45 hover:text-kodak"
            >
              RSS
            </a>
            <p className="label-strip text-paper/45">
              © {new Date().getFullYear()} Our Gen X Life
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
