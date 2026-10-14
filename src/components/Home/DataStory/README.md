# DataStory

The homepage's data story, below "Social proof". It follows the brand's four steps (`contents/handbook/brand/foundations.md`). Each step is its own section with its own visual, and the steps do not depend on each other.

| Step | Section | Visual |
| --- | --- | --- |
| 1. Get the data in | `Ingest/` (`#get-the-data-in`) | A marble run. Events from a demo store become tiles, fly to Ingestion in an envelope, and sort into one column per event type. |
| 2. Query the data with your agent | `Query/` (`#query-the-data`) | An insight board. A question types into the bar, the matching chart queries, and then it redraws with its answer. |
| 3. Give the data to your agent to act on | `Act/` (`#act-on-the-data`) | One night on a timeline. Signals appear on source lanes, scouts run every hour, and related signals group into reports. |
| 4. Let PostHog self-drive | `SelfDrive/` (`#self-drive`) | A flywheel that spins faster each lap while each stage's number improves, above a wall of real merged pull requests. |

## Rules

- **Auto-play, no dragging.** Steps 2 to 4 play on their own while they are on screen, and pause while the pointer is over them. Under reduced motion, each step shows its final state.
- **No layout shift.** Every animated element renders into reserved space: fixed chart heights, stacked invisible text for typed or changing labels, and placeholders for cards that appear later.
- **Brand art only.** Hedgehogs come from `@posthog/brand/hoggies` and stage art from `@posthog/brand/crests`.
- **Charts follow the dataviz rules.** Series colors are blue, orange (`orange-dark` in dark mode), and purple, validated in both modes. Text uses text tokens, never a series color. Every chart has a hover tooltip.
- **Real data where we have it.** The pull request wall reads `allSelfDrivingPullRequest` (sourced in `gatsby/sourceNodes.ts`) and hides itself when there are no nodes. Every other number is a labeled demo.

## Files

| File | Role |
| --- | --- |
| `index.ts` | The four step exports. |
| `StepIntro.tsx` | The "Step N of 4" eyebrow, heading, and intro. |
| `ProductChips.tsx` | Product links under each step. |
| `charts.tsx` | Scales, path builders, series classes, the tooltip, and the marker. |
| `hooks.ts` | `useElementSize`, `useInView`, `useHasBeenSeen`. |
| `animations.css` | Draw, grow, pop, fade, scan, and caret keyframes, with reduced-motion overrides. |
| `Query/insights.tsx` | The five questions, their charts, and their takeaways. |
| `Act/night.ts` | The demo night: lanes, signals, scout runs, and reports. |
| `SelfDrive/loop.ts` | Stages, per-lap values, and the spin-up curve. |
| `SelfDrive/PullRequestWall.tsx` | The real pull request query and wall. |

## Step 1 engine

`Ingest/` keeps the matter-js marble run. `DataLineProvider` puts the physics overlay over the step 1 section only.

- **One physics world in overlay coordinates.** Components describe parts in local coordinates (`Parts`: segments plus zones) and call `registerParts(key, element, parts)`. Only the section floor is solid.
- **Zones:** `converter` batches tiles and sends the batch to the envelope (`onSend`), which calls `deliver(route, kinds)`. `entry` releases beads while its route is open. `counter` counts beads per type and trims a full column. `conveyor` pushes beads along the sorting rail. `sink` fades stray tiles.
- **Reduced motion** skips physics. Counts update directly and the columns show bars.
- **Loop:** a fixed 60 Hz step on `requestAnimationFrame` that runs only while bodies are awake.
- matter-js sets `friction: 1` on static bodies, so `withSurface` sets friction after creation. Keep wall bodies thinner than half the gap to a neighbor, or they close the neighbor's trapdoor on narrow screens.
