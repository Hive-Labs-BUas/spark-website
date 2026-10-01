# Finish the admin, shop and teams polish

## 1. Clickable dashboard blocks (admin)
Every stat block on the admin dashboard becomes a button that jumps to the matching tab:
- Active members and Newsletter signups to Members
- Revenue this month to Shop
- Open messages and Open applications to Requests
- Published articles to Articles

They keep the same look, plus a hover highlight and keyboard focus so they read as clickable.

## 2. Glowing "Active" state on the shop membership cards
For a signed-in member with a running membership, their tier card on the shop page gets:
- a glowing gold border and soft outer glow
- an "Active — your membership" badge
- the buy button replaced by a link to their account page

Other tiers stay unchanged. Nothing about pricing or the payment flow changes.

## 3. New Counter-Strike 2 logo
The uploaded icon file is turned into a proper image and attached to the CS2 team, so it shows on the homepage division card, the teams page and the team page. The uploaded file is a small icon, so if it looks soft at card size I will say so and offer a crisper replacement.

## 4. Hall of Fame + Teams combined
The Hall of Fame page becomes the single home for teams, with `/teams` redirecting to it (team detail pages stay as they are).

Layout, top to bottom:
- Hero with the existing title
- A row of five compact game tabs/chips (logo + game name) that filter or scroll to the chosen team, so any team is one tap away
- Per team: a clean panel with logo, name, tagline, roster on the left, latest results on the right, and a link to the full team page
- A sixth "Are you next?" card inviting people to Discord for a tryout
- Trophies and milestones grid
- Stories from The Hive (latest news)

Everything stays editable in the admin panel (Teams & rosters, Match results, Hall of Fame entries).

## 5. Final width check
Phone (393px), laptop (1440px) and 4K (3840px) checked for spacing and no sideways scrolling.

## Technical notes
- `Overview.tsx`: `Stat` gets an optional `onClick` and renders as a `button`.
- `shop.tsx`: add `useMyMembership(user?.id)`, derive active tier by `tier` + `status === "active"`, apply a `glow-active` utility added to `styles.css`.
- CS2 icon: extract the largest frame with ImageMagick, upload via `lovable-assets create`, set `teams.logo_url` for the CS2 row.
- `hall-of-fame.tsx`: add the game chip nav (anchor + scroll), reuse `TeamBlock`/`ResultRow`, add the sixth CTA card; `teams.index.tsx` becomes a redirect to `/hall-of-fame`; update sitemap and any internal links pointing to `/teams`.
- Verify with `tsgo --noEmit`, `bun run build` and Playwright screenshots at the three widths.
