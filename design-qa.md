# Roadmap drawer design QA

- Source visual truth: conversation attachments showing the malformed full-width `Enable` action and the idea form's mismatched inline email label, plus the user's current drawer interaction specification. The attachments were not exposed as local filesystem paths.
- Implementation screenshot: not captured; the in-app browser reported no available browser session.
- Intended state: `/roadmap` at a narrow app-window width with a horizontally scrollable board and a feature or idea drawer open over the full Editor surface.

## Full-view comparison evidence

Blocked. The reference was inspected in the conversation, but the updated local implementation could not be opened or captured in the required browser. HTTP, development-bundle, lint, type, and production checks do not substitute for rendered visual evidence.

## Focused region comparison evidence

Blocked. The required focused regions are the drawer boundary, standard close control, undimmed board, and footer actions.

## Findings

- [P1] Horizontal board scrolling is unverified in a rendered app window.
  - Code change: the board now copies `/changelog`'s shared `ScrollArea` root → viewport → content containment pattern, including its full-size flex content wrapper. Its max-content lane row creates horizontal overflow inside that viewport, while each lane uses an unconstrained nested `ScrollArea`. Removing lane-level `overscroll-contain` is essential because it was consuming the cross-axis gesture before the outer board could scroll.
  - Remaining blocker: no browser session is available to exercise trackpad, scrollbar, and touch-style horizontal input.
- [P1] Drawer interaction and geometry are unverified in a rendered app window.
  - Code change: one non-modal drawer is mounted inside the full Editor surface with a 1rem vertical and right inset. It has no scrim, blur, body scroll lock, or Escape dismissal. One Editor-scoped listener closes it for clicks outside marked roadmap items and the drawer, while item-to-item clicks keep the shell open.
  - Remaining blocker: no browser session is available to confirm the window-relative inset, click-away boundary, and background interaction.
- [P1] Switching without replaying animation is unverified.
  - Code change: feature details and idea submission now share the same persistent drawer. Only the drawer shell animates between closed and open; content switches reuse the mounted shell.
  - Remaining blocker: no browser session is available to observe repeated feature and idea-card clicks.
- [P1] Team-crest flicker during drawer motion is unverified.
  - Code change: the drawer now owns a high isolated stacking context, an opaque paint-contained surface, and a non-overshooting tween so accelerated imagery cannot briefly paint above or around it.
  - Remaining blocker: no browser session is available to inspect the animation frame by frame.
- [P1] Footer action fidelity is unverified.
  - Code change: beta `Enable`, concept/alpha notification actions, and idea submission all use medium primary `OSButton` sizing with the native full-width contract. The early-access link API now forwards `width="full"`, so its raised inner face fills the button instead of remaining content-width.
  - Remaining blocker: no implementation screenshot is available for direct comparison with the supplied malformed-button reference.
- [P2] Close-control fidelity is unverified.
  - Code change: the custom animated X was replaced with the same `OSButton windowButton` pattern used by app-window controls.
  - Remaining blocker: no rendered close-control comparison is available.
- [P2] Idea-form label consistency is unverified.
  - Code change: the optional email input now uses the shared `Input` component's column direction, with the same small, semibold label treatment as the idea field.
  - Remaining blocker: no rendered form screenshot is available for direct comparison with the supplied reference.
- [P2] Filter transition quality is unverified.
  - Code change: stable cards use position-only layout animation, entering and exiting cards use a short fade/vertical offset, and the idea card participates in layout flow. All filter motion is disabled under `prefers-reduced-motion`.
  - Remaining blocker: no browser session is available to observe rapid search and team-filter changes in normal and reduced-motion modes.

## Required fidelity surfaces

- Fonts and typography: unchanged from the roadmap board; rendered result unavailable.
- Spacing and layout rhythm: drawer now uses the Editor surface's vertical bounds with 1rem insets and a 430px maximum width; rendered result unavailable.
- Colors and visual tokens: solid `bg-primary`, standard borders, and `shadow-2xl`; no scrim or dimming; rendered result unavailable.
- Image quality and asset fidelity: existing team crests and avatars are unchanged; rendered result unavailable.
- Copy and content: unchanged except removal of secondary drawer-dismiss buttons so only the standard X closes the drawer.

## Comparison history

- Earlier issues: darkened/blurred background, inconsistent custom X, malformed beta button face, modal layout jitter, separate feature/pitch drawer instances, inaccessible horizontal lanes, and team crests flickering during motion.
- Fixes made: inset Editor-height non-modal drawer, no overlay layer, one shared shell, standard window close control, no autofocus, instant content replacement, normalized action sizing, changelog-matched nested `ScrollArea` containment, and isolated drawer compositing.
- Post-fix visual evidence: unavailable because no in-app browser session was exposed.

## Implementation checklist

- Open a beta, concept, and idea drawer and confirm identical shell geometry.
- Narrow the app below 64rem and confirm the board scrolls horizontally to all three lanes.
- Click visible cards behind the open drawer and confirm instant content replacement without shell motion.
- Click the toolbar, page header, lane gaps, and empty lane space and confirm the drawer closes; click within the drawer and confirm it remains open.
- Watch team crests along the drawer's path during open and close; confirm none paint through the panel.
- Confirm Escape does not dismiss and the X does.
- Compare `Enable`, `Notify me at launch`, and `Submit idea` footer faces.
- Confirm a zero-result lane contains no filler copy and the idea form shows both labels above their fields with matching emphasis.
- Filter cards in and out of every lane and confirm remaining cards and the idea prompt flow without overlap; repeat with reduced motion enabled and confirm updates are immediate.
- Repeat in light/dark themes and narrow/short app windows.

final result: blocked
