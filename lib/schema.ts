import { CHANNELS, CONTACT, PODCAST, SHOP, SOCIALS } from "./links";

export const SITE = "https://www.ourgenxlife.com";

/**
 * sameAs is the important part: it's how a search engine learns that this
 * site, the three YouTube channels, the Etsy shop and every social account
 * are one brand rather than unrelated pages that happen to share a name.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Our Gen X Life",
  url: SITE,
  logo: `${SITE}/photos/genx-logo.png`,
  image: `${SITE}/og-image.jpg`,
  email: CONTACT.email,
  description:
    "Keith and Abby rescue the toys, tapes and television of the 70s, 80s and 90s across three YouTube channels, a podcast and a shop of restored vintage.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Andover",
    addressRegion: "KS",
    addressCountry: "US",
  },
  founder: [
    { "@type": "Person", name: "Keith" },
    { "@type": "Person", name: "Abby" },
  ],
  sameAs: [
    ...SOCIALS.map((social) => social.href),
    ...CHANNELS.map((channel) => channel.href),
    SHOP.etsy.href,
    SHOP.spreadshop.href,
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Our Gen X Life",
  url: SITE,
  publisher: { "@type": "Organization", name: "Our Gen X Life" },
};

export function podcastSchema(title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: title,
    description,
    url: `${SITE}/podcast`,
    webFeed: PODCAST.rss,
    image: `${SITE}/photos/podcast-cover.jpg`,
    author: { "@type": "Organization", name: "Our Gen X Life" },
  };
}
