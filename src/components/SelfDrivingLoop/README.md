# SelfDrivingLoop

The animated explainer for PostHog's **self-improving loop**. It replaces the static Mermaid
diagram on the self-driving docs: a runner walks one real pull request (`#67394`) through the
six loop stages, with per-stage narration.

Used on:

- `contents/docs/self-driving/index.mdx` (overview)
- `contents/docs/self-driving/self-improving-loop.mdx` (loop concept page)

> **Scope:** this component is the loop **diagram only**. The live "real PRs the loop opened"
> list was split out into [`SelfDrivingPRRail`](../SelfDrivingPRRail) so it can be placed
> independently.

## Usage

Import it directly in the MDX file (same pattern as `QuestLog`), in place of the old
` ```mermaid ` block:

```mdx
import SelfDrivingLoop from 'components/SelfDrivingLoop'

<SelfDrivingLoop />
```

It takes no props.

## Behavior

- **Auto-plays** through the six stages at `STEP_MS` (5s per stage — slow enough to read).
- **Hovering** the diagram (or focusing into it) pauses the auto-play so a step can be read.
- **Clicking a stage** parks the runner there and hands control to the reader (auto-play stays
  off for the rest of the visit).
- **Reduced motion** (`prefers-reduced-motion: reduce`): no auto-advance, every stage lit, parked
  on the "Pull request" beat. Stages stay clickable.
- **Direction:** in the single-row layout (`@[600px]` and up) the connecting track is a single thin
  grey line (theme border color) whose dashes flow left→right (the `.sdl-flow` animation) so data
  reads as moving through the pipeline. The flow freezes under `prefers-reduced-motion`; the track
  is hidden on narrow screens (3-col grid).
- **Loop-back:** shown as a small caption ("↻ the outcome feeds back in as new signals") that
  appears only on the final **Measured** step, rather than a drawn arrow. The Measured stage's
  narration reinforces it.

## Data (build-time, no runtime calls)

Reads the `SelfDrivingPullRequest` GraphQL nodes produced by `sourceSelfDrivingPRs()` in
`gatsby/sourceNodes.ts` and features the **most recently opened** PR (sorted by `openedAt`), so the
diagram tracks the latest real work each time the site builds.

Only two stages weave in real per-PR data from GitHub:

- **Pull request** — the PR's number and title.
- **You review** — merged vs. an open draft awaiting review, from `state`.

The **Signal source / Signals / Report** stages describe the loop generically. That provenance —
which signal fired, how it was grouped into a report — isn't in GitHub's API (it lives in
PostHog's internal signals/inbox system), so `buildJourney()` deliberately keeps that copy generic
rather than fabricating specifics. If there are no nodes at build, it falls back to a fully generic
story with no PR and still renders.

## Styling conventions

- **Stage accent colors** (`COLOR`) are component-local constants matching the old Mermaid
  `classDef` colors. The two adjacent "data" chips are deliberately different so they don't read
  as one block: Signals keeps the diagram's amber `#FFA81C`, and Report uses the `teal` brand
  token `#29DBBB`. They're applied via inline `style`, identical in light and dark, and must not
  become stock Tailwind colors.
- **Structural theming** (surface, border, text) uses the var-backed project tokens
  (`bg-primary`, `bg-accent`, `border-primary`, `text-primary`, `text-secondary`) which flip
  automatically with the `.dark` class — no `dark:` overrides needed.
- **Responsiveness uses `@container` queries**, never media queries. The stage rail is a 3-column
  grid on narrow screens and a single row of 6 at `@[600px]` and up; the connecting track, runner,
  chevrons, and return-arrow only appear in that single-row layout.

## SSR

Static-first: the full six-stage layout renders with no JS. The animation is progressive
enhancement, so the diagram never looks broken.
