/**
 * The seed watchlist — the vocabulary the bot measures every week.
 *
 * This is the one file that most decides whether the reports are any good, and
 * it is meant to be argued with. It was seeded from what Keith and Abby already
 * make (restoration hauls, estate-sale rescues, the music-toys-TV territory of
 * the main channel, the VHS material behind Your Life On Tape) plus the era
 * vocabulary any Gen X audience answers to. It is a starting point, not a
 * finished list.
 *
 * Two ways it grows:
 *   - `npm run bot:mine` reads every video title on all three channels and
 *     proposes terms from their own back catalogue.
 *   - the weekly run proposes terms Reddit is talking about that aren't here yet.
 *
 * Both propose; neither adds. A human says yes.
 *
 * On `kind: "barometer"` — broad terms like "Gen X" or "80s nostalgia" are
 * deliberately included but never ranked as video ideas. They are too big to
 * move meaningfully and too vague to film. They answer a different question:
 * is interest in this whole territory up or down this month. Treat them as the
 * thermometer, not the forecast.
 */

import type { Term } from "./types";

export const WATCHLIST: Term[] = [
  // ── Barometers ────────────────────────────────────────────────────────────
  // Category temperature only. Excluded from FILM THIS by design.
  { term: "Generation X", kind: "barometer", era: "cross", category: "era", wikipedia: "Generation_X" },
  { term: "80s nostalgia", kind: "barometer", era: "80s", category: "era" },
  { term: "90s nostalgia", kind: "barometer", era: "90s", category: "era" },
  { term: "70s nostalgia", kind: "barometer", era: "70s", category: "era" },
  { term: "retro toys", kind: "barometer", era: "cross", category: "era" },
  { term: "vintage thrift haul", kind: "barometer", era: "cross", category: "era" },
  { term: "estate sale finds", kind: "barometer", era: "cross", category: "era" },
  { term: "latchkey kid", kind: "phrase", era: "80s", category: "era", merch: true },

  // ── Toys ──────────────────────────────────────────────────────────────────
  // The core of Abby's Retro Rescue. Every one of these turns up at estate sales
  // and every one has a restoration video in it.
  { term: "Cabbage Patch Kids", kind: "object", era: "80s", category: "toys", object: true, merch: true },
  { term: "Teddy Ruxpin", kind: "object", era: "80s", category: "toys", object: true },
  { term: "Furby", kind: "object", era: "90s", category: "toys", object: true },
  { term: "Monchhichi", kind: "object", era: "80s", category: "toys", object: true },
  { term: "My Little Pony G1", kind: "object", era: "80s", category: "toys", object: true, wikipedia: "My_Little_Pony" },
  { term: "Popples", kind: "object", era: "80s", category: "toys", object: true },
  { term: "Pound Puppies", kind: "object", era: "80s", category: "toys", object: true },
  { term: "Care Bears", kind: "object", era: "80s", category: "toys", object: true, merch: true },
  { term: "Rainbow Brite", kind: "object", era: "80s", category: "toys", object: true },
  { term: "Strawberry Shortcake doll", kind: "object", era: "80s", category: "toys", object: true, wikipedia: "Strawberry_Shortcake" },
  { term: "Glo Worm", kind: "object", era: "80s", category: "toys", object: true },
  { term: "My Buddy", kind: "object", era: "80s", category: "toys", object: true },
  { term: "Speak & Spell", kind: "object", era: "70s", category: "toys", object: true, wikipedia: "Speak_&_Spell_(toy)" },
  { term: "Lite-Brite", kind: "object", era: "70s", category: "toys", object: true },
  { term: "Micro Machines", kind: "object", era: "80s", category: "toys", object: true },
  { term: "Skip-It", kind: "object", era: "90s", category: "toys", object: true },
  { term: "Sit'n Spin", kind: "object", era: "70s", category: "toys", object: true },
  { term: "Big Wheel trike", kind: "object", era: "70s", category: "toys", object: true, wikipedia: "Big_Wheel_(tricycle)" },
  { term: "View-Master", kind: "object", era: "70s", category: "toys", object: true },
  { term: "Etch A Sketch", kind: "object", era: "70s", category: "toys", object: true },
  { term: "Simon electronic game", kind: "object", era: "70s", category: "toys", object: true, wikipedia: "Simon_(game)" },
  { term: "Slip'N Slide", kind: "object", era: "80s", category: "toys", object: true },
  { term: "Garbage Pail Kids", kind: "object", era: "80s", category: "toys", object: true, merch: true },
  { term: "Masters of the Universe figures", kind: "object", era: "80s", category: "toys", object: true, wikipedia: "Masters_of_the_Universe" },
  { term: "Transformers G1", kind: "object", era: "80s", category: "toys", object: true, wikipedia: "Transformers_(toy_line)" },
  { term: "Polly Pocket", kind: "object", era: "90s", category: "toys", object: true },
  { term: "Troll dolls", kind: "object", era: "90s", category: "toys", object: true },
  { term: "Beanie Babies", kind: "object", era: "90s", category: "toys", object: true },

  // ── School ────────────────────────────────────────────────────────────────
  // High shirt-potential: everyone in the audience had exactly these.
  { term: "Trapper Keeper", kind: "object", era: "80s", category: "school", object: true, merch: true },
  { term: "Lisa Frank", kind: "object", era: "90s", category: "school", object: true, merch: true },
  { term: "Scholastic Book Fair", kind: "phrase", era: "80s", category: "school", merch: true },
  { term: "The Oregon Trail game", kind: "media", era: "80s", category: "school", merch: true, wikipedia: "The_Oregon_Trail_(1985_video_game)" },
  { term: "mimeograph", kind: "phrase", era: "70s", category: "school", merch: true },
  { term: "Presidential Physical Fitness Test", kind: "phrase", era: "80s", category: "school", merch: true },
  { term: "overhead projector", kind: "object", era: "80s", category: "school", object: true },
  { term: "Weekly Reader", kind: "object", era: "70s", category: "school", object: true },

  // ── Kitchen and home ──────────────────────────────────────────────────────
  // The reliable money category at estate sales — collectors chase patterns by name.
  { term: "Pyrex Butterprint", kind: "object", era: "70s", category: "kitchen", object: true, wikipedia: "Pyrex" },
  { term: "Pyrex Gooseberry", kind: "object", era: "70s", category: "kitchen", object: true, wikipedia: "Pyrex" },
  { term: "Pyrex Friendship", kind: "object", era: "70s", category: "kitchen", object: true, wikipedia: "Pyrex" },
  { term: "CorningWare Cornflower", kind: "object", era: "70s", category: "kitchen", object: true, wikipedia: "CorningWare" },
  { term: "Fire-King jadeite", kind: "object", era: "70s", category: "kitchen", object: true, wikipedia: "Fire-King" },
  { term: "Tupperware Servalier", kind: "object", era: "70s", category: "kitchen", object: true, wikipedia: "Tupperware" },
  { term: "avocado green appliances", kind: "object", era: "70s", category: "kitchen", object: true },
  { term: "harvest gold kitchen", kind: "object", era: "70s", category: "kitchen", object: true },
  { term: "shag carpet", kind: "object", era: "70s", category: "home", object: true },
  { term: "wood panelling basement", kind: "phrase", era: "70s", category: "home", merch: true },
  { term: "conversation pit", kind: "object", era: "70s", category: "home", object: true },
  { term: "macrame plant hanger", kind: "object", era: "70s", category: "home", object: true },

  // ── Tech and formats ──────────────────────────────────────────────────────
  // Doubles as the Your Life On Tape territory if that channel comes back.
  { term: "Sony Walkman", kind: "object", era: "80s", category: "tech", object: true, merch: true, wikipedia: "Walkman" },
  { term: "VHS camcorder", kind: "object", era: "80s", category: "tech", object: true, wikipedia: "Camcorder" },
  { term: "Betamax", kind: "object", era: "80s", category: "tech", object: true },
  { term: "VHS rewinder", kind: "object", era: "90s", category: "tech", object: true, wikipedia: "Videotape_rewinder" },
  { term: "Commodore 64", kind: "object", era: "80s", category: "tech", object: true, merch: true },
  { term: "rotary phone", kind: "object", era: "70s", category: "tech", object: true },
  { term: "answering machine cassette", kind: "object", era: "80s", category: "tech", object: true },
  { term: "boombox", kind: "object", era: "80s", category: "tech", object: true, merch: true },
  { term: "mixtape", kind: "phrase", era: "80s", category: "tech", merch: true },
  { term: "Polaroid SX-70", kind: "object", era: "70s", category: "tech", object: true },
  { term: "8-track tape", kind: "object", era: "70s", category: "tech", object: true, wikipedia: "8-track_tape" },
  { term: "Zenith console television", kind: "object", era: "70s", category: "tech", object: true, wikipedia: "Zenith_Electronics" },
  { term: "dial-up modem sound", kind: "phrase", era: "90s", category: "tech", merch: true },
  { term: "Nintendo Entertainment System", kind: "object", era: "80s", category: "tech", object: true, merch: true },
  { term: "Atari 2600", kind: "object", era: "70s", category: "tech", object: true, merch: true },
  { term: "Game Boy", kind: "object", era: "90s", category: "tech", object: true, merch: true },

  // ── Snacks and drinks ─────────────────────────────────────────────────────
  // Consistently the highest-engagement nostalgia category and the easiest merch.
  { term: "Ecto Cooler", kind: "object", era: "80s", category: "snacks", object: true, merch: true },
  { term: "Squeezit", kind: "object", era: "90s", category: "snacks", object: true, merch: true },
  { term: "Dunkaroos", kind: "object", era: "90s", category: "snacks", object: true, merch: true },
  { term: "Crystal Pepsi", kind: "object", era: "90s", category: "snacks", object: true, merch: true },
  { term: "Zima", kind: "object", era: "90s", category: "snacks", object: true, merch: true },
  { term: "Tab cola", kind: "object", era: "80s", category: "snacks", object: true, merch: true, wikipedia: "Tab_(drink)" },
  { term: "Hi-C Double Fruit Cooler", kind: "object", era: "80s", category: "snacks", object: true, wikipedia: "Hi-C" },
  { term: "Fruit Stripe gum", kind: "object", era: "80s", category: "snacks", object: true, merch: true },
  { term: "Pop Rocks", kind: "object", era: "70s", category: "snacks", object: true, merch: true },
  { term: "TV dinner tray", kind: "object", era: "70s", category: "snacks", object: true, wikipedia: "TV_dinner" },

  // ── Television and film ───────────────────────────────────────────────────
  { term: "Saturday morning cartoons", kind: "phrase", era: "80s", category: "tv", merch: true },
  { term: "TGIF ABC", kind: "phrase", era: "90s", category: "tv", wikipedia: "TGIF_(TV_programming_block)" },
  { term: "Schoolhouse Rock", kind: "media", era: "70s", category: "tv", merch: true },
  { term: "The Electric Company", kind: "media", era: "70s", category: "tv", wikipedia: "The_Electric_Company" },
  { term: "Fraggle Rock", kind: "media", era: "80s", category: "tv", merch: true },
  { term: "Jem and the Holograms", kind: "media", era: "80s", category: "tv", merch: true },
  { term: "Salute Your Shorts", kind: "media", era: "90s", category: "tv" },
  { term: "Are You Afraid of the Dark", kind: "media", era: "90s", category: "tv", merch: true },
  { term: "Blockbuster Video", kind: "phrase", era: "90s", category: "tv", merch: true, wikipedia: "Blockbuster_(retailer)" },
  { term: "Columbia House", kind: "phrase", era: "90s", category: "tv", merch: true },
  { term: "drive-in theater", kind: "phrase", era: "70s", category: "tv", merch: true, wikipedia: "Drive-in_theater" },

  // ── Music ─────────────────────────────────────────────────────────────────
  // Keith and Abby already cover live music on the main channel — this is the
  // half of the watchlist most likely to line up with a video they were going
  // to make anyway.
  { term: "MTV VJs", kind: "phrase", era: "80s", category: "music", wikipedia: "MTV" },
  { term: "Def Leppard", kind: "media", era: "80s", category: "music", merch: true },
  { term: "hair metal", kind: "phrase", era: "80s", category: "music", merch: true, wikipedia: "Glam_metal" },
  { term: "Casey Kasem American Top 40", kind: "media", era: "80s", category: "music", wikipedia: "American_Top_40" },
  { term: "vinyl record collecting", kind: "object", era: "cross", category: "music", object: true },
  { term: "cassette single", kind: "object", era: "90s", category: "music", object: true, wikipedia: "Cassette_single" },

  // ── Fashion ───────────────────────────────────────────────────────────────
  { term: "Jordache jeans", kind: "object", era: "80s", category: "fashion", object: true, merch: true, wikipedia: "Jordache" },
  { term: "Members Only jacket", kind: "object", era: "80s", category: "fashion", object: true, merch: true, wikipedia: "Members_Only_(clothing)" },
  { term: "Swatch watch", kind: "object", era: "80s", category: "fashion", object: true, merch: true, wikipedia: "Swatch" },
  { term: "jelly shoes", kind: "object", era: "80s", category: "fashion", object: true },
  { term: "Caboodles", kind: "object", era: "90s", category: "fashion", object: true, merch: true },
  { term: "scrunchie", kind: "object", era: "80s", category: "fashion", object: true, merch: true },
  { term: "Starter jacket", kind: "object", era: "90s", category: "fashion", object: true, merch: true, wikipedia: "Starter_(clothing_line)" },

  // ── Places and retail ─────────────────────────────────────────────────────
  { term: "Sears Wish Book", kind: "object", era: "80s", category: "retail", object: true, merch: true, wikipedia: "Sears_Christmas_Book" },
  { term: "Woolworth lunch counter", kind: "phrase", era: "70s", category: "retail", wikipedia: "F._W._Woolworth_Company" },
  { term: "Kmart Blue Light Special", kind: "phrase", era: "80s", category: "retail", merch: true, wikipedia: "Kmart" },
  { term: "Toys R Us", kind: "phrase", era: "80s", category: "retail", merch: true, wikipedia: "Toys_%22R%22_Us" },
  { term: "roller rink", kind: "phrase", era: "80s", category: "retail", merch: true, wikipedia: "Roller_rink" },
  { term: "shopping mall arcade", kind: "phrase", era: "80s", category: "retail", merch: true, wikipedia: "Amusement_arcade" },
  { term: "Chuck E Cheese animatronics", kind: "phrase", era: "80s", category: "retail", wikipedia: "Chuck_E._Cheese" },
];

/** Fast lookup by exact term string. */
export const BY_TERM = new Map(WATCHLIST.map((t) => [t.term, t]));

/**
 * Subreddits the discovery layer reads.
 *
 * The first group is the audience talking to itself. The second is Abby's
 * sourcing feed — a live stream of objects people found and cared enough about
 * to photograph, which is exactly the input the WATCH FOR list wants.
 */
export const SUBREDDITS = [
  "GenX",
  "nostalgia",
  "80s",
  "90s",
  "70s",
  "decadeology",
  "ThriftStoreHauls",
  "vintage",
  "estatesales",
  "whatisthisthing",
  "VintageKitchenware",
  "VHS",
] as const;
