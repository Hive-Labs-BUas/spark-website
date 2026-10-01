# Look & Feel Upgrade: Footer, Interns, Mobile, SEO & Site-wide Alignment

## 1. New footer (replaces the three-tier stack)

One cohesive dark footer instead of three separate blocks:

- A slim gold accent strip at the very top of the footer: one short line ("Ready to join the Guardians?") with an inline, compact "Join Our Discord" button — not a full gold block, just a thin band that ties into the footer below it.
- Below it, one dark panel holding everything on a shared baseline grid:
  - Wordmark "BREDA GUARDIANS" plus the tagline.
  - Two link columns: Explore (About, Membership, Research, Interns, FAQ, Contact) and More (News, Timeline, Hall of Fame, Opening Hours).
  - Compact newsletter signup ("Stay in the loop", email field, Subscribe) with the same rounded corners and 48px control height used elsewhere.
- Bottom row inside the same panel (no divider line, separated by spacing only): social icons left, copyright + Privacy Policy right, small muted text.
- Mobile: centered wordmark, newsletter, then the Explore/More accordions (Explore open), socials and copyright centered at the bottom. Same accent strip, stacked.

All existing URLs and the Discord invite stay as they are; Instagram/Twitch/YouTube remain placeholders.

## 2. Intern profile cards return

- Restore four intern cards using the current open roles as the titles: Event Manager, Content Marketing Manager, Overall Manager, Research Intern.
- Each card: portrait photo, role tag, name, one-line blurb — matching card style, equal heights, aligned grid.
- Names and portraits are believable placeholders generated for now, clearly swappable once real names and photos arrive.
- The empty-state block on Interns and the About team teaser go back to showing these cards.
- Open positions section below the profiles keeps its four cards and per-role "Apply for this Position" buttons.

## 3. Site-wide alignment and modern polish

- Consistent vertical rhythm: one section spacing scale applied to every page, so no page feels tighter or looser than its neighbours.
- Consistent heading scale (page title, section title, card title) — fixes oversized/undersized headings, notably on Interns where a section is currently squeezed onto one line.
- Uniform card treatment: same radius, border, background surface and hover lift/glow across news, research, positions, membership and path cards.
- Uniform control sizing: buttons and inputs share height, radius and font treatment.
- Deeper visual work on the three key pages:
  - Home: tighten hero-to-section transitions and align section intros to one pattern.
  - About: balance hero image with the stats row, even column widths.
  - Membership: equal-height tier cards with aligned price, benefit list and CTA.

## 4. Mobile-friendliness pass

- Audit every page at phone width (393px) for horizontal overflow, cramped spacing and misaligned sections; fix any instance found.
- Verify tap targets are at least 44px on all mobile links and buttons, including the new footer.
- Re-check the hero character layering, card grids and tables so they stack cleanly on small screens.
- Confirm the mobile menu and footer accordions remain smooth and scrollbar-free.

## 5. SEO keyword alignment

Weave the supplied keyword list into real content — naturally, never stuffed:

- Page titles, descriptions and headings: prioritise "Breda Guardians esports", "BUas esports", "esports Breda", "gaming community Breda", "student esports Netherlands", plus Dutch variants like "esports vereniging Nederland", "gamen in Breda" and "Breda esports vereniging".
- Homepage hero and intro copy: "gaming community Breda" and "Breda University of Applied Sciences esports" worked into the first paragraph.
- Membership page: "Breda Guardians membership" and "esports club membership" phrasing in headings/copy.
- Interns page: "esports internship Netherlands" and "become an esports intern" angle.
- FAQ: add/answer questions matching long-tail searches such as "how to join an esports team in the Netherlands" and "esports tryouts".
- News: publish 2–3 articles built on long-tail topics (e.g. Breda esports events, tryout announcements, an introduction to the Hive gaming space).
- Game-specific keywords (Valorant, League of Legends, Rocket League, CS2) only where a roster actually exists; otherwise leave for later.
- Update page metadata, headings and body copy per page; keep the existing sitemap, robots.txt and structured data intact.

## Technical notes

- Rewrite `src/components/site/Footer.tsx` as one composition; add/adjust the accent-strip style in `src/styles.css` and retire `footer-cta-banner`.
- Repopulate `INTERNS` in `src/lib/site-data.ts` (name, role, photo, blurb) with the four roles; generate four portrait images into `src/assets/`.
- Restore card rendering in `src/routes/interns.tsx` and the About team teaser.
- Normalise spacing/heading/card utilities in `src/styles.css` and apply across routes.
- SEO changes live in each route's `head()` metadata and visible page copy; news content goes into the existing news table (new rows).
- No backend or business-logic changes.
- Verify with a typecheck, a clean build, and Playwright screenshots at 1280px and 393px.
