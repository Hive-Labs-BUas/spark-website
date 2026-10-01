# Homepage and Interns visual redesign

Bring the footer closer to the supplied reference, smooth the homepage hero transition, turn the divisions grid into a more inviting esports showcase, and rebuild the Interns page around the four roles people can apply for. Existing site content, links, newsletter storage, application handling, and mobile navigation behavior remain intact.

## Footer redesign

- Hide the slim gold “Ready to join the Guardians?” Discord callout strip only on the About page. All other pages keep it.

- Replace the current bright gold callout strip and framed newsletter card with one cohesive, stripe-free dark footer inspired by the reference.
- Build a clean desktop layout with:
  - Breda Guardians brand lockup and short community description on the left.
  - Compact social icon buttons below the description.
  - Two clearly labeled link columns in the middle/right.
  - A smaller “Stay in the loop” signup integrated quietly into the layout rather than presented as a large card.
- Use muted warm-black gradients, restrained gold accents, thin fading gold rules, and tighter spacing so the footer feels premium rather than oversized.
- Keep the bottom row simple: copyright/privacy on one side and The Hive campus/location line on the other.
- Preserve the existing mobile accordion approach, but visually align it with the new footer and keep the newsletter compact.

## Homepage hero transition

- Lift the selected facts ticker slightly over the bottom edge of the homepage hero.
- Give it a controlled elevated edge and subtle gold glow so it bridges the hero and the next section instead of appearing as a hard cut.
- Keep the overlap small enough that the character image and scroll cue remain readable on desktop and mobile.

## “Our Divisions” redesign

- Replace the current uniform text-card grid with a more visual six-block composition that has stronger hierarchy, game identity, and hover feedback.
- Keep the five existing divisions and add a sixth invitation card: “Interested?” with a clear Discord call to action.
- Give each game block a distinctive letter/monogram treatment, roster label, concise description, directional accent, and warm gradient depth without introducing unrelated game imagery.
- Make the invitation block visually distinct but cohesive, using a brighter gold gradient, community-focused copy, and an external Discord link.
- Update the heading from “Five Games. One Org.” to language that accommodates the invitation card while keeping the section concise and energetic.
- On mobile, use a comfortable single-column or controlled horizontal layout with full left/right breathing room and 44px minimum tap targets.

## Interns page redesign

- Reframe the page as an inviting “work in esports” experience that quickly explains what applicants can learn, own, and contribute at Breda Guardians.
- Keep the existing four-intern row with their photos, names, role labels, and short descriptions; reposition it after the role introduction so it reinforces the people behind the work.
- Turn Event Manager, Content Marketing Manager, Overall Manager, and Research Intern into visually distinct role panels, each with:
  - A recognizable icon and concise role summary.
  - A short list of typical responsibilities and the kind of person the role suits.
  - A clear application button that continues to use the existing application form.
- Retain the three-step Apply, Interview, Onboard journey, but integrate it as a compact visual process rather than a competing card section.
- Add one strong application call to action near the start and retain role-specific application actions lower on the page.
- Use the established stripe-free warm gradients, gold accents, visual depth, and restrained motion so the page feels energetic without becoming crowded.
- Keep all role and intern content connected to the existing admin-managed data and fallback content.

## Technical details

- Update the homepage layout in `src/routes/index.tsx`, while keeping the existing `DIVISIONS` source data and adding only the invitation presentation at the page level.
- Recompose `src/routes/interns.tsx` around the existing `useInterns` data and `ApplyDialog`; no application or admin workflow changes.
- Rework `src/components/site/Footer.tsx` without changing newsletter submission behavior or destination links.
- Add or refine semantic gradient, overlap, footer, and division-card utilities in `src/styles.css`; no raw component colors. Use the current route to conditionally render the About-page footer callout strip.
- Respect reduced-motion settings and retain accessible labels for social and external links.
- Verify the homepage, footer, and Interns page at 393px and 1440px, checking hero overlap, card spacing, text fit, application actions, tap targets, and horizontal overflow; then confirm typecheck and preview build status.
