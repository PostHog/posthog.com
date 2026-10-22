# PostHog AI page components

Sections for the `/ai` product page (`src/pages/ai/index.tsx`). The page renders inside `ReaderView`, and every layout uses `@container/reader-content` queries.

All product names, icons, and colors come from `useProduct`. Do not hard-code them. If a handle has no product, the row does not show.

## Components

### `ContextDiagram`

A `TabbedCarousel` of three sample workflows: checkout, renewals, and rollouts. Each workflow has:

- `question` – the tab heading
- `definition` – the approved definition the agent uses
- `steps` – four `{ handle, evidence }` rows. `handle` is a product handle, or `github`.
- `query` – sample SQL, shown in a `details` disclosure. It must match `definition`.
- `action` – the next step for a person to take

To add a workflow, add an entry to `workflows`. All data is illustrative. The figure has a screen-reader caption that says so.

### `Capabilities` and `AIEngineering`

`Capabilities` (default export) is the full tool list, collapsed behind a text button below the context diagram. Tools are in three `groups`. Each tool has a product `handle`, a `task`, and a docs link (`to`). Add `availability` (for example, `'Private beta'`) to show a label next to a feature that needs early access.

`AIEngineering` is the green "Building your own AI?" panel above the FAQ. Edit `engineeringTools` to change it.

### `Testimonials`

Paper notes in the shared `CardStackCarousel`. Each quote in `quotes` gets the style at the same index in `noteStyles`. If there are more quotes than styles, the styles repeat. Keep the quotes verbatim, with the abbreviated names as supplied. Do not add roles, companies, or photos.

### `ProductIcon`

Shows a product's `Icon` in its `color`, plus `colorDark` in dark mode when the product has one. Pass a product from `useProduct` and the size classes:

```tsx
<ProductIcon product={product} className="size-5 shrink-0" />
```

It shows nothing when the product or its icon is missing.

## Carousel motion

Both carousels on the page use the `TabbedCarousel` opt-in props:

- `pauseOnFocus` – auto-advance stops while focus is inside the carousel.
- `paused` – set from `useReducedMotion()`, so auto-advance does not run with reduced motion.

The access carousel (on the page) also passes the web demo's Pause state to `paused`. The paused demo stays on screen. Its slides run for 25 seconds, so the 20-second demo can finish.

## Data on the page

- **MCP categories:** the MCP tab reads the build-time `mcpLeaderboard` node through the helpers in `components/MCPLeaderboard/data.ts`, so its labels match `/mcp/leaderboard`. The data shows shares of tool calls for one complete week. Do not describe it as completed tasks.
- **Pricing:** free credits and the credit price come from the `posthog_ai` product data. The FAQ links to `/docs/posthog-ai/pricing` for the rest.
- **Scout templates:** the background-work tabs read `useSelfDrivingTemplates` and link with `buildScoutDeepLink`.

## Verification

Check `/ai` in narrow and wide windows, in light and dark mode. Check keyboard access to both carousels, reduced motion, and the `SlicedHog` animation.
