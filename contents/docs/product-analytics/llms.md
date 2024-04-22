---
title: LLM insights (beta)
availability:
    free: full
    selfServe: full
    enterprise: full
---

We've teamed up with [Langfuse](https://langfuse.com/docs/analytics/posthog) to track metrics for LLM applications. Langfuse is an open source solution for monitoring LLM applications. It tracks metrics such as model costs, latency, token usage, and more.

Combining your Langfuse and PostHog data makes it easy to answer questions like:

- What are my LLM costs by customer, model, and in total?
- How many of my users are interacting with my LLM features?
- Are there generation latency spikes?
- Does interacting with LLM features correlate with other metrics (retention, usage, revenue, etc.)?

Here's an [example dashboard in PostHog](https://eu.posthog.com/shared/HPOaK5zNVkP062nQJQJoooXe61l15w):

![LLM analytics example dashboard](https://res.cloudinary.com/dmukukwp6/video/upload/v1711368021/posthog.com/contents/docs/llm-example-dash.mp4)

## Supported application types

Langfuse supports using any large language model and has simple integrations for popular application frameworks such as OpenAI, LangChain, LlamaIndex, Flowise, LiteLLM, and more. See the [Langfuse integration docs](https://langfuse.com/docs/integrations/overview) for more details.

## How to get started

To get started:

1. First add [Langfuse Tracing](https://langfuse.com/docs/tracing) to your LLM app ([Quickstart](https://langfuse.com/docs/get-started)).
2. In your [Langfuse dashboard](https://cloud.langfuse.com/), click on **Settings** and scroll down to the **Integrations** section to find the PostHog integration settings.
3. Click **Configure** and paste in your PostHog host and project API key (you can find these in your [PostHog project settings](https://us.posthog.com/settings/project)).
4. Click **Enabled** and then **Save**.

![How to set up the Langfuse PostHog integration](https://res.cloudinary.com/dmukukwp6/video/upload/v1713785335/posthog.com/contents/languse.mp4)

Langfuse will now begin exporting your data into PostHog once a day. You can then use a [dashboard template](/docs/product-analytics/dashboards) to set up the most relevant LLM insights. To do this:

1. Go the [dashboard tab](https://us.posthog.com/dashboard) in PostHog.
2. Click the **New dashboard** button in the top right.
3. Select **LLM metrics** from the list of templates.

![How to create an LLM analytics dashboard using the template](https://res.cloudinary.com/dmukukwp6/video/upload/v1711368118/posthog.com/contents/docs/llm-create-dash.mp4)

## Supported Langfuse events

The [Langfuse docs](https://langfuse.com/docs/analytics/posthog#events) have a full list of events and properties that are sent from Langfuse to PostHog.