# Visual regression tests

These tests capture representative pages from a built PostHog.com preview. PostHog Visual Review compares the PNGs with the approved baseline; Playwright itself does not keep a second set of baseline images.

The route set uses page classes that the `GATSBY_MINIMAL` preview actually renders. Direct tutorial and customer-story MDX routes are intentionally excluded because the minimal build maps both through the blog template.

## Run locally

Start the site, then run:

```bash
BASE_URL=http://127.0.0.1:8001 pnpm test:visual
```

Screenshots are written to `.visual-regression/screenshots`, with the HTML report in `.visual-regression/report`.

## Deterministic captures

The same deployed build used to produce slightly different screenshots on
consecutive runs, which made every run report phantom changes. The spec now
stabilises the usual sources of noise before it screenshots:

- **Time**: the browser clock is frozen (`page.clock`) so anything rendered
  from "now" — relative dates, the footer copyright year, countdowns — is
  identical on every run.
- **Random content**: `Math.random()` is seeded. Homepage / customers-page
  shuffles and other randomly-picked widgets render the same choice every
  time.
- **Live-data timestamps**: text like "3 days ago", "Solved 2 hours ago",
  and raw ISO dates comes from dayjs + live API data, so it changes between
  runs even on the same build. It is normalised to a stable token before the
  screenshot.
- **Motion and media**: animations/transitions are zeroed and `iframe`/`video`
  are hidden, then the page is settled (fonts + images + stable layout) before
  capture.
- **Sketch-style annotations**: rough-notation draws each decoration with a
  fresh random seed per load, so its `.rough-annotation` SVGs are hidden. The
  text they decorate is still captured.
- **Inner scroll containers**: pages render inside `.app-scroll-viewport`
  divs, not the document, so `document.scrollHeight` equals the viewport and
  `window.scrollTo` does nothing — lazy lists then streamed in different items
  on different runs (~150k px of diff on blog pages). The spec now scrolls
  every scrollable element to the end first so all content renders, then
  resets scroll positions.

Third-party calls (PostHog analytics, Inkeep, YouTube, Wistia) are aborted and
the page runs with `ph_optout` set so PostHog JS does not load.

## Non-gating rollout

CI runs these as a **tracking** (`--purpose observe`) Visual Review run. That
means:

- **It does not fail the build.** Visual Review posts a green, informational
  `PostHog Visual Review / playwright (tracking)` commit status, and the
  workflow treats the CLI's exit code as informational so the Actions job
  stays green even when pages differ.
- Runs still record every snapshot and its diff history in the
  [Visual Review UI](https://us.posthog.com/project/2/visual_review), so noisy
  pages can be spotted and stabilised before we turn gating on.

To start gating on visual changes: switch the workflow `--purpose` back to
`review`, drop the `continue-on-error`, and approve the first clean run in
Visual Review to publish the signed baseline to `snapshots.yml`.

## Visual Review setup

`PostHog/posthog.com` is enabled under [Visual Review settings](https://us.posthog.com/project/2/visual_review/settings), with the `playwright` baseline path configured as `visual-regression/snapshots.yml`. The workflow uses the shared `VR_API_TOKEN` GitHub Actions secret.
