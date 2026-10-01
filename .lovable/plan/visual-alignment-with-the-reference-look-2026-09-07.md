# Visual alignment with the reference look

Goal: match the reference examples — same typeface family feel, a softer warm gold, much fainter background stripes, more gradient depth, and membership cards with a raised, glowing middle card.

## Typography

- Headings switch to a condensed technical display face (Rajdhani, as used in the reference) instead of the current Anton/Aston stack. Keeps uppercase headings but reads lighter and wider, so big titles stop feeling heavy.
- Body text switches to Inter (reference body font) replacing Open Sans.
- Keep the existing reduced heading sizes; only the family and weights change.

## Colour

- Gold moves to the reference tone: a slightly warmer, softer amber-gold rather than the current acid yellow.
- Backgrounds and card surfaces move to the reference's neutral warm near-black steps, with slightly lighter, clearer borders so cards read as panels instead of flat blocks.
- Muted text lightens a touch for readability.

## Background stripes

- Diagonal stripe texture drops to roughly a fifth of its current strength (near-invisible off-white weave at 135°, matching the reference) so it reads as texture, not lines.
- Stripes are removed entirely from: page heroes (home, about, shop), the footer, and content blocks that should read as solid panels — including the "what membership is for" / Support The Hive block, membership and shop cards, FAQ accordion groups, and admin panels.
- A new plain warm gradient band replaces the striped band in those places, so those sections keep depth without texture.

## More gradient

- Hero and section backdrops gain layered radial gold glows plus vertical warm gradients (reference image 4 style).
- Primary buttons get a gold gradient fill with a soft outer glow; outline buttons get a faint gradient wash on hover.
- Selected large headings and price figures get a subtle gold-to-bright-gold gradient text treatment.
- Cards get a gradient panel surface (light top, darker bottom) with a fading gold top hairline.

## Membership cards

- Three cards in a row; the middle (Legendary, most popular) sits raised and slightly larger with a gold border, gradient interior and outer glow — matching the reference pricing block.
- "MOST POPULAR" becomes a gradient gold pill at the top of the middle card.
- Prices render large in gradient gold with the period in muted text next to them; perks use gold check marks.
- Content, tier names, prices and the in-person payment flow stay exactly as they are.

## Technical notes

- Font links in `src/routes/__root.tsx` swap to Rajdhani + Inter; `--font-display` / `--font-sans` updated in `src/styles.css`.
- Token changes in `src/styles.css`: `--primary`, `--gold-bright`, `--background`, `--surface`, `--surface-2`, `--border`, `--muted-foreground`.
- Body stripe layer and the `warm-band` utility get much lower opacity; add `warm-band-plain` (no stripes) and `no-stripes` utilities, plus `gradient-text` and a gradient primary button variant.
- Apply `warm-band-plain` where stripes currently bleed over heroes, footer and panel sections (`src/components/site/Bits.tsx`, `Footer.tsx`, `src/routes/index.tsx`, `shop.tsx`, `about.tsx`, `faq.tsx`).
- Membership card markup restyled in `src/routes/shop.tsx` only; no data, pricing or request-flow changes.
- Verify with typecheck, build, and 393px/1440px screenshots for overflow.
