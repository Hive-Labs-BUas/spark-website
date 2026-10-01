# Upgrade Plan: Member Account Dashboard + Identity Polish

## Goal
Turn `/account` from a sparse status page into a useful member hub, while cleaning up the most visible placeholder content so the site feels more like the real Breda Guardians organisation.

## Scope
One focused upgrade. Primary work is the account dashboard; content changes are kept small and directly tied to pages a member sees.

## 1. Account Dashboard Redesign (`/account`)

Rebuild the authenticated account page with three clear sections:

### 1.1 Membership Status Card
- Show active tier name, status badge, start date and expiry/renewal date.
- List the perks that belong to that tier.
- Add a "Join Discord" CTA when active, explaining the Discord role is added by the team.
- Add a "Cancel membership" button that triggers an immediate cancellation flow consistent with the existing business rule (access ends straight away). This will call a server function to update Stripe and the local `memberships`/`orders` records.

### 1.2 Order / Payment History
- Keep the existing order table but improve empty/loading states.
- Add invoice-style detail: date, tier, amount, status, and a receipt link when Stripe provides one.

### 1.3 Profile Management
- Let members update their display name.
- Let members upload or remove an avatar (Supabase Storage bucket `avatars`, public read).
- Show the user's email and a "Change password" prompt that reuses the existing auth flow.

### 1.4 Quick Actions Sidebar
- "View membership" → `/membership`
- "Admin panel" → `/admin` (admin only)
- "Sign out" (with proper query-client cleanup and redirect)

## 2. Content & Identity Polish (in parallel)

### 2.1 Interns Page
- Replace the four generic "Intern Name" placeholders with a cleaner "Join the team" card state until real names/photos are provided.
- Add a short note that the current team photos and bios are updated each semester.

### 2.2 About Page Imagery
- Audit the three `OFFERS` images (`/images/hof-valorant.jpg`, `/images/hof-community.jpg`, `/images/news-hive.jpg`).
- Replace any missing/broken image paths with existing real assets from the project, or generate appropriate on-brand placeholder visuals for Competitive Teams, Community Events and The Hive.

### 2.3 Site Stats
- Keep the current placeholder stats but add an admin-only editable source, or replace them with the most accurate real numbers the team can confirm (membership count, active rosters, years active).

## 3. Data & Backend

- Add an `avatars` Storage bucket (public) with an RLS policy allowing authenticated users to manage only their own avatar.
- Add a server function `updateProfile` to save display name and avatar URL.
- Add a server function `cancelMembership` that:
  - Verifies the caller owns the membership,
  - Cancels the Stripe subscription via the Stripe API,
  - Marks the local membership as `cancelled`,
  - Logs a `membership_events` entry,
  - Triggers the existing cancellation email helper.
- Update `useMyMembership` to include the latest subscription metadata where useful.

## 4. Design & UX Notes

- Use existing `surface-card`, `hover-glow`, and gold accent system.
- Keep the page responsive: single column on mobile, two-column dashboard layout on desktop.
- All new buttons meet the 44px minimum tap target.
- No new color palette; reuse the existing gold-on-dark theme.

## 5. Verification

- Run `bunx tsgo` after all changes.
- Check the build log for errors.
- Use Playwright to verify:
  - A signed-in user sees their membership status and perks.
  - Profile name updates and persists.
  - Cancellation flow shows a confirmation and updates status.
  - Interns and About pages render without broken images.

## Out of Scope (not this turn)

- Live email domain setup and sending.
- Discord role automation bot.
- Admin panel enhancements beyond the avatar storage policy.
- New public pages or major navigation changes.
