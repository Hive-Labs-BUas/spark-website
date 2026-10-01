# Site-wide usability upgrade

Six workstreams, all presentation-only — no content, pricing, or data changes.

## 1. Spacing: tighter sections, calmer mobile
- Reduce the global section rhythm so pages feel less stretched: desktop keeps comfortable breathing room, mobile gets noticeably tighter vertical spacing.
- On phones, trim what shows per section: fewer teaser cards (e.g. 3 instead of 6 on the homepage grids), collapsed long lists behind "show more", and hide decorative side artwork that only adds scroll length.
- Keep the dark theme and 4K behavior intact; wide screens keep their current roominess.

## 2. Navigation & wayfinding
- Back-to-top button that appears after scrolling on long pages (articles, research, rosters).
- Stronger "you are here" state in the header and mobile menu (current page clearly marked, not just an underline).
- Breadcrumbs on the pages that lack them (team pages, research detail).
- Footer quick-links tidy-up: group links consistently and drop dead weight.

## 3. Forms & feedback
- Every public form (contact, apply, newsletter, account) gets: inline field errors next to the input, a clear success toast, and a disabled "sending..." state so double-clicks can't double-submit.
- Friendly empty states where lists can be blank (no matches yet, no articles in a category, no shop requests).
- Consistent loading skeletons where data loads (shop, articles, account) instead of blank flashes.

## 4. Performance & polish
- Lazy-load below-the-fold images and add width/height everywhere to stop layout jump while pages load.
- Prefetch likely next pages on hover (nav links, cards) so navigation feels instant.
- Re-check phone (393px), laptop (1440px) and 4K (3840px) after the spacing changes.

## 5. Accessibility
- Keyboard: visible focus rings on all links, buttons, cards and menu items; logical tab order through header, menus and dialogs.
- Labels: every icon-only button gets a spoken name; form fields get proper labels.
- Tap targets on phones at least 44px; fix any heading-level skips.

## 6. Admin panel: per-category notification badges
- The Requests tab already shows a badge; extend the same "(1)" badge to every left-menu tab that has something waiting:
  - Shop — pending merch requests
  - Members — memberships awaiting attention (e.g. cancelled/pending status)
- Badge shows the number of open items, disappears when cleared, and works the same in the collapsed mobile admin menu.

## Technical notes
- Global spacing: adjust `section-y` / `section-y-sm` in `src/styles.css` with a smaller mobile value via media query; homepage grids slice card counts with `hidden md:grid` on extras.
- Back-to-top as a small client component mounted in `__root.tsx`; breadcrumbs via existing `Breadcrumbs` component.
- Forms: touch the existing contact/apply/newsletter components only; reuse sonner toasts already in the project.
- Perf: `loading="lazy"` + dimensions via `SafeImage` where missing; TanStack Router `preload="intent"` on links.
- Admin badges: reuse the existing `Badge` in `src/routes/_authenticated/admin.tsx`; count pending `shop_requests` and pending memberships from `useAdminData`.
- Verify with Playwright at 393 / 1440 / 3840, keyboard tab-through, and a clean build.
