# HoggieCallout

A callout that sends readers to another page. A hoggie sits on the left, the copy sits next to it, and a button sits on the right. The hoggie breaks out of the top border, or stands on the bottom border inside the callout (see `hoggiePlacement`). In a narrow container, the button moves under the copy.

The button opens its link in a new window, with `state={{ newWindow: true }}` on `OSButton`.

## Used by

| Component | Where it shows |
| --- | --- |
| `MCPLeaderboardCallout` | `/mcp-analytics` (the leaderboard section) |
| `EvalsPlaygroundCallout` | `/docs/ai-evals` and `/docs/ai-evals/offline-evals` |

Make a small wrapper component for each callout, so a page imports one component with no props. Put the copy in the wrapper.

`FieldGuideCallout` in `src/components/FieldGuide/` has a similar layout, but it does not use this component. It uses an image file instead of a hoggie, a secondary `CallToAction`, and the `reader-content` container.

## Usage

```tsx
import { HedgehogJudge } from '@posthog/brand/hoggies'
import HoggieCallout from 'components/HoggieCallout'

export default function EvalsPlaygroundCallout({ className = '' }: { className?: string }): JSX.Element {
    return (
        <HoggieCallout
            hoggie={HedgehogJudge}
            hoggieTitle="A hedgehog judge in a robe and lace collar, raising a gavel"
            hoggiePlacement="inset"
            ariaLabel="Evals playground"
            title="Before you ship, or after?"
            description="Learn the differences between offline and online evals in our live playground."
            buttonLabel="Evals playground"
            to="/learn/ai-observability/live-playground/online-and-offline-evals"
            className={className}
        />
    )
}
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `hoggie` | component | A hoggie from `@posthog/brand/hoggies`. It gets the `title` and the position classes. |
| `hoggieTitle` | `string` | Describes what the art shows, for screen readers. |
| `hoggiePlacement` | `'breakout'` or `'inset'` | `breakout` (the default) lets the hoggie break out of the top border. `inset` makes the hoggie smaller and stands it on the bottom border, inside the callout. Use `inset` for a hoggie whose art is cut off at the bottom, like `HedgehogJudge`. |
| `ariaLabel` | `string` | Label for the outer `aside`. |
| `title` | `string` | Bold first line. |
| `description` | `ReactNode` | Text under the title. |
| `buttonLabel` | `string` | Button text. |
| `to` | `string` | Button link. |
| `className` | `string` | Classes for the outer `aside`, for spacing. The default margin is `my-6`. |

## Layout

The outer `aside` is a size container (`@container`). The hoggie and the button row change at `@xl`, so the callout responds to its own width, not to the window width.
