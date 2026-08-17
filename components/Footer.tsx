import { CONTACT, PODCAST, SOCIALS } from "@/lib/links";

export function Footer() {
  return (
    <footer className="px-3 pb-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl window">
        <div className="title-bar">
          <span className="title-bar-text flex-1 truncate">Our Gen X Life — Contact</span>
          <div className="flex shrink-0 gap-0.5" aria-hidden="true">
            <span className="title-bar-button">_</span>
            <span className="title-bar-button">□</span>
            <span className="title-bar-button">✕</span>
          </div>
        </div>

        <div className="grid gap-6 px-4 py-6 sm:grid-cols-2 sm:px-7">
          <div>
            <p className="label-strip mb-3">Find them</p>
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
            </ul>
          </div>

          <div>
            <p className="label-strip mb-3">Write to them</p>
            <p className="text-[15px] leading-relaxed">
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-tape underline underline-offset-2"
              >
                {CONTACT.email}
              </a>
              <br />
              {CONTACT.poBox}
            </p>
            <p className="mt-3 text-[13px]">
              <a
                href={PODCAST.rss}
                target="_blank"
                rel="noopener noreferrer"
                data-track="podcast:rss"
                title="Podcast RSS feed — for podcast apps"
                className="text-tape underline underline-offset-2"
              >
                RSS feed
              </a>
            </p>
          </div>
        </div>

        {/* Taskbar */}
        <div className="mt-1 flex items-center gap-2 bevel-out p-1">
          <span className="btn-sun !min-w-0 !px-3 !py-1 text-[13px]">
            <span aria-hidden="true">⊞</span> Start
          </span>
          <span aria-hidden="true" className="h-6 w-px bg-rule" />
          <span className="hidden flex-1 text-[12px] font-bold sm:block">
            © {new Date().getFullYear()} Our Gen X Life
          </span>
          <span className="status-field ml-auto shrink-0">
            1970s–1990s
          </span>
        </div>
      </div>
    </footer>
  );
}
