# Discord CTA, Editorial Pages, Research and Spacing

## Goal
Make the site easier to read and navigate while preserving the existing dark Breda Guardians identity and using only supplied or editable content.

## Build

### 1. Session-based Discord prompt
- Add a compact, dismissible bottom-right Discord card to the shared site shell.
- Show it when either 55% of a scrollable page is reached or 15 seconds pass.
- Record dismissal/display in `sessionStorage`, so it appears at most once per browser-tab session and can return on a later visit.
- Exclude `/auth`, `/admin-login`, `/membership`, and every `/checkout/*` page.
- Use the existing Discord invite and keep it clear of the cookie banner on phones and desktops.

### 2. Cohesive editorial detail layout
- Create shared article-header and reading-column patterns for News, Research, and Team detail pages.
- Use a consistent featured-image treatment, category/game tag, title, and available source date. Team pages will omit a date because no real team publication date exists.
- Constrain prose to about 70 characters per line, increase line height and paragraph rhythm, and strengthen H1/H2/H3 hierarchy.
- Restyle blockquotes as distinct editorial callouts while preserving rich-text images, links, lists, buttons, and documents.
- Keep roster grids, match data, and team calls-to-action outside the narrow reading column so structured content remains scannable.

### 3. Research overhaul
- Add a concise Research-pillar introduction naming PlaySmart and the BUas partnership, based only on the facts supplied in this request.
- Replace the single topic control with combinable Year, Game, and Topic filters plus a clear reset/empty state and existing sort control.
- Treat the existing research category as Topic and add an optional, staff-editable Game field. Existing entries remain unlabelled until staff supplies a game.
- Extend PDF metadata with an optional stored file size captured during upload; show a clear `Download PDF` action on archive entries and detail pages, including size when known.
- Keep external study links separate from uploaded PDFs and correct reading time to use the full article body.
- Update the Research editor and public loaders for the new editable metadata without generating values automatically.

### 4. Site-wide spacing and alignment audit
- Make the existing shared `container-site`, section spacing, and editorial-width utilities the single spacing foundation.
- Audit every public and account-facing route for inconsistent outer gutters, section gaps, header-to-content spacing, and overly narrow/wide blocks.
- Normalize outliers to the existing 4/8/16/24/48/96-style rhythm while preserving deliberate compact bands, full-bleed imagery, tables, and horizontal rails.
- Check mobile, desktop, and 4K layouts for edge collisions, cramped sections, readable line lengths, and popup/banner overlap.

## Technical details
- Add a small database migration for optional Research `game` and `document_size_bytes` fields; no existing content is backfilled with guessed values.
- Reuse the current document upload, rich-text sanitizer, semantic color tokens, buttons, cards, and responsive container utilities.
- Keep all route metadata intact and update Research metadata only where the new fields provide real values.

## Verification
- Run the development build and inspect current diagnostics.
- Browser-test the Discord trigger, dismissal, session persistence, exclusions, and external invite.
- Test combined Research filters and PDF actions with current data, including entries missing Game or file size.
- Visually verify News, Research, Team, and representative remaining pages at phone, desktop, and 4K widths.