/**
 * Every outbound link in one place. The whole point of the rebuild is that
 * this list stops being scattered across a page — edit here, it changes
 * everywhere.
 *
 * Outbound anchors carry a data-track attribute. Nothing reads it yet; the
 * click analytics that tell Keith and Abby which platform their audience
 * actually uses land in phase 4, and the hooks are already in place for it.
 */

export const CONTACT = {
  email: "ourgenxlife@gmail.com",
  poBox: "PO Box 751, Andover, KS 67002",
} as const;

export type Channel = {
  name: string;
  href: string;
  /** One line, in the visitor's terms: who it's for and what they get. */
  pitch: string;
  /** Shown as a small status strip. Honest beats flattering. */
  cadence: string;
  active: boolean;
};

export const CHANNELS: Channel[] = [
  {
    name: "Our Gen X Life",
    href: "https://www.youtube.com/@OurGenXLife",
    pitch:
      "The main show. Keith and Abby on everything that made the 70s, 80s and 90s worth remembering — the music, the toys, the TV, the stuff your parents threw out.",
    cadence: "New videos regularly",
    active: true,
  },
  {
    name: "Abby's Retro Rescue",
    href: "https://www.youtube.com/channel/UCXybtY7smTIi1fVjRiZa7_Q",
    pitch:
      "Abby brings thrown-away toys back to life. Estate-sale Cabbage Patch Kids, matted hair and marker stains, restored on camera — then rehomed in the shop.",
    cadence: "Restorations, start to finish",
    active: true,
  },
  {
    name: "Your Life On Tape",
    href: "https://www.youtube.com/@YourLifeOnTape",
    pitch:
      "Other people's memories, rescued from forgotten videotapes. Vintage VHS and camcorder reels found at estate sales, digitised and shared — a time capsule of ordinary life.",
    cadence: "Back soon — send us your tapes",
    active: false,
  },
];

export const PODCAST = {
  rss: "https://anchor.fm/s/8d488824/podcast/rss",
  platforms: [
    { name: "Spotify", href: "https://open.spotify.com/show/3bs7tYkYyLO9aD5J8aizEw" },
    {
      name: "Apple Podcasts",
      href: "https://podcasts.apple.com/us/podcast/our-80s-life-podcast/id1616431293",
    },
    { name: "YouTube Music", href: "https://music.youtube.com/channel/UCMJh6uOm80WByahFlweGz0g" },
    { name: "Audible", href: "https://www.audible.com/pd/Our-80s-Life-Podcast-Podcast/B09WMFLB5Y" },
    {
      name: "Podbean",
      href: "https://www.podbean.com/podcast-detail/4xfdm-262f56/Our-80s-Life-Podcast",
    },
  ],
} as const;

export const SHOP = {
  etsy: {
    href: "https://www.etsy.com/shop/AbbysRetroRescue",
    name: "Abby's Retro Rescue on Etsy",
  },
  spreadshop: {
    href: "https://ourgenxlife.myspreadshop.com/",
    name: "Our Gen X Life Shop",
  },
} as const;

export const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/ourgenxlife/" },
  { name: "Facebook", href: "https://www.facebook.com/OurGenXLife/" },
  { name: "Pinterest", href: "https://www.pinterest.com/abbyrkeith/" },
  { name: "YouTube", href: "https://www.youtube.com/@OurGenXLife" },
] as const;
