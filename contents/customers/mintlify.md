---
title: 'How Mintlify launched user-facing analytics, powered by PostHog'
customer: Mintlify
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/mintlify/logo.svg
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/mintlify/logo_dark.svg
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/mintlify/featured.png
industries:
  - 'SaaS, DevTool'
users:
  - Leadership
  - Engineering
  - Product
  - Users
toolsUsed:
  - Session replay
  - Autocapture
  - PostHog Cloud
  - API
date: 2023-04-06T00:00:00.000Z
---

Mintlify is startup powering product and technical documentation for the teams at [Y Combinator](/customers/ycombinator), Explo, MindsDB and others. It helps teams with rapidly evolving products to create rich, well structured docs which convert users and empower colleagues. 

Mintlify has used PostHog internally since launch, making regular use of both the product analytics and session replay tools to help it build better products. 

“We use the product analytics tools, such as funnels, a lot,” says Han Wang, Mintlify’s CEO and Founder. “We also use session replays too. I actually had to use it last night, to investigate errors on a particular setup. We’ve found replays particularly useful for support issues like that, but we’re constantly tracking things… Is this CTA engaging? How popular is this page? We monitor everything in PostHog to help us decide where to focus.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/han.png"
    size="md"
    name="Han Wang"
    title="Founder & CEO, Mintlify"
    quote={`“You can quote me on this: PostHog is awesome. It’s a great tool. I’ve used a bunch of different analytics platforms in the past and PostHog stands out for it’s developer friendliness and user experience. I really, really love it.”`}
/>
</BorderWrapper>

## Session replay, analytics and user feedback

After seeing first-hand how analytics could help them build better products, Mintlify decided to explore ways to provide users this same ability within their own product. Rather than building the feature from scratch, the team identified a simpler solution: use PostHog. 

“When we first scoped out user analytics, I was like: ‘Oh, God, do I have to explore some crappy third-vendor solution that does this specifically?’” says Han. “That would've been such a nightmare. Fortunately, we discovered we could just do this with PostHog.”

The initial goal for Mintlify’s analytics was just to give users the ability to get information they needed to identify success — basically, what the most popular pages and funnels are. However, by talking to users, the team discovered that there were needs beyond just this. Mintlify mostly used analytics and funnel insights, but users were also interested in using session replay to track detailed usage. As a result, Mintlify decided to share session replays with users too. 

Adding session replay increased the scope, but just three days later Mintlify had shipped an initial version which included both analytics _and_ session replays.

## User-facing analytics, powered by PostHog

“We were able to ship this so fast because we had some secret weapons up our sleeve,” says Han. “First was PostHog, which could handle all the data for us and meant there was nothing further to build or configure. Second, was a tool called [Tremor](https://www.tremor.so/), which let us just pipe data in and generate some visuals.”

![Mintlify Analytics Powered By PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/customers/mintlify/mintlify-analytics.png)
<Caption>Mintlify's team built user-facing analytics in just three days, using PostHog and Tremor</Caption>

Best of all, because all data is already tracked in Mintlify’s own PostHog instance, there’s no need for setting up additional projects or reports — all user-facing data is simply segmented and pulled out of Mintlify’s existing instance. 

Mintlify is also tracking engagement with its user-facing analytics in PostHog which, in turn, powers the user-facing analytics Mintlify has built. It’s a self-reinforcing product improvement loop!

“This is still only version 0.01,” says Han. “We have a lot more data points we want to add. What is the feedback ratio? Are people voting pages up or down? How many users scroll to the bottom of the page? These are all great things we’re tracking internally, we just need to build them out. But I’ve been amazed at how easy it is to build on top of PostHog in this way.”

> Ready to try this yourself? Follow our [tutorial about setting up user-facing analytics with PostHog, Next.js and Tremor](/tutorials/customer-facing-analytics)!
