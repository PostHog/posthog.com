# Visual regression tests

These tests capture representative pages from a built PostHog.com preview. PostHog Visual Review compares the PNGs with the approved baseline; Playwright itself does not keep a second set of baseline images.

The route set uses page classes that the `GATSBY_MINIMAL` preview actually renders. Direct tutorial and customer-story MDX routes are intentionally excluded because the minimal build maps both through the blog template.

## Run locally

Start the site, then run:

```bash
BASE_URL=http://127.0.0.1:8001 pnpm test:visual
```

Screenshots are written to `.visual-regression/screenshots`, with the HTML report in `.visual-regression/report`.

## Visual Review setup

`PostHog/posthog.com` is enabled under [Visual Review settings](https://us.posthog.com/project/2/visual_review/settings), with the `playwright` baseline path configured as `visual-regression/snapshots.yml`. The workflow uses the shared `VR_API_TOKEN` GitHub Actions secret.

Approving the first run commits the signed baseline hashes to `snapshots.yml`.
