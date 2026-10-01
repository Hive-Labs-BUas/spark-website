# Admin shortcuts, active membership highlight, roster CTA, game logos

## 1. Clickable dashboard blocks (admin)

Each stat block on the admin dashboard becomes a button that jumps to the matching tab:

- Active members -> Members
- Revenue this month -> Members (payments and orders live there)
- Open messages -> Requests
- Newsletter signups -> Requests
- Published articles -> Articles
- Open applications -> Requests

The blocks get a hover state, a small arrow and keyboard focus so it is obvious they are clickable. Tap area stays at least 44px high for phones.

## 2. "Your active membership" state on the shop page

When the signed-in visitor already has an active membership, their tier card is marked as active instead of just being another buy option:

- An "Active — your membership" badge on the card.
- A soft animated gold glow around the card border so it clearly stands out.
- Renewal date shown on the card when we have one.
- The button changes from "Request <tier>" to a link to the account page ("Manage membership"), so nobody accidentally requests the same tier twice.
- Other tiers show a quiet note that switching tiers goes through the team, matching the existing rule.

If nobody is signed in, or the membership is not active, the cards look exactly as they do today.

## 3. Sixth block on the Teams / Our Rosters page

Next to the five team cards, a sixth card in the same style: "Are you next?" — short invite to try out, with a button to the Discord (opens in a new tab). Same layout treatment as the homepage divisions CTA so the two pages feel consistent.

## 4. Game logos on the homepage

The five uploaded logos (Valorant, Counter-Strike 2, Rocket League, League of Legends, Super Smash Bros.) are added as CDN images and attached to the matching team records. Because the homepage division cards, the Teams pages and the Hall of Fame all read the team logo, the real logos appear in all three places at once, and staff can still swap any logo later in the admin panel.

The logo badge gets a slightly larger, padded frame so the wide Counter-Strike wordmark and the tall League crest both sit neatly without stretching. The letter fallback stays for any team without a logo.

## Technical notes

- `src/components/admin/sections/Overview.tsx`: `Stat` gains an optional `go` prop and renders as a `button` calling the existing `onGo(section)`.
- `src/routes/shop.tsx`: use the existing `useMyMembership(user?.id)` hook; compare `membership.tier` to `tier.id` and `status === "active"`. New `card-active-glow` utility in `src/styles.css` (gold ring + slow pulse, respecting reduced-motion).
- `src/routes/teams.index.tsx`: sixth card reusing the `division-cta-card` styling and `SITE.discordUrl`.
- Logos: `lovable-assets create` from the uploads, pointers under `src/assets/games/`, then one data migration setting `teams.logo_url` per game (no schema change).
- Verify with typecheck, build and browser checks at 393px, 1440px and 4K for the homepage, `/teams`, `/shop` and the admin dashboard.
