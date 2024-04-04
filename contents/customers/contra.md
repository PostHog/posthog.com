---
title: How Contra used session replays to increase registrations by 30%
customer: Contra
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/contra/contra_logo.svg
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/contra/contra_logo_dark.svg
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/contra/contra_featured.png
industries:
  - Saas
users:
  - Product
  - Engineering
toolsUsed:
  - Feature flags
  - Session replays
  - Product analytics
date: 2023-03-06
---

Contra is a freelance marketplace for independent creatives and engineers. It empowers its community to find work that fits the way they want to live. Since 2022 [Contra](http://www.contra.com), has used PostHog Cloud to power many of its engineering and product decisions, though previously the stack was a lot more complex.

“Originally we were using multiple platforms,” said Allison Nulty, Head of Product at Contra. “That meant Mixpanel for analytics, LaunchDarkly for feature flags, Segment for front-end tracking and FullStory for replays. In isolation they could work well, but they were costly and complex.”

As a result of spreading functionality across multiple tools, Contra also faced data inconsistencies. Each tool had it's own costs and required its own upkeep. Eventually, Contra decided to consolidate the stack as much as possible — and that’s where PostHog came in. 

### Using feature flags for a ‘slow rollout’ strategy

Switching to PostHog enabled Contra to consolidate feature flags, session replays, product analytics and more into a single tool — but it also enabled the company to come together around a single platform as well. Instead of each team in the company relying on a different software, everyone was able to look at a single source of truth.

“Previously the teams all used different tools,” said Allison. “That led to a lot of confusion, because our feature flag platform didn't integrate with our analytics platform, or our session replay tool. That made it difficult to use feature flag data to build better user journeys or understand drop-offs.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/allison.jpg"
    size="sm"
    name="Allison Nulty"
    title="Head of Product, Contra "
    quote={`“A huge competitive advantage has been the ability to talk directly with PostHog engineers over Slack. We share feedback, ask questions, and make requests and always see a quick response time and thoughtful suggestions. At Contra, we apply these same principles of collaborating with our community to build our product.”`}
/>
</BorderWrapper>

Feature flags in particular are important because the engineering team deploys all new product features behind flags and follows a careful ‘slow rollout’ strategy. All features are first deployed to beta users, then 20% of all users, followed by 50% of all users and finally 100% of all users. Switching feature flags to PostHog enables Contra to continue testing with this method, while also analyzing feature adoption and performance in the same tool. 

### Using session replays to improve a product

The combination of feature flags and session replays has been especially powerful for Contra, as it enables product managers and designers to directly observe how user behavior changes between variants. In other instances, session replay alone enables the team to identify where to make improvements.

"For example," said Allison, "if we have a notification that a user failed to setup payments, we can view their replays in PostHog and identify the issue ourselves, enabling us to proactively engage with the user. This means faster debugging and a better user experience. This has become foundational to our customer support processes too."

“We used PostHog to look at our funnel for a waitlist in the insights tool,” said Allison. “From there, we could easily jump to session replays to see the drop-off point. With this analysis, we identified one path where users were not seeing a reminder modal and therefore we were missing out on a large number of waitlist entries.”

After noticing the issue, the team made a change and saw an immediate, massive improvement in conversion. Today, 30% of waitlist sign-ups are attributed to this new and improved flow. 

“Adoption has also come at the encouragement of our CEO and co-founder,” said Allison. “We have cross-functional meetings where engineers, product managers, and designers 'watch the tapes' to observe successful and unsuccessful sessions and identify patterns. Everyone at Contra is familiar with PostHog.”

“That ability to consolidate platforms, to simplify team onboarding, to be able to easily connect events and funnels to replays? It was a real a-ha moment for me!”
