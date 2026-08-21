"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PAGES, pageFor } from "@/lib/pages";

/** How long the minimise runs before the next route is pushed. Matches the CSS. */
const MINIMISE_MS = 190;

/**
 * The desktop the whole site sits on: wallpaper, shortcuts and taskbar.
 *
 * Clicking a shortcut doesn't navigate straight away. The open window first
 * shrinks toward the taskbar, the route changes, and the next window grows
 * back out of it, which is how Windows 95 moved between windows.
 *
 * The shortcuts are real links, so middle-click, cmd-click and a broken
 * JavaScript bundle all still work. The animation is only an enhancement, and
 * anyone who has asked for reduced motion skips it entirely.
 */
export function Desktop({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const current = pageFor(pathname);

  const [minimising, setMinimising] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // The new route has landed, so stop minimising and let it open.
  useEffect(() => setMinimising(false), [pathname]);

  const navigate = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Let the browser handle new-tab and new-window clicks itself.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (href === pathname) return;

      if (reduceMotion) {
        router.push(href);
        return;
      }

      setMinimising(true);
      window.setTimeout(() => router.push(href), MINIMISE_MS);
    },
    [pathname, reduceMotion, router],
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Shortcuts */}
      <nav aria-label="Sections" className="px-3 pt-4 sm:px-6 sm:pt-6">
        <ul className="mx-auto flex w-full max-w-6xl flex-wrap gap-x-2 gap-y-3">
          {PAGES.map((page) => {
            const isCurrent = page.href === pathname;
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  onClick={(event) => navigate(event, page.href)}
                  onMouseEnter={() => router.prefetch(page.href)}
                  aria-current={isCurrent ? "page" : undefined}
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
        <div
          key={pathname}
          className={`mx-auto w-full max-w-6xl ${
            minimising ? "window-minimising" : "window-opening"
          }`}
        >
          {children}
        </div>
      </main>

      {/* Taskbar */}
      <div className="sticky bottom-0 z-20 px-3 pb-3 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-2 bevel-out p-1">
          <span className="btn-sun !min-w-0 !px-3 !py-1 text-[13px]">
            <span aria-hidden="true">⊞</span> Start
          </span>

          <span aria-hidden="true" className="h-6 w-px shrink-0 bg-rule" />

          {/* The open window, the way the taskbar shows one button per window. */}
          <span className="min-w-0 flex-1">
            <span className="bevel-in flex items-center gap-2 px-2 py-1 text-[12px] font-bold">
              <span aria-hidden="true">{current.glyph}</span>
              <span className="truncate">{current.title}</span>
            </span>
          </span>

          <span className="status-field hidden shrink-0 sm:block">1970s to 1990s</span>
        </div>
      </div>
    </div>
  );
}
