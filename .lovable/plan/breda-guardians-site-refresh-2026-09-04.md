# Breda Guardians Site Refresh

## Goal
Apply the selected “Cyber-Nordic mission control” direction while retaining Breda Guardians’ black, charcoal, white, and gold identity. Use Bebas Neue for display headings and Barlow for body/UI text, with asymmetric compositions, restrained gold glows, crisp borders, and subtle motion.

## Shared Site Updates
- Upload the supplied Breda Guardians crest through the project asset pipeline and replace the existing icon/wordmark in both the top navigation and footer.
- Make the desktop header thinner and show exactly: About, Membership, Research, Interns, FAQ, Contact.
- Move News, Timeline, Hall of Fame, and Opening Hours into the footer, remove Join Us links, and add smooth underline/color transitions to navigation links.
- Update the mobile bottom navigation to a compact priority set derived from the same primary navigation.
- Set the canonical Discord URL to `https://discord.gg/eFtnfWrdHJ` so the homepage hero and footer Discord actions use the same destination.
- Update global typography/tokens to the chosen palette (`#080808`, `#1B1B1B`, `#FFD21F`, `#F5F5F5`) and fonts, preserving semantic theme classes and reduced-motion behavior.

## Homepage
- Point the primary hero CTA directly to Discord in a new tab.
- Redesign “Choose Your Path” as three translucent charcoal cards with distinct Player, Partner, and Curious icons, indexed accents, soft gold hover glow, and a subtle lift animation.
- Route the Player path to Interns after Join Us is removed.

## About
- Replace the current card grid with a complete asymmetric page: gold-treated hero, centered mission statement, four stats, values cards with icons and gold top rules, and three alternating image/text offer rows.
- Add a four-person team teaser sourced from the placeholder intern profiles and link it to Interns.
- Finish with a full-width Discord CTA.
- Use alternating full-width surface bands and clean single-column stacking on mobile.

## Interns and Recruitment
- Replace current names with clearly labeled placeholder profiles, generic role titles, one-sentence responsibilities, and existing placeholder portraits.
- Move the Apply → Interview → Onboard process from Join Us into Interns.
- Add individual open-position cards, each with its own role-specific “Apply for this Position” action leading to Contact with the role preselected in the subject.
- Remove the standalone Join Us route and all internal references to it.

## FAQ and Contact
- Expand FAQ to the normal site container width; render each category with generous spacing and each question as its own charcoal accordion card with a gold expand icon.
- Keep the bold page header and improve alignment and responsive spacing.
- Add a distinct “Visit Us” panel to Contact with the full address: Monseigneur Hopmansstraat 2, 4817 JS Breda, The Hive, Room: Fe0.032.
- Add a practical external “View on Map” action for that address and visually balance the panel with the existing form/contact methods.
- Allow Contact to receive a role query parameter and prefill the subject for internship applications.

## Admin Post Management
- Add separate News and Research management tabs to the protected Admin Panel.
- Provide real create/edit forms using the existing backend tables and fields: title, image URL, content/excerpt or summary, category where applicable, publication date, publish state, and link URL for research.
- List all News and Research posts separately with clear Edit and Delete controls, confirmation before deletion, validation, loading/empty/error feedback, and query refresh after mutations.
- Seed several clearly labeled placeholder News and Research records through a database migration so the flows can be tested and the records can later be edited or deleted.
- Keep all write access behind the existing server-validated admin role and current row-level policies.

## Verification
- Check generated route references after removing Join Us and ensure all remaining links resolve.
- Verify the public pages at desktop and mobile widths, including no clipping/overlap, working accordion, external Discord/map links, and role-prefilled application links.
- Sign in through the existing protected flow and test creating, editing, and deleting both News and Research posts.
- Confirm the latest build and runtime logs are clean.
