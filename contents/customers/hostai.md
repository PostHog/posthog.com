---
title: How HostAI prevents churn with PostHog and LangFuse
customer: HostAI
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1715246033/posthog.com/contents/host-ai-logo.jpg
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1715246033/posthog.com/contents/host-ai-logo.jpg
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1715246033/posthog.com/contents/hostai-screenshot.png
industries:
  - AI
users:
  - Engineering
  - Leadership
  - Founder
toolsUsed:
  - Feature flags
  - Product analytics
date: 2024-05-09
---

[HostAI](https://hostai.app/) is an AI platform that handles repetitive tasks for vacation home managers. Leveraging LLMs, a core feature is automating responses to guest inquiries.

"The effectiveness of our platform hinges on the precision of our LLM responses. It’s not just about automating replies; it’s about ensuring each response is contextually relevant and exceptionally accurate." explains Punn Kam, co-founder of HostAI.

## Identifying bad responses with PostHog and LangFuse

HostAI tracks the quality of their LLM responses with [Langfuse](https://langfuse.com/). Then, using [PostHog's Langfuse integration](/docs/product-analytics/llms#langfuse), they combine this data with their [product analytics](/product-analytics). This enables them to pinpoint poor LLM responses and debug the root cause of them.

"We immediately investigate if a customer's evaluation score begins to decrease and search their PostHog events for frequent message edits and rejections. Once we've found the problematic experience, we dig into their Langfuse traces to understand what went wrong. This approach has enabled us to increase our average evaluation score by 50%."

<BorderWrapper>
<Quote
    imageSource="/images/customers/punn-kam.jpeg"
    size="md"
    name="Punn Kam"
    title="Co-founder, HostAI"
    quote={`PostHog and Langfuse enable us to spot early signs of dissatifaction with our app. So far, we've been able to reach out to 10 customers and prevent them from churning because of this.”`}
/>
</BorderWrapper>

PostHog and Langfuse also enable HostAI to reduce their LLM hallucination rate. Punn shares a story when they noticed a user's total number of message sends decreased:

"When we noticed the metric decrease in PostHog, we dug into their Langfuse trace and saw that the LLM was hallucinating because of gaps in the customer's knowledge base. We reached out to the customer and worked with them to fill in the gaps, significantly decreasing hallucinations."

## Leveraging session replays to save their biggest customer

In one instance, their largest client was on the brink of leaving due to a bug that was extremely hard to reproduce. By viewing [session replays](/session-replay), HostAI were able to identify and solve the problem:

"Replays enabled us to understand all the context and actions that happened prior to the bug occurring, and it was especially useful to view the console logs from the session. This gave us all the information we needed to reproduce and fix the issue, ultimately saving us from losing the customer."