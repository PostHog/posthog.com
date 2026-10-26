# MCPAnalyticsHowItWorks

A 3-step diagram that shows how MCP Analytics works:

1. **Wrap your MCP server** – the wizard command wraps the server.
2. **Get a dashboard** – tool calls, models, and error rate by tool.
3. **Ask from anywhere** – a question in Slack, an MCP client, or PostHog AI gets a ranked answer.

A Doc Brown hedgehog walks a track from step to step.

It renders on `/mcp-analytics`, directly below the "How do I use it?" carousel. See `ApplicationsWithHowItWorks` in `src/hooks/productData/mcp_analytics/sections.tsx`.

## Usage

```tsx
import MCPAnalyticsHowItWorks from 'components/MCPAnalyticsHowItWorks'

<MCPAnalyticsHowItWorks />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `''` | Extra classes on the root element. |

## Behavior

- **Sequence:** the diagram plays phase 0 → 1 → 2 → 3 once, then stays on step 3. It starts when 15% of the diagram is on screen, so it also starts on short screens.
- **Server render:** the diagram renders step 3. Readers without JavaScript see the finished state.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, the diagram shows step 3 and nothing animates.
- **Step tabs:** in the narrow layout, a click on a tab jumps to that step and stops the sequence.
- **Copy button:** copies `npx -y @posthog/wizard@latest mcp-analytics`. The diagram shows the short form, `npx @posthog/wizard mcp-analytics`. Both strings come from `buildWizardCommand()` in `components/PlatformInstall/buildCommand.ts`, so they match the Install section.

## Layout

The root is a size container named `mxa`. The layout follows the container width, not the viewport:

| Container width | Layout |
|---|---|
| 860px and wider | Three steps side by side, with arrows. The hog walks a track below them. |
| Below 860px | One step at a time. The track and the hog sit above three step tabs. Product pages are about 730px wide, so this is the usual layout. |
| Below 420px | Step tabs stack the number above the title. The stages get taller. |
| Below 340px | Smaller tab and table text. |

## Styles and colors

The styles use an `mxa-` prefix and sit in a `<style>` block in the component, like `LiveSelfDrivingLoop`. The phase-driven transitions and keyframes do not fit in utility classes.

There are no hex values:

- **Accent colors** (blue, yellow, green, tangerine) come from `@posthog/brand/colors`.
- **Neutrals** come from the site's scheme variables (`--bg`, `--border`, `--text-primary`, …). Each stage has `data-scheme="secondary"`, so it uses the secondary surface in light and dark mode.
- **Fixed neutrals** (the ink on colored badges, the button border and shadow) come from Tailwind tokens. Arbitrary-property classes on the root set them, for example `[--mxa-btn-shadow:theme(colors.button-shadow)]`.

## Icons and illustration

- Icons: `@posthog/icons`. `@posthog/icons` has no MCP icon, so the MCP server card uses `IconServer`.
- Hedgehog: `HedgehogDocBrown` from `@posthog/brand/hoggies`.
- Font: the site's RoundHog. The component does not load fonts.
