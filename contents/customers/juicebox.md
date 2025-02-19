---
title: How Juicebox tracks AI latency using PostHog and LangFuse
customer: Juicebox
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1715094646/posthog.com/contents/juicebox_work_logo.jpg
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1715094646/posthog.com/contents/juicebox_work_logo.jpg
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/juicebox_posthog_170c0f1b6c.png
industries:
  - AI
users:
  - Engineering
  - Leadership
  - Founder
toolsUsed:
  - Feature flags
  - Product analytics
  - Session replay
  - LLM observability
date: 2024-05-24
---

[Juicebox](https://juicebox.ai/) is an AI recruitment platform enabling companies to find top talent. By integrating AI-powered search across multiple data sources, Juicebox helps recruiters find ideal candidates for specialized roles.

"Our core offering hinges on the seamless execution of complex search queries within our platform. The user experience is paramount, and latency can significantly impact it," explains David Paffenholz, co-founder and CEO of Juicebox.

## Tackling latency with PostHog and LangFuse

Juicebox already utilizes PostHog's [analytics](/product-analytics) and [feature flags](/feature-flags) extensively, but the new [Langfuse integration](/docs/ai-engineering/langfuse-posthog) has been a game changer. It enables them to monitor latency across various stages of their LLM chain and pinpoint performance bottlenecks.

"By using PostHog and LangFuse together, we've consolidated our LLM usage data from multiple platforms into a single PostHog dashboard. This simplifies our workflow and decision-making process for performance optimizations and cost management," Paffenholz adds.

<BorderWrapper>
<Quote
    imageSource="/images/customers/david-paffenholz.jpeg"
    size="md"
    name="David Paffenholz"
    title="Co-founder and CEO, Juicebox"
    quote={`"Speed is crucial to our user experience. We now have the ability to see which specific prompt has biggest impact on latency."`}
/>
</BorderWrapper>

## Discovering UX issues with session replays

[Session replays](/session-replay) have been invaluable for Juicebox's team too. They offer a window into the user's experience, highlighting areas where users face difficulties or confusion.

"We have afternoons where we each spend 30 minutes watching replays to see what people do in the app. You can tell when a user is confused based on how they’re navigating in the app. A lot of our UX changes come from this, such as a recent change to make our search filters bolder and clearer."

The integration of session replays and product analytics has fostered a culture of continuous improvement at Juicebox. By closely monitoring how changes affect user behavior and performance, Juicebox iterates rapidly.

"With PostHog and LangFuse, we're able to keep our finger on the pulse of our app's performance and user satisfaction. This ability to quickly adapt and respond to our users' needs is what sets us apart in a competitive market," concludes Paffenholz.
