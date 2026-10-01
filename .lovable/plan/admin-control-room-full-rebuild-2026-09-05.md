# Admin Control Room — full rebuild

Turn the admin area from a list of tables into a proper staff dashboard: a clear overview, fast search, simple "new article" forms for every content type, editable match results, and tools for hours, FAQ, interns and members.

## 1. Overview home

- Top row of cards: active members, revenue this month, new messages (unanswered), open applications, newsletter signups, published vs draft articles.
- "Needs attention" list: newest messages and applications still marked new, each opening the full item.
- Recent membership activity (payments, cancellations) kept as a compact feed.
- Left-hand section menu (Overview, Articles, Results, Requests, Members, The Hive, Content) instead of one long row of tabs; collapses to a dropdown on phones.

## 2. Articles — one editor for News, Research, Hall of Fame

- Single "New article" button with a type picker; the same form adapts its fields per type.
- Fields: title, category/game, short summary, full text, date, image, published toggle. Web address (slug) is filled in automatically from the title and stays editable.
- Image uploads: drag or pick a picture, it uploads to storage and is used on the card and article page. Pasting a link still works.
- Live preview of the card as it will look on the site, plus a Save-as-draft / Publish choice.
- Article list per type with search, published/draft filter, edit, duplicate and delete.
- Hall of Fame entries get the same treatment (title, story, image, date, ordering).

## 3. Match results on Hall of Fame

- New results table in the database, replacing the three hard-coded examples.
- Admin form: our team + opponent, both logos/images, result (victory/defeat/draw), competition, week/stage, score, date and time, game, optional stream link, and a "show on site" toggle.
- Hall of Fame page reads results from the database, newest first, same visual design as now; falls back gracefully when empty.

## 4. Requests — contact messages & applications

- Searchable, sortable lists with a detail panel showing the full message.
- Status: new / in progress / done, plus an internal note field and who changed it.
- "Reply by email" button opening a pre-filled email to the sender.
- Filters by status and date, and counts shown on the menu item.

## 5. Members & roles

- List of everyone with an account: name, email, tier, status, join date, last payment.
- Search by name/email, filter by tier and status.
- Grant or remove admin/member access (roles stay in the separate roles table, checked on the server).
- Open a member to see their orders and membership history.

## 6. The Hive — opening hours & closures

- Edit the weekly schedule (open/close time per day, or mark closed).
- Add, edit and remove special days/closures with a label and note.
- Changes appear instantly on the Opening Hours page and in the header.

## 7. FAQ & interns

- FAQ: add/edit/delete questions, choose a category, drag to reorder.
- Interns: manage team profile cards (name, role, photo, short bio) and open positions (role, description, what we look for, active toggle) that feed the Interns page and the apply forms.

## Quick fixes alongside

- About page: the counting-up numbers aren't animating — fix so they count up when scrolled into view.
- About page: move the hero image a bit back to the left, on mobile and desktop.
- News and research articles on phones: make sure every card and article page shows its picture (or the branded fallback block) — check why they're missing on mobile and fix.


## Extra suggestions worth adding

- Export lists (messages, signups, members) to a spreadsheet file.
- Simple audit trail: who published or deleted what, and when.
- Newsletter list clean-up: unsubscribe/remove and duplicate detection.
- Partner/sponsor manager so logos on the homepage are editable.
- Homepage highlight picker: choose which article is featured.

## Technical notes

- Database work in one migration: `match_results` table; `status`, `internal_note`, `handled_by`, `handled_at` on `contact_submissions` and `applications`; `interns` and `intern_positions` tables; `partners` table if the sponsor manager is included. Each new public table gets GRANTs, RLS enabled, public read only where the site needs it, and admin-only writes via `private.has_role`.
- Public storage bucket `media` for article/result images, admin-only writes, public read; upload through a signed path from the client with an admin check server-side.
- Admin panel split into `src/components/admin/*` (section components, `ArticleEditor`, `DataTable` with search/sort/pagination) so `admin.tsx` stays thin; `/admin` keeps its current gate plus the role check.
- Role changes and any privileged writes go through `createServerFn` with `requireSupabaseAuth` and a server-side admin role check, never client-side trust.
- Hall of Fame, FAQ, Interns, Opening Hours pages switch from hard-coded arrays to database reads with the existing loader/query pattern; current content is seeded in the migration so nothing disappears.
