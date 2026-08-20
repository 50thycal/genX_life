# Our Gen X Life — Website Rebuild Plan

Prepared for Keith & Abby · Revision 4 · 15 August 2026

**Live preview: https://ourgenxlife.vercel.app**

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

Three things turned up along the way that weren't on the original list. The podcast is
still introducing itself under the old brand name. The most original of the three channels
has been idle for two years. And once the new site started reading the feed live, it showed
the podcast hasn't published since December 2024 either. None of that is a website problem
— but it does decide what this website should be built to do.

---

## The rebrand is done everywhere except inside the podcast feed

The rebrand from Our 80s Life to Our Gen X Life already happened — our80slife.com lands on
ourgenxlife.com, the socials moved, the channels and shop are all under the new name. Right
call, already working.

What didn't follow is the podcast's own metadata. The feed still identifies itself as the
old brand, top to bottom:

| Field in the feed | Currently says | Should say |
| --- | --- | --- |
| `title` | Our 80s Life Podcast | Our Gen X Life Podcast |
| `link` | https://www.our80slife.com | https://www.ourgenxlife.com |
| `author` / `itunes:author` | Our 80s Life | Our Gen X Life |
| `copyright` | Our 80s Life | Our Gen X Life |
| `itunes:owner` name | Our 80s Life | Our Gen X Life |
| Apple, Spotify, Audible, Podbean | All display the old name | All follow the feed automatically |

So someone who finds the show through Apple, Spotify, Audible or Podbean — four platforms
and four years of back catalogue — meets a brand you stopped using, gets pointed at a
domain that redirects, and has no obvious route to the YouTube channels or the shop. The
catalogue is working, just for the wrong name.

### The fix is a settings change, not a migration

Every field above is editable in Spotify for Creators. Change them once and the feed
updates; Apple, Spotify, Audible and Podbean all read from that feed, so they follow on
their own within a day or so. Nobody has to be told to resubscribe.

**Renaming a podcast costs nothing.** The platforms identify a show by its feed URL, not
its title — subscribers, ratings, reviews and full episode history all carry over
untouched. This is the part people assume is risky and it isn't.

