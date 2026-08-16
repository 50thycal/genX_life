# Nostalgia Desk — a weekly trend bot for Our Gen X Life

Research phase · 16 August 2026 · Prepared for Keith & Abby

---

## The finding that decides the whole design

The instinct is to point a bot at "what's trending on the internet right now." That does
not work for this brand, and it's worth knowing why before a line of code gets written.

**Google Trends' daily trending list is news.** Elections, sports scores, celebrity deaths,
whatever dropped on Netflix last night. It refreshes hourly and it will never once surface
a Trapper Keeper.

**YouTube's "most popular" chart is no longer general.** As of 21 July 2025, YouTube changed
what `videos.list(chart=mostPopular)` returns — it now feeds from the Trending Music, Movies
and Gaming charts. The endpoint everyone reaches for first is now structurally incapable of
showing you a nostalgia channel.

So general trend feeds are the wrong instrument. What actually works is the inverse:

> **You supply the vocabulary. The bot measures the movement.**

You give it a watchlist of a few hundred Gen X nostalgia terms — objects, brands, shows,
snacks, phrases — and every week it measures each one across several sources and reports what
*moved*. Not what's big (Star Wars is always big), but what's **up this week versus its own
90-day baseline**. That's the signal. "Fisher-Price Little People searches up 240% week over
week" is an actionable video idea. "Star Wars is popular" is not.

A second layer handles the terms you didn't think of: the bot reads the nostalgia subreddits
and pulls out nouns that are spiking but aren't on the watchlist yet, and proposes them for
promotion. That's the discovery half. It's the part that finds things before you do.

**One consequence to be ready for: this bot is worth nothing in week one.** Every metric here
is relative to a baseline it has to build. It gets genuinely useful around week four to six,
once there's history to compare against. Anything it says before then is noise.

---

## Three different questions, three different kinds of data

The business has three surfaces and they don't want the same signal:

| Surface | Question it's asking | Signal type |
| --- | --- | --- |
| Main YouTube channel | What should we film this week? | **Attention** — searches, views, posts |
| Spreadshop / merch | What phrase or object is worth printing? | **Attention**, filtered for shirt-ability |
| Abby's Retro Rescue | What do I grab at Saturday's estate sale? | **Money** — actual resale comps |

Attention data is cheap, plentiful, and free. Money data is expensive, gated, and the hard
part of this build. That asymmetry drives everything below.

---

## The sources, ranked by value per unit of effort

### Tier 1 — build these first. Free, no approval gates, real signal.

**1. Wikipedia pageviews — the sleeper pick, and I'd start here**

Free, no API key, no rate limit worth worrying about, no terms-of-service exposure. And it
happens to be near-perfect for this brand specifically: every Gen X artifact has a Wikipedia
article. Teddy Ruxpin. Zima. Blockbuster. Trapper Keeper. Pyrex. Jordache.

The metric: daily pageviews per article, scored as a z-score against that article's own
trailing 90-day mean. A spike means something reminded a lot of people of that object this
week — a TV reference, a viral post, an anniversary. It is the cleanest nostalgia-attention
proxy available and almost nobody is using it this way.

```
GET https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/
    en.wikipedia/all-access/user/{article}/daily/{start}/{end}
```

Requires only a descriptive `User-Agent` header. Cost: $0.

**2. YouTube Data API v3 — but not the endpoint you'd expect**

Free, 10,000 quota units per day. The catch: `search.list` costs 100 units per call, so the
real budget is about **100 searches a day**, not 10,000. That constraint shapes the design —
it's why the watchlist is a few hundred terms cycled across the week rather than thousands
hit daily.

Skip `chart=mostPopular` entirely (see above). The valuable pattern is:

1. `search.list(q=term, publishedAfter=<30 days ago>, order=viewCount)` — 100 units
2. `videos.list(id=<batch of 50>, part=statistics)` — **1 unit for all fifty**
3. `channels.list` for subscriber counts — 1 unit per batch

Then compute the metric that actually matters, which is not view count:

> **Outlier score = (views ÷ days since publish) ÷ channel subscriber count**

A video from a 12k-subscriber channel pulling 300k views in two weeks is proof of demand
*with proof that you don't need a big channel to capture it*. That's the single best
video-idea signal in this whole document. It tells you the topic is hungry and uncontested.
Pair it with a simple count of how many videos on that topic were published in the last 90
days — high demand, low supply is the gap you film into.

**3. Google Trends — real signal, but the access story is a mess**

Worth being blunt about the state of this one:

| Route | Status as of Aug 2026 | Verdict |
| --- | --- | --- |
| Official Google Trends API | Announced July 2025, still application-gated alpha, allowlist only | Apply, don't wait on it |
| `pytrends` | **Archived by maintainers 17 April 2025**, read-only | Dead |
| Community forks (`trendspy`/`trendspyg`) | Maintained, unofficial, breaks when Google shifts | Start here, expect breakage |
| SerpApi / DataForSEO / Glimpse | Paid, reliable, structured JSON | Upgrade path if free route flakes |

