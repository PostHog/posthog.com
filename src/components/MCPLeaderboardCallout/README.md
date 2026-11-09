# MCPLeaderboardCallout

A callout that sends readers to the [MCP leaderboard](/mcp/leaderboard). It has the same layout as `FieldGuideCallout` (`src/components/FieldGuide/FieldGuideCallout.tsx`): a hedgehog on the left that breaks out of the top border, copy in the middle, and a button on the right.

It renders on `/mcp-analytics`, between Key features and AI prompts. See `LeaderboardSection` in `src/hooks/productData/mcp_analytics/sections.tsx`.

## Usage

```tsx
import MCPLeaderboardCallout from 'components/MCPLeaderboardCallout'

<MCPLeaderboardCallout />
```

It also works in MDX with the same import.

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `''` | Extra classes on the wrapper. The wrapper has a 24px top and bottom margin. Pass `!my-0` to remove it. It also has 32px of top padding for the hedgehog. |

## Layout

The wrapper is a size container, so the layout follows the reader width, not the viewport:

- **576px and wider:** the callout fills the container width. The hedgehog is on the left, the copy is in the middle, and the button is on the right.
- **Below 576px:** the hedgehog is smaller and the button moves below the copy.

## Styles and colors

The styles use an `mlc-` prefix and sit in a `<style>` block in the component, like `TraceExplorerCallout`.

There are no hex values:

- **Light surface:** `colors.lemon.lighter` from `@posthog/brand/colors`.
- **Dark surface:** the `light-12` Tailwind token, set as `--mlc-dark-bg` on the wrapper.
- **Text and lines:** the site's `--text-primary` scheme variable. The lines use it at 20% opacity.

## Content

- Heading: "We just had to rank the robots"
- Button: "MCP Leaderboard" (`OSButton`, `variant="primary"`)
- Hedgehog: `HedgehogBasketballCoach` from `@posthog/brand/hoggies`
