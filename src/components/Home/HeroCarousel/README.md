# HeroCarousel

Auto-advancing tabbed carousel for the homepage hero section.

## Usage

```mdx
<HeroCarousel />
```

Registered as an MDX component in `Home/Control/index.tsx` and used in `contents/index.mdx`.

## Behavior

- **4 tabs**: One place for product data, Understand product usage, Debug & fix issues, Test & roll out changes
- **Auto-advance**: Cycles every 5 seconds (configurable via `SLIDE_DURATION`)
- **Progress bar**: Thin bar under each trigger fills over the slide duration. Only the active tab shows the bar
- **Pause on hover**: Hovering anywhere on the carousel pauses the timer and progress animation
- **Pause/play button**: Toggle at the end of the tab row for manual pause/resume
- **Tab click**: Switches immediately and resets the timer

## Architecture

Uses Radix `Tabs` primitives directly. Auto-advance is driven by `setTimeout` with pause/resume tracking via remaining time refs. The progress bar uses a CSS `@keyframes` animation with `animation-play-state` toggled between `running` and `paused`.

## Responsive

Tab triggers wrap into a 2-column grid on narrow containers (below `@md`) and display in a single row on wider containers. Uses `@container` queries per project conventions.

## Adding/editing tabs

Update the `tabs` array at the top of `index.tsx`:

```ts
const tabs = [
    { value: "one-place", label: "One place for product data" },
    { value: "understand-usage", label: "Understand product usage" },
    // ...
]
```

Content for each tab is rendered inside the `<Tabs.Content>` blocks.
