---
title: LLM application insights (beta)
availability:
    free: full
    selfServe: full
    enterprise: full
---

> This integration is currently in private beta. If you'd like to be added to the beta, email Lior@posthog.com.

We've teamed up with [Langfuse](https://langfuse.com/) to track metrics for products that use LLMs. Langfuse is an open source solution to monitor these applications. It supports using any large language model and has simple integrations for popular application frameworks such as LangChain, LlamaIndex and the OpenAI SDK. Our integration allows tracking important LLM application metrics in PostHog. These include latencies, model costs, token usage, user feedback, evaluations, and more. Thereby LLM application metrics can be combined with your other PostHog data to answer questions like:

- What are my LLM costs by customer, model and in total?
- How many of my users are interacting with my LLM features?
- Am I seeing latency spikes in my LLMs?
- Does interacting with LLM features correlate with other metrics (retention, usage, revenue etc.)?
- Does the user feedback that I capture in Langfuse correlate with the user behavior that I see in PostHog?

Here's an [example dashboard](https://eu.posthog.com/shared/HPOaK5zNVkP062nQJQJoooXe61l15w).

## Supported application types

Langfuse is open, supports any LLM for usage and cost tracking, has asynchronous production-grade JS and Python SDKs, and is integrated with popular application frameworks.

Integrations (see [Langfuse integration docs](https://langfuse.com/docs/integrations/overview) for details):

- Python SDK
- JS SDK
- HTTP API
- Integration OpenAI SDK
- Integration LangChain
- Integration LlamaIndex
- Integration Flowise
- Integration LiteLLM

## How to get started

You can easily setup Langfuse, the integration, and a dashboard analyzing your LLM related metrics:

1. If you have not already, add Langfuse Tracing to your application ([Quickstart](https://langfuse.com/docs/get-started)).
2. Enable the integration (private beta). If you'd like to be added to the beta, email Lior@posthog.com with your Langfuse Host, Langfuse Project Id, PostHog Host, and PostHog Project API Key.
3. Go to the [dashboard tab](https://us.posthog.com/dashboard) in PostHog.
4. Click the **New dashboard** button in the top right.
5. Select **AI metrics** from the list of templates to get started quickly.

![How to create an AI analytics dashboard using the template](../../images/docs/product-analytics/create-ai-dash.mp4)

## Supported Langfuse Events

The [Langfuse docs](https://langfuse.com/docs/analytics/posthog#events) have a full list of events and properties that are sent from Langfuse to PostHog.