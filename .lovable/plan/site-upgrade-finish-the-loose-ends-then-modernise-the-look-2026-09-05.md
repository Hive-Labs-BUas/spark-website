# Site upgrade: finish the loose ends, then modernise the look

Three stages, in order. Plus a set of quick fixes up front.

## Quick fixes (first)

- Breadcrumbs: hidden on phones, kept on desktop and tablet.
- About page hero: move the Rocket League car noticeably further right on both phone and desktop, so the headline sits in clear dark space and the car reads as a right-side feature.
- Homepage news/research row on phones: give the first card the same comfortable gap on the left as the gap between cards, so it no longer touches the screen edge.
- Mobile footer redesign: split the links into more, smaller topic groups, remove the divider lines between sections, and use spacing and subtle grouping instead so it reads cleaner.
- Article images: make sure every research and news item shows a strong image — a full-width picture on the article page and on its card. When a story has no picture, it gets a good-looking branded image block (gold-on-black, category and title) instead of an empty grey area, so nothing ever looks unfinished.

## Stage 1 — Make everything work properly

- Newsletter, contact and application forms: confirm every submission saves, shows a clear success message, and shows a friendly error if something goes wrong.
- Emails: the welcome, purchase and team-notification emails are written but need the sending service switched on and a verified sender address before they actually arrive. I'll wire the switch-on and flag exactly what you must supply (a sending domain).
- Social links: Instagram, Twitch and YouTube in the footer are still stand-ins — I'll swap in real ones if you give them, otherwise hide them rather than link nowhere.
- Stats on the About page (years active, teams, members, tournaments) are placeholder figures — I'll ask for the real numbers or mark them clearly.
- Membership: check the buy → pay → account-updated flow end to end and tidy the cancel/receipt screens.
- Empty and error states: every list, article and admin screen gets a proper message instead of a blank area.
- Admin: quick pass so news, research, applications and members are all manageable without confusion.

## Stage 2 — Visual polish pass

- One consistent heading and body text scale across every page (some pages still run bigger than others).
- Consistent section spacing, card styling, borders, corner rounding and gold-glow strength.
- Consistent buttons and links: same sizes, same hover behaviour, same focus outline for keyboard users.
- Consistent image treatment on cards and heroes.
- Restrained motion everywhere: same fade-up reveal, same timing, no new heavy effects.
- Mobile check on every page at phone width: no sideways scrolling, comfortable tap sizes.

## Stage 3 — Homepage rebuild

Once the rest is consistent, I'll rework the homepage as the strongest page on the site — sharper hero, clearer path into Membership, Research and Discord, and a more confident news/research showcase. Before building, I'll show you three rendered design directions to pick from, so the homepage looks the way you want rather than the way I guessed.

## Technical notes

- Breadcrumbs: hide `Breadcrumbs` below `md` in `src/routes/__root.tsx` (keep the BreadcrumbList JSON-LD rendering so structured data stays intact).
- About hero: adjust `imageClassName` offsets in `src/routes/about.tsx` across the mobile/`sm`/`md`/`lg` breakpoints; verify with Playwright at 393px and 1440px.
- Emails: `src/lib/email.server.ts` already targets Resend; requires `RESEND_API_KEY` plus a verified sending domain. Delivery cannot be verified until both exist.
- Polish pass: centralise repeated values in `src/styles.css` utilities and shared components (`Bits.tsx`, `ResearchCard.tsx`, `Motion.tsx`) rather than per-route tweaks.
- Homepage directions will lock the existing palette (#F4D808 / #030202) and Aston + Open Sans typography; only composition varies.
