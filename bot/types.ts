/**
 * Shared shapes for the trend bot.
 *
 * Everything the collectors return normalises to `Signal` so the scorer never
 * has to know which source a number came from. Adding a source later means
 * writing one collector and touching nothing else.
 */

/** Which slice of the audience's childhood a term belongs to. */
export type Era = "70s" | "80s" | "90s" | "cross";

export type TermKind =
  /** Broad category temperature — "is nostalgia up this week at all". Never a video idea on its own. */
  | "barometer"
  /** A physical thing someone could find at an estate sale. */
  | "object"
  /** A show, film, song, game — watchable or playable, not buyable. */
  | "media"
  /** A saying, a shared experience, a thing that only works as words. */
  | "phrase";

export type Term = {
  /** The exact string sent to every API. Changing it resets that term's history. */
  term: string;
  kind: TermKind;
  era: Era;
  category: string;
  /**
   * Wikipedia article title, when a plain search for `term` lands somewhere
   * unhelpful. Left off, the collector resolves it once and caches the answer.
   */
  wikipedia?: string;
  /** Could plausibly become a shirt. Feeds the PRINT THIS list. */
  merch?: boolean;
  /** Abby could physically find one. Feeds the WATCH FOR list. */
  object?: boolean;
};

/**
 * One measurement of one term from one source, already expressed as movement
 * rather than raw magnitude — the scorer only ever compares like with like.
 */
export type Signal = {
  term: string;
  source: "wikipedia" | "youtube" | "reddit";
  /** Raw current level. Used for the volume floor, not for ranking. */
  level: number;
  /** Change against this term's own recent baseline, as a multiplier. 1 = flat. */
  ratio: number;
  /** Standard deviations above that baseline. The headline movement number. */
  z: number;
  /** Anything the report should be able to quote as evidence. */
  detail?: Record<string, unknown>;
};

/** A YouTube video that outperformed the channel that published it. */
export type Outlier = {
  term: string;
  videoId: string;
  title: string;
  channelTitle: string;
  subscribers: number;
  views: number;
  publishedAt: string;
  viewsPerDay: number;
  /** viewsPerDay ÷ subscribers. High means a small channel caught something big. */
  outlierScore: number;
};

/** A term Reddit surfaced that nobody put on the watchlist. */
export type Candidate = {
  phrase: string;
  mentions: number;
  subreddits: string[];
  /** An example post title, so a human can judge it in one glance. */
  example: string;
};

/** A watchlist term after every source has reported and the factors are combined. */
export type ScoredTerm = {
  term: Term;
  signals: Signal[];
  outliers: Outlier[];
  factors: {
    momentum: number;
    volume: number;
    competition: number;
    cohortFit: number;
    monetizable: number;
  };
  /** 0–100. Only meaningful relative to other terms in the same run. */
  score: number;
  /** Plain-language reason this ranked where it did, for the report. */
  because: string;
};

/** One week's worth of everything, written to bot/history/ and committed. */
export type Snapshot = {
  /** ISO date of the run. One snapshot per week. */
  date: string;
  terms: Array<{
    term: string;
    signals: Signal[];
    score: number;
  }>;
  candidates: Candidate[];
  /** Sources that failed this run, so a gap in the history is explainable. */
  degraded: string[];
};
