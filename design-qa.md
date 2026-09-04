# Design QA

- Source image: `/private/tmp/paseo-attachments-xPw1Gm/f4720da0bc131394c9e3db455f97123dd2d5997c15fd25f8cd49951e3401dd01.png`
- Refinement images: `/private/tmp/paseo-attachments-xPw1Gm/d9bab2e143473f68266b597a5a9dd6002d55b0884958eccd0a80efe81d254497.png`, `/private/tmp/paseo-attachments-xPw1Gm/f474d1275b3557a15f33636e3f0fd618499bff26e04f8292e0fffabc199a970f.png`
- Implementation screenshot: `.impeccable/review/arc-wide-light.png`
- Route: `/docs/product-analytics`
- Requested viewport: 2048 × 1152 CSS pixels
- Captured image: 3932 × 2304 pixels at the Paseo browser device scale
- State: light theme, sidebar expanded, cookie notice dismissed

## Full-view comparison

The implementation matches the main structural direction of the reference:

- The content surface is opaque and rounded.
- The left rail uses the desktop background and stays visually separate from the content surface.
- Close, expand, sidebar, back, and forward controls are in the left rail.
- Search and page navigation stay in the left rail.
- The table of contents is at the bottom of the left rail, and the old right rail is removed.
- One outer border connects the rail and the content surface.

The PostHog desktop, navigation content, typography, and brand colors stay native to the product. These intentional differences replace the browser-specific content in the reference.

## Focused comparison

The rail-to-content seam, corner radii, and control alignment are consistent. The opaque content panel has a clear edge against the translucent rail. The inner panel uses a smaller radius than the outer window so the border stays even at each corner. No content is cropped at the tested wide or narrow widths.

## QA history

1. Initial wide review: passed the reference structure in light and dark themes.
2. Initial narrow review: found the old floating navigation button at the bottom-right.
3. Fix: replaced the floating button with a fixed left control rail.
4. Refinement review: removed the vertical sidebar seam, reduced the inner radius, and replaced the compact rail with a fully hidden edge state.
5. Interaction review: the hidden sidebar slides out from the left edge on hover and slides back after the pointer leaves.
6. Forced-minimized review: `/pricing`, which supplies `hideLeftSidebar`, keeps the sidebar available from the hidden edge state.
7. Final narrow review: passed in light and dark themes; the drawer opens from the left and contains search, navigation, and the table of contents.
8. Accessibility review: hidden panels are inert, edge targets report their expanded state, keyboard focus enters the narrow drawer, and reduced-motion preferences disable the transitions.

## Final result

passed
