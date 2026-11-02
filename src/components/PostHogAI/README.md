# PostHog AI page components

Sections for the `/ai` product page (`src/pages/ai/index.tsx`). The page renders inside `ReaderView`, and every layout uses `@container/reader-content` queries.

All product names, icons, and colors come from `useProduct`. Do not hard-code them. If a handle has no product, the row does not show.

## Components

### `ContextDiagram`

A `TabbedCarousel` of three scripted PostHog AI conversations, named for the metric people check: conversion, activation, and churn. Each tab renders the shared `AskAnythingDemo` (`components/Home/HeroCarousel/AskAnythingDemo`) with its own `scenario`. With no `scenario`, that component plays the default conversation, so the Home page does not change.

A `DemoScenario` has:

- `question` – the prompt that is typed, then sent
- `intro` – the first line of the agent's reply
- `tools` – four rows. Each has a `label`, an `action` (shown while it runs), and a `result` (shown with a check when it finishes). Use `handle` for a PostHog product icon, or `slug` for a connected source logo, such as `stripe`.
- `conclusion` – a `title`, a `body`, and a `next` step
- `summary` – the screen reader description of the whole run

The demo runs for 20 seconds, so the carousel holds each slide for 22. To add a scenario, add an entry to `scenarios`. All data is illustrative, and the demo labels it "Sample data".

### `Capabilities` and `AIEngineering`

`Capabilities` (default export) is the full tool list, collapsed behind a text button under the context diagram, in the same column. When the page is wide enough to put the column beside the text, the open list is one column. When the page stacks, it is two. Tools are in three `groups`. Each tool has a product `handle`, a `task`, and a docs link (`to`). Add `availability` (for example, `'Private beta'`) to show a label next to a feature that needs early access.

`AIEngineering` is the blue "Building your own AI?" panel at the end of the page, under the FAQ. It lists `engineeringTools` as plain rows beside a hedgehog, with no inner cards. Edit `engineeringTools` to change the rows. A row has either a product `handle` or an inline `product` (`name`, `Icon`, `color`) for something without a product page, like Skills.

### `Testimonials`

Two columns. The left column is an accordion with one item per role in `personas` (all closed by default). Each role has a description and two features. The right column is the quotes: paper notes in the shared `CardStackCarousel`, with the trenchcoat hedgehog and the heading under them. Each role description is one short, irreverent line. The heading names PostHog AI and the audience, and each feature title and description stands alone.

Each quote in `quotes` gets the style at the same index in `noteStyles`. If there are more quotes than styles, the styles repeat. Keep the quotes verbatim, with the abbreviated names as supplied. Do not add roles, companies, or photos. Between the quotes, `stories` are notes that link to a customer story at `/customers/<slug>`. Each one needs a story that really covers PostHog AI or the MCP, and a verbatim quote from that story. Set the order in `notes`.

### `ProductIcon`

Shows a product's `Icon` in its `color`, plus `colorDark` in dark mode when the product has one. Pass a product from `useProduct` and the size classes:

```tsx
<ProductIcon product={product} className="size-5 shrink-0" />
```

It shows nothing when the product or its icon is missing.

## Access section

`AccessSection` in `src/pages/ai/index.tsx` has two columns. The left column is two thirds of the width. When the page is too narrow, they stack.

- **Left, "PostHog AI in PostHog Web":** PostHog AI in the web app (text, four feature items taken from the docs, "Try with your data" button), then a short Slack block with a Slack screenshot flush to the bottom of the card. Both cards share one height.
- **Right, "PostHog in your coding agent":** headless use of PostHog data through MCP and the CLI.

Both columns use the same pattern: heading, short intro, icon feature items (`IconChipRow`), one action, and an "Also in" block under a divider. The MCP items come from the "PostHog AI everywhere" slide of the earlier slideshow version of this page.

Each part has one job. The section does not repeat copy from other sections: the roles list covers the AI engineer use case. Context and memory are two of the four web feature items. Keep new copy in this section short and specific to where PostHog AI runs.

## Carousel motion

The carousel on the page uses the `TabbedCarousel` opt-in props:

- `pauseOnFocus` – auto-advance stops while focus is inside the carousel.
- `paused` – set from `useReducedMotion()`, so auto-advance does not run with reduced motion.

## Data on the page

- **MCP categories:** the MCP tab reads the build-time `mcpLeaderboard` node through the helpers in `components/MCPLeaderboard/data.ts`, so its labels match `/mcp/leaderboard`. The data shows shares of tool calls for one complete week. Do not describe it as completed tasks.
- **Pricing:** free credits and the credit price come from the `posthog_ai` product data. The FAQ links to `/docs/posthog-ai/pricing` for the rest.
- **Scout templates:** the background-work tabs read `useSelfDrivingTemplates` and link with `buildScoutDeepLink`.

## Verification

Check `/ai` in narrow and wide windows, in light and dark mode. Check keyboard access to the carousel, reduced motion, and the `SlicedHog` animation.
