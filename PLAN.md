# Our Gen X Life — Website Rebuild Plan

Prepared for Keith & Abby · 15 August 2026 · Draft for review

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
like part of the show instead of to strangers passing through. Every recommendation below
serves that one shift.

---

## Inventory

**How this was gathered:** the network policy on the build machine blocks ourgenxlife.com
and youtube.com directly, so this is reconstructed from search results plus the owners'
own list — not from reading the live pages. Every URL needs a quick eyeball before launch.

| Item | Points to | Status | Note |
| --- | --- | --- | --- |
| YouTube — main | `youtube.com/@OurGenXLife` | Confirmed | Channel ID `UCMJh6uOm80WByahFlweGz0g` |
| YouTube — Abby's Retro Rescue | `youtube.com/channel/UCXybtY7smTIi1fVjRiZa7_Q` | Confirmed | No custom handle found — worth claiming one |
| YouTube — third channel | — | Not found | See question 3 |
| Spreadshop | — | Need URL | Couldn't surface it |
| Etsy | `etsy.com/shop/AbbysRetroRescue` | Confirmed | Note the spelling — "Abbys", no E, no apostrophe |
| Instagram | `instagram.com/ourgenxlife` | Confirmed | Listed as "Keith & Abby \| Our Gen X Life" |
| Facebook | `facebook.com/OurGenXLife` | Confirmed | — |
| Pinterest | `pinterest.com/abbyrkeith` | Confirmed | Personal handle, not the brand |
| Podcast page | `ourgenxlife.com/podcast` | Keep, rebuild | See question 4 |
| Spotify | — | Need URL | — |
| Apple Podcasts | — | Need URL | — |
| Google Podcasts | — | Delete | Platform no longer exists — see question 1 |
| RSS feed | — | Demote | Almost certainly fine — see question 2 |
| Gen X Files | `ourgenxlife@gmail.com` | Rebuild as form | Biggest opportunity on the site |
| Contact | `ourgenxlife@gmail.com` · PO Box 751, Andover, KS 67002 | Confirmed | — |

---

## The four things you flagged

### 1. The Google Podcasts link is dead — you're right, delete it

Not a broken link on your end. Google shut Google Podcasts down entirely in 2024 and
moved listeners over to YouTube Music. There's nothing to fix and nothing to point it at.
Remove the button and put **YouTube Music** in that slot — same listeners, and it points
at a platform you're already on.

### 2. The RSS feed just shows a wall of text — that's what a healthy feed looks like

RSS is an XML file, not a web page. It's written for podcast apps to read, so a browser
opening it directly shows the raw markup. The wall of text is the feed working, not the
feed broken.

The real test is whether Apple and Spotify are picking up new episodes on schedule. If
they are, leave it alone. What should change is where it sits: an RSS link in the main
navigation sends curious people to a screen full of code and makes the site feel broken.
It belongs as a small icon in the footer — plumbing, not a destination.

### 3. Is there a third channel? — I can only see two

The main channel and Abby's Retro Rescue. Some searches also surface a
`music.youtube.com` version of the main channel, but that's the same channel mirrored
into YouTube Music automatically, not a separate one — worth ruling out before hunting.
If a third genuinely exists, send the link.

### 4. Do you want to keep the podcast page? — keep it, but rebuild it

As a list of links out it earns nothing; anyone who wanted Spotify would have gone to
Spotify. As a page where episodes actually play, pulled in automatically from the feed
with platform buttons underneath, it becomes somewhere a first-time visitor can sample
the show without committing to a subscription. The difference between a signpost and a
shop window.

---

## Three moves that change the numbers

### Move 1 — Turn the Gen X Files into a form

Submitting a story currently means opening Gmail, composing a message, remembering to say
whether you want to be named or anonymous, and hoping it arrived. That's four points where
someone gives up. Most do.

A form — story, name-or-anonymous, email — removes all four and produces a database
instead of an inbox thread. What that database is worth:

- **A searchable Gen X Files archive.** Free content nobody had to write, on exactly the
  nostalgia terms people search for.
- **An email list of the warmest possible audience.** Someone whose story was read on air
  will buy a shirt. A stranger scrolling past won't.
- **A reason to email on release day.** "Your story is in this week's episode" pulls
  people to YouTube the hour it goes live — the window the algorithm is watching. This is
  the most direct lever available on view counts.

### Move 2 — Stop filing Spreadshop and Etsy under "Stores"

Two different businesses; merging them under one nav word costs sales on both.

**Spreadshop** is print-on-demand apparel: unlimited stock, thin margin, bought on
identity. Someone buys it because they're Gen X and want to say so.

