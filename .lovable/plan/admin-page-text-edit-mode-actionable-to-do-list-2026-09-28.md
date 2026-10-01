# Admin: page-text edit mode + actionable to-do list

## Goal
1. Staff can edit the texts that are currently hard-coded (homepage, Live page rules, research intro) from the admin panel.
2. The admin Dashboard gets one "Needs attention" to-do list that gathers everything requiring action, with clickable items.

Nothing changes visually for visitors until staff edit a text — every editable field falls back to the current built-in wording.

## Part 1 — Page-text edit mode

Reuse the existing `site_settings` pattern (used today for the Minecraft server address): a `key/label/value` table, a `pickSetting()` helper, and the `SiteSettingsEditor` admin component.

### New setting rows (inserted via SQL, current wording as default values)
- **Homepage**
  - Ticker facts (one multiline field; each line = one fact)
  - "What we do" — the four card texts (Competing at the top, Education, Play nights, Studies)
  - "Choose your path" section texts (membership, internship, contact)
- **Live page**
  - Section intro ("Match days, community nights and events straight from The Hive…")
  - Stream rules (multiline list)
  - Community rules (multiline list)
- **Research page**
  - PlaySmart/BUas intro paragraph

### Wiring
- Public pages (`index.tsx`, `live.tsx`, `research.index.tsx`) read these keys with `pickSetting()` and fall back to the current hard-coded strings when a field is empty. Where SSR matters, extend `public-content.functions.ts` with a public settings read (anon SELECT on site_settings already exists).
- Admin: add a **"Page texts"** tab in Site Content, next to FAQ/Pictures/Socials/Minecraft, with grouped sections (Homepage, Live, Research) and multiline inputs for list-style fields. Admin-only writes via the existing site_settings policies.

Notes:
- Ticker facts, card texts and rules are staff-authored content — the Dutch interface translation layer is not applied to them (consistent with current policy; interface chrome stays translated).
- Empty or cleared fields always fall back to the built-in defaults, so nothing can be blanked by accident.

## Part 2 — Actionable to-do list on the Dashboard

A "Needs attention" panel on the admin Dashboard, one row per open item with count and a jump target:
- New contact messages → Requests
- New internship applications → Requests
- Pending shop requests → Shop
- Match results not linked to a team → Match results

Items with count 0 show as done (muted, check-marked). Clicking a row navigates to the relevant section. All data is already loaded for the dashboard — no new backend needed.

## Verification
- Build passes; `/`, `/live` and `/research` render with unchanged copy.
- Admin → Site Content → Page texts: edit a text, save, confirm the public page shows the new wording; clear the field → built-in default returns.
- Admin → Dashboard: counters reflect real data and each to-do item navigates to the right section.
