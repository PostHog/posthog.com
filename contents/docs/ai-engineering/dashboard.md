---
title: LLM observability dashboard (beta)
availability:
    free: full
    selfServe: full
    enterprise: full
---

The [LLM observability dashboard](https://us.posthog.com/llm-observability) provides an overview of your LLM usage and performance. It includes insights on:

- Users
- Traces
- Costs
- Generations
- Latency

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_15_at_08_31_29_4e1702243d.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_15_at_08_31_11_66aa4e13b7.png"
    alt="LLM observability dashboard"
    classes="rounded"
/>

It can be filtered like any dashboard in PostHog, including by event, person, and group properties. Our observability SDKs autocapture especially useful properties like provider, tokens, cost, model, and more.

This dashboard is a great starting point for understanding your LLM usage and performance. You can use it to answer questions like:

- Are users using our LLM-powered features?
- What are my LLM costs by customer, model, and in total?
- Are generations erroring?
- How many of my users are interacting with my LLM features?
- Are there generation latency spikes?

To dive into specific generation events, click on the [generations](https://us.posthog.com/llm-observability/generations) or [traces](https://us.posthog.com/llm-observability/traces) tabs to get a list of each captured by PostHog.