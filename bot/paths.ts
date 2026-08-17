/**
 * Where the bot keeps things.
 *
 * Resolved from the working directory rather than the module's own location:
 * npm always runs scripts from the package root, and going through
 * `process.cwd()` keeps these files working whether tsx loads them as ESM or
 * CommonJS. The site is a live deployment — adding `"type": "module"` to
 * package.json to get `import.meta` would be a change to how Next builds it,
 * for no benefit here.
 *
 * The consequence: run the bot through its npm scripts, not by pointing tsx at
 * a file from some other directory.
 */

import path from "node:path";

export const BOT_DIR = path.join(process.cwd(), "bot");

/** One JSON file per weekly run. The archive that makes every metric possible. */
export const HISTORY_DIR = path.join(BOT_DIR, "history");

/** Rendered Markdown reports, one per week. */
export const REPORTS_DIR = path.join(BOT_DIR, "reports");

/** Resolved Wikipedia titles and YouTube rotation state. Committed on purpose. */
export const CACHE_DIR = path.join(BOT_DIR, "cache");
