# Our Gen X Life — Website Rebuild Plan

Prepared for Keith & Abby · Revision 2 · 15 August 2026

Formatted version: https://claude.ai/code/artifact/2cd2ef40-af42-4328-97ad-c40c310704e8

---

## The short version

Everything on ourgenxlife.com right now exists to send people somewhere else — YouTube,
Etsy, Spotify, Spreadshop. Every click is a departure. Nothing is counted, kept, or sold
on the way out.

The fix is already sitting inside the show. **The Gen X Files** — where people send in
their own stories and you read them on air — is the rarest thing a creator can have: a
genuine reason for the audience to hand over their name. Right now it runs through a
Gmail inbox.

Move that to a form on the site and the whole thing changes character. The site starts
collecting stories, building a list you own, and selling merch to people who already feel
like part of the show instead of to strangers passing through.

Then there's the thing that turned up when the podcast feed came in, which is bigger than
anything on the original list.

---

## You're running two brands, and the podcast belongs to the other one

The RSS feed isn't for Our Gen X Life. It's for **Our 80s Life Podcast** — a separate
brand, with its own domain, its own inbox, and its own social handles, running since
spring 2022.

| Our 80s Life (the original, since 2022) | Our Gen X Life (newer, broader) |
| --- | --- |
| our80slife.com | ourgenxlife.com |
| our80slife@gmail.com | ourgenxlife@gmail.com |
| facebook.com/Our80sLife | facebook.com/OurGenXLife |
| instagram.com/Our80sLife | instagram.com/ourgenxlife |
| The podcast — Apple, Spotify, Audible, Amazon, Podbean | YouTube, Etsy, Spreadshop, the Gen X Files |
| Scope: the 80s | Scope: the 70s, 80s and 90s |

Two domains, two inboxes, two sets of handles — and a podcast page on ourgenxlife.com
serving a show called *Our 80s Life*. Every one of those splits is a place where somebody
who found you in one spot never learns the rest exists. It also means the podcast's
four-year back catalogue is doing nothing to grow the brand you're actually building.

### Recommendation: unify under Our Gen X Life

Gen X Life is plainly the direction of travel — broader, and where the YouTube channel and
the shop live. The podcast is the one asset still flying the old flag.

**The part people get wrong about renaming a podcast: you don't lose anything.** Apple and
Spotify identify a show by its RSS feed, not its title. Keep the anchor.fm feed exactly as
it is, change the title inside it, and every subscriber, rating and review comes along. No
resubmission, no starting over, no lost reviews.

What you'd actually give up is the word "80s" — a genuinely better search term than "Gen X"
for podcast discovery. So don't throw it away, move it. Something like *Our Gen X Life
Podcast — 80s nostalgia with Keith & Abby* keeps the search term working in the subtitle
and description while the name finally matches everything else.

And don't let our80slife.com lapse. Four years of links point at it. Pointed at the new
site it keeps working; left to expire it goes dark and takes that traffic with it.

This is the owners' call. If the podcast audience knows itself as the 80s crowd and they'd
rather keep the brands separate, that's legitimate and the site can present two brands
cleanly. But it should be a decision, not something that just happened.

---

## Inventory

**Note:** the build machine's network blocks ourgenxlife.com, youtube.com and anchor.fm
directly, so anything not supplied by the owners came from search. Supplied URLs are taken
as confirmed; the rest are worth an eyeball before launch.

| Item | Points to | Status | Note |
| --- | --- | --- | --- |
| YouTube — main | `youtube.com/@OurGenXLife` | Confirmed | ID `UCMJh6uOm80WByahFlweGz0g` |
| YouTube — Abby's Retro Rescue | `youtube.com/channel/UCXybtY7smTIi1fVjRiZa7_Q` | Confirmed | No custom handle — worth claiming one |
| YouTube — third channel | — | Resolved | There isn't one |
| Spreadshop | `ourgenxlife.myspreadshop.com` | Confirmed | — |
| Etsy | `etsy.com/shop/AbbysRetroRescue` | Confirmed | Spelling locked: **Abby** |
| Instagram | `instagram.com/ourgenxlife` | Confirmed | — |
| Facebook | `facebook.com/OurGenXLife` | Confirmed | — |
| Pinterest | `pinterest.com/abbyrkeith` | Keep | Personal handle; rebrand later if it earns it |
| Podcast — Spotify | `open.spotify.com/show/3bs7tYkYyLO9aD5J8aizEw` | Confirmed | — |
| Podcast — Apple | `podcasts.apple.com/us/podcast/our-80s-life-podcast/id1616431293` | Confirmed | — |
| Podcast — Audible | `audible.com/pd/…/B09WMFLB5Y` | Bonus | Wasn't on the list — worth linking |
| Podcast — Podbean | `podbean.com/podcast-detail/4xfdm-262f56` | Bonus | Wasn't on the list — worth linking |
| Podcast — Google | — | Delete | Platform no longer exists |
| RSS feed | `anchor.fm/s/8d488824/podcast/rss` | Demote to footer | Healthy |
| Podcast host | Spotify for Creators (was Anchor) | Answered | Owner on file: `teacher.abby16@gmail.com` |
| Gen X Files | `ourgenxlife@gmail.com` | Rebuild as form | Biggest opportunity on the site |
| Second domain | `our80slife.com` | Decision needed | Redirect, don't drop |
| Contact | `ourgenxlife@gmail.com` · PO Box 751, Andover, KS 67002 | Confirmed | — |

