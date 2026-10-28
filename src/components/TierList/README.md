# Hoggie tier list

`/tier-list` loads its inventory, image variants, search tags, and tier colors from the live [PostHog brand catalog](https://brand.posthog.com/catalog.json) when opened. New brand releases do not need a website deploy.

There is no bundled fallback catalog. If loading fails or exceeds five seconds, the page offers a retry and leaves the saved browser draft unchanged.

Run the catalog and ranking tests with `pnpm test:tier-list`.
