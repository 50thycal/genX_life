/**
 * The weekly run.
 *
 * Order matters: the snapshot is written before the report is rendered. The
 * archive is the thing that can't be recovered — YouTube and Reddit only ever
 * describe the present — so a formatting bug in the report must never cost a
 * week of history.
 *
 * Each source is isolated. One failing degrades the report and says so in
 * print; it doesn't fail the run. Given how brittle trend data sources are,
 * that isn't defensive programming, it's the normal case.
 *
 *   npm run bot:run
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadHistory, saveSnapshot } from "./history";
import { REPORTS_DIR } from "./paths";
import { renderReport } from "./report";
import { scoreTerms } from "./score";
import { collectReddit } from "./sources/reddit";
import { collectWikipedia } from "./sources/wikipedia";
import { collectYouTube } from "./sources/youtube";
import type { Candidate, Outlier, Signal, Snapshot } from "./types";
import { WATCHLIST } from "./watchlist";

async function main(): Promise<void> {
  const date = new Date().toISOString().slice(0, 10);
  console.log(`Nostalgia Desk — ${date}`);
  console.log(`${WATCHLIST.length} terms on the watchlist\n`);

  const history = await loadHistory();
  console.log(`${history.length} previous snapshot${history.length === 1 ? "" : "s"} on file\n`);

  const signals: Signal[] = [];
  const outliers: Outlier[] = [];
  const candidates: Candidate[] = [];
  const degraded: string[] = [];

  console.log("Wikipedia…");
  try {
    signals.push(...(await collectWikipedia(WATCHLIST)));
  } catch (error) {
    console.error(`  failed: ${(error as Error).message}`);
    degraded.push("Wikipedia");
  }

  console.log("YouTube…");
  try {
    const result = await collectYouTube(WATCHLIST);
    signals.push(...result.signals);
    outliers.push(...result.outliers);
    if (!result.available) degraded.push("YouTube (no API key)");
  } catch (error) {
    console.error(`  failed: ${(error as Error).message}`);
    degraded.push("YouTube");
  }

  console.log("Reddit…");
  try {
    const result = await collectReddit(WATCHLIST);
    signals.push(...result.signals);
    candidates.push(...result.candidates);
    if (!result.available) degraded.push("Reddit (no credentials)");
  } catch (error) {
    console.error(`  failed: ${(error as Error).message}`);
    degraded.push("Reddit");
  }

  if (signals.length === 0) {
    // Writing an empty snapshot would put a hole in every future baseline.
    console.error("\nNo signals collected from any source — refusing to write an empty snapshot.");
    process.exitCode = 1;
    return;
  }

  console.log("\nScoring…");
  const scored = scoreTerms(WATCHLIST, signals, outliers, history);

  const snapshot: Snapshot = {
    date,
    terms: scored.map((s) => ({ term: s.term.term, signals: s.signals, score: s.score })),
    candidates,
    degraded,
  };

  const snapshotPath = await saveSnapshot(snapshot);
  console.log(`  archive → ${path.relative(process.cwd(), snapshotPath)}`);

  await mkdir(REPORTS_DIR, { recursive: true });
  const reportPath = path.join(REPORTS_DIR, `${date}.md`);
  await writeFile(reportPath, renderReport(snapshot, scored, history.length), "utf8");
  console.log(`  report  → ${path.relative(process.cwd(), reportPath)}`);

  const top = scored.filter((s) => s.term.kind !== "barometer").slice(0, 5);
  if (top.length > 0) {
    console.log("\nTop movers:");
    for (const pick of top) console.log(`  ${pick.score.toFixed(1)}  ${pick.term.term}`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