---

## Questions, closed out

### Who hosts the podcast? — Spotify, under its old name

It's on **Anchor**, which Spotify absorbed in 2023 and renamed **Spotify for Creators**.
Old anchor.fm feed URLs still work, which is why the feed still says anchor.fm — nothing
is broken and nothing needs migrating. The dashboard is at creators.spotify.com under the
`our80slife` profile. Free, and a perfectly good place to stay.

Worth knowing: the feed lists **teacher.abby16@gmail.com** as the show's owner. That's the
account with control of the podcast, and it's publicly visible to anyone reading the feed
— normal, but it means a personal address holds a business asset. Worth moving to a brand
address when convenient, and worth both owners knowing the password either way.

### What's a domain registrar? — the company you bought the name from

The shop where the domain itself lives — GoDaddy, Namecheap, Squarespace, Cloudflare,
whoever ourgenxlife.com was purchased through. Separate from whoever builds or hosts the
site, which is why it's its own item.

Needed for exactly one thing: pointing ourgenxlife.com at the new site once it's approved.
Until then nothing changes and nobody logs into anything. If it's unclear which company it
is, the renewal receipt in email will say — and there are two to find, since our80slife.com
is registered somewhere too.

### The Google Podcasts link is dead — correct, delete it

Google shut Google Podcasts down entirely in 2024 and moved listeners to YouTube Music.
Nothing to fix, nothing to point it at. Remove the button, put **YouTube Music** in that
slot. While we're there, Audible and Podbean both carry the show and aren't linked
anywhere — those go in too.

### The RSS feed shows a wall of text — that's a healthy feed

RSS is an XML file, not a web page. It's written for podcast apps to read, so a browser
shows raw markup. This one is in good shape — rebuilt 8 August, so it's live and updating.

What should change is where it sits. An RSS link in the main navigation sends curious
people to a screen full of code and makes the site feel broken. Small icon in the footer,
next to the platform buttons. Plumbing, not a destination.

### Is there a third channel? — settled, no

Two channels: the main one and Abby's Retro Rescue. The *music.youtube.com* version that
turns up in searches is the main channel mirrored into YouTube Music automatically.

### Keep the podcast page? — keep it, but rebuild it

As a list of links out it earns nothing; anyone who wanted Spotify would have gone to
Spotify. As a page where episodes actually play — pulled from the feed, platform buttons
underneath — it becomes somewhere a first-time visitor can sample the show without
committing to a subscription.

---

## Three moves that change the numbers

### Move 1 — Turn the Gen X Files into a form

Submitting a story currently means opening Gmail, composing a message, remembering to say
whether you want to be named or anonymous, and hoping it arrived. Four points where someone
gives up. Most do.

A form — story, name-or-anonymous, email — removes all four and produces a database instead
of an inbox thread. What that's worth:

- **A searchable Gen X Files archive.** Free content nobody had to write, on exactly the
  nostalgia terms people search for.
- **An email list of the warmest possible audience.** Someone whose story was read on air
  will buy a shirt. A stranger scrolling past won't.
- **A reason to email on release day.** "Your story is in this week's episode" pulls people
  to YouTube the hour it goes live — the window the algorithm watches. The most direct
  lever available on view counts.

### Move 2 — Stop filing Spreadshop and Etsy under "Stores"

Two different businesses; merging them under one nav word costs sales on both.