Two things to expect: the Apple URL keeps the words `our-80s-life-podcast` in it, because
those slugs are frozen at first submission (display name changes, address doesn't) — don't
let that convince you the change failed. And keep "80s" working in the subtitle and
description; it's a better search term than "Gen X" and there's no reason to lose it.

---

## Inventory

**Note:** the build machine's network blocks ourgenxlife.com, youtube.com and anchor.fm
directly, so anything not supplied by the owners came from search. Supplied URLs are taken
as confirmed.

| Item | Points to | Status | Note |
| --- | --- | --- | --- |
| YouTube — main | `youtube.com/@OurGenXLife` | Confirmed | ID `UCMJh6uOm80WByahFlweGz0g` |
| YouTube — Abby's Retro Rescue | `youtube.com/channel/UCXybtY7smTIi1fVjRiZa7_Q` | Confirmed | No custom handle — worth claiming one |
| YouTube — Your Life On Tape | `youtube.com/@YourLifeOnTape` | Dormant | Rescued VHS footage. Nothing posted in ~2 years — see Move 4 |
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
| RSS feed | `anchor.fm/s/8d488824/podcast/rss` | Demote to footer | Feed healthy; newest episode Dec 2024 |
| Podcast host | Spotify for Creators (was Anchor) | Answered | Owner account: `teacher.abby16@gmail.com` |
| Gen X Files | `ourgenxlife@gmail.com` | Rebuild as form | Biggest opportunity on the site |
| Second domain | `our80slife.com` | Rebuild the redirect | Already redirects — breaks on move unless recreated |
| Contact | `ourgenxlife@gmail.com` · PO Box 751, Andover, KS 67002 | Confirmed | — |

---

## Questions, closed out

### Can Vercel just point the domain so nothing changes?

**The URL never changes — but one DNS edit is unavoidable.**

Yes to the part that matters: **ourgenxlife.com stays ourgenxlife.com.** Same address, same
bookmarks, same link in every old video description. Nobody in the audience sees anything
change except a better site.

But Vercel can't claim a domain on its own. Somebody has to sign in to wherever the
domain's DNS is managed, once, and repoint two records at Vercel. That's not a Vercel
limitation — it's how domain ownership works, and it's the step that proves the name is
yours. Ten minutes, one time.

Two ways to do it, and the choice matters:

- **Point individual records — recommended.** Add one A record and one CNAME at the current
  provider. DNS stays where it is, and the MX records that carry email are never touched.
- **Hand Vercel the nameservers.** Vercel takes over all DNS. Tidier long-term, but every
  existing record has to be recreated on the Vercel side, and anything missed goes dark —
  email included.

Take the first. No benefit to the second here worth risking a working inbox over. And don't
*transfer* the domain to Vercel — they do sell domains, but there's no reason to move
ownership. Pointing is enough.

**One thing we must not forget:** our80slife.com redirects to ourgenxlife.com today, and
that redirect lives with whoever hosts the current site. The moment we move, it stops
working. Vercel can recreate it natively — add the domain to the project, set it to
redirect — but it has to be done deliberately, or four years of podcast links go dark on
launch day.

### Who hosts the podcast? — Spotify, under its old name

**Anchor**, which Spotify absorbed in 2023 and renamed **Spotify for Creators**. Old
anchor.fm feed URLs still work, which is why the feed still says anchor.fm — nothing is
broken and nothing needs migrating. Dashboard at creators.spotify.com under the
`our80slife` profile. Free, and a fine place to stay.

The feed lists **teacher.abby16@gmail.com** as the show's owner — the account with control
of the podcast, publicly visible to anyone reading the feed. Normal, but worth moving to a
brand address when convenient.

### What's a domain registrar? — the company you bought the name from

The shop where the domain itself lives — GoDaddy, Namecheap, Squarespace, Cloudflare,
whoever ourgenxlife.com was purchased through. Separate from whoever builds or hosts the
site, which is why it's its own item. Needed for exactly one thing: pointing the domain at
the new site once it's approved.

### The Google Podcasts link is dead — correct, delete it

Google shut Google Podcasts down entirely in 2024 and moved listeners to YouTube Music.
Nothing to fix, nothing to point it at. Remove the button, put **YouTube Music** in that
slot. Audible and Podbean both carry the show and aren't linked anywhere — those go in too.

### The RSS feed shows a wall of text — the feed is fine, the show is the problem

RSS is an XML file, not a web page. It's written for podcast apps to read, so a browser
shows raw markup. Nothing is broken there.

**But now that the site pulls the feed live, it turned up a correction.** I said the feed
was "live and updating" because it rebuilt on 8 August. The feed rebuilds on its own — the
*show* hasn't. The most recent episode is **30 December 2024**, about twenty months ago.

So the honest scoreboard: the main channel is active, Abby's Retro Rescue is active, and
**both the podcast and Your Life On Tape have gone quiet.** No website fixes that, but it
changes what this one should be built to do — see Moves 1 and 4.

On the feed itself: move the RSS link out of the nav and into the footer. Sending curious
people to a screen full of code makes the site feel broken.

### Is there a third channel? — yes, Your Life On Tape

`youtube.com/@YourLifeOnTape` — rescued VHS and camcorder footage from estate sales,
digitised and uploaded. A time capsule of ordinary life. The most original idea of the
three channels, idle for about two years. See Move 4.

### Keep the podcast page? — keep it, but rebuild it

As a list of links out it earns nothing. As a page where episodes actually play — pulled
from the feed, platform buttons underneath — it becomes somewhere a first-time visitor can
sample the show without committing to a subscription.

---

## Four moves that change the numbers

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
  to YouTube the hour it goes live — the window the algorithm watches. The most direct lever
  available on view counts.

There's a fourth thing, and after finding the podcast has been quiet since December 2024 it
may be the important one. **Shows stop because making them is work.** A submission queue is
the cheapest content supply there is — you sit down to a folder of other people's stories
instead of a blank page, and "what do we talk about this week" stops being a question. The
form isn't only an audience-building tool; it's what makes the next episode easy enough to
actually record.

### Move 2 — Stop filing Spreadshop and Etsy under "Stores"

Two different businesses; merging them under one nav word costs sales on both.

**Spreadshop** is print-on-demand apparel: unlimited stock, thin margin, bought on
identity. **Etsy** is Abby's restored one-of-a-kind vintage: real margin, genuine scarcity,
bought on desire. When a piece is gone, it's gone.

Scarcity is the strongest selling tool here and the current site buries it behind a menu
item. Put a live **"Just Rescued"** strip on the homepage pulled from the Etsy shop. Keep
apparel as a separate, quieter "wear the brand" call further down.

### Move 3 — Give the smaller channels a reason to be clicked

Three channels changes the job. Two you can set side by side and let people choose. Three
starts to look like a menu with no recommendation, and people bounce off menus.

The main channel is the front door. **Abby's Retro Rescue** and **Your Life On Tape** are
specialist rooms, both a fraction of the main channel's size. This site is the only place
you control where a main-channel viewer can be told the other two exist and what they're
for.

So don't put up three logos. Put up three sentences — each channel gets one line saying who
it's for and what they'll get. Someone decides in about two seconds, and a logo gives them
nothing to decide with.

Abby's Retro Rescue has a direct revenue path attached: nostalgia video, restoration video,
buy the doll. Link every Etsy piece to the video of it being restored — that's the
difference between selling a used doll and selling a doll someone watched come back to life.

### Move 4 — Restart Your Life On Tape with the same trick that runs the Gen X Files

The honest version first: **sending traffic to a channel that hasn't posted in two years
mostly wastes it.** Someone clicks through from your best-trafficked page, sees the newest
video is from 2023, and leaves with a slightly worse impression than if you'd never linked
it. YouTube won't recommend a dormant channel either, so the traffic doesn't compound.

That's not an argument for hiding it. It's an argument for giving it a reason to wake up,
and the reason is already in your own playbook.

The Gen X Files works because people will hand over something personal for the chance to
have it seen. *Your Life On Tape* is the same emotional product in a different format —
except the ask is better, because **half your audience has a box of unwatched VHS tapes in a
closet and no way to play them.**

So put the same kind of form on the site: *send us your tapes, we'll digitize them, we'll
send you the files back, and with your permission we'll share the good bits.* That one offer
restarts the channel with a content supply you don't have to hunt for, captures another
email address, gives people a reason to visit the site rather than just watch a video, and
turns a dormant experiment into the most distinctive thing you do. Nobody else is offering
that.

The site can also do something none of the channels can alone: run a Gen X Files story about
a 1984 birthday party *next to* rescued footage of somebody's actual 1984 birthday party.
Written memory and moving picture, same page. That pairing is the strongest thing in this
plan and it only exists because they happen to run both.

Two practical cautions. Tapes from estate sales contain identifiable people who never agreed
to be on YouTube, and anything taped off-air is somebody else's copyright — worth a clear
policy on what gets posted before scaling this up, not after. And a submission offer means
physical tapes arriving at the PO box, so the turnaround promise needs agreeing before the
form goes live.

---

## Stack

| Layer | Choice | Why this one |
| --- | --- | --- |
| Framework | Next.js + TypeScript | Deploys straight from GitHub on every change |
| Hosting | Vercel | Free tier covers this; preview link per change for review before go-live |
| Styling | Tailwind | Fast to iterate on look and feel |
| Database | Vercel Postgres | Gen X Files submissions, tape submissions, subscribers, cached episodes |
| Email | Resend | Submission alerts, plus newsletter sends |
| YouTube | Data API v3, cached | Latest videos from all three channels appear automatically |
| Podcast | anchor.fm feed, parsed on a schedule | New episodes appear with no manual step — and survives the rename |
| Etsy | Public shop feed | Keeps "Just Rescued" current automatically |
| Analytics | Vercel Analytics + click tracking | Shows which platform the audience actually uses |
| Accounts | None yet | Deliberately — see below |

---

## Four phases

**1. Confirm and design.** Inventory is locked and the brand question is settled. What's
left is agreeing the look, and deciding whether Your Life On Tape restarts or is presented
as an archive.

**2. The landing page.** Built and live at https://ourgenxlife.vercel.app — all three
channels with a line each, the Gen X Files form, the tape form, the podcast reading straight
from the feed, merch split in two, socials, about and contact. Nothing points at
ourgenxlife.com yet; the current site is untouched.

**3. The archive and the list.** Submissions into a database, an archive page per story,
email capture, automatic notifications. Where the site stops being a brochure and starts
compounding.

**4. Automation and measurement.** YouTube, RSS and Etsy feeds wired in so nothing needs
updating by hand, plus outbound click tracking.

### Accounts — later, and only with a reason

A login that gives the audience nothing is just friction on the front door. The reason will
arrive on its own, and it'll probably be one of two things: letting someone **claim the
story they submitted**, or giving subscribers **early access to Etsy drops**. Both are worth
signing up for. Neither is worth building before there's traffic to serve.

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

### Blocked — needs Abby in person

- [ ] **Etsy API key.** Register a free app at etsy.com/developers under Abby's Etsy
      account, then set `ETSY_API_KEY` in the Vercel project. Public shop listings only
      need the app key — no OAuth. Until it's set, the "Just Rescued" strip on the
      homepage stays hidden and the shop section falls back to its written pitch.
- [ ] **Your Life On Tape channel ID.** YouTube Studio → Settings → Channel → Advanced,
      copy the `UC…` id. Goes into `CHANNEL_IDS.yourLifeOnTape` in `lib/youtube.ts`.
      Only the `@handle` is known, and the RSS feed needs the id. Once it's in, that
      channel's uploads join the video wall automatically like the other two.

### Everything else

- [ ] **Does Your Life On Tape restart, or get listed as an archive?** Move 4 assumes it
      restarts. If there's no appetite for that right now, say so and it gets presented
      honestly as a back catalogue rather than sending people to a channel that looks
      abandoned.
- [ ] **Which company each domain is registered with** — ourgenxlife.com and our80slife.com.
      Not needed until the new site is signed off, but worth finding now.
- [ ] **Rename the podcast in Spotify for Creators.** Needs Abby, since the login sits with
      her. Ten-minute job with four years of catalogue riding on it.
- [x] Third YouTube channel — found: Your Life On Tape
- [x] Brand direction — Our Gen X Life is the main brand, rebrand already done
- [x] our80slife.com — already redirects; recreate that on Vercel
- [x] Spreadshop URL
- [x] Spotify and Apple Podcasts links
- [x] RSS feed and host — Spotify for Creators, formerly Anchor
- [x] Access to the podcast owner account confirmed
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
