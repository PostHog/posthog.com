# EvalsPlaygroundCallout

A callout that sends readers to the [online and offline evals playground](/learn/ai-observability/live-playground/online-and-offline-evals). It shows the `HedgehogJudge` hoggie, the title "Before you ship, or after?", and an **Evals playground** button.

It is a wrapper around [`HoggieCallout`](../HoggieCallout/README.md), which holds the layout. Change the copy here, and change the layout there.

## Where it is used

- `/docs/ai-evals`, at the end of "Choose online or offline evals"
- `/docs/ai-evals/offline-evals`, after the intro paragraph that links to online evaluations

## Usage

```mdx
import EvalsPlaygroundCallout from 'components/EvalsPlaygroundCallout'

<EvalsPlaygroundCallout />
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `className` | `string` | Classes for the outer `aside`, for spacing. |
