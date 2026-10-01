# Shop upgrade, vouchers and homepage breathing room

## Already in place (checked before writing this)

- The WhatsApp icon is no longer on the Contact page (the only WhatsApp link left is a "share this study" button on research articles, not contact).
- The FAQ page already has clickable topic chips at the top that jump to each section.
- Open position names already use the gold gradient pill. I will brighten the pill slightly so the role name reads clearly against it.

## Shop page

**Product photos** — Generate a matching set of gold-on-black product shots for all nine items (jersey, hoodie, tee, cap, desk mat, keychain, bottle, sticker pack, lanyard) and attach them to the products, replacing the letter placeholders. You can swap in real photos later from the admin panel.

**Better image presentation** — Square product frames with a soft dark backdrop, gentle zoom on hover, price and stock badge overlaid on the image, and consistent card heights so the grid lines up on every screen size.

**Quick view** — Clicking a product opens a panel with the large photo, full description, price, size selector, quantity, size chart link and the request button, so nobody has to leave the shop to see details.

**Choose Size selector** — A clear "Choose size" row on the card and in quick view. Nothing can be requested until a size is picked for items that have sizes, and the chosen size travels with the request.

**Size chart** — A dialog with a chest / length / sleeve table for jersey, hoodie and tee using standard EU unisex sizing, plus a short "how to measure" note. Editable later.

**Request preview** — Before sending, a summary step shows item, size, quantity, voucher applied, the price staff will charge, and where to pay. Confirm sends it; the confirmation names the amount to bring to The Hive.

**Discount vouchers** — Staff create codes in the admin panel: code, percentage or fixed amount off, optional minimum spend, expiry date, usage limit, whether it applies to memberships, apparel, accessories or everything, and an on/off switch. On the shop the visitor enters a code, it is checked on the server, and the discounted total shows in the request preview and on the staff request row so the till amount matches.

**"What membership is for you" section redesign** — Replace the current uneven explainer with a clean, evenly aligned comparison: one balanced row of three tier columns with matching heights and a shared feature list, so the same lines line up across all three, plus a compact "where your money goes" strip underneath. Prices, tier names and the request flow stay exactly as they are.

## Homepage breathing room

Rework vertical rhythm so sections no longer crowd each other — a consistent larger gap between blocks, more space around section headings, and specifically more air between "Choose Your Path" and the section below it, on mobile and desktop.

## Technical notes

- Migration: `shop_vouchers` (code unique, kind, value, min_spend_cents, applies_to, expires_at, max_uses, uses, active) with public read of active rows and staff/admin write; add `voucher_code` and `discount_cents` to `shop_requests`. GRANTs plus RLS in the same migration.
- New `validateVoucher` server function; `requestShopItem` and `requestMembership` re-validate the code server-side and store the snapshot discount — never trust the client total.
- Quick view, size chart and request preview are dialogs built on the existing `Dialog` primitives; card/grid work stays in `src/routes/shop.tsx` plus a small `ProductCard`/`QuickView` split.
- Product images generated into `src/assets`, uploaded as CDN assets, and written to `shop_products.image_url` via migration so the admin panel can override them.
- Admin: new Vouchers tab inside the existing Shop section, reusing `DataTable`; deletes stay admin-only via `AdminOnly`.
- Spacing handled through the shared section utilities in `src/styles.css` and `src/routes/index.tsx`, not per-element one-offs.
