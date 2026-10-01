# Guardians Shop (replaces the Membership page)

Turn the Membership page into a full Shop: membership cards always on top, then apparel and accessories underneath, with category tabs and a "See all" view. Nothing is paid online — visitors request an item and staff confirm payment at the Hive, exactly like memberships today.

## What the visitor sees

Page at `/shop` (the old `/membership` address keeps working and lands here; the nav item becomes "Shop").

1. Hero — same style as the current membership hero (soldier image), new headline about gear and membership.
2. Category tabs: See all · Membership · Apparel · Accessories.
3. Membership block, always first: the three existing cards (Supporter €15 / 3 months, Legendary €50 / year, most popular in the middle, Champion €30 / 6 months) with the current request button.
4. Apparel and Accessories grids: product photo, name, short description, price, sizes when relevant, and a "Request item" button. Sold-out items show a badge and a disabled button.
5. Under each category, an explainer block written for that category:
   - Membership — what the club does, what a member gets, where the money goes (Hive gear, chairs, desks, community nights).
   - Apparel — the kit players and supporters wear, how sizing and pickup at the Hive work.
   - Accessories — smaller everyday gear, ideal as a first purchase or gift, same pickup flow.
6. "How buying works" strip: request here → pay in person at the Hive during opening hours → staff confirm and hand over the item.

Requests need an account (same as membership). Not signed in → we send them to sign in and bring them back.

## Placeholder products I will create

Apparel: Guardians Home Jersey €45, Training Hoodie €55, Guardians Tee €25, Snapback Cap €20.
Accessories: XL Desk Mat €30, Guardians Keychain €7, Water Bottle €15, Sticker Pack €5, Lanyard €8.

Prices, names, photos and stock are all editable in the admin panel afterwards, so treat these as starting values.

## Admin panel

New "Shop" section in the admin dashboard:
- Add / edit / delete products: name, category, description, price, sizes, photo upload (uses the existing image upload), visible and in-stock toggles, sort order.
- Requests list: who asked for what, size, quantity, date, status. Staff mark a request Paid (handed over) or Cancelled, with a note field. Overview counters get a "Open shop requests" tile.

## Technical notes

- Migration: `shop_products` (name, slug, category, description, price_cents, sizes text[], image_url, in_stock, visible, sort_order) with public read of visible rows and admin write; `shop_requests` (user_id, product_id, size, quantity, unit_price_cents, status, note, handled_by, handled_at) with own-row insert/read and admin read/update. GRANTs plus `touch_updated_at` triggers included.
- New `src/lib/shop.functions.ts`: `requestShopItem` (auth middleware, validates product is visible/in stock, snapshots price) and admin-only `setShopRequestStatus`. Product CRUD reuses the admin function/section patterns already in place.
- New route `src/routes/shop.tsx` with its own head metadata (title, description, og/twitter). `src/routes/membership.tsx` becomes a redirect to `/shop` so existing links and the sitemap entry keep resolving; nav/footer labels updated.
- Product cards reuse `surface-card`, `hover-glow`, `Tag`, `ArticleImage`-style fallback and `CardRail` so the shop matches the site's gold-on-black system; no new colours.
- Membership request logic and tiers stay untouched.
