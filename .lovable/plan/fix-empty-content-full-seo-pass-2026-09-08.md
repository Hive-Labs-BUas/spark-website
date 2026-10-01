# Fix empty content + full SEO pass

## What's actually wrong (verified)

The content is not missing. The database holds 10 news stories, 6 research studies, 20 FAQ entries, 7 weekly opening-hour rows, 3 special days, 5 teams, 25 players, 3 results and 4 team profiles, and all of it is publicly readable (checked directly against the public data endpoint — returns 200 with real rows).

Two real causes:

1. **Content only loads after the page opens in the browser.** Every page fetches its content client-side. I checked the HTML the server sends for /news, /research, /faq, /opening-hours: it contains no article titles, no questions, no hours. So search engines see empty pages, and on a slow or interrupted connection a visitor sees "All 0" and blank sections. This is the root cause behind every "empty page" in the brief.
2. **The About numbers animate up from zero.** The real figures (5+ years, 10+ teams, 500+ members, 15 tournaments — confirmed accurate) only appear once the counting animation is triggered. Until then the page literally renders "0+". That is what you saw.

## The fix

### Content loading (the core change)
- Each public page loads its content on the server before the page is sent, so news, research, FAQ, hours, teams, rosters, results, Hall of Fame and shop content are in the page from the very first byte — visible to Google and to visitors with slow connections.
- Counters show the real number immediately and only animate as a bonus, so "0+" can never appear.
- Every list keeps a deliberate, on-brand empty state for when a section genuinely has no entries, instead of a zero or a blank block. No numbers, hours, results or articles will be invented.
- Category counts (the "All 0" chips) are computed from loaded content, so they are correct on first paint.

### Per-page SEO
Unique title, description, canonical, Open Graph and X/Twitter tags for every public page, using your suggested directions as a base:
home, about, research, news, opening hours, FAQ, contact, shop, hall of fame, teams (plus each team page), interns, privacy, each news article, each research study. Canonicals become absolute and driven by one configurable site address, so switching to a custom domain later is a one-line change. Private areas (account, admin, sign-in, 404) get no-index.

### Structured data (only from real data)
Organisation/SportsOrganization with the real socials and logo; location details for The Hive using the Contact-page address you confirmed; FAQ markup generated from the actual questions on the page; Article markup on news and research detail pages; team markup on team pages; breadcrumbs where they exist.

### Sitemap and robots
- /sitemap.xml keeps listing the public pages plus every published article, study and team, and drops the misleading "changed today" timestamps on static pages.
- /robots.txt keeps crawlers on public pages, blocks sign-in/account/admin, references the sitemap, and blocks nothing needed to render the site.

### Headings, images, links
- One clear main heading per page describing that page, with a clean sub-heading order.
- Descriptive alt text on meaningful images (no filenames, no keyword stuffing), empty alt on decorative artwork, width/height and lazy loading on off-screen images to stop layout jumping.
- Real HTML links between related pages: home to teams, The Hive hours, research, news and shop; articles back to their team; research to related studies; About to Contact; FAQ to membership and contact; hours to contact.

### 404 page
A branded "page not found" page with links to Home, Teams/Hall of Fame, News, The Hive hours and Contact, returning a proper 404 status and kept out of search.

### Accessibility, performance, mobile
Accessible accordions, named buttons and links, visible focus states, labelled forms, keyboard-navigable menu. Fewer duplicate data requests (content now arrives once with the page), lighter animation on mobile, right-sized images. A pass at phone, tablet, laptop and 4K widths for overflow, clipping and spacing — no redesign.

### Verification before I report back
Every public route checked for: loads cleanly, real content present in the server HTML, unique title/description/canonical, one sensible main heading, working links, no console errors, sitemap and robots served correctly, and structured data valid. I'll only report what I've actually confirmed, plus anything still missing information from you.

## Technical notes

- Public reads move into public server functions (publishable key, no session) primed via route loaders with `ensureQueryData` and read with `useSuspenseQuery`; existing client hooks stay for admin/authenticated surfaces.
- Loaders get `errorComponent`/`notFoundComponent`; detail routes throw `notFound()` on unknown slug/id.
- `CountUp` renders the parsed value as its initial state (SSR-safe) instead of `0`.
- One `SITE_URL` constant feeds canonicals, og:url, sitemap and JSON-LD.
- JSON-LD emitted through route `head().scripts`; og:image only on leaf routes with an absolute image.
- Sitemap `lastmod` only from real `updated_at` values.
- QA via typecheck, build, raw HTML inspection of each route, and Playwright at 393/768/1440/3840.

## Not included

No new statistics, opening hours, results, articles, prices or player data will be created. Nothing that requires information you haven't supplied gets filled in — it gets an empty state instead.
