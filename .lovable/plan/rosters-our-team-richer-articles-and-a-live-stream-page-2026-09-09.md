# Rosters, Our Team, richer articles and a live stream page

A large but well-defined pass: fix the two-teams-per-game bug, rename two pages,
add a Hall of Fame timeline, upgrade the article writing tools, and make
everything editable in the admin panel.

## 1. Two teams for the same game (bug)

Confirmed in the database: there are already two Counter-Strike 2 teams
(BG CS2 and BG CS2 Academy). Two things break:

- The filter buttons on the Hall of Fame page are labelled with the game name,
  so both CS2 teams show an identical button.
- When a result has no team attached, it is matched to a team by game name, so
  the same result appears under both CS2 teams.

Fix: buttons show the team name (with the game as a small line above), and
results only ever belong to the team they were saved against.

Also: Rocket League, League of Legends and Super Smash Bros. Ultimate are all
still in the database but were switched to hidden, which is why only Valorant and
the two CS2 teams show up. All three go back to visible (Valorant already is), so
the Rosters page shows the full five games again. Their rosters and results stay
exactly as saved.


## 2. Renaming

- Hall of Fame page becomes **Rosters** (`/rosters`). Old links keep working.
- Interns page becomes **Our Team** (`/our-team`). Old links keep working.
- Navigation, mobile menu, footer, sitemap and page titles/descriptions follow.

## 3. Hall of Fame becomes a subpage of Rosters

New page at `/rosters/hall-of-fame` with:

- An interactive timeline of achievements since the club was founded: a vertical
  (mobile) / alternating (desktop) track of dated milestones you can click to
  expand for the full story and photo. Built from the existing achievements you
  already manage in the admin panel.
- A **Former team members** section listing past interns and staff, grouped by
  the period they were with us.
- The achievement/article cards on the Rosters page link into this timeline.

Former members need a way to mark someone as "past" — interns get an
"Active / Alumni" switch plus optional start and end period.

## 4. Players get nationality and age

Each player gains a country and a date of birth. Rosters and team pages show a
small flag next to the name and the current age. Both are optional and blank
players simply show nothing extra.

## 5. Our Team: core people above the interns

The team block gets two tiers:

- **The core team** — Ruben, Antoine, Jelte and Bram, shown first in larger
  cards.
- **Interns** — the current rotating crew, as today.

Each person gets a role, short bio, photo and optional LinkedIn, all editable.
I will create the four core profiles with their names and a neutral role/bio and
no photo; send me their exact roles, bios and photos (or add them yourself in
the admin panel) and they will show up.

The core team appears **only** on Our Team — every other place that shows people
(About, homepage, anywhere else) keeps showing the interns only.


The About page currently uses a hard-coded list of four interns, which is why it
never updates. It will read the same live team data as Our Team.

## 6. Better articles — news, research and Hall of Fame alike

One shared editor, used for **every** article type (news stories, research
studies and Hall of Fame entries), so nothing is research-only:

- **Formatting**: a small toolbar for bold, italic, headings, lists, quotes and
  links.
- **Images inside the story**: upload and place images anywhere in the body, not
  just the cover image.
- **Buttons and social links**: turn any link into a button, and drop in links to
  Instagram, TikTok, Twitch, YouTube, LinkedIn or Discord.
- **Documents**: attach a PDF (for example a research paper) shown as a
  download/view block inside the article.
- **Length**: the current cap on body text is lifted.
- Article pages render the formatting, images, buttons, links and attachment
  properly — research studies and news stories get a full body, not just a
  summary.


## 7. News articles are readable again + homepage carousel

Individual article pages come back at `/news/<article>` (no overview page, as
chosen). The homepage gets a swipeable news carousel that links to them.

## 8. Upcoming matches

Results and fixtures live in one place. Save a match with a future date and no
score and it shows as **Upcoming** on the team blocks and team pages; fill in the
score later and it moves to results automatically.

## 9. Live stream page

New **Live** page with the Breda Guardians Twitch player and chat side by side
(stacked on phones). When the channel is offline Twitch shows its own offline
screen. Linked from the navigation, the mobile menu and the footer, plus a
compact "Watch us live" block on the homepage that jumps straight to it.


## 10. Founded date

"Est. 2020" becomes "Est. 2015" on the homepage, and the founding year in the
site data and search-engine markup follows.

## 11. Admin panel: editing everywhere, and a cleaner layout

Interns can currently only be added, hidden or given a LinkedIn link — name,
role, bio and photo cannot be changed. Every existing intern (and every new one)
gets a full **Edit** form: name, role, bio, photo, LinkedIn, active/alumni,
period and order. The same proper edit form is added across the panel: core team,
open positions, teams and players, achievements, FAQs, results/fixtures, shop
products and social links. Deleting stays admin-only.

The panel also gets a tidy-up pass: cramped controls (the "Make admin / Make
intern / Make member" row on Members is the worst offender) become a single
clear role picker; add-forms move into dialogs so lists stay readable; rows get
consistent spacing, one obvious action area per row, and readable labels on
phones and tablets. No features are removed.

## 12. Missing images never look broken

Any picture that is empty, fails to load or was never uploaded — intern photos,
player photos, team images, article covers, product shots, partner logos —
falls back to a branded placeholder with the Breda Guardians logo instead of a
broken image icon. This works both in the admin panel previews and on the public
pages.



## Technical notes

- Migration: `team_players` gains `country_code` and `birth_date`; `interns`
  gains `is_core`, `alumni`, `started_on`, `ended_on`; `news`/`research`/
  `hall_of_fame` gain `document_url` (+ `document_name`), and `research` /
  `hall_of_fame` gain a `content` body column so they support full articles like
  news does; `match_results` score columns become nullable and gain `status`
  ('scheduled' | 'played') with existing rows backfilled to 'played'; the three
  hidden teams are set back to visible. All with GRANTs and staff/admin policies
  matching the existing `private.is_staff` pattern.

- Rich text stored as sanitised HTML; editor built on TipTap (`@tiptap/react`,
  starter kit, link + image extensions). Inline images and documents upload to
  the existing private `media` bucket and are served through the existing
  `/api/public/media/$` route.
- Routes: `rosters.tsx`, `rosters.hall-of-fame.tsx`, `our-team.tsx`,
  `news.$slug.tsx`, `live.tsx`; `hall-of-fame.tsx` and `interns.tsx` become
  redirects; `NAV_LINKS` in `src/lib/site-data.ts` stays the single ordered
  source; sitemap updated.
- `useTeamsWithSquads` drops the game-name result fallback and splits results
  into `upcoming` / `results`; SSR loaders in
  `src/lib/public-content.functions.ts` extended for the new pages and fields.
- Flags rendered from ISO country codes as emoji (no extra dependency).
- Verification: typecheck, production build, and Playwright passes at 393px,
  1440px and 3840px on the changed pages, plus a signed-in admin pass over the
  edit forms.

## Not included

No fabricated results, achievements, player details or bios. Any new profile or
milestone starts empty for you to fill in.
