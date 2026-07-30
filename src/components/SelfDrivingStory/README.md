# SelfDrivingStory

The **Scout → Signal → Investigate → PR → Merge** walkthrough, generalized from the
"Your product, fixing itself" section on `/traces` (`Products/Slides/TracesSelfHealing.tsx`)
into a data-driven component. Any product page or the `/ship-with-posthog` inbox can tell
the same five-beat story with its own copy and screenshots.

## Usage

```tsx
import SelfDrivingStory, { SelfDrivingStoryStep } from 'components/SelfDrivingStory'

const steps: SelfDrivingStoryStep[] = [
    { copy: 'What watches…', image: 'https://…' },
    { copy: 'What got caught…', imagePlaceholder: 'Screenshot: the report' },
    { copy: 'What the agent found…' },
    { copy: 'What the PR contains…' },
    { copy: 'The human merges…' },
]

// Read-only (product page)
<SelfDrivingStory headline="Your product, fixing itself" intro="…" footer="…" steps={steps} />

// Interactive (inbox): the Merge tab renders a working button
<SelfDrivingStory steps={steps} onMerge={() => merge(id)} merged={isMerged} />
```

## Props

| Prop        | Type                     | Notes                                                                          |
| ----------- | ------------------------ | ------------------------------------------------------------------------------ |
| `steps`     | `SelfDrivingStoryStep[]` | Exactly five, in stage order. Each has `copy`, and one of `image` / `imagePlaceholder`. The first step may set `label` to override "Scout" (e.g. "Source"). |
| `headline`  | `string?`                | Optional section heading (h2).                                                 |
| `intro`     | `ReactNode?`             | Optional intro paragraph.                                                       |
| `footer`    | `ReactNode?`             | Optional closing line.                                                          |
| `onMerge`   | `() => void`             | When set, the Merge tab shows a working GitHub-green "Merge pull request" button. |
| `merged`    | `boolean?`               | Flips the Merge tab to its merged state.                                        |

## Stages

The five stages – labels, colors (`bg-blue`/`bg-red`/`bg-purple`/`bg-green`/`bg-yellow`),
and progress-bar styling – are fixed so the story reads the same everywhere. Only copy and
images vary per step. A signal-source origin overrides the first tab's label to "Source";
a scout origin keeps "Scout".

Built on [`TabbedCarousel`](../TabbedCarousel).
