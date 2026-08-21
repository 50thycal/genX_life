/**
 * Every tunable in one place, so changing the bot's behaviour never means
 * hunting through collectors.
 */

/** How the report identifies itself to APIs that ask (Wikipedia requires this). */
export const USER_AGENT =
  "OurGenXLife-NostalgiaDesk/1.0 (https://www.ourgenxlife.com; ourgenxlife@gmail.com)";

export const WIKIPEDIA = {
  /** Days of daily pageviews pulled per term. The baseline is built from these. */
  windowDays: 90,
  /** The "now" slice compared against the rest of the window. */
  recentDays: 7,
  /** Below this many daily views, movement is statistical noise on a tiny number. */
  minDailyViews: 30,
} as const;

export const YOUTUBE = {
  /**
   * Daily quota is 10,000 units and a search costs 100, so the real ceiling is
   * ~100 searches. We stop at 8,000 to leave room for a re-run if the job fails
   * halfway, and rotate which terms get searched when the watchlist outgrows
   * one run's budget.
   */
  unitBudget: 8_000,
  searchCost: 100,
  /** How far back a video counts as "recent" for demand and competition. */
  lookbackDays: 90,
  resultsPerTerm: 25,
  /** Channels below this are too small for view counts to mean much. */
  minSubscribers: 500,
} as const;

export const EBAY = {
  /** Marketplace to search. US only — the audience and the channels are US-based. */
  marketplace: "EBAY_US",
  /** Listings pulled per term. Also the sample the median asking price is drawn from. */
  limit: 50,
  /**
   * Below this many total matches, a "median price" is a coin flip on two or
   * three listings, not a market. Skip the term rather than report noise.
   */
  minListings: 3,
} as const;

export const REDDIT = {
  /** Posts pulled per subreddit for the discovery layer. */
  postsPerSub: 100,
  /** A phrase must appear in at least this many posts before it's worth proposing. */
  minMentions: 3,
  /** And in at least this many distinct subreddits, so one thread can't nominate itself. */
  minSubreddits: 2,
} as const;

export const SCORING = {
  /**
   * Factor weights. Momentum dominates because the whole product is "what moved",
   * but competition and fit are what stop it recommending the obvious.
   */
  weights: {
    momentum: 0.45,
    volume: 0.15,
    competition: 0.2,
    cohortFit: 0.1,
    monetizable: 0.1,
  },
  /**
   * How much momentum a term needs before it's allowed into a ranked list.
   *
   * Above zero on purpose. A term that technically ticked up a fraction of a
   * standard deviation isn't news, and letting it through produces the worst
   * possible line in the report: a recommendation whose own evidence says
   * "steady, no movement". Below this bar a term is simply left out.
   */
  minMomentum: 0.1,

  /** Ranked lists in the weekly report. */
  filmCount: 5,
  printCount: 3,
  watchForCount: 10,
  candidateCount: 12,
} as const;

/**
 * Weeks of history before the report stops carrying its own health warning.
 * Every metric here is relative, so early runs genuinely are noise — saying so
 * in the report is better than letting anyone act on week two.
 */
export const BASELINE_WEEKS = 4;
