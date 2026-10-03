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

## Soft-launch rollout

CI runs these as real **review** Visual Review runs, but configures the
Actions side so they cannot fail a pull request yet. Two different GitHub
surfaces are involved:

- **The `Visual regression tests` Actions job** always stays green for
  visual changes. The three steps that talk to Visual Review use
  `continue-on-error`, because `vr run complete` exits 1 whenever diffs are
  detected (and also would on any VR outage, which must not break PRs either).
  A capture failing — a page returning an error, layout not settling — still
  fails the job on its own merits.
- **The `PostHog Visual Review / playwright` commit status** is the genuine
  review signal. It is posted by the Visual Review backend, not the workflow:
  red while a run has unreviewed diffs, green once the run is clean or
  approved + finalized. During the soft launch it is *not* a required status
  check on master, so red is information, not a blocked merge.

Runs are `purpose: review` so they are fully actionable in the
[Visual Review UI](https://us.posthog.com/project/2/visual_review): approve
diffs when they are expected, and finalize writes the signed baseline to
`snapshots.yml` on the branch so the next run compares against it. That is
also how we validate the determinism work — re-running the suite on an
unchanged commit should come back with zero changed snapshots.
(`purpose: observe` runs cannot be approved, so a tracking-only rollout could
never build a baseline or tell us whether consecutive runs actually stay
stable.)

To graduate to a real gate: make `PostHog Visual Review / playwright` a
required status check on master and drop the `continue-on-error` from the
`Complete Visual Review run` step.

## Visual Review setup

`PostHog/posthog.com` is enabled under [Visual Review settings](https://us.posthog.com/project/2/visual_review/settings), with the `playwright` baseline path configured as `visual-regression/snapshots.yml`. The workflow uses the shared `VR_API_TOKEN` GitHub Actions secret.
