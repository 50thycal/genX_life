import type { Metadata } from "next";

export const SITE = "https://www.ourgenxlife.com";
export const OG_IMAGE = "/og-image.jpg";

/**
 * Builds a page's metadata.
 *
 * This exists because Next replaces the parent `openGraph` object wholesale
 * rather than merging it: a page that sets its own title and description also
 * drops the layout's preview image, and every shared link silently loses its
 * card. Going through here means the image can't be forgotten.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path, with a leading slash. "/" for the home page. */
  path: string;
}): Metadata {
  const url = path === "/" ? SITE : `${SITE}${path}`;
  const images = [
    {
      url: OG_IMAGE,
      width: 1200,
      height: 630,
      alt: "Keith and Abby beside the Our Gen X Life logo",
    },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Our Gen X Life",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
