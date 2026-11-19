# TwigExhibits

Components that render Twig UI from `@posthog/twig-components` inside Learn figures. The reader uses the real Twig UI, not a screenshot. Most exhibits show a mock PostHog panel beside the Twig UI. That panel is not Twig, so it lives in [`Learn/`](../README.md).

Put a component here if it imports `@posthog/twig-components`, or if it only wraps a component that does. Guide chapters, hub overviews, and Live playground pages all use these components, so do not import from `PocketGuides/` here.

For how Product Analytics guide chapters use these exhibits, see the [PocketGuides README](../PocketGuides/README.md#product-analytics-teaching-examples).

## Product Analytics compact Twig audit

All current Product Analytics Twig figure consumers use `/compact.css` and the
shared compact primitives. The guide retains its PostHog inspector styling.

| Consumer | Compact Twig parts |
| --- | --- |
| `TwigBrowseFigure` (101 autocapture, events, filters, properties, and Learn overview) | Wordmark, destination filters, photo/name/location/price card |
| `SessionGroupingFigure` | Forest/Coast filters and compact stay |
| `IdentifySavedStayFigure` | Stay, bookmark, login, saved-stay list |
| `ResetIdentityFigure` | Profile menu/sign-out, saved-stay list, signed-out stay |
| `BookingStepsFigure` | Stay and booking action/disabled state |
| `RepeatBookingFigure` | Stay and booking action/confirmation |
| `SavedStayJourneyFigure` | Bookmark, saved list, stay and booking action |

The retention bookmark must remain inside `.twig-compact`, including when
positioned over the photo. Otherwise it inherits the legacy standalone control
palette. Profile-menu layout belongs in the shared compact stylesheet rather
than host overrides. Event figures need no extra host border around the Twig
surface.

Trends, funnels, retention charts, cohorts, dashboards, and replay-player chrome
are PostHog UI, not compact Twig. Replay footage remains a recorded asset.
`TwigBrowseStaysMockup` has no consumers; it and the package's read-only
`BrowseStaysPreview` are not used by this guide. Other guide volumes are outside
this change. No guide prose, simulated event payloads, or lesson flow changes.

## Compact Twig integration checks

The guide pins the published `@posthog/twig-components@0.2.3` release, including
`/compact`, `/compact.css`, and the compact account and stay-card APIs. Keep the
exact registry dependency and pnpm lockfile together when upgrading. Do not use
local paths, archives, Git refs, aliases, or an assumed next version.

1. Verify a clean `pnpm install --frozen-lockfile`, then run
   `pnpm test:gatsby-functions`, `pnpm test:pocket-guides`, and
   `pnpm test:twig-integration` under Node 22. The integration test uses the
   installed package, including its CSS and font assets. Convention tests alone
   do not validate this dependency.
2. Run the Gatsby build and inspect 101, identity-sessions,
   trends-and-funnels, and retention-cohorts in the actual site. Check keyboard
   controls, manual and autoplay flows, reset, and reduced motion. Capture the
   required narrow/wide and light/dark before/after screenshots and motion GIFs
   before human review.

Saved-stay views need `.twig-account-layout` inside `.twig-compact` to initialize
shared account tokens. Keep the wrapper in both identity and retention figures;
otherwise muted account text inherits the surrounding text color. The saved-stay
journey's visitor label sits to the right of the cursor during the bookmark and
booking previews, and stays hidden on the saved-stay page.

A local component build can test host behavior, but cannot replace a clean
registry install and actual-site review. Do not commit local package
substitutions as the consumer dependency.
