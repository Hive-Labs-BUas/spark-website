# Plan: Heroes, real social links, navigation & mobile menu

## 1. About page hero — new image, repositioned

- Upload the supplied yellow Rocket League car image as a CDN asset and use it as the About hero image.
- Raise the image so it sits vertically centred with the hero text instead of hugging the bottom.
- On mobile, shift it further right and centre it against the text block.
- Keep the text fully readable (existing gradient overlays and drop shadows).

## 2. Homepage hero — video instead of image

- Upload the supplied "Welcome to The HIVE" video as a CDN asset.
- Replace the homepage hero car image with a muted, looping, auto-playing, inline video that fills the hero.
- Darken it (brightness reduction plus a slightly stronger overlay) so the headline, paragraph and button stay easy to read.
- Remove the old hero image usage and its parallax transform.
- Include a poster frame and respect reduced-motion (paused/static for users who ask for less motion).

## 3. Real social links

Replace the placeholder social URLs with the real ones:

- Instagram: instagram.com/bredaguardians
- TikTok: tiktok.com/@bredaguardians
- Twitch: twitch.tv/bredaguardians
- LinkedIn: linkedin.com/company/breda-guardians
- YouTube: the supplied channel URL

Where used:
- Footer social row (desktop + mobile), including TikTok and LinkedIn which are currently missing from the fallback list.
- Contact page socials.
- New mobile menu social row (see part 5).

Fallback rule: any social entry with an empty URL falls back to the Discord invite, so no icon ever links nowhere. Admin-managed socials still override these defaults.

## 4. Footer link audit

- Add the missing pages so every real page is reachable from the footer: News, Hall of Fame / Teams, Opening Hours, Shop, Membership, Account, Sign in, Privacy, plus Discord.
- Keep desktop columns and mobile accordion groups in sync (same links in both).
- Verify every link resolves to an existing page (no dead entries) and that "Teams" points at the combined Hall of Fame page.

## 5. Header & menu

- Desktop: remove the hamburger/extra-pages sheet. All primary links stay in the bar; the previously hidden extras (News, Hall of Fame, Opening Hours) move into the visible bar or the footer so nothing becomes unreachable.
- Mobile/tablet: redesign the slide-in menu with a cleaner modern layout:
  - Full-height panel, large tap targets, icon + label rows, clear active-page highlight.
  - All main pages plus News / Hall of Fame / Opening Hours.
  - Account block: avatar + name when signed in, prominent "Login" button when not.
  - Social icon row (real links, Discord fallback).
  - A primary Discord "Join the community" button pinned near the bottom.
  - Language switch kept, no visible scrollbars, closes on navigation.

## Verification

- Typecheck and build pass.
- Screenshots at 393px (mobile), 820px (tablet), 1440px and 3840px: hero video dark enough to read text, About hero centred with text, menu opens/closes cleanly, no horizontal overflow.
- Click-through every header, menu and footer link to confirm each lands on a real page.
