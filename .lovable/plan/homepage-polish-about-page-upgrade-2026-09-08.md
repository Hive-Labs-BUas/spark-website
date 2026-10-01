# Homepage polish + About page upgrade

## Homepage

**Meet the interns section (new)**
Add a "Meet the team" band directly above "Latest — From The Hive", showing the four interns (photo, name, role, one-line description) with a link to the Interns page. It reads the same team data the admin panel manages, so changes there show up here automatically.

**Partner carousel cut-off**
The strip currently repeats the four partners only twice, which is narrower than a wide screen — so the loop runs out and leaves a blank gap. Fix: repeat the row enough times to always be wider than the screen, and use two identical tracks running side by side so the loop is seamless at every screen size. Also add soft fade edges left and right.

**Scroll arrow**
Move the "Scroll" arrow at the bottom of the hero up so it sits clear of the section edge on both phone and desktop.

**Game images in "Our divisions"**
Each division card gets the game's own image/logo instead of the single grey letter tile, pulled from the team records you can edit in the control room (Teams & rosters → picture + logo). Until a picture is uploaded for a game, the card falls back to a styled gold-on-black badge, so nothing looks broken. Each card also becomes a real link to that game's roster page.

**Spacing / breathing room**
Pass over the whole homepage rhythm so section gaps, headings and card grids line up consistently. Specific attention to "Choose Your Path" (tighter, more even card padding and a clearer gap under the heading) and the "Membership — Play More, Pay Less" block right below it, which currently sits too close and feels cramped on desktop.

**Member count**
"340+ Community Members" in the scrolling fact strip becomes "500+ Community Members".

## About page

**Hero**
Nudge the Rocket League car slightly left on phone, tablet and desktop so it sits better in frame.

**Numbers**
The four stat numbers get the gold gradient treatment (bright, warm gold rather than the current darker flat gold), matching the price figures in the shop. Members becomes 500+.

**What We Offer — redesign**
Replace the three plain image-and-text rows with a bolder editorial layout: one large feature panel for The Hive plus two supporting cards, each with a full-bleed image, gold number, subtle dark gradient over the photo, a short benefit list and a hover lift. Same three topics and copy intent, much stronger visual presence.

## Header

On phones only, "Breda" in the "Breda Guardians" header text uses the gold gradient while "Guardians" stays white. Desktop stays as it is.

## Technical notes

- `src/routes/index.tsx`: new interns section (via `useInterns()`), divisions grid switched to `useTeams()` data with image/logo and `/teams/$slug` links, scroll-cue offset, spacing pass.
- `src/components/site/Bits.tsx`: `Marquee` gains a repeat count so the track always exceeds viewport width, renders two tracks for a seamless loop, plus optional edge fades.
- `src/lib/site-data.ts`: ticker + `SITE_STATS` member figure to 500+.
- `src/routes/about.tsx`: hero `imageClassName` offsets, `gradient-text` on `CountUp` figures, new What We Offer markup.
- `src/components/site/Nav.tsx`: mobile wordmark split with `gradient-text` on "Breda".
- New/updated utilities in `src/styles.css` only (no hardcoded colours), tokens unchanged.
- Verification: typecheck, build, and Playwright screenshots at 393px, 768px and 1440px for `/` and `/about` with an overflow check.

## Open positions (Interns page)

- Role names get the gold gradient pill styling instead of the flat tag.
- "What You'll Do" grows from three short lines to a much fuller breakdown per role (Event Manager, Content Marketing Manager, Overall Manager, Research Intern): 6–8 concrete tasks each, plus a short "you'll learn" line, so applicants know exactly what the job involves.

## Opening hours

- Weekly schedule updated to Monday–Thursday 09:00–22:00 and Friday 09:00–18:00 (weekend closed), applied to the live hours data so the "open now" status uses it.
- Autumn break added as a special-days entry with a clear note about the Hive's availability during that week.

## Contact

- WhatsApp option removed.
- Discord line changes to: "Fastest way to reach us. Join the Discord and open a ticket."

## FAQ

- Topic chips at the top of the page (Getting Started, Membership, Tryouts & Competing, The Hive, Community & Discord, General). Tapping one scrolls smoothly to that category, with each category getting its own anchor. Works on phone and desktop.

## Footer

- Hive room number added to the location line: The Hive · Fe0.032 · Frontier Building, BUas Campus, Breda.
- Admin sign-in link: already removed earlier; verified none remains.

## Technical notes (additions)

- `src/routes/interns.tsx`: expanded `ROLES` content, gradient pill for role names.
- `src/routes/faq.tsx`: category anchor list + `scroll-mt` offsets.
- `src/routes/contact.tsx`: remove WhatsApp card, update Discord copy.
- Opening hours and autumn break change through a database migration (hours per weekday + one special day), so staff can still edit them in the control room.
- `src/components/site/Footer.tsx`: room number in the location line.
