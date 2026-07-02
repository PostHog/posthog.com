# Error boundary

Catches client-side rendering and asset-loading failures so pages degrade
gracefully instead of showing a blank screen.

## Why this exists

PostHog.com is a static Gatsby site that navigates client-side. Two failure
modes were leaving visitors on blank/half-rendered screens, most visibly when
clicking through the docs/handbook sidebar:

1. **Stale assets after a deploy.** A visitor's already-loaded HTML references
   hashed JS chunks and `page-data.json` files. When a new deploy ships, those
   hashes change and the old files are removed from the CDN. The next
   client-side navigation tries to fetch a file that no longer exists and dies
   with `ChunkLoadError` / `We couldn't load "/page-data/…json"`.
2. **Uncaught render exceptions** in a page component, which – with no boundary
   anywhere in the tree – unmounted the whole app to a white screen.

The app previously had **no error boundary and no retry** for either case.

## What it does

- `ErrorBoundary` (default export): a React error boundary. Stale-asset errors
  trigger a guarded one-time hard reload (which re-fetches the current
  post-deploy HTML and its new asset hashes). Any other error renders a small
  "This page didn't load correctly" fallback with a **Reload page** button.
  Pass `resetKey={path}` so navigating to another page clears a stuck fallback.
- `isStaleAssetError(error)`: predicate matching chunk-load and page-data fetch
  failures.
- `reloadForStaleAssets()`: performs the guarded reload (max once per 15s via
  `sessionStorage`, so a genuinely-missing asset can't cause a reload loop).

## Where it's wired in

- **`src/components/AppWindow/index.tsx`** wraps the page `Router` output in
  `ErrorBoundary` (catches render-time exceptions in page content).
- **`gatsby-browser.tsx`** registers global `unhandledrejection` / `error`
  listeners in `onClientEntry` that call `reloadForStaleAssets()`. This covers
  chunk / `page-data` failures thrown inside Gatsby's loader **during
  navigation**, which happen outside React render and so never reach the
  boundary.

## Notes

- The reload guard is intentionally conservative. If a reload doesn't resolve
  the failure (e.g. the asset is truly gone), the guard suppresses further
  reloads and the boundary's fallback UI is shown instead.
- These failures are deploy-timing races; they can't be reproduced in `pnpm
  start` (dev serves assets on demand). Verify behavior against a production
  build with a simulated hash change, or by throwing from a page component to
  confirm the fallback renders.
