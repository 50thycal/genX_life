/**
 * Turning measurements into a ranking.
 *
 * Five factors, weighted. Momentum dominates because the entire product is
 * "what moved this week", but the last three are what stop the report being
 * generically true instead of true for this brand — they're the difference
 * between a trend dashboard and something worth reading on a Monday.
 *
 * This is also where YouTube and Reddit get their baselines. Those two can only
 * ever see the present, so their movement is computed against past snapshots
 * rather than inside the collector. Wikipedia arrives with its own.
 */

import { SCORING } from "./config";
import { levelsFor, movement } from "./history";
import type { Outlier, ScoredTerm, Signal, Snapshot, Term } from "./types";

/**
 * Squash a z-score into 0–1.
 *
 * A z of 2 is a genuinely notable week and lands around 0.75; beyond 3 the
 * curve flattens, because the difference between "very unusual" and "extremely
 * unusual" shouldn't dominate the whole ranking. Negative z — a term going
 * quiet — floors at zero rather than going negative, so a falling term simply
 * stops competing instead of dragging its other factors down with it.
 */
function fromZ(z: number): number {
  if (z <= 0) return 0;
  return 1 - Math.exp(-z / 1.75);
}

/** Log scale, because the gap between 100 and 1,000 views matters far more than 100,000 to 101,000. */
function fromVolume(level: number): number {
  if (level <= 0) return 0;
  return Math.min(1, Math.log10(level + 1) / 6);
}

/**
 * Fewer recent videos on a topic means more room to be the one that ranks.
 * Inverted and log-scaled: a topic with 50 recent videos is a real opportunity,
 * one with 50,000 is a crowded room.
 */
function fromCompetition(recentVideos: number): number {
  if (recentVideos <= 0) return 1;
  return Math.max(0, 1 - Math.log10(recentVideos + 1) / 5);
}

function fromCohort(term: Term): number {
  // Watchlist terms are curated for this audience by hand, so this factor is
  // near-flat here. It earns its keep when a Reddit candidate is up for
  // promotion — that's where a Y2K term would otherwise slip through as
  // "retro" and get filmed for an audience that has no memory of it.
  return term.era === "cross" ? 0.85 : 1;
}

function fromMonetizable(term: Term): number {
  if (term.merch && term.object) return 1;
  if (term.merch || term.object) return 0.7;
  return 0.3;
}

/** Plain-language reason, so no line in the report is unexplained. */
function explain(term: Term, signals: Signal[], outlier: Outlier | undefined): string {
  const parts: string[] = [];

  const wiki = signals.find((s) => s.source === "wikipedia");
  if (wiki && wiki.ratio > 1.15) {
    parts.push(
      `Wikipedia views up ${Math.round((wiki.ratio - 1) * 100)}% on its 90-day average ` +
        `(${Math.round(wiki.level)}/day)`,
    );
  }

  const reddit = signals.find((s) => s.source === "reddit");
  if (reddit) {
    const subs = (reddit.detail?.subreddits as string[] | undefined) ?? [];
    parts.push(`${reddit.level} post${reddit.level === 1 ? "" : "s"} across ${subs.length} subreddit${subs.length === 1 ? "" : "s"}`);
  }

  const yt = signals.find((s) => s.source === "youtube");
  if (yt && yt.ratio > 1.15) {
    parts.push(`YouTube interest up ${Math.round((yt.ratio - 1) * 100)}% week over week`);
  }

  if (outlier) {
    parts.push(
      `"${outlier.title}" did ${outlier.views.toLocaleString()} views from a ` +
        `${outlier.subscribers.toLocaleString()}-sub channel`,
    );
  }

  if (parts.length === 0) return "Steady — no movement against baseline this week.";
  return `${parts.join(". ")}.`;
}

export function scoreTerms(
  terms: Term[],
  signals: Signal[],
  outliers: Outlier[],
  history: Snapshot[],
): ScoredTerm[] {
  const scored: ScoredTerm[] = [];

  for (const term of terms) {
    const mine = signals.filter((s) => s.term === term.term);
    if (mine.length === 0) continue;

    // Fill in movement for the sources that couldn't compute their own.
    for (const signal of mine) {
      if (signal.source === "wikipedia") continue;
      const past = levelsFor(history, term.term, signal.source);
      const { ratio, z } = movement(signal.level, past);
      signal.ratio = ratio;
      signal.z = z;
    }

    const termOutliers = outliers.filter((o) => o.term === term.term);
    const best = termOutliers[0];

    // Momentum takes the strongest single source rather than an average: a term
    // can be genuinely hot on Reddit while flat on Wikipedia, and averaging that
    // to "mild" would bury exactly the signal worth acting on.
    const momentum = Math.max(0, ...mine.map((s) => fromZ(s.z)));
    const volume = Math.max(0, ...mine.map((s) => fromVolume(s.level)));

    const yt = mine.find((s) => s.source === "youtube");
    const competition = fromCompetition(Number(yt?.detail?.recentVideoCount ?? 0));

    const factors = {
      momentum,
      volume,
      competition,
      cohortFit: fromCohort(term),
      monetizable: fromMonetizable(term),
    };

    const score =
      100 *
      (factors.momentum * SCORING.weights.momentum +
        factors.volume * SCORING.weights.volume +
        factors.competition * SCORING.weights.competition +
        factors.cohortFit * SCORING.weights.cohortFit +
        factors.monetizable * SCORING.weights.monetizable);

    scored.push({
      term,
      signals: mine,
      outliers: termOutliers,
      factors,
      score: Math.round(score * 10) / 10,
      because: explain(term, mine, best),
    });
  }

  return scored.sort((a, b) => b.score - a.score);
}
