# PostHog AI page components

Sections for the `/ai` page (`src/pages/ai/index.tsx`). The page renders in `ReaderView`, so layouts use `@container/reader-content` queries, not media queries.

Product names, icons, and colors come from `useProduct`. Refer to a product by its `handle`. If no product has that handle, its row does not show, so check the page after you add one.

## `ContextDiagram`

Three scripted PostHog AI runs (conversion, activation, churn) in a `TabbedCarousel` with `variant="flush"`. Each tab renders `AskAnythingDemo` from `components/Home/HeroCarousel` with a `scenario`. Home uses the same component with its default scenario.

To add a run, add an entry to `scenarios`. A `DemoScenario` has:

- `question`, `intro`: the typed prompt and the first line of the reply
- `tools`: four rows of `label`, `action`, and `result`. Set `handle` for a PostHog product icon, or `slug` for a source logo (for example, `stripe`). The timing has space for four rows only.
- `conclusion`: `title`, `body`, and `next`
- `summary`: what a screen reader announces in place of the animation

All data is sample data. Each slide stays up for the demo's `DURATION` plus 2 seconds. Auto-advance pauses while focus is in the carousel, and does not run with reduced motion.

## `Capabilities`

The tool list under the diagram, closed until you click its button. Tools are in three `groups`. Each tool has a `handle`, a `task`, and a docs link (`to`). Add `availability: 'Private beta'` to show a label.

## `AIEngineering`

The "Building your own AI?" panel at the end of the page. To change it, edit `engineeringTools`. A row with no product page (for example, Skills) has an inline `product` (`name`, `Icon`, `color`) in place of a `handle`.

## `Testimonials`

The role accordion (`personas`) and the sticky-note quotes. Each persona has a one-line description and two features.

The notes show in the order of `notes`. `quotes` are verbatim, with names as supplied. Do not add roles, companies, or photos. `stories` link to `/customers/<slug>`. Use only stories that cover PostHog AI or the MCP, and copy the quote from the story. Each note takes the `noteStyles` entry at its index. The styles repeat after six notes.

## `ProductIcon`

A product's `Icon` in its `color`, and in `colorDark` in dark mode when the product has one. It shows nothing when the product is missing.

```tsx
<ProductIcon product={product} className="size-5 shrink-0" />
```

## Data and analytics

- **Pricing:** the free credits and the credit price come from the `posthog_ai` product data. If that data is missing, the copy does not show numbers.
- **Prompts:** "Try this prompt" opens the PostHog AI side panel with the prompt filled in (`askUrl`). A click captures `ai_prompt_selected` with `group` (the card title), `prompt`, and `placement: 'ai_page'`.