The metric worth paying for if it comes to it isn't the trend line — it's **`rising related
queries`**. Google flags queries growing faster than 5000% as "Breakout." That is a
purpose-built discovery mechanism and it's the most direct route to "what's about to be a
video" that exists anywhere in this list.

Recommendation: start on the free fork, budget for DataForSEO (fractions of a cent per
request, pay as you go) if it proves unreliable. Don't build anything that breaks when
Trends is unavailable — treat it as a bonus source, not a spine.

**4. Reddit — the discovery layer, and the one to register for today**

Free for non-commercial use at 100 queries per minute per OAuth client, averaged over ten
minutes. Two things to know: new OAuth app registration now goes through **manual review, not
self-service**, and as of May 2026 the unauthenticated endpoints that free tools quietly
relied on started returning 403. So the credential is the long pole on this whole project —
**apply for it in week one even though it's the fourth thing on the list.**

Subreddits worth watching: r/GenX, r/nostalgia, r/80s, r/90s, r/VHS, r/vintage,
r/ThriftStoreHauls, r/estatesales, r/whatisthisthing, r/VintageKitchenware.

Two metrics, and the second one is the interesting one:

- Top posts of the week by score — straightforward, gives you what landed.
- **Noun frequency in titles and comments versus a trailing baseline.** This is the discovery
  engine. When "Caboodles" starts appearing in r/GenX four times as often as its 90-day
  average, that's a term to promote onto the watchlist — and it got there without anyone
  thinking of it.

r/whatisthisthing and r/ThriftStoreHauls are the two to watch for Abby specifically: they're
a live feed of objects people found and cared enough to ask about.

### Tier 2 — the money layer for Abby's Retro Rescue. Harder, and worth being honest about.

**5. eBay — the sold-comps problem**

This is the one place where the obvious answer is genuinely unavailable, so here's the
situation plainly:

- `findCompletedItems`, the old free way to get sold prices, was deprecated in 2020 and
  **fully shut off in February 2025.**
- **Marketplace Insights API** is the official replacement and does return real sold data
  (last 90 days). It is a Limited Release requiring business-level approval that in practice
  is not granted to independent developers. Apply if you like; don't plan around it.
- **Browse API** *is* freely available — application keyset, roughly 5,000 calls/day.

What Browse gives you is **active listings**: what people are *asking*, and how many are
listed. That is not the same as what things *sell* for, and any tool that pretends otherwise
is lying to you. But it's still useful, and here's the honest framing of what it can tell you:

> Rising asking prices plus falling listing counts on an object = supply tightening.
> That's a real buy signal even without sold data.

For actual sold prices, the practical answer isn't an API at all — it's **Terapeak**, which is
included free with an eBay seller account and gives a year of real sold data. Abby likely
already has the account. The bot's job then becomes narrowing the field to ten objects a
week worth checking, and Terapeak confirms them by hand in five minutes. That division of
labor is better than a worse automated answer.

**6. Etsy — small scope, but it's first-party money data**

Etsy's API has no market-wide "what's trending" endpoint, and the broader access tiers are
limited-scale. But **Seller App Access approves in minutes** and gives full access to *her own
shop*: views, favorites, and sales per listing.

That's not trend discovery — it's something arguably more valuable. It's the **feedback loop**.
Once the bot is running, you can check its predictions against what actually sold in the
shop and start weighting the sources that earn it. A trend bot with no scoreboard drifts;
this is the cheapest scoreboard available.

**7. Estate sale listings — recommend not scraping**

EstateSales.net has no public API, and its robots.txt disallows a number of paths. Scraping it
is the legally greyest thing in this document, for the least return.

The better answer is that Abby doesn't need a scraped list of sales — she needs to know what
to look for **when she's already there**. That's a briefing, not a listings feed:

> *"Butterprint Pyrex — asking prices up 30% this month, listing count down 18%, three
> front-page ThriftStoreHauls posts this week. Target buy under $15, comps $45–70."*

That's the deliverable. It's built entirely from Tier 1 and 2 data with no scraping exposure.
If local sale listings do turn out to be wanted later, EstateSales.net's own email alerts are
free and already exist, and there are hosted ZIP-radius actors that carry the ToS exposure
themselves.

### Tier 3 — worth knowing about, not worth building yet

| Source | Why it's interesting | Why it's not first |
| --- | --- | --- |
| **Pinterest Trends API** | Genuinely strong for *merch* — Pinterest is where people plan aesthetic purchases, and retro aesthetic is enormous there. Returns WoW/MoM/YoY growth on keywords. | Needs app review for `trends_read`; caps at 50 results and current-day data only. Good phase-two add. |
| **TikTok** | Where nostalgia formats actually go viral first. | Creative Center is explicitly not built for automated scanning; the Research API is academic-access. Treat as a manual weekly look, not a bot input. |
| **Spreadshop sales** | The other half of the feedback loop, for merch instead of Etsy. | Depends on what the platform exposes — worth a look once the loop is proven on Etsy. |

