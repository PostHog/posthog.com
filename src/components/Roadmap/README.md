# Roadmap board

`EarlyAccessFeaturesSection` powers `/roadmap`. It presents the same early-access data and enrollment flows as the PostHog app in a compact, changelog-style board.

## Data ownership

- `useEarlyAccessFeatures` owns the feature data. It starts with Gatsby's build-time `EarlyAccessFeature` nodes, then revalidates with PostHog JS in the browser.
- The hook supplies the feature stage, title, description, documentation URL, flag key, creation date, waitlist count, and waitlist survey payload.
- `useFeatureOwnership` supplies the shared feature-to-small-team map. `roadmapTeamOverrides.ts` is the curated flag-key override and takes precedence over that map.
- `allSqueakTeam` supplies display names, mini crests, and member profiles. Features without a match remain visible and can be filtered as `Unassigned`.

Do not duplicate this data in the component or add hard-coded feature cards. Update the source early-access feature, shared ownership data, or the roadmap override map instead.

## Board and cards

The board is generated from one ordered stage configuration: Beta, Alpha, and Concept. All three lanes remain rendered while filtering, including empty lanes, so the product progression stays understandable. Each lane owns its vertical scroll position and shows its current filtered count.

Cards intentionally contain only:

- Feature title
- Owning team name
- Team mini crest, when available
- Optional `New` and `Popular` badges

`New` means the feature was created within the configured new-feature window. `Popular` is assigned to the top features with a positive build-time waitlist count. Badges never change the card border; the selected card uses the standard accent background.

Every lane ends with the same dashed `Your idea here` card. It opens the shared overlay drawer containing the roadmap pitch form; the form is not duplicated per lane.

## Filtering

One search query is applied before grouping into lanes. It matches the title, full description, flag key, and owning team name. Search is cleared directly from the search field, so it does not add a second filter chip below the toolbar. The team filter is applied at the same time and includes an `Unassigned` option when necessary. Counts always reflect both filters. Empty lanes stay visually empty rather than adding a redundant no-results message; their zero count already communicates the state.

Featured ordering is preserved within each lane: new cards lead, and joinable alpha/concept items lead their stage. There are no stage or sorting controls because the lanes themselves communicate stage.

Filter changes use Framer Motion's position-only layout projection. Removed cards fade and lift out, remaining cards flow into their new positions, newly restored cards fade into place, and the permanent `Your idea here` card moves with the list. When the user prefers reduced motion, layout, enter, and exit animation are all disabled and filtering updates immediately.

## Responsive behavior

The roadmap page uses the Editor app's container, not the browser viewport, as its responsive context.

- At the `@5xl` container breakpoint (64rem), the board is a three-column grid with equal lanes.
- Below 64rem, lanes remain side by side in a horizontally scrollable, snap-aligned board. The board uses the same shared `ScrollArea` root → viewport → content contract as `/changelog`, with a max-content lane row inside the viewport. Above the breakpoint, only the row changes to a three-column grid.
- Narrow lanes target 340px but cap their width to the available app-window width, preventing clipped cards and controls.
- The board's outer `ScrollArea` has a definite height. Each lane uses the same nested `ScrollArea` pattern as changelog columns. Do not add `overscroll-contain` or horizontal clipping to a lane viewport: those rules consume the cross-axis gesture before it can reach the board viewport, which breaks horizontal scrolling over a card column.

Use Tailwind container-query variants for future changes. A browser media query will be wrong when the roadmap app window is resized independently of the viewport.

## Drawer and deep links

Cards and idea prompts share one right-side drawer contained by the Editor surface. It spans almost the full app-content height with a 1rem inset on every open edge, overlays without resizing the board, and is capped near the changelog drawer's compact width. It remains below the app window's title-bar controls. There is no scrim, dimming, blur, or scroll lock, so visible board cards remain clickable while the drawer is open.

The drawer animates only when it opens from a closed state or closes. Switching directly between features or between a feature and the pitch form replaces the drawer content without replaying the animation. Framer Motion uses a non-overshooting right-edge tween and respects reduced-motion preferences. The drawer creates an isolated, opaque paint layer so accelerated team imagery cannot bleed through it while it moves.

The drawer is non-modal. Clicking another feature or idea card replaces its content without closing the shell or replaying the animation. Clicking elsewhere inside the roadmap's Editor surface closes it; clicks within the drawer itself do not. Escape remains disabled, and the standard `OSButton` window close control always dismisses it. This behavior uses one Editor-scoped click listener plus `data-roadmap-item` and `data-roadmap-drawer` markers—do not add a scrim or restore modal outside-click handling.

The drawer contains the full description, documentation link, linked small team, complete avatar roster with tooltips, and the stage-specific action.

The canonical URL is `/roadmap?feature=<flagKey>`. Opening a card adds only `feature` with a history replacement, and closing removes only that parameter the same way. This keeps visible URLs shareable without turning browser Back into another drawer-dismiss control. Invalid values leave the board usable and are removed safely after feature data loads.

Legacy `/roadmap#<flagKey>` URLs are supported. A valid hash is normalized to the canonical query URL with a history replacement.

The drawer's copy control always copies the canonical URL, without unrelated filters or hashes.

## Actions

- **Beta:** a full-width external `Enable` button opens the matching feature preview in the PostHog app. It uses the same medium primary `OSButton` sizing and full-width contract as the notification form. Do not enroll the anonymous website visitor locally.
- **Alpha:** `SurveySignup` records the linked waitlist survey response without a concept enrollment event.
- **Concept:** `SurveySignup` records the linked waitlist survey and receives the flag key, preserving the existing concept-stage enrollment behavior.
- **Pitch an idea:** the dashed card at the bottom of every lane opens the shared drawer and records the existing roadmap concept-pitch survey. The idea and optional email fields use the same stacked, bold-label form treatment. Its submit action uses the same medium primary full-width button treatment as the feature actions.

`SurveySignup` owns returning-user state in local storage. Keep these flows delegated to the shared components so analytics and persistence remain consistent elsewhere on the site.
