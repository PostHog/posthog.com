---
title: LLM analytics dashboard
availability:
    free: full
    selfServe: full
    enterprise: full
---

The [LLM analytics dashboard](https://app.posthog.com/llm-analytics) provides an overview of your LLM usage and performance. It includes insights on:

- Users
- Traces
- Costs
- Generations
- Latency

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/llma_dashboard_c710e66b5e.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/llma_dashboard_dark_aef0f67baf.png"
    alt="LLM observability dashboard"
    classes="rounded"
/>

It can be filtered like any dashboard in PostHog, including by event, person, and group properties. Our SDKs autocapture especially useful properties like provider, tokens, cost, model, and more.

This dashboard is a great starting point for understanding your LLM usage and performance. You can use it to answer questions like:

- Are users using our LLM-powered features?
- What are my LLM costs by customer, model, and in total?
- Are generations erroring?
- How many of my users are interacting with my LLM features?
- Are there generation latency spikes?

To dive into specific generation events, click on the [generations](https://app.posthog.com/llm-analytics/generations) or [traces](https://app.posthog.com/llm-analytics/traces) tabs to get a list of each captured by PostHog.
