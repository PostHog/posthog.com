# PostHog AI page components

Sections for the `/ai` page (`src/pages/ai/index.tsx`). The page renders in `ReaderView`, so layouts use `@container/reader-content` queries, not media queries.

Product names, icons, and colors come from `useProduct`. Refer to a product by its `handle`. If no product has that handle, its row does not show, so check the page after you add one.

## `ContextDiagram`

Three sample PostHog AI conversations (conversion, activation, churn) in a `TabbedCarousel` with `variant="flush"`. Each tab renders `ThreadMockup` with a `scenario`. The slides are static, and each stays up for 15 seconds. On wide windows the slide is no taller than the column beside it, so keep new conversations short.

To add a conversation, add an entry to `scenarios`. A `ThreadScenario` has:

- `question`: the user message
- `toolCalls`: the count shown on the "N tool calls" row
- `calls`: collapsed "Call ..." rows. Each has a real MCP tool name (for example, `execute-sql` or `experiment-results-get`) and a `detail`. Pick tools that fit the question.
- `table`: optional. `head` and `rows` for a result card, and an optional `source` for the footer label (default `SQL`). Keep headers short, because they truncate in narrow windows.
- `insight`: optional. A line chart card with a `title`, a `legend`, and `series` (number arrays, the first muted and the second in the accent color).
- `intro` and `bullets`: the reply. Each bullet has a bold `lead` and a `text`.
- `ending`: how the conversation finishes. Use a different type in each conversation:
  - `notebook`: a `recommendation` and the "Save this conversation as a notebook" card
  - `offer`: a `recommendation` and a follow-up the assistant offers to do
  - `ask`: the assistant needs more information. The bullets show as a numbered list of questions, and `closing` asks for a reply.
- `summary`: what a screen reader announces in place of the picture

The slide has a minimum height, so the tabs stay the same size. Keep a slide short enough that it does not pass the "Connect GitHub" link.

All data is sample data. The home page uses `AskAnythingDemo`, which is a separate, animated component.

## `AIEngineering`

The "Building your own AI?" panel at the end of the page. To change it, edit `engineeringTools`. A row with no product page (for example, Skills) has an inline `product` (`name`, `Icon`, `color`) in place of a `handle`.

## `Testimonials`

The heading and hedgehog take the left third, and a `CardStackCarousel` of sticky notes takes the right two thirds (centered, no wider than `max-w-lg`, so the arrows stay close to the notes). Under the `3xl` reader width, the heading and hedgehog sit above the carousel, with the hedgehog on the left.

The notes show in the order of `notes`. `quotes` are verbatim, with names as supplied. Do not add roles, companies, or photos. `stories` link to `/customers/<slug>`. Use only stories that cover PostHog AI or the MCP, and copy the quote from the story. Each note takes the `noteStyles` entry at its index. The styles repeat after six notes.

## `ProductIcon`

A product's `Icon` in its `color`, and in `colorDark` in dark mode when the product has one. It shows nothing when the product is missing.

```tsx
<ProductIcon product={product} className="size-5 shrink-0" />
```

## Data and analytics

- **Pricing:** the free credits and the credit price come from the `posthog_ai` product data. If that data is missing, the copy does not show numbers.
- **Prompts:** "Try this prompt" opens the PostHog AI side panel with the prompt filled in (`askUrl`). A click captures `ai_prompt_selected` with `group` (the card title), `prompt`, and `placement: 'ai_page'`.
