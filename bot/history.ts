/**
 * Weekly snapshots, stored as JSON in the repo.
 *
 * The research plan called for SQLite. Plain files won for three reasons: at one
 * run a week over a hundred-ish terms the whole archive stays smaller than a
 * photo, a committed snapshot shows up as a readable diff so anyone can see what
 * changed, and there's no native module to break in CI. If the data ever
 * outgrows that, the swap is confined to this file.
 *
 * The archive is the actual asset here. The collectors can be rewritten any
 * time; the history can't be re-fetched — YouTube and Reddit only ever tell you
 * about now. That's why snapshots are written before the report is rendered,
 * and why a failed report never costs a week of data.
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { HISTORY_DIR } from "./paths";
import type { Signal, Snapshot } from "./types";

export async function saveSnapshot(snapshot: Snapshot): Promise<string> {
  await mkdir(HISTORY_DIR, { recursive: true });
  const file = path.join(HISTORY_DIR, `${snapshot.date}.json`);
  await writeFile(file, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  return file;
}

/** Every past snapshot, oldest first. */
export async function loadHistory(): Promise<Snapshot[]> {
  let files: string[];
  try {
    files = await readdir(HISTORY_DIR);
  } catch {
    return []; // First run — no archive yet.
  }

  const snapshots: Snapshot[] = [];
  for (const name of files.filter((f) => f.endsWith(".json")).sort()) {
    try {
      snapshots.push(JSON.parse(await readFile(path.join(HISTORY_DIR, name), "utf8")) as Snapshot);
    } catch {
      // A truncated snapshot from an interrupted run shouldn't poison the baseline.
      console.warn(`  history: skipping unreadable snapshot ${name}`);
    }
  }
  return snapshots;
}

/**
 * Past `level` readings for one term and source, oldest first.
 *
 * This is what lets YouTube and Reddit have baselines at all. Wikipedia hands
 * back 90 days of dailies in a single call so it computes its own; the other two
 * can only ever see this moment, so their sense of "normal" has to be assembled
 * one week at a time. That's the mechanical reason the bot is quiet for a month.
 */
export function levelsFor(
  history: Snapshot[],
  term: string,
  source: Signal["source"],
): number[] {
  const levels: number[] = [];
  for (const snapshot of history) {
    const entry = snapshot.terms.find((t) => t.term === term);
    const signal = entry?.signals.find((s) => s.source === source);
    if (signal) levels.push(signal.level);
  }
  return levels;
}

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const avg = mean(values);
  const variance = values.reduce((sum, v) => sum + (v - avg) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/**
 * Turn a current reading plus its history into movement.
 *
 * Returns a flat reading when there's nothing to compare against, which is the
 * honest answer for a term's first few weeks — better than a made-up spike that
 * reads as signal.
 */
export function movement(current: number, baseline: number[]): { ratio: number; z: number } {
  if (baseline.length < 2) return { ratio: 1, z: 0 };

  const avg = mean(baseline);
  const sd = stdDev(baseline);

  return {
    ratio: avg > 0 ? current / avg : 1,
    // A zero standard deviation means a perfectly flat history; any change from
    // that is real but unquantifiable, so cap it rather than dividing by zero.
    z: sd > 0 ? (current - avg) / sd : current > avg ? 3 : 0,
  };
}
