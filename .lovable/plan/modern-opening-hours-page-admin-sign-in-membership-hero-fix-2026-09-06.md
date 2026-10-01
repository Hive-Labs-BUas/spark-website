# Modern Opening Hours page + admin sign-in + membership hero fix

## 1. Admin sign-in on the normal login page

Today staff have to know a separate hidden page (`/admin-login`) to reach the control room. Instead:

- Add a small "Staff sign-in" switch on the main login page. When it's on, the page shows the staff heading and, after a successful sign-in, sends the account straight to the admin dashboard.
- If a staff account signs in normally (without the switch), a "Go to admin dashboard" button appears on their account page and in the menu, so they never get stuck.
- Non-staff who flip the switch just land on their normal account page with a short note that the account has no staff access.
- Keep `/admin-login` working as a shortcut so old links don't break.

## 2. Test staff account

A staff account already exists and works: **admin@bredaguardians.com / Admin123!**. I'll verify it can sign in, reaches the dashboard, and that every admin section loads with real data. If anything about it is broken I'll fix it, and I'll also create a second demo staff account only if you want one under a different email — say the word and I'll add it.

## 3. Admin features check-up

Go through every part of the control room while signed in as staff and confirm each one actually saves:

- Dashboard numbers and "needs attention" list
- Writing/publishing news, research and Hall of Fame items, including picture upload
- Adding and editing match results (and that they show on the Hall of Fame page)
- Contact messages and applications: status, internal note, reply link
- Members: search, payments, granting/removing staff access
- The Hive: weekly hours and closures
- FAQ, intern profiles and open positions

Anything that errors or silently fails gets fixed in the same pass. Small usability additions where they're missing: clear success/error messages, confirm before delete, and empty-state hints.

## 4. Modern Opening Hours page

Redesign the page to match the newer look of the site:

- Bold hero with a live "Open now / Closed" badge and today's hours called out, plus a "closes in X" line.
- Week schedule as a clean list with today highlighted, closed days clearly muted, and a subtle gold accent bar.
- Closures and special days as compact date cards instead of a plain list.
- "Find us" block with the address, how to get in, and a Discord CTA for booking a PC.
- Everything driven by the hours you set in the admin panel, mobile-first, no overflow.

## Technical notes

- `/auth` gains a `staff` mode (search param + toggle) that sets the post-login redirect to `/admin`; redirect target still validated to same-origin paths. `/admin-login` becomes a thin redirect into that mode.
- Admin role continues to be read server-side via `user_roles` / `private.has_role`; the toggle is presentation only and grants nothing.
- Opening Hours page keeps using `useOpeningHours()`; open/closed state computed client-side from `opens_at`/`closes_at` to avoid hydration mismatch.
- Audit runs through the live preview with the staff account; fixes stay inside `src/components/admin/*` and related server functions.

## 5. Membership hero image position fix

Lower the soldier hero image on the Membership page so the top is no longer clipped. This is a CSS positioning tweak: reduce any top offset or negative margin and let the image sit lower in its container, while keeping it anchored to the bottom edge so it still bleeds off the screen on desktop.