---

## How a topic gets scored

Raw movement isn't enough — a term can spike because of something useless. Each candidate
gets a composite score across five factors, and the last two are what keep the report from
being generically true instead of true for this brand:

| Factor | What it asks | Where it comes from |
| --- | --- | --- |
| **Momentum** | Is it moving *now*, vs its own baseline? | z-score across all sources, WoW change |
| **Volume floor** | Is anyone actually looking at all? | absolute search/view/pageview counts — kills noise |
| **Competition** | How crowded is it already? | count of videos published on it in last 90 days |
| **Cohort fit** | Is this *Gen X* nostalgia, or Gen Z's? | term origin-year window, roughly 1968–1988 |
| **Monetizability** | Can this become a shirt or a findable object? | maps to a merch phrase / has eBay comps |

Cohort fit deserves a note: a lot of "retro" trending right now is Y2K and early-2000s, which
is Gen Z's nostalgia, not the audience's. Without that filter the bot will confidently
recommend filming about things your audience has no memory of. It's a one-line rule that
prevents a systematic failure mode.

---

## What lands in the inbox on Monday

Three ranked lists, evidence attached to every line, no dashboards to go log into:

**FILM THIS — 5 video ideas**
Topic, why it moved, the supporting numbers, the best-performing recent video on it and how
small the channel was, and a suggested title.

**PRINT THIS — 3 merch concepts**
Phrase or object, the momentum behind it, and a note on whether it's trademark-clear.

**GRAB THIS — 10 objects for Abby**
Object, target buy price, current comp range, direction of travel, and how confident the
signal is.

Plus a short **NEW TERMS** section: things Reddit surfaced that aren't on the watchlist yet,
awaiting a yes/no. That's the bot getting smarter, and it needs about ten seconds a week of
human input.

---

## Build shape

Nothing here needs new infrastructure:

- **Schedule:** GitHub Actions cron, Monday mornings. Free, already where the code lives.
- **Language:** TypeScript, matching the existing Next.js repo.
- **Storage:** history is mandatory — every metric is relative. Start with SQLite committed
  to the repo; move to Postgres if it outgrows that. It won't for a long while.
- **Output:** report written as Markdown into the repo, emailed, and rendered at a
  password-protected `/desk` route on the site so there's an archive to scroll back through.
- **Secrets:** GitHub Actions secrets. Nothing in the repo.

Roughly: watchlist seeds → collectors per source → normalize to a common shape → score →
rank → render. Each collector isolated, so one source going down degrades the report instead
of breaking it. Given Google Trends' reliability, that isolation isn't optional.

### Cost

| | Monthly |
| --- | --- |
| Wikipedia, YouTube, Reddit, eBay Browse, Etsy, GitHub Actions | **$0** |
| Google Trends, if the free route proves too flaky | ~$5–20 pay-as-you-go |

It runs free. The only line item is buying reliability on one source.

---

## A seed watchlist to start from

The bot is only as good as its vocabulary, and this is the part that wants Keith and Abby's
input rather than mine — they know what their audience responds to. A starting shape:

- **Toys** — Teddy Ruxpin, Speak & Spell, Lite-Brite, Micro Machines, My Buddy, Pound Puppies, Skip-It
- **School** — Trapper Keeper, Lisa Frank, Scholastic Book Fair, Oregon Trail, mimeograph
- **Kitchen & home** — Pyrex Butterprint, CorningWare, Tupperware Servalier, avocado appliances
- **Tech** — Walkman, Zenith console TV, rotary phone, Commodore 64, VHS rewinder
- **Snacks** — Ecto Cooler, Squeezit, Dunkaroos, Crystal Pepsi, Zima
- **Media** — Blockbuster, Columbia House, MTV VJs, TGIF, Saturday morning cartoons

Fifty to a hundred terms is enough to start; the discovery layer grows it from there.

---

## Two things worth raising

**The credential timeline is the schedule.** Reddit's manual review is the long pole and
everything else is fast. Applying for Reddit and the eBay keyset in week one means they land
around when the code is ready instead of after.

**The bot makes ideas, not uploads.** Your Life On Tape has been idle about two years and the
podcast hasn't published since December 2024. A trend bot pointed at dormant channels
produces a very good list of videos nobody makes. Worth deciding up front which surface this
is actually feeding — my read is the main channel and Abby's sourcing, and that the merch
list is a bonus rather than a third job.

---

## Recommended next step

Build Tier 1 only — Wikipedia, YouTube, Reddit — against a 50-term seed watchlist, and let it
collect for a month before trusting a word of it. That's a small build, it costs nothing, it
proves the scoring model, and it starts the baseline clock immediately. The baseline is the
thing you can't buy later; every week of delay is a week the bot isn't smart yet.

Tier 2 gets added once there's evidence the scores mean something.
