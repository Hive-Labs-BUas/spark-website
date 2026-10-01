# Esports visual upgrade

Bring the whole site closer to the reference screenshots: warmer gold-tinted dark backgrounds, subtle texture, glowing cards and stronger section rhythm. No content, pricing or payment changes — apart from one new divisions section on the homepage.

## The look

- **Backgrounds**: replace flat near-black sections with warm dark gradients (black to a deep olive-gold tone), plus a very faint diagonal pinstripe texture and a soft gold glow along the top edge of key sections, exactly as in the screenshots.
- **Section headers**: gold dash + small uppercase label above every heading, big condensed display heading, muted one-line intro underneath. Applied consistently on all pages.
- **Cards**: rounded panels with a warm gradient interior, hairline gold-tinted border, and a gentle gold lift on hover. Icons sit in a small gold-tinted tile at the top-left.
- **Membership cards**: same styling as the reference — the highlighted tier gets a gold ring and glow with the badge on top, the others stay quiet. Prices, tier names and the in-person payment flow stay untouched.
- **Dividers**: thin fading gold hairlines between sections instead of hard grey lines.
- **Footer**: keep the current structure, restyle to match the reference (wordmark, short blurb, social icon buttons, two link columns, fading gold hairline above the bottom row).

## Homepage divisions section

Add a "Our Divisions — Five games. One org." section with five cards (Valorant, CS2, Rocket League, League of Legends, Super Smash Bros. Ultimate), each with a game letter tile, game label, roster name and a short line of text. No new page; the cards are not links for now.

## Pages touched

Homepage, About, Shop, Research, News, Hall of Fame, Interns, FAQ, Contact, Opening hours, Timeline, Privacy, Auth, Account — restyle only, same content and layout order.

## Technical notes

- New tokens and utilities in `src/styles.css`: warm gradient backgrounds, pinstripe texture, top glow, gold hairline, card surface gradient. No hardcoded colours in components.
- Shared pieces in `src/components/site/Bits.tsx` (section wrapper, eyebrow heading, card shell) get the new styling so every page updates at once; page files only change where they use one-off markup.
- Divisions data added to `src/lib/site-data.ts`; section rendered in `src/routes/index.tsx`.
- Mobile checked at 393px for overflow and tap targets; typecheck and build run before finishing.
