/**
 * Every window on the desktop, in the order the shortcuts appear.
 *
 * One list drives the desktop icons, the taskbar button and the page titles,
 * so a route can't end up with a shortcut pointing nowhere.
 */
export type DesktopPage = {
  href: string;
  /** Shortcut caption under the icon. */
  label: string;
  /** Text in the window's title bar. */
  title: string;
  glyph: string;
};

export const PAGES: DesktopPage[] = [
  { href: "/", label: "Welcome", title: "Our Gen X Life", glyph: "🖥️" },
  { href: "/videos", label: "Videos", title: "Latest from the channels", glyph: "📺" },
  { href: "/channels", label: "Channels", title: "Three channels", glyph: "🎬" },
  { href: "/gen-x-files", label: "Gen X Files", title: "The Gen X Files", glyph: "🗂️" },
  { href: "/podcast", label: "Podcast", title: "The podcast", glyph: "🎧" },
  { href: "/shop", label: "Shop", title: "The shop", glyph: "🛍️" },
  { href: "/about", label: "About", title: "About Keith and Abby", glyph: "📼" },
];

export function pageFor(pathname: string): DesktopPage {
  return PAGES.find((page) => page.href === pathname) ?? PAGES[0];
}
