import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/pages";

export const SITE = "https://www.ourgenxlife.com";

/**
 * Built from the same page list as the desktop shortcuts, so a new route can't
 * be added and then quietly left out of the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: page.href === "/" ? SITE : `${SITE}${page.href}`,
    lastModified: new Date(),
    changeFrequency: page.href === "/videos" ? "daily" : "weekly",
    priority: page.href === "/" ? 1 : 0.8,
  }));
}
