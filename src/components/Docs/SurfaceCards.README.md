# SurfaceCards

A card grid for docs overview pages. Used for the two grids the tool docs IA calls for – "Where you
can use it" (the surfaces a tool runs on) and "Where its data comes from" (its context/data sources).

Before this component, each overview page hand-rolled the same `<div className="not-prose grid ...">`
markup inline, which meant every tool's overview repeated ~10 lines of Tailwind per card and the
styling drifted between pages.

## Usage

```mdx
import { SurfaceCards, SurfaceCard } from 'components/Docs/SurfaceCards'

<SurfaceCards columns={2}>

<SurfaceCard icon="IconLaptop" color="blue" title="Web app" badge="Beta"
  url="/docs/mcp-analytics/surfaces/web-app" cta="Explore MCP usage">
Dashboards, session replay for agents, per-tool quality, and intent clustering.
</SurfaceCard>

<SurfaceCard icon="IconPlug" color="purple" title="MCP"
  url="/docs/mcp-analytics/surfaces/mcp" cta="Query over MCP">
Query sessions, tool stats, failures, and intent clusters from any MCP client.
</SurfaceCard>

</SurfaceCards>
```

## `SurfaceCards` props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `2 \| 3` | `3` | Grid width at the largest breakpoint. `2` → 1/2 columns, `3` → 1/2/3 columns. Uses `@container` queries, so it responds to the window's width, not the viewport. |
| `children` | `ReactNode` | – | `SurfaceCard` elements. |

Pick `columns` to avoid an orphaned card: four cards look better at `columns={2}` (a 2×2) than at
`columns={3}` (a 3+1).

## `SurfaceCard` props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `string` | – | Name of a `@posthog/icons` icon, e.g. `"IconLaptop"`. Falls back to `IconInfo` if unknown. |
| `color` | `string` | `"primary"` | Project color token for the icon, e.g. `"blue"`, `"purple"`, `"seagreen"`. Rendered as `text-{color}`, so the token must exist in `safelist.txt`. Do not use stock Tailwind colors. |
| `title` | `string` | – | Card heading, e.g. `"Web app"`. |
| `badge` | `string` | – | Optional pill after the title, e.g. `"Beta"`. |
| `url` | `string` | – | Relative link for the CTA, e.g. `/docs/mcp-analytics/surfaces/mcp`. |
| `cta` | `string` | – | CTA text. The `→` is appended automatically – do not include it. |
| `children` | `ReactNode` | – | The card body. Inline markup such as `<code>` is fine. |

## Notes

- The wrapper sets `not-prose`, so surrounding docs typography styles do not leak into the cards.
- Leave a blank line between `SurfaceCard` elements in MDX so the children parse as MDX rather than
  as a single text block.
