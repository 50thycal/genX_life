/**
 * Offline check of everything between the collectors and the report.
 *
 * The collectors need live APIs and can only really be tested by running them.
 * The half that decides what the report actually says — baselines, movement,
 * scoring, ranking, rendering — is pure and worth pinning down, because a
 * scoring bug is silent. It doesn't crash; it just quietly recommends the wrong
 * five things every week.
 *
 *   npm run bot:selftest
 */

import { movement, mean, stdDev } from "./history";
import { renderReport } from "./report";
import { scoreTerms } from "./score";
import type { Outlier, Signal, Snapshot, Term } from "./types";

let failures = 0;

function check(label: string, condition: boolean, detail = ""): void {
  if (condition) {
    console.log(`  ok    ${label}`);
  } else {
    console.error(`  FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
    failures += 1;
  }
}

// ── Statistics ──────────────────────────────────────────────────────────────

console.log("\nstatistics");
check("mean of empty is 0", mean([]) === 0);
check("mean is right", mean([2, 4, 6]) === 4);
check("stdDev of one value is 0", stdDev([5]) === 0);
check("stdDev is right", Math.abs(stdDev([2, 4, 4, 4, 5, 5, 7, 9]) - 2.138) < 0.01);

console.log("\nmovement");
check("no baseline reads as flat", movement(100, []).z === 0 && movement(100, []).ratio === 1);
check("one reading is not a baseline", movement(100, [50]).z === 0);
check(
  "a spike reads as positive z",
  movement(200, [100, 100, 105, 95]).z > 3,
  `got z=${movement(200, [100, 100, 105, 95]).z.toFixed(2)}`,
);
check("a doubling reads as ratio 2", Math.abs(movement(200, [100, 100, 100, 100]).ratio - 2) < 0.01);
check(
  "a flat history doesn't divide by zero",
  Number.isFinite(movement(150, [100, 100, 100]).z),
  `got z=${movement(150, [100, 100, 100]).z}`,
);
check("a decline reads as negative z", movement(50, [100, 100, 105, 95]).z < 0);

// ── Scoring ─────────────────────────────────────────────────────────────────

const terms: Term[] = [
  { term: "Trapper Keeper", kind: "object", era: "80s", category: "school", merch: true, object: true },
  { term: "Zima", kind: "object", era: "90s", category: "snacks", merch: true, object: true },
  { term: "The Electric Company", kind: "media", era: "70s", category: "tv" },
  { term: "80s nostalgia", kind: "barometer", era: "80s", category: "era" },
  { term: "Sears Wish Book", kind: "phrase", era: "80s", category: "retail", merch: true },
  // Listings alone, rising sharply — must not be able to earn a ranking on its own.
  { term: "Fisher-Price Little People", kind: "object", era: "70s", category: "toys", object: true },
  // eBay price alone, no wiki/youtube/reddit at all — proves the price signal
  // can carry a term into the ranked lists by itself.
  { term: "Jordache jeans", kind: "object", era: "80s", category: "fashion", merch: true, object: true },
];

// Trapper Keeper spiking hard, Zima flat, Electric Company mild, barometer spiking.
const signals: Signal[] = [
  {
    term: "Trapper Keeper",
    source: "wikipedia",
    level: 900,
    ratio: 3,
    z: 4.2,
    detail: { article: "Trapper_Keeper", recentDailyAvg: 900, baselineDailyAvg: 300 },
  },
  {
    term: "Trapper Keeper",
    source: "youtube",
    level: 500_000,
    ratio: 1,
    z: 0,
    detail: { recentVideoCount: 120 },
  },
  { term: "Zima", source: "wikipedia", level: 400, ratio: 1.0, z: 0.05 },
  {
    term: "Zima",
    source: "youtube",
    level: 200_000,
    ratio: 1,
    z: 0,
    detail: { recentVideoCount: 60_000 },
  },
  { term: "The Electric Company", source: "wikipedia", level: 250, ratio: 1.3, z: 1.1 },
  { term: "80s nostalgia", source: "wikipedia", level: 5_000, ratio: 2.5, z: 5 },
  // Real ratio, but under the old 15% text threshold — the exact shape that
  // shipped as "Steady — no movement" on a term the report was ranking.
  { term: "Sears Wish Book", source: "wikipedia", level: 320, ratio: 1.06, z: 0.3 },
  // Sharp rise against a flat baseline (25 vs a steady 10) — real positive z.
  // If the momentum/volume exclusion in score.ts ever regresses, this alone
  // would be enough to rank the term.
  { term: "Fisher-Price Little People", source: "ebay-listings", level: 25, ratio: 1, z: 0 },
  // Price up against a flat $30 baseline; listings down against a flat 40.
  { term: "Jordache jeans", source: "ebay", level: 45, ratio: 1, z: 0 },
  { term: "Jordache jeans", source: "ebay-listings", level: 30, ratio: 1, z: 0 },
];

const outliers: Outlier[] = [
  {
    term: "Trapper Keeper",
    videoId: "abc123",
    title: "I found 200 Trapper Keepers in a storage unit",
    channelTitle: "Small Retro Channel",
    subscribers: 12_000,
    views: 310_000,
    publishedAt: new Date(Date.now() - 14 * 86_400_000).toISOString(),
    viewsPerDay: 22_142,
    outlierScore: 1.84,
  },
];

// Two weeks of prior YouTube levels so the scorer has something to compare to.
const history: Snapshot[] = [
  {
    date: "2026-08-03",
    terms: [
      { term: "Trapper Keeper", signals: [{ term: "Trapper Keeper", source: "youtube", level: 100_000, ratio: 1, z: 0 }], score: 40 },
      { term: "Zima", signals: [{ term: "Zima", source: "youtube", level: 205_000, ratio: 1, z: 0 }], score: 30 },
      {
        term: "Fisher-Price Little People",
        signals: [{ term: "Fisher-Price Little People", source: "ebay-listings", level: 10, ratio: 1, z: 0 }],
        score: 20,
      },
      {
        term: "Jordache jeans",
        signals: [
          { term: "Jordache jeans", source: "ebay", level: 30, ratio: 1, z: 0 },
          { term: "Jordache jeans", source: "ebay-listings", level: 40, ratio: 1, z: 0 },
        ],
        score: 25,
      },
    ],
    candidates: [],
    degraded: [],
  },
  {
    date: "2026-08-10",
    terms: [
      { term: "Trapper Keeper", signals: [{ term: "Trapper Keeper", source: "youtube", level: 110_000, ratio: 1, z: 0 }], score: 42 },
      { term: "Zima", signals: [{ term: "Zima", source: "youtube", level: 195_000, ratio: 1, z: 0 }], score: 31 },
      {
        term: "Fisher-Price Little People",
        signals: [{ term: "Fisher-Price Little People", source: "ebay-listings", level: 10, ratio: 1, z: 0 }],
        score: 20,
      },
      {
        term: "Jordache jeans",
        signals: [
          { term: "Jordache jeans", source: "ebay", level: 30, ratio: 1, z: 0 },
          { term: "Jordache jeans", source: "ebay-listings", level: 40, ratio: 1, z: 0 },
        ],
        score: 25,
      },
    ],
    candidates: [],
    degraded: [],
  },
];

console.log("\nscoring");
const scored = scoreTerms(terms, structuredClone(signals), outliers, history);

check("every term with a signal is scored", scored.length === 7, `got ${scored.length}`);
check(
  "the spiking term outranks the flat one",
  (scored.find((s) => s.term.term === "Trapper Keeper")?.score ?? 0) >
    (scored.find((s) => s.term.term === "Zima")?.score ?? 0),
);
check(
  "a crowded topic scores worse on competition than an open one",
  (scored.find((s) => s.term.term === "Zima")?.factors.competition ?? 1) <
    (scored.find((s) => s.term.term === "Trapper Keeper")?.factors.competition ?? 0),
);
check(
  "youtube movement is filled in from history",
  (scored.find((s) => s.term.term === "Trapper Keeper")?.signals.find((s) => s.source === "youtube")?.ratio ?? 1) > 4,
  "500k against a ~105k baseline should read as a big multiple",
);
check(
  "a falling term doesn't score negative momentum",
  scored.every((s) => s.factors.momentum >= 0),
);
check("scores stay within 0–100", scored.every((s) => s.score >= 0 && s.score <= 100));
check(
  "the reason names its evidence",
  (scored.find((s) => s.term.term === "Trapper Keeper")?.because ?? "").includes("Wikipedia"),
);

// Regression: a term ranked purely on a modest-but-real z-score used to print
// "Steady — no movement" because its ratio fell short of an unrelated 15%
// text cutoff, while the momentum floor that got it ranked runs on z alone.
const wishBook = scored.find((s) => s.term.term === "Sears Wish Book");
check("a modest real move clears the momentum floor", (wishBook?.factors.momentum ?? 0) > 0);
check(
  "its evidence names the move instead of contradicting the ranking",
  (wishBook?.because ?? "").includes("Wikipedia") && !(wishBook?.because ?? "").includes("Steady"),
  `got "${wishBook?.because}"`,
);

// eBay: listings measure supply, not attention, and must never be able to
// rank a term on their own — only price movement (or a genuine attention
// signal) should.
const listingsOnly = scored.find((s) => s.term.term === "Fisher-Price Little People");
check(
  "listings rising sharply still can't earn momentum on their own",
  listingsOnly?.factors.momentum === 0,
  `got momentum=${listingsOnly?.factors.momentum}`,
);
check(
  "listings rising sharply still can't earn volume on their own",
  listingsOnly?.factors.volume === 0,
  `got volume=${listingsOnly?.factors.volume}`,
);

// eBay price, with no wiki/youtube/reddit signal at all, should be able to
// carry a term into the ranked lists by itself — that's the point of adding it.
const jordache = scored.find((s) => s.term.term === "Jordache jeans");
check("eBay price movement alone earns momentum", (jordache?.factors.momentum ?? 0) > 0);
check(
  "its evidence names the price move",
  (jordache?.because ?? "").includes("eBay asking prices up"),
  `got "${jordache?.because}"`,
);
check(
  "its evidence names the listings direction, not just the price",
  (jordache?.because ?? "").includes("eBay listings down"),
  `got "${jordache?.because}"`,
);

// ── Report ──────────────────────────────────────────────────────────────────

console.log("\nreport");
const snapshot: Snapshot = {
  date: "2026-08-17",
  terms: scored.map((s) => ({ term: s.term.term, signals: s.signals, score: s.score })),
  candidates: [
    { phrase: "caboodles", mentions: 7, subreddits: ["GenX", "nostalgia"], example: "Found my sister's Caboodles case" },
  ],
  degraded: ["Reddit (no credentials)"],
};

const markdown = renderReport(snapshot, scored, history.length);

check("film section is present", markdown.includes("## Film this"));
check(
  "barometers are kept out of film ideas",
  !markdown.split("## Print this")[0]?.includes("### 1. 80s nostalgia"),
  "a barometer reached the film list",
);
check("barometers still get their own section", markdown.includes("## Category temperature"));
check("the baseline warning shows while history is thin", markdown.includes("Still building its baseline"));
check("degraded sources are declared", markdown.includes("Reddit (no credentials)"));
check("candidates are listed", markdown.includes("caboodles"));
const printSection = markdown.split("## Print this")[1]?.split("## Watch for")[0] ?? "";
check(
  "print list only holds merch terms",
  !printSection.includes("Electric Company"),
  "a term with no merch flag reached Print this",
);
check(
  "a term with no real movement stays out of the film list",
  !markdown.includes("Steady — no movement"),
  "a ranked entry contradicted itself",
);

const watchForSection = markdown.split("## Watch for")[1]?.split("## New terms")[0] ?? "";
check(
  "listings-only movement stays out of Watch for",
  !watchForSection.includes("Fisher-Price Little People"),
  "an object ranked on listing count alone, which is a supply signal, not attention",
);
check("eBay-price-only movement reaches Watch for", watchForSection.includes("Jordache jeans"));

const mature = renderReport(snapshot, scored, 8);
check("the warning disappears once history is deep enough", !mature.includes("Still building its baseline"));

console.log("\n──────── sample report ────────\n");
console.log(markdown.split("\n").slice(0, 34).join("\n"));
console.log("\n───────────────────────────────");

if (failures > 0) {
  console.error(`\n${failures} check${failures === 1 ? "" : "s"} failed`);
  process.exit(1);
}
console.log("\nAll checks passed.");
