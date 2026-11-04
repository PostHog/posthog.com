# MCPLeaderboardCallout

A callout that sends readers to the [MCP leaderboard](/mcp/leaderboard). It has the same shape as `TraceExplorerCallout` (`contents/docs/ai-observability/installation/_snippets/trace-explorer-callout.tsx`): copy and a button on the left, a hedgehog on the right.

It renders on `/mcp-analytics`, between Install and Questions?. See `LeaderboardSection` in `src/hooks/productData/mcp_analytics/sections.tsx`.

## Usage

```tsx
import MCPLeaderboardCallout from 'components/MCPLeaderboardCallout'

<MCPLeaderboardCallout />
```

It also works in MDX with the same import.

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `''` | Extra classes on the wrapper. The wrapper has a 24px top and bottom margin. Pass `!my-0` to remove it. |

## Layout

The wrapper is a size container, so the layout follows the reader width, not the viewport:

- **560px and wider:** copy on the left, hedgehog on the right. The callout is at most 680px wide, so the hedgehog stays next to the copy.
- **Below 560px:** the copy stacks above the hedgehog, which is centered.

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
