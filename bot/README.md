# Nostalgia Desk

A weekly bot that reads the internet for Keith and Abby and reports what moved:
video ideas, merch concepts, and objects worth watching for.

The reasoning behind which sources are used and which aren't is in
[`TREND_BOT_PLAN.md`](../TREND_BOT_PLAN.md). This file is how to run it.

## The one thing to know first

**It is not useful for about a month.** Every number it reports is measured
against a term's own recent history, and it has to build that history one week
at a time. Wikipedia is the exception — one call returns 90 days, so its
movement is real immediately. YouTube and Reddit can only ever see the present.

Until there are four snapshots on file the report says so at the top. Don't act
on it before then; the format is real but the numbers aren't yet. This is also
why it's worth starting the schedule before anyone has decided what to do with
the output — the baseline is the one thing that can't be bought later.

## What it does

Roughly a hundred watchlist terms, measured across four sources each week:

| Source | Cost | What it contributes |
| --- | --- | --- |
| Wikipedia pageviews | Free, no key | Attention on a specific object. Arrives with 90 days of history. |
| YouTube Data API v3 | Free, 10k units/day | Demand and competition, plus the outlier score |
| Reddit | Free, non-commercial | Discovery — proposes terms nobody thought of |
| eBay Browse API | Free, 5k calls/day | Asking-price and listing-count movement for objects — not sold comps |

Two outputs per run, both committed:

- `bot/reports/YYYY-MM-DD.md` — the report a human reads
- `bot/history/YYYY-MM-DD.json` — the archive every future baseline depends on

The archive matters more than the report. Collectors can be rewritten any time;
history can't be re-fetched.

## Running it

```bash
npm ci
npm run bot:selftest   # offline — scoring, ranking, rendering
npm run bot:run        # the weekly collection
npm run bot:mine       # read the channels' back catalogue, propose terms
```

`bot:run` degrades rather than fails. A missing YouTube key or absent Reddit
credentials means those sources are skipped and the report says which ones were
missing — it will still produce a Wikipedia-only report.

The scripts assume they're run from the repo root. `npm run` guarantees that
regardless of which directory you're in.

## Keys

Set as GitHub Actions secrets for the scheduled run, or in a local `.env` (which
is already git-ignored) for testing.

### `YOUTUBE_API_KEY` — start here

1. [Google Cloud Console](https://console.cloud.google.com/) → new project
2. Enable **YouTube Data API v3**
3. Credentials → Create credentials → API key
4. Restrict the key to the YouTube Data API

Free, instant, no billing account. The 10,000 units/day allowance is plenty: a
run uses about 8,000 at most and the bot stops itself before the cap.

### `REDDIT_CLIENT_ID` / `REDDIT_CLIENT_SECRET` / `REDDIT_USER_AGENT`

**Apply for this first even though it's needed last.** New API clients go
through manual review rather than self-service signup, so this is the long pole
on the whole project. Everything else takes minutes.

1. [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) → create app
2. Type: **script**
3. `REDDIT_USER_AGENT` should be descriptive and carry a contact, e.g.
   `nostalgia-desk/1.0 by /u/yourusername`

Free for non-commercial use at 100 queries a minute. The bot uses about 24 calls
a week, so the ceiling is irrelevant.

### `EBAY_CLIENT_ID` / `EBAY_CLIENT_SECRET`

App-level access only — no seller account, no user login, and unlike Reddit
there's no manual review queue.

1. [developer.ebay.com](https://developer.ebay.com/) → sign up for a free
   developer account
2. **My Account → Application Keys**
3. Under **Production**, copy the **App ID** (→ `EBAY_CLIENT_ID`) and the
   **Cert ID** (→ `EBAY_CLIENT_SECRET`)

Free, 5,000 calls/day. The bot searches one term per object on the watchlist —
under 100 calls a week, nowhere near the ceiling.

## The watchlist is the product

`watchlist.ts` decides whether any of this is worth reading. It was seeded from
what the channels already cover plus the era vocabulary a Gen X audience
answers to, and it is meant to be edited — by Keith and Abby more than by
anyone else, because they know what their audience responds to.

Two things propose additions and neither one edits the list:

- `npm run bot:mine` reads every video title across all three channels and
  proposes recurring phrases, written to `bot/proposed-terms.json`.
- The weekly run proposes phrases the nostalgia subreddits are using that the
  watchlist doesn't cover. They appear in the report under **New terms**.

Promoting one is a hand edit: add it to `watchlist.ts` with an era, a category,
and whether it's a shirt (`merch`) or a thing you could find (`object`).

Two notes on editing:

**Specific beats generic.** "Pyrex" is too broad — it never stops being talked
about, so it never moves. "Pyrex Butterprint" is a pattern collectors chase, and
it spikes and dips.

**Changing a term's string resets its history.** The term text is the key. Fix a
typo and that term starts over from nothing.

### Barometers

A few entries are marked `kind: "barometer"` — "Generation X", "80s nostalgia",
and similar. They're deliberately included and deliberately never ranked as
video ideas: too broad to move meaningfully, too vague to film. They answer a
different question, which is whether interest in the whole territory is up or
down. They get their own section at the bottom of the report.

## What isn't built yet

**Watch for — Abby** now carries eBay asking-price and listing-count
movement alongside attention, but it's still not a valuation. eBay's free
API only exposes active listings — the sold-comps endpoint was shut off in
February 2025, and the official replacement is business-tier gated in a way
independent developers don't get through. A real number still means checking
Terapeak on the shortlist by hand; the report says this explicitly rather
than implying more than the data supports.

Listing count is tracked but deliberately excluded from ranking — a term
can't get onto Film this or Print this on listing-count movement alone, only
on genuine attention (Wikipedia, YouTube, Reddit) or asking-price movement.
A pile of new listings appearing is supply information, not a video idea.

## Layout

```
bot/
  watchlist.ts       the vocabulary — the file most worth arguing about
  config.ts          every tunable
  types.ts           shared shapes
  paths.ts           where things get written
  history.ts         snapshots, baselines, movement maths
  score.ts           five factors → one ranking
  report.ts          Markdown rendering
  run.ts             the weekly entry point
  mine-channels.ts   seed miner
  selftest.ts        offline checks
  sources/           one file per source, each independently skippable
  history/           the archive (committed)
  reports/           weekly reports (committed)
  cache/             resolved article titles, rotation state (committed)
```
