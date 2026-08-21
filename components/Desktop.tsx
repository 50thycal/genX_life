"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PAGES, pageFor } from "@/lib/pages";
import { Clock } from "./Clock";
import { ScreenSaver } from "./ScreenSaver";
import { StartMenu } from "./StartMenu";

/** How long the minimise runs before the next route is pushed. Matches the CSS. */
const MINIMISE_MS = 190;

type WindowState = "open" | "minimised" | "maximised" | "closed";

/**
 * The desktop the whole site sits on: wallpaper, shortcuts, taskbar and the
 * chrome around whichever page is open.
 *
 * The window chrome lives here rather than in each page so that the three
 * title-bar buttons can actually do something. Minimise drops the window into
 * the taskbar, maximise fills the screen, close puts it away entirely and
 * leaves a bare desktop behind, same as the real thing.
 */
export function Desktop({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const current = pageFor(pathname);

  const [minimising, setMinimising] = useState(false);
  const [windowState, setWindowState] = useState<WindowState>("open");
  const [startOpen, setStartOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // A new route always arrives as a freshly opened window.
  useEffect(() => {
    setMinimising(false);
    setWindowState("open");
    setStartOpen(false);
  }, [pathname]);

  const navigate = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Let the browser handle new-tab and new-window clicks itself.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();

      // Re-clicking the open page just restores it if it was put away.
      if (href === pathname) {
        setWindowState("open");
        return;
      }

      if (reduceMotion) {
        router.push(href);
        return;
      }

      setMinimising(true);
      window.setTimeout(() => router.push(href), MINIMISE_MS);
    },
    [pathname, reduceMotion, router],
  );

  const minimise = useCallback(() => {
    if (reduceMotion) {
      setWindowState("minimised");
      return;
    }
    setMinimising(true);
    window.setTimeout(() => {
      setWindowState("minimised");
      setMinimising(false);
    }, MINIMISE_MS);
  }, [reduceMotion]);

  const hidden = windowState === "minimised" || windowState === "closed";
  const maximised = windowState === "maximised";

  return (
    <div className="flex min-h-screen flex-col">
      <ScreenSaver />

      {/* Shortcuts */}
      <nav aria-label="Sections" className="px-3 pt-4 sm:px-6 sm:pt-6">
        <ul className="mx-auto flex w-full max-w-6xl flex-wrap gap-x-2 gap-y-3">
          {PAGES.map((page) => {
            const isCurrent = page.href === pathname && !hidden;
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  onClick={(event) => navigate(event, page.href)}
                  onMouseEnter={() => router.prefetch(page.href)}
                  aria-current={page.href === pathname ? "page" : undefined}
                  className={`flex w-[78px] flex-col items-center gap-1 p-1 text-center transition-colors ${
                    isCurrent ? "bg-white/25" : "hover:bg-white/15"
                  }`}
                >
                  <span aria-hidden="true" className="text-2xl leading-none">
                    {page.glyph}
                  </span>
                  <span className="text-[12px] font-bold leading-tight text-white drop-shadow-[1px_1px_0_rgba(36,28,61,0.9)]">
                    {page.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* The open window */}
      <main id="main" className="flex-1 px-3 py-5 sm:px-6">
        {hidden ? (
          <p className="mx-auto max-w-6xl px-1 py-10 text-[13px] font-bold text-white/45">
            {windowState === "closed"
              ? "Nothing open. Pick something from the desktop or the Start menu."
              : "Minimised to the taskbar."}
          </p>
        ) : (
          <div
            key={pathname}
            className={`mx-auto w-full ${maximised ? "max-w-none" : "max-w-6xl"} ${
              minimising ? "window-minimising" : "window-opening"
            }`}
          >
            <div className="window">
              <div className="title-bar">
                <span className="title-bar-text flex-1 truncate">{current.title}</span>
                <div className="flex shrink-0 gap-0.5">
                  <button
                    type="button"
                    onClick={minimise}
                    aria-label="Minimise window"
                    className="title-bar-button"
                  >
                    <span aria-hidden="true">_</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setWindowState(maximised ? "open" : "maximised")
                    }
                    aria-label={maximised ? "Restore window" : "Maximise window"}
                    className="title-bar-button"
                  >
                    <span aria-hidden="true">{maximised ? "❐" : "□"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWindowState("closed")}
                    aria-label="Close window"
                    className="title-bar-button"
                  >
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>
              </div>

              <div className="px-4 py-6 sm:px-7 sm:py-8">{children}</div>
            </div>
          </div>
        )}
      </main>

      {/* Taskbar */}
      <div className="sticky bottom-0 z-20 px-3 pb-3 sm:px-6">
        <div className="bevel-out relative mx-auto flex w-full max-w-6xl items-center gap-2 p-1">
          <StartMenu
            open={startOpen}
            onClose={() => setStartOpen(false)}
            onNavigate={navigate}
          />

          <button
            type="button"
            onClick={() => setStartOpen((value) => !value)}
            aria-expanded={startOpen}
            aria-haspopup="menu"
            className={`btn-sun !min-w-0 !px-3 !py-1 text-[13px] ${
              startOpen ? "!shadow-[inset_-1px_-1px_#fff8c9,inset_1px_1px_#241c3d,inset_-2px_-2px_#fff0a0,inset_2px_2px_#b39400]" : ""
            }`}
          >
            <span aria-hidden="true">⊞</span> Start
          </button>

          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-rule" />

          {/* One button per open window, which here means at most one. */}
          <span className="min-w-0 flex-1">
            {windowState !== "closed" ? (
              <button
                type="button"
                onClick={() =>
                  setWindowState(windowState === "minimised" ? "open" : "minimised")
                }
                className={`flex w-full items-center gap-2 px-2 py-1 text-left text-[12px] font-bold ${
                  windowState === "minimised" ? "bevel-out" : "bevel-in"
                }`}
              >
                <span aria-hidden="true">{current.glyph}</span>
                <span className="truncate">{current.title}</span>
              </button>
            ) : null}
          </span>

          <Clock />
        </div>
      </div>
    </div>
  );
}
