# Mobile login, hero, articles, and admin polish

## Build
- Add 16–24px separation between the login tabs and both mobile forms.
- Make both words of the mobile and menu wordmarks white.
- Replace the homepage character with the uploaded transparent PNG and rebuild the hero as one layered composition: large edge-bleeding character behind/beside readable text on desktop and mobile.
- Add real News and Research detail routes, make archive and homepage cards link to them, show complete article fields, and include article-specific metadata.
- Simplify News/Research management with clearer labels, automatic News URLs, focused editing, obvious save/publish actions, and easy-to-scan Edit/Delete controls.
- Include article URLs in the sitemap.

## Verification
- Check the homepage and login page at roughly 393px wide for layering, spacing, overflow, and tap targets.
- Open representative News and Research cards through to their detail pages.
- Confirm the latest preview build has no errors.

## Technical details
- Use TanStack dynamic routes (`/news/$slug` and `/research/$id`) and existing Lovable Cloud queries/RLS.
- Reuse the uploaded image through the project asset pipeline; no background box or vignette.
- Preserve the current data model: News has full body content, while Research uses its stored summary as its full on-site text and retains any external study link.
