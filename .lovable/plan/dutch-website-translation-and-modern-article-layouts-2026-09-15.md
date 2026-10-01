# Dutch Website Translation and Modern Article Layouts

## Goal
Make the complete public website interface available in Dutch while preserving official names and branded phrases in English. Modernize News and Research article pages so their page structure uses the full site width without stretching body copy into unreadably long lines.

## Translation coverage
- Expand the existing EN/NL language system from navigation and footer coverage to every public page, shared section, form, button, filter, status, empty/error message, popup, and toast.
- Translate page headings into Dutch; keep only official names and branded phrases unchanged, including Breda Guardians, The Hive, PlaySmart, BUas, game names, and team names.
- Keep staff-entered content in its original language, as requested: News and Research article text, team descriptions, FAQ answers, roster data, and other editable content will not be automatically translated.
- Translate surrounding article controls and labels, such as back links, reading time, downloads, sharing, related-content headings, categories where they are fixed, and Research filters.
- Make shared components language-aware so repeated labels stay consistent across desktop and mobile.
- Add development-time missing-translation reporting so future interface copy does not silently remain English.
- Keep the selected language stored between visits and continue updating the page language attribute for accessibility.

## Article page redesign
- Use full-width page bands and the existing responsive site grid for News and Research detail pages, including 4K layouts.
- Keep article prose in a readable inner column rather than stretching paragraphs across the screen; use the remaining width for purposeful structure such as metadata, downloads, key takeaways, sharing, and related information.
- Redesign the shared article header with stronger image treatment, title hierarchy, category, date, reading time, and navigation while retaining the existing dark Breda Guardians style.
- Give News pages a wider editorial shell with a readable article column and a supporting rail when relevant.
- Give Research articles an explicitly wider editorial shell that uses the full responsive site grid, with the readable article column, sticky takeaways, PDF/study actions, and sharing aligned within one consistent composition rather than centered inside a narrow island.
- Improve embedded article images, quotations, headings, lists, documents, and action links so long stories feel contemporary and easy to scan.
- Keep related News and Research sections on the full site grid rather than the text column.

## Public-page audit
- Apply Dutch interface coverage across the homepage, About, Rosters and team pages, Research, Our Team/internships, Shop, Live, Opening Hours, FAQ, Contact, Membership, account-facing public states, Privacy, authentication, checkout return, and article pages.
- Check both desktop and mobile navigation, footer, cookie banner, Discord invitation, and all shared loading/error/empty states.
- Preserve admin-entered wording and factual data exactly; no invented translations of editorial content.

## Verification
- Check the EN/NL switch across representative pages and confirm English fallback never produces blank text.
- Verify News and Research detail pages at phone, desktop, and 4K widths, including articles with and without images, documents, takeaways, or related entries.
- Confirm Dutch labels fit controls without clipping or overlap.
- Run the project checks and inspect the final pages for runtime errors.

## Technical notes
- Reuse the current `LanguageProvider`, `useT`, and EN/NL switch; expand the dictionary and connect page components rather than introducing a second localization system.
- Keep database-backed editorial fields single-language. No database migration or automatic translation service is needed for this scope.
- Introduce shared editorial layout utilities/components so the wider News and Research shells and their readable prose columns are separate, reusable concerns.