**Spreadshop** is print-on-demand apparel: unlimited stock, thin margin, bought on
identity. **Etsy** is Abby's restored one-of-a-kind vintage: real margin, genuine scarcity,
bought on desire. When a piece is gone, it's gone.

Scarcity is the strongest selling tool here and the current site buries it behind a menu
item. Put a live **"Just Rescued"** strip on the homepage pulled from the Etsy shop. Keep
apparel as a separate, quieter "wear the brand" call further down. One creates urgency, the
other identity — they shouldn't compete for the same click.

### Move 3 — Use the site to feed Abby's channel

Abby's Retro Rescue is a fraction of the main channel's size, and it's the one that ends in
a sale. The path exists — nostalgia video, restoration video, buy the doll — but nothing on
the site walks anyone down it.

Present the two channels as one household with two rooms rather than two brands. Then link
every Etsy piece to the video of it being restored. That's the difference between selling a
used doll and selling a doll someone watched come back to life.

---

## Stack

| Layer | Choice | Why this one |
| --- | --- | --- |
| Framework | Next.js + TypeScript | Deploys straight from GitHub on every change |
| Hosting | Vercel | Free tier covers this; preview link per change for review before go-live |
| Styling | Tailwind | Fast to iterate on look and feel |
| Database | Vercel Postgres | Gen X Files submissions, subscribers, cached episodes |
| Email | Resend | Submission alerts, plus newsletter sends |
| YouTube | Data API v3, cached | Latest videos from both channels appear automatically |
| Podcast | anchor.fm feed, parsed on a schedule | New episodes appear with no manual step — and keeps working through a rename |
| Etsy | Public shop feed | Keeps "Just Rescued" current automatically |
| Analytics | Vercel Analytics + click tracking | Shows which platform the audience actually uses |
| Accounts | None yet | Deliberately — see below |

---

## Four phases

**1. Confirm and design.** Inventory is locked apart from the brand decision. What's left
is agreeing the look and hearing back on whether the podcast keeps its name.

**2. The landing page.** One page with everything: hero, both channels, Gen X Files form,
merch split in two, podcast player, socials, about and contact. The whole original ask,
live on a real URL. Most of the value lands here.

**3. The archive and the list.** Submissions into a database, an archive page per story,
email capture, automatic notifications. Where the site stops being a brochure and starts
compounding.

**4. Automation and measurement.** YouTube, RSS and Etsy feeds wired in so nothing needs
updating by hand, plus outbound click tracking.

### Accounts — later, and only with a reason

A login that gives the audience nothing is just friction on the front door. The reason will
arrive on its own, and it'll probably be one of two things: letting someone **claim the
story they submitted**, or giving subscribers **early access to Etsy drops** before they go
public. Both are worth signing up for. Neither is worth building before there's traffic to
serve.

---

## Moving the domains without breaking anything

- **Email.** If anything receives mail on either domain, changing DNS can silently kill it.
  Check the MX records first. Both public addresses are Gmail, so this is probably fine —
  but "probably" isn't good enough to skip.
- **Existing links.** `/podcast` is indexed and linked, and so is everything on
  our80slife.com. Old paths get redirected, or that traffic evaporates on launch day.
- **The cutover.** Build on a Vercel preview URL, review the real thing, and only then point
  DNS. The current site stays up until the moment of the switch.

---

## Open items

- [ ] **The big one: does the podcast keep the name *Our 80s Life*?** Nothing in phase 2
      depends on it — it can be built with the current name and changed later — but it shapes
      how the podcast section is written, and it's the decision with the most upside attached.
- [ ] Which company each domain is registered with — **ourgenxlife.com** and
      **our80slife.com**. Not needed until phase 2 is signed off.
- [ ] Confirmation that both owners have access to **teacher.abby16@gmail.com**, since it
      controls the podcast.
- [x] Spreadshop URL
- [x] Spotify and Apple Podcasts links
- [x] RSS feed and host — Spotify for Creators, formerly Anchor
- [x] Third YouTube channel — there isn't one
- [x] Abby, not Abbey
- [x] Pinterest — keep as is, rebrand later

---

## A note on the name

"Gen X Files" isn't unique to this brand. There's an unrelated site at thegenxfiles.com and
at least one political column under the same name. That doesn't matter for the show, but it
matters for search, because you'd be competing for a phrase nobody owns.

The fix costs nothing: title the archive and episode pages after the *specific story*
rather than the segment name. Someone searching for the mall arcade they grew up in should
find your page about it. Nobody is searching for "Gen X Files."
