# Research Page & Study Pages Redesign

Turn the research section into the most striking part of the site: a bold header, a highlighted lead study, a magazine-style grid, and rich individual study pages.

## Research overview page

- **Hero header** in the same style as the About and Membership headers: dark layered background, gold accent, eyebrow "Research", strong title and short intro, plus a small line showing how many studies are published.
- **Featured study**: the newest study gets a wide panel with a large image, topic label, date, title, summary and a clear "Read the study" button.
- **Magazine grid** for the remaining studies: varied tile sizes (one large, others smaller) with full-bleed images, dark gradient overlay, topic label, title and date, gentle zoom and gold glow on hover.
- **Filters row** kept simple and clean: topic chips (All, Community Survey, Case Study, Report) each showing a count, plus a newest/oldest sort toggle on the right. Filtering happens instantly with a smooth fade of the grid.
- Empty state and loading placeholders match the new card shapes.
- Mobile: single column, chips scroll sideways without a visible scrollbar, tap targets stay comfortable.

## Individual study pages

- **Full-width image hero**: cover image behind the title with a dark overlay, topic label, date and estimated reading time; a thin gold reading-progress bar tracks scroll.
- **Key takeaways box**: highlighted panel with the study's main points, shown beside the text on desktop and above it on mobile.
- **Share row**: copy-link button (with confirmation) plus LinkedIn, X and WhatsApp share links.
- **Related studies**: up to three other studies at the bottom, preferring the same topic, using the new card design.
- Existing "Open published study" link stays when a study has one.

## Content

The takeaways are pulled from each study's own text, so nothing is invented. If a study has no clear points to pull, the box is hidden for that study.

## Technical notes

- Files: `src/routes/research.index.tsx`, `src/routes/research.$id.tsx`, new `src/components/site/ResearchCard.tsx`; reuse `EsportsPageHero`/`PageHeader` patterns from `src/components/site/Bits.tsx`.
- Related studies come from a new server function in `src/lib/articles.functions.ts` (or a filtered list query) so the page keeps its loader-based SSR and metadata.
- Reading time and takeaways are derived from the existing `summary` field — no schema change, no migration.
- All colours via existing tokens (gold `#F4D808`, near-black `#030202`), Aston/Anton headings, Open Sans body; no hardcoded colour classes.
- Keeps current SEO setup: unique title/description/OG per study, canonical links, plus Article/ScholarlyArticle structured data on study pages and breadcrumbs unchanged.
- Verified with a build and screenshots at 393px and 1440px for overflow and hover glow clipping.

## Also in this pass (from follow-up)

### About hero
- Restore the earlier About hero design (Rocket League car header) and add a soft fade at the bottom of the image so it blends smoothly into the section below instead of ending on a hard edge.

### Hero spacing audit
- Check every page hero (home, About, Membership, Research, Interns, FAQ, Contact, Hall of Fame) and reduce the gap between the hero and the first section where it currently feels too large, so the pages read tighter and more consistent.

### Homepage "What We Do"
- Reorder the three pillars to Community, Research, Compete, renumbering 01/02/03 accordingly. The "Content" pillar becomes "Research" pointing at the research archive, and Compete keeps its Hall of Fame link.

### Subtle page effects
- Add restrained motion, not everywhere: fade-and-rise on section entry (once per section, respecting reduced-motion), a light parallax drift on hero characters, counters that count up when the stats come into view, and a slim scroll-progress line on article pages.
- One extra full-width banner strip on the homepage between sections (short claim plus Discord call to action) to break the rhythm.
- No effects on form-heavy pages (auth, contact, account) to keep them fast and calm.
