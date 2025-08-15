---
title: 7 best free open source LLM observability tools right now
date: 2025-04-10
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/llmo_9f0a2b3f3f.png
featuredImageType: full
category: General
tags:
  - Open source
  - Comparisons
---

To build LLM-powered apps, developers need to know how users are using their app. 

LLM observability tools help them do this by capturing LLM provider requests and generations, then visualizing and aggregating them. This helps developers monitor, debug, and improve their apps. 

To help you pick the best of these tools, we put together this list. All of the following products:

1. Integrate with popular LLM providers like OpenAI, Anthropic, and Vercel AI SDK to capture generations.
2. Let you view individual generations and traces from your app.
3. Calculate and display an aggregated metrics dashboard with cost, latency, and more.
4. Are open source and self-hostable.
5. Have a free hosted version (minus one of them…)

## 1. PostHog

- License: MIT
- GitHub stars: 25.6k
- [PostHog on GitHub](https://github.com/PostHog/posthog)

[PostHog](/) is an open source all-in-one platform that combines LLM observability with several other developer-focused tools, such as product and web analytics, session replay, feature flags, experiments, error tracking, and surveys.

Its [LLM observability product](/docs/llm-observability) integrates with popular LLM provides, captures details of generations, provides an aggregated metrics dashboard, and more.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_04_07_at_11_06_21_678982e3a9.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_04_07_at_11_06_47_ffbe6e44cc.png"
  alt="PostHog"
  classes="rounded"
/>

#### What makes PostHog special?

PostHog’s LLM observability product works with the rest of our product suite. This means you can visualize LLM-related data along product and business data, create custom queries using [SQL](/docs/product-analytics/sql), view [session replays](/docs/session-replay) of AI interactions, [A/B test prompts](/tutorials/llm-ab-tests), and more.

PostHog’s hosted Cloud version and all of its LLM observability features are free to use. It comes with 1 million events for free every month with indefinite retention, no matter if they are plain events or LLM observability ones. Beyond this, pricing is usage-based and [totally transparent](/pricing). 

You can [get started right away](http://us.posthog.com/signup), no sales call or elaborate setup needed.

## 2. Langfuse

- License: MIT
- GitHub stars: 10.2k
- [Langfuse on GitHub](https://github.com/langfuse/langfuse)

[Langfuse](/docs/llm-observability/integrations/langfuse-posthog) is an open source LLM engineering platform. It provides LLM call tracking and tracing, prompt management, evaluation, datasets, and more. These give LLM app developers tools they need for their entire workflow.

Langfuse can be self-hosted for free. If you prefer a managed service, Langfuse Cloud is free to use up to 50k events per month and 2 users, but this only includes 30 day data access. Pricing beyond this starts at $59/m for 100k events with additional events at $8/m more.

![Langfuse dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/langfuse_6db7c2d9e7.png)

#### What makes Langfuse special?

Langfuse is one of the original tools in the LLM observability space. This means it has a wide range of tools for LLM app developers to use and have been instrumental in defining what they look like. 

It also claims to be the most used open LLMOps platform. Beyond its early entry, this is thanks to its integrations with most LLM providers and agent frameworks, native SDKs for Python and JavaScript, and its ability to act as an OpenTelemetry backend

Langfuse is also the most fully-featured LLM observability tool. Its pricing page lists a huge 78 features from session tracking to batch exports to SOC2 compliance. 

## 3. Opik

- License: Apache 2.0
- GitHub stars: 6.2k
- [Opik on GitHub](https://github.com/comet-ml/opik)

Opik is an open source platform for evaluating, testing, and monitoring LLM apps. It provides tracing, annotations, a prompt and model playground, evaluation, and more. It’s built by Comet, an end-to-end model evaluation platform for developers.

Opik’s free hosted plan provides 25k spans per month with unlimited team members and a 60-day data retention. Beyond this, its Pro plan is $39 per month for 100k spans per month with every extra 100k spans costing $5.

![Opik dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/opik_7fcc9b0840.png)

#### What makes Opik special?

Thanks to Opik’s integration with Comet, it’s the only tool on this list that appeals to LLM developers, not just LLM *app* developers. This means it is ideal for teams training and hosting models of their own, not just using the LLM providers. 

## 4. OpenLLMetry

- License: Apache 2.0
- GitHub stars: 5.6k
- [OpenLLMetry on GitHub](https://github.com/traceloop/openllmetry)

OpenLLMetry is an open-source observability product for LLM applications based on OpenTelemetry. It was built by Traceloop and recommends using its SDK to capture data. 

Traceloop is free up to 50k spans per month and 5 seats, but this only provides 24-hour data retention. Beyond this, you’ll need to talk to sales. 

OpenLLMetry can capture data from a range of LLM providers, vector DBs, and LLM frameworks. It can then send this data to a range of supported destinations from Traceloop to Datadog to Honeycomb.

![OpenLLMetry dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/openllmetry_aa916c3921.png)

#### What makes OpenLLMetry special?

With its range of extensions and destinations, OpenLLMetry is very likely to integrate with the observability tools you already use. 

It integrates with the broader OpenTelemetry ecosystem, meaning it can instrument things like your database, API calls, and more. Their semantic conventions for LLM were also adopted by the OpenTelemetry project. 

## 5. Phoenix

- License: Elastic License 2.0
- GitHub stars: 5.3k
- [Phoenix on GitHub](https://github.com/Arize-ai/phoenix)

Phoenix is an open source AI observability platform. It provides tracing, evaluation, experiments, prompt management, and more. It works out-of-the-box with frameworks like LlamaIndex and LangChain as well as LLM providers like OpenAI, Bedrock, and more. It’s built by Arize AI, a unified AI observability and evaluation platform. 

Arize doesn’t provide a free hosted version of Phoenix. Their product, AX Pro, starts at $50 per month for 10k spans and up to 3 users.

![Phoenix](https://res.cloudinary.com/dmukukwp6/image/upload/phoenix_fb7498c189.png)

#### What makes Phoenix special?

Similar to OpenLLMetry, Phoenix works well with OpenTelemetry thanks to a set of conventions and plugins that are complimentary to OpenTelemetry. This means Phoenix can more easily integrate into your existing Telemetry stack. 

Like Opik, Phoenix is connected to a broader AI development platform. Unique to Arize’s platform is their observability tools for ML and computer vision helping developers debug and improve these systems.

## 6. Helicone

- License: Apache 2.0
- GitHub stars: 3.6k
- [Helicone on GitHub](https://github.com/Helicone/helicone)

[Helicone](/docs/llm-observability/integrations/helicone-posthog) is an open source platform for monitoring, debugging, and improving LLM applications. Beyond integrations with popular LLM providers, tracing, and an aggregate analytics dashboard, Helicone provides more tools like prompt management and evals. 

Its hosted version is free up to 10,000 requests with some features limited to the $20/m pro and $200/m team plans. The costs for requests beyond the first 10,000 is unknown, though.

![Helicone dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/helicone_0a6eeadac6.png)

#### What makes Helicone special?

Helicone provides purpose-built tools for improving LLMs, like its prompt playground, prompt management, evaluation scoring, and feedback. This helps developers improve their LLM applications.

For developers focused on performance and reliability concerns, Helicone also contains both proxy and async interfaces for integrating with LLM providers. This ensures Helicone is only on your critical path if you want it to be. 

## 7. Lunary

- License: Apache 2.0
- GitHub stars: 1.3k
- [Lunary on GitHub](https://github.com/lunary-ai/lunary)

Lunary is a toolkit for LLM chatbots. It includes conversation and feedback tracking, analytics, prompt management, and more. It has integrations with the popular LLM providers as well as destinations like PostHog (😄), Snowflake, and Segment. 

Its hosted version has a free tier, which offers 10k events per month with 30 day retention. The team plan raises this to 50k events per month and is $20 per user per month.

![Lunary dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_04_09_at_10_21_31_2x_51b9dbad71.png)

#### What makes Lunary special?

Lunary is purpose built for LLM chatbots like knowledge bases and support tools. This shows in their focus on features like PII masking, access management, human reviewing, and multi-modal support. 