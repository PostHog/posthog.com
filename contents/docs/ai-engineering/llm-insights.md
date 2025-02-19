---
title: LLM observability integrations (beta)
availability:
    free: full
    selfServe: full
    enterprise: full
---

Beyond our native [LLM observability product](/docs/ai-engineering/observability), we've teamed up with various LLM platforms to track metrics for LLM apps. This makes it easy to answer questions like:

- What are my LLM costs by customer, model, and in total?
- How many of my users are interacting with my LLM features?
- Are there generation latency spikes?
- Does interacting with LLM features correlate with other metrics (retention, usage, revenue, etc.)?

## Supported integrations

Currently, we support integrations for the following platforms:

- [Langfuse](/docs/ai-engineering/langfuse-posthog)
- [Helicone](/docs/ai-engineering/helicone-posthog) 
- [Traceloop](/docs/ai-engineering/traceloop-posthog)
- [Keywords AI](/docs/ai-engineering/keywords-ai-posthog)

## Dashboard templates

Once you've installed an integration, [dashboard templates](/docs/product-analytics/dashboards) help you quickly set up relevant insights. Here are examples for [Langfuse](https://eu.posthog.com/shared/HPOaK5zNVkP062nQJQJoooXe61l15w), [Helicone](https://us.posthog.com/shared/6_Qa74au0RhxERZ3wW9g87oxWlFxNA), [Traceloop](https://us.posthog.com/shared/tpX9kUd5BbGkdjxQE8YhCskNuYA7Jw), and [Keywords AI](https://us.posthog.com/shared/p1AymhS7EEm97nZOGA8nWmsdshhzYA).

To create your own dashboard from a template:

1. Go the [dashboard tab](https://us.posthog.com/dashboard) in PostHog.
2. Click the **New dashboard** button in the top right.
3. Select **LLM metrics – [name of the integration you installed]** from the list of templates.

![How to create an LLM analytics dashboard using the template](https://res.cloudinary.com/dmukukwp6/video/upload/v1713967763/posthog.com/contents/docs/langfuse-dash.mp4)
