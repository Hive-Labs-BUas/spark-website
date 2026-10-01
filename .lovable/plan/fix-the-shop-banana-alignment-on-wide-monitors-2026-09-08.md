# Fix the Shop banana alignment on wide monitors

## Change

The Shop hero currently positions the banana with a fixed `lg:right-[14rem]` offset. At the measured 2373px viewport, its visible artwork starts at 1417px while the section below starts at 322.5px, so the figure stays near the far-right edge instead of following the centered page layout.

Replace that fixed wide-screen offset with a position calculated from the shared centered content width. The banana will remain on the right side of the hero but move inward consistently as the monitor gets wider, visually aligning it with the content block below.

Phone and tablet positioning, hero text, image size, asset, and all Shop content remain unchanged.

## Verification

- Compare Shop hero screenshots at 1280px, 1440px, 1920px, and an extra-wide viewport.
- Confirm the banana follows the centered content area rather than the browser edge.
- Check 393px and tablet widths to confirm their current positioning is unchanged.
- Confirm there is no horizontal overflow and the page still builds successfully.

## Technical note

- Update only the desktop `lg:` positioning rule in the Shop hero’s `imageClassName`; use a container-relative `calc(...)` anchor based on the same maximum content width as `container-site`.
