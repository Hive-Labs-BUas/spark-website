# Fixes, memberships admin, applications with files, socials, and Dutch/English

## Quick visual fixes

- Homepage hero (mobile + tablet): remove the excess empty space above the character/headline by tightening the top spacing and the minimum hero height below desktop, keeping the character fully visible.
- Shop hero: move the soldier slightly left on all sizes so his whole face plus a little space beside his head is visible.
- Opening Hours "Join Discord" button: change its label text (and icon) to black.
- Admin panel: remove the gold "Ready to join the Guardians?" bar that currently appears above the footer on admin pages.
- Footer: fix the duplicated "Breda Guardians" wordmark so the name appears once next to the logo (mobile and desktop).

## Easter egg

- Typing `who made the website?` in the footer newsletter email field and submitting shows a full-screen black overlay that fades in with "Jelte is the best!", then fades out after 5 seconds. No signup is created and no error is shown for that input.


## Memberships in the admin panel

- Split the Memberships tab into two lists:
  - Requests / pending — people who asked for a tier and haven't paid yet, with the existing "Mark as paid" action.
  - Active members — everyone confirmed, shown below, with tier, start date and the amount agreed.
- Add "Revoke membership" on active members: asks for confirmation, ends access immediately, and moves the person out of Active.
- History is kept: the record stays visible as an ended membership with who ended it and when, so nothing is lost for the books.
- Search, filtering and CSV export keep working on both lists.

## Applications: CV and motivation letter

- The apply form gains two optional file uploads (CV and motivation letter, PDF or Word, max ~5 MB each) alongside the existing name, email and written motivation.
- Files are stored privately; only staff can open them.
- In the admin panel each application row gets download links for the attached files.

## Social media links

- Expand the social row to Discord, Instagram, TikTok, YouTube, Twitch, X and LinkedIn.
- Add a "Socials" area in the admin panel where staff can set each link, hide the ones they don't use, and reorder them. The footer and contact page read from that, with today's links as the starting values.

## Dutch / English language switch

- Add a language switch in the header (and inside the mobile menu) with EN and NL.
- Translate the whole public site: navigation, footer, home, about, shop, interns, FAQ, contact, opening hours, hall of fame, timeline, news and research pages, forms, buttons, toasts and error messages. Admin stays English.
- Choice is remembered per visitor; Dutch pages live on `/nl/...` URLs so they can be shared and found in search.
- Admin-managed content (news, research, FAQ, positions, products) gets optional Dutch fields; when a Dutch version is missing the English text is shown so nothing breaks.

## SEO pass (both languages)

- Unique title, description and social preview text per page in both languages, using the agreed keyword themes (Breda esports, BUas esports, gaming community Breda, The Hive, tryouts, plus the Dutch variants).
- Correct language tags per page and cross-links between the English and Dutch version of each page (hreflang), one canonical per page.
- Sitemap extended with the Dutch URLs; robots.txt checked.
- Structured data kept and extended where useful (organisation, FAQ, articles, breadcrumbs).
- Headings checked so each page has a single clear H1, and image alt text reviewed.

## Technical notes

- Hero spacing: adjust `min-h`/padding on the hero section in `src/routes/index.tsx` for `<lg` and the `imageClassName` offsets for `EsportsPageHero` on `src/routes/shop.tsx`.
- Footer duplication: the wordmark is rendered both by `Logo` and by a sibling `<span>` in `src/components/site/Footer.tsx`; keep one. Also gate the gold callout strip off admin routes (it is already gated off `/about`).
- Memberships: add `ended_at` / `ended_by` (or a `status = 'ended'`) to the membership record, a `revokeMembership` admin server function with role check, plus RLS/grants. Reuse `DataTable` for both lists.
- Applications: add `cv_path` and `letter_path` columns; upload through the existing private `media` bucket under an `applications/` prefix with signed URLs for admins; validate type/size in the Zod schema client- and server-side.
- Socials: new `site_socials` table (label, platform, url, visible, sort order) with public read and admin write; `SOCIALS` in `src/lib/site-data.ts` becomes the seeded fallback.
- i18n: lightweight dictionary-based provider (no heavy dependency) with `en`/`nl` message files and a `useT()` hook; Dutch routes via a `/nl` layout segment so `head()` can emit language-specific meta and hreflang links; sitemap route updated.

## Verification

- Typecheck and production build.
- Mobile (393px), tablet (820px) and desktop (1440px) checks on home, shop, interns, opening hours and admin: no horizontal overflow, hero spacing correct, footer wordmark single.
- Walk through: request a membership, mark as paid, revoke; submit an application with two files and open them as staff; switch language on several pages.
