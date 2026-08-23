import type { MetadataRoute } from "next";
import { SITE } from "./sitemap";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing behind it worth crawling, and it only answers POST.
      disallow: "/api/",
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