**Etsy** is Abby's restored one-of-a-kind vintage: real margin, genuine scarcity, bought
on desire. When a piece is gone, it's gone.

Scarcity is the strongest selling tool here and the current site buries it behind a menu
item. Put a live **"Just Rescued"** strip on the homepage pulled from the Etsy shop,
showing what's available right now. Keep apparel as a separate, quieter "wear the brand"
call further down. One creates urgency, the other creates identity — they shouldn't
compete for the same click.

### Move 3 — Use the site to feed Abby's channel

Abby's Retro Rescue is almost certainly a fraction of the main channel's size, and it's
the one that ends in a sale. The path already exists — nostalgia video, restoration video,
buy the doll — but nothing on the site walks anyone down it.

Present the two channels on the homepage as one household with two rooms rather than two
separate brands. Then link every Etsy piece to the video of it being restored. That's the
difference between selling a used doll and selling a doll someone watched come back to
life.

---

## Stack

| Layer | Choice | Why this one |
| --- | --- | --- |
| Framework | Next.js + TypeScript | Deploys straight from GitHub on every change |
| Hosting | Vercel | Free tier covers this easily; preview link per change for review before go-live |
| Styling | Tailwind | Fast to iterate on look and feel |
| Database | Vercel Postgres | Gen X Files submissions, subscribers, cached episodes — small enough to manage for them |
| Email | Resend | Submission alerts to their Gmail, plus newsletter sends |
| YouTube | Data API v3, cached | Latest videos from both channels appear on their own |
| Podcast | Existing RSS feed | New episodes show up with no manual step |
| Etsy | Public shop feed | Keeps "Just Rescued" current automatically |
| Analytics | Vercel Analytics + click tracking | Shows which platform the audience actually uses |
| Accounts | None yet | Deliberately — see below |

---

## Four phases

**1. Confirm and design.** Lock the inventory above, agree on the look. Nothing ships —
mostly waiting on the open items below.

**2. The landing page.** One page with everything on it: hero, both channels, Gen X Files
form, merch split into its two halves, podcast player, socials, about and contact. The
whole of the original ask, live on a real URL. Most of the value lands here.

**3. The archive and the list.** Submissions flowing into a database, an archive page per
story, email capture, automatic notifications. Where the site stops being a brochure and
starts compounding.

**4. Automation and measurement.** YouTube, RSS, and Etsy feeds wired in so nothing needs
updating by hand, plus outbound click tracking. From here the site maintains itself and
reports what's working.

### Accounts — later, and only with a reason

Logins and blog posts came up as a someday thing. Better to wait for a reason than to
schedule it — a login that gives the audience nothing is just friction on the front door.

The reason will arrive on its own, and it'll probably be one of two things: letting
someone **claim the story they submitted**, or giving subscribers **early access to Etsy
drops** before they go public. Both are worth signing up for. Neither is worth building
before there's traffic to serve.

---

## Moving the domain without breaking anything

- **Email.** If anything receives mail on the ourgenxlife.com domain, changing DNS can
  silently kill it. Check the MX records before touching anything. The public contact is a
  Gmail address, so this is probably fine — but "probably" isn't good enough to skip.
- **Existing links.** `/podcast` is indexed and linked from elsewhere. Old paths get
  redirected to new ones, or that traffic evaporates on launch day.
- **The cutover.** Build on a Vercel preview URL, review the real thing, and only then
  point DNS. The current site stays up until the moment of the switch — no window with no
  website.

---

## Open items

- [ ] The **Spreadshop** URL
- [ ] **Spotify** and **Apple Podcasts** show links
- [ ] The **RSS feed** URL, and who hosts the podcast
- [ ] Whether there's genuinely a **third YouTube channel**
- [ ] Who holds the **domain registrar login** (not needed until phase 2 is signed off)
- [ ] **One decision: Abby or Abbey?** Etsy says *AbbysRetroRescue*, but it's written both
      ways elsewhere. Pick one and everything gets made to match — people can't find you if
      the spelling moves around.
- [ ] Whether **Pinterest** matters. Currently on a personal handle rather than the brand —
      worth renaming if it's a real traffic source, worth just linking and forgetting if not.

---

## A note on the name

"Gen X Files" isn't unique to this brand. There's an unrelated site at thegenxfiles.com
and at least one political column under the same name. That doesn't matter for the show,
but it matters for search, because you'd be competing for a phrase nobody owns.

The fix costs nothing: title the archive and episode pages after the *specific story*
rather than the segment name. Someone searching for the mall arcade they grew up in should
find your page about it. Nobody is searching for "Gen X Files."
