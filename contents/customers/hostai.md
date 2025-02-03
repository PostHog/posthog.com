---
title: How HostAI increased evaluation score by 50% with PostHog and LangFuse
customer: HostAI
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1715246033/posthog.com/contents/host-ai-logo.jpg
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1715246033/posthog.com/contents/host-ai-logo.jpg
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/hostai_posthog_9aa09a3382.png
industries:
  - AI
users:
  - Engineering
  - Leadership
  - Founder
toolsUsed:
  - Feature flags
  - Product analytics
  - LLM observability
date: 2024-05-24
---

[HostAI](https://hostai.app/) is an AI platform that handles repetitive tasks for vacation home managers, such as maintenance ticketing and phone calls. One of it's most popular features is using LLM models to automate responses to guest inquiries.

"The effectiveness of our platform hinges on the precision of our LLM responses," explains Punn Kam, co-founder of HostAI. "It’s not just about automating replies; it’s about ensuring each response is contextually relevant and exceptionally accurate."

## Identifying bad responses with PostHog and LangFuse

HostAI tracks the quality of their LLM responses with [Langfuse](https://langfuse.com/). Then, using [PostHog's Langfuse integration](/docs/product-analytics/llms#langfuse), they combine this data with their [product analytics](/product-analytics). This enables them to pinpoint poor LLM responses and debug their root cause.

"We immediately investigate if a customer's evaluation score begins to decrease and search their PostHog events for frequent message edits and rejections. Once we've found the problematic experience, we dig into their Langfuse traces to understand what went wrong. This approach has enabled us to increase our average evaluation score by 50%."

<BorderWrapper>
<Quote
    imageSource="/images/customers/punn-kam.jpeg"
    size="md"
    name="Punn Kam"
    title="Co-founder, HostAI"
    quote={`"PostHog and LangFuse enable us to spot early signs of dissatifaction with our app. So far, we've been able to reach out to 10 customers and prevent them from churning because of this."`}
/>
</BorderWrapper>

PostHog and LangFuse also enables HostAI to reduce their LLM hallucination rate by monitoring how many messages each user sends.

"There was one customer who we saw was starting to send fewer messages," explains Punn. "When we noticed the metric decrease in PostHog, we dug into their Langfuse trace and saw that the LLM was hallucinating because of gaps in the customer's knowledge base. We reached out to the customer and worked with them to fill in the gaps, significantly decreasing hallucinations."

## Leveraging session replays to save their biggest customer

In one instance, HostAI's largest client was on the brink of leaving due to a bug that was extremely hard to reproduce. By viewing [session replays](/session-replay), HostAI were able to identify and solve the problem:

"Replays enabled us to understand all the context and actions that happened prior to the bug occurring, and it was especially useful to view the console logs from the session. This gave us all the information we needed to reproduce and fix the issue, ultimately saving us from losing the customer."
