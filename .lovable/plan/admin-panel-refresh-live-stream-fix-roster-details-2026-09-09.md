# Admin panel refresh, live stream fix, roster details

## 1. Open articles straight from the admin list

- Every row in the Articles tab (News, Research, Hall of Fame) gets an "Open page" action next to Edit/Duplicate/Delete, opening the public page in a new tab.
- Links per type: News uses its link name, Research uses its entry page, Hall of Fame opens the Hall of Fame page anchored to that entry.
- Unpublished items still show the action, with a note that the page is only visible to staff until published.

## 2. Live page: get the stream showing

The embed currently only allows the page's own address. Inside the Lovable editor the page runs in a frame, and Twitch refuses to play unless every surrounding address is allowed. Fix:

- Pass all surrounding addresses (page host plus editor/preview hosts) to the player and chat embeds.
- Add a clear fallback panel when the embed cannot load or the channel is offline: channel artwork, an explanation, and a button to open Twitch directly.
- Verify in a real browser that the player renders on the preview and on the published address.

## 3. Nationality and age on roster players

- Roster player editor gains a country picker (flag + name) and a date of birth field; both optional.
- Player cards show the flag and calculated age everywhere they appear.

## 3b. New rosters structure

- Rosters overview becomes a clean list/grid of team names with the game they play (logo, tagline, player count) — no rosters on this page.
- Clicking a team opens its own page with the full roster: photo, name, in-game handle, role, nationality flag, age, plus the team's latest and upcoming matches.
- Editable in the admin panel as today; the Hall of Fame subpage stays where it is.

## 4. Redesigned admin panel

Same sections, cleaner structure:

- New shell: sticky header with the current section name, a short one-line description of what the section is for, and the primary action button in a consistent place.
- Left navigation grouped into "Content" (Articles, Match results, Teams & rosters, Site content), "People" (Requests, Members) and "Shop & Hive".
- Every section starts with a short help line for new interns explaining what it does and what they are allowed to change; tooltips on non-obvious buttons (duplicate, visibility, sort order).
- Cramped controls (role buttons, small icon rows) get consistent spacing, labels and sizing.
- Interns keep add/edit rights; delete stays admin-only, and the panel says so where relevant.

### Dashboard

- Top row: today / last 7 days / last 30 days visitors and page views.
- Below: most visited pages, and visitors by country (list with flags; a compact map only if it stays fast).
- Existing operational blocks (needs attention, membership activity) stay, restyled.

## 5. Visitor statistics (new)

Built-in hosting analytics are not readable from inside the app, so the site records its own page views.

- New `page_views` table: path, referrer, country, day, timestamp. No names, no emails, no addresses stored.
- A tiny recording call fires once per page view; country comes from the hosting edge header, so no third-party tracking.
- A staff-only summary reads aggregated counts (per day, per page, per country). Nothing is visible to normal visitors.
- Real-time "watching now" is skipped as agreed.

## Technical notes

- `page_views` migration: table + GRANTs (insert for anon/authenticated, reads only through a staff-checked server function), RLS enabled, no public select policy.
- Recording and aggregation via `createServerFn`; aggregation guarded by the existing staff check.
- Twitch: build the `parent` list from `window.location.hostname` plus ancestor origins; multiple `parent` params for player and chat.
- `team_players` already has `country_code` and `birth_date` — no migration needed for section 3, only editor and display work.
- Verify with typecheck, build, and browser checks at 393px, 1440px and 3840px.
