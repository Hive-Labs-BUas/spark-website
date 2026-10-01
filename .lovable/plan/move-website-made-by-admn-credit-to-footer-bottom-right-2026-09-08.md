# Move "Website made by ADMN" credit to footer bottom-right

## Goal
Relocate the ADMN credit from its current spot next to the Privacy Policy link to a more subtle, right-aligned position in the footer bottom bar.

## Changes
1. In `src/components/site/Footer.tsx`, remove the ADMN text and divider from the left-side copyright/Privacy group.
2. Add the credit as a separate right-aligned element in the same footer bottom row, using muted text so it does not compete with the main footer content.
3. Keep the existing copyright and Privacy Policy grouping unchanged on the left.
4. Verify the layout at mobile, tablet, desktop and 4K widths so the credit wraps cleanly without breaking the footer alignment.

## Verification
- Typecheck passes (`bunx tsgo --noEmit`).
- Production build passes (`bun run build`).
- Responsive screenshots at 393px, 1280px and 3840px show no overflow and the credit aligned to the right on desktop, centered on mobile if needed.
