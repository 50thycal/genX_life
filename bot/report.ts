/**
 * The Monday report.
 *
 * Written as Markdown so it commits into the repo as a readable diff and can be
 * pasted anywhere. Every ranked line carries its evidence — a number with no
 * reason attached is how a tool like this quietly stops being trusted.
 */

import { BASELINE_WEEKS, SCORING } from "./config";
import type { Candidate, ScoredTerm, Snapshot } from "./types";

function heading(date: string, weeksOfHistory: number, degraded: string[]): string {
  const lines = [`# Nostalgia Desk — week of ${date}`, ""];

  if (weeksOfHistory < BASELINE_WEEKS) {
    lines.push(
      `> **Still building its baseline — week ${weeksOfHistory + 1} of ${BASELINE_WEEKS}.**`,
      `> Every number here is measured against a term's own recent history, and there`,
      `> isn't enough of one yet. Wikipedia movement is already real (it arrives with`,
      `> 90 days built in); YouTube and Reddit movement is not. Read this as a preview`,
      `> of the format, not as advice.`,
      "",
    );
  }

  if (degraded.length > 0) {
    lines.push(`> Sources unavailable this run: ${degraded.join(", ")}.`, "");
  }

  return lines.join("\n");
}

function filmThis(scored: ScoredTerm[]): string {
  // Barometers are excluded by design: "80s nostalgia" is too broad to film.
  const picks = scored
    .filter((s) => s.term.kind !== "barometer")
    .filter((s) => s.factors.momentum >= SCORING.minMomentum)
    .slice(0, SCORING.filmCount);

  if (picks.length === 0) {
    return "## Film this\n\nNothing moved enough to recommend this week. That's a real answer — a\nquiet week is better reported than padded.\n";
  }

  const lines = ["## Film this", ""];
  picks.forEach((pick, index) => {
    lines.push(`### ${index + 1}. ${pick.term.term}`, "");
    lines.push(`**Score ${pick.score}** · ${pick.term.category} · ${pick.term.era}`, "");
    lines.push(pick.because, "");

    const outlier = pick.outliers[0];
    if (outlier) {
      lines.push(
        `- Best recent video: [${outlier.title}](https://www.youtube.com/watch?v=${outlier.videoId})`,
        `  — ${outlier.channelTitle}, ${outlier.subscribers.toLocaleString()} subs, ` +
          `${outlier.viewsPerDay.toLocaleString()} views/day`,
      );
    }

    const yt = pick.signals.find((s) => s.source === "youtube");
    const competition = yt?.detail?.recentVideoCount;
    if (typeof competition === "number") {
      lines.push(`- Videos on this in the last 90 days: ~${competition.toLocaleString()}`);
    }
    lines.push("");
  });

  return lines.join("\n");
}

function printThis(scored: ScoredTerm[]): string {
  const picks = scored
    .filter((s) => s.term.merch === true && s.factors.momentum >= SCORING.minMomentum)
    .slice(0, SCORING.printCount);

  const lines = ["## Print this", ""];
  if (picks.length === 0) {
    lines.push("Nothing with merch potential moved this week.", "");
    return lines.join("\n");
  }

  for (const pick of picks) {
    lines.push(`**${pick.term.term}** — score ${pick.score}`, "", pick.because, "");
  }
  lines.push(
    "_Check trademark status before printing anything. Most of these are live brands._",
    "",
  );
  return lines.join("\n");
}

function watchFor(scored: ScoredTerm[]): string {
  const picks = scored
    .filter((s) => s.term.object === true && s.factors.momentum >= SCORING.minMomentum)
    .slice(0, SCORING.watchForCount);

  const lines = ["## Watch for — Abby", ""];
  if (picks.length === 0) {
    lines.push("No objects on the watchlist moved this week.", "");
    return lines.join("\n");
  }

  lines.push(
    "Objects whose *attention or eBay asking-price activity* is rising. Prices here",
    "are current asking prices, not sold comps — a real valuation still means",
    "checking Terapeak by hand. Rising prices against a shrinking listing count is",
    "a real supply-tightening signal on its own, but treat this as where to look,",
    "not what to pay.",
    "",
    "| Object | Score | What moved |",
    "| --- | --- | --- |",
  );
  for (const pick of picks) {
    lines.push(`| ${pick.term.term} | ${pick.score} | ${pick.because.replace(/\n/g, " ")} |`);
  }
  lines.push("");
  return lines.join("\n");
}

function barometers(scored: ScoredTerm[]): string {
  const picks = scored.filter((s) => s.term.kind === "barometer");
  if (picks.length === 0) return "";

  const lines = ["## Category temperature", "", "| Term | Score | Movement |", "| --- | --- | --- |"];
  for (const pick of picks) {
    const wiki = pick.signals.find((s) => s.source === "wikipedia");
    const move = wiki ? `${wiki.ratio >= 1 ? "+" : ""}${Math.round((wiki.ratio - 1) * 100)}%` : "—";
    lines.push(`| ${pick.term.term} | ${pick.score} | ${move} |`);
  }
  lines.push("", "_Barometers only. Never ranked as video ideas — too broad to film._", "");
  return lines.join("\n");
}

function newTerms(candidates: Candidate[]): string {
  const lines = ["## New terms — yes or no?", ""];

  if (candidates.length === 0) {
    lines.push("Nothing new surfaced this week.", "");
    return lines.join("\n");
  }

  lines.push(
    "Phrases the nostalgia subreddits are using that aren't on the watchlist. Add the",
    "good ones to `bot/watchlist.ts`; ignore the rest and they'll stop being proposed",
    "once they cool off.",
    "",
    "| Phrase | Posts | Subreddits | Example |",
    "| --- | --- | --- | --- |",
  );

  for (const candidate of candidates.slice(0, SCORING.candidateCount)) {
    const example = candidate.example.replace(/\|/g, "\\|").slice(0, 70);
    lines.push(
      `| ${candidate.phrase} | ${candidate.mentions} | ${candidate.subreddits.join(", ")} | ${example} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

export function renderReport(
  snapshot: Snapshot,
  scored: ScoredTerm[],
  weeksOfHistory: number,
): string {
  return [
    heading(snapshot.date, weeksOfHistory, snapshot.degraded),
    filmThis(scored),
    printThis(scored),
    watchFor(scored),
    newTerms(snapshot.candidates),
    barometers(scored),
    "---",
    "",
    `_${scored.length} terms measured. Generated by the Nostalgia Desk bot._`,
    "",
  ]
    .filter(Boolean)
    .join("\n");
}
