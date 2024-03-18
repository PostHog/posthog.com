---
title: AI and LLM insights (beta)
availability:
    free: full
    selfServe: full
    enterprise: full
---

> This integration is currently in private beta. If you'd like to be added to beta, email Lior@posthog.com.

We've teamed up with [Langfuse](https://langfuse.com/) to track metrics for products that use LLMs and AI models such as OpenAI, Langchain, and LlamaIndex. Our integration monitors metrics such as generation latency, model costs, usage count, and more. It makes it easy to answer questions like:

- Are my most active users also the ones who are most engaged with my LLM content?
- Does interacting with the LLM feature correlate with higher retention rates?
- How does the LLM feature impact my conversion rates?
- Does the user feedback that I capture in Langfuse correlate with the user behavior that I see in PostHog?

Here's an [example dashboard](https://eu.posthog.com/shared/HPOaK5zNVkP062nQJQJoooXe61l15w).

## Supported models

- OpenAI
- Langchain
- LlamaIndex
- LiteLLM
- Flowise
- Langflow

## How to create your dashboard

Once you've added the Langfuse integration into PostHog, you can easily set up a dashboard with the most relevant insights. To do this:

1. Go the [dashboard tab](https://us.posthog.com/dashboard) in PostHog.
2. Click the **New dashboard** button in the top right.
3. Select **AI metrics** from the list of templates.

![How to create an AI analytics dashboard using the template](../../images/docs/product-analytics/create-ai-dash.mp4)

## Supported Langfuse Events

The [Langfuse docs](https://langfuse.com/docs/analytics/posthog#events) have a full list of which events and properties are sent from Langfuse to PostHog.