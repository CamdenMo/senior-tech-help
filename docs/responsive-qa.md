# Responsive implementation and verification

The desktop palette, font families, content, photography, and composition are retained. Most adaptations are isolated in `src/responsive.css`; desktop styles remain in `src/styles.css`.

## Width review

These are source-level layout reviews and intended behaviors, **not completed browser or screenshot tests**.

| Width  | Layout reviewed in source                                                                                                                                                                                        |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 320px  | 20px gutters; compact wrapping brand; 44px menu control; fluid 34px primary headings; full-width wrapping CTA; single-column services; vertical process timeline; stacked footer; form opens directly by default |
| 375px  | Same phone composition with fluid headings, 16px body copy, and a 4:3 hero photograph                                                                                                                            |
| 390px  | Same phone composition; long buttons wrap their label while retaining the arrow and full touch area                                                                                                              |
| 430px  | Single-column services and about preview; no abrupt switch back to narrow cards at 420px                                                                                                                         |
| 768px  | Stacked hero, benefits, partnership, About, and Contact layouts; two service columns; vertical timeline; two workshop descriptions; desktop form embed remains visible                                           |
| 1024px | Compact navigation; two-column hero and page layouts; readable service text; desktop-style contact form                                                                                                          |
| 1440px | Existing desktop navigation and editorial composition retained                                                                                                                                                   |

## Changes addressed

- Replaced the late 760px page stacking threshold with a 900px tablet layout.
- Removed tiny phone typography and the fixed 44px phone hero heading. Main phone paragraphs and CTA labels use 16px text; supporting labels use 12–14px text.
- Made buttons wrap through a flexible text span instead of squeezing the text or overflowing.
- Reserved image space with breakpoint-specific aspect ratios, adjusted object positioning, and added local 720px image candidates.
- Kept mobile service items in one column through 600px. Icons align beside the text rather than consuming a separate tall row.
- Connected each timeline number only to the following step, with no line trailing after the final item.
- Moved the mobile form immediately after the introduction and direct contact details, before “What happens next?”.
- Prioritized the direct Google Forms link on phones, with an optional on-page embed. Desktop retains the original embed and fallback link.
- Added navigation background scroll locking, inert background content, keyboard focus containment, Escape dismissal, outside-click dismissal, and desktop-resize cleanup. A short entry transition respects reduced motion.
- Replaced the cramped phone footer columns with a clear sequence of brand, navigation, and contact links.

## Automated verification

`npm run check` runs lint, strict TypeScript, the production build, generated HTML/link/asset checks (including responsive image candidates and CSS font paths), contact-form rendering checks, and direct HTTP requests to every generated route and its stylesheet.

Contact checks cover the unconfigured email fallback, valid embeds, the mobile direct-link markup, accessible disclosure markup, direct-URL precedence, query parameter preservation, and invalid URL handling. They render HTML without making requests to Google or submitting anything.

The project is also checked with both root and repository base paths. A configured production URL generates the canonical tags and sitemap. These tests verify output and delivery; they cannot establish visual layout, actual focus/scroll behavior, browser text enlargement, or third-party form usability.

## Remaining browser verification

Browser testing was attempted. The browser-access host was unavailable, and the native Computer Use session remained stopped by physical Escape. No visual mobile audit is claimed for this pass.

When browser access is restored, test every route at 320, 375, 390, 430, 768, 1024, and 1440px:

1. Check the entire page for horizontal scrolling, clipped text, image subjects, spacing, and footer wrapping.
2. Open the menu at both the top and middle of a page. Confirm background scroll is locked, the menu itself scrolls on short screens, Tab/Shift+Tab remain inside the header, and Escape restores focus. Select each link and verify the page scroll unlocks. Resize to desktop while open.
3. Follow every primary CTA and directly refresh `/services/`, `/about/`, and `/contact/`.
4. Test 200% browser text enlargement, keyboard focus, reduced motion, and landscape phone screens.
5. After a real Google Form is configured, test direct opening, the optional mobile embed, validation errors, and the submit control in a private browser window. The embed's cross-origin height must be checked against the actual form.

The form URL, founder name, and email are still launch placeholders. A real Google Form and usable contact details are required before accepting inquiries.
