---
date: 2021-12-08
title: How to work out what your users really need
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - marcus-hyett
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-blog-image.png
featuredImageType: full
category: Product growth
tags:
  - Guides
---

Understanding the needs of your users better than anyone else is critical for the success of any product.

For years, taxis solved the primary user need of getting from A to B quickly. Someone would wait by the roadside until an available taxi drove past, hail the taxi, and travel to their destination. 

However, Uber, Lyft, and co. came along and disrupted this market by understanding and solving the user’s needs better than any taxi company. They made it possible to quickly hail vehicles from wherever you are, and also built trust in the service through driver and car identification, driver ratings, and sharing your trip with trusted contacts - things previously impossible with ordinary taxis. This gave ride-sharing apps a massive advantage over normal taxis drivers.

When building a product, your users don’t always know what they need; and when they do, they might not be able to express it clearly. The role of a Product Manager is to piece together multiple pieces of information to identify actual user needs and empower a team to solve them. Below are a few ways you can gather this information.

> This article is part of our [PostHog Academy series](/tracks) where we explain the fundamentals of product analytics. Marcus Hyett is VP of Product at PostHog. Prior to PostHog, he was a Senior Product Manager at Meta working on ecommerce experiences across Instagram and its family of apps.

## Interviews
Speaking 1:1 with customers is a great way to immerse yourself in their experience and the daily problems they encounter. It’s key when interviewing customers that you avoid biased or leading questions. To get unfiltered answers, ask open questions such as “Can you talk me through how you would travel home from an airport?” rather than “Can you tell me about the last time you took a taxi?” or “Did you take a taxi in the last 7 days?”.

Have an approximate structure for the interview, and vary the questions to get a range of insights that will help you understand their needs. But don’t be too rigid - if the conversation goes off on a relevant tangent, follow it. It might lead to some subconsciously valuable insights.

### How does PostHog do this?
Gathering user feedback is something we invest in as an ongoing activity, regularly reaching out to members of the community and speaking with them directly. Often we record and share these calls internally. 

We also run separate usability tests with handpicked users when releasing new features. You can find out more about [how we gather user feedback in the PostHog handbook](/handbook/product/user-feedback).

## Specifications / Requirements 
Customers (especially large enterprises) enjoy providing detailed requirements and specifications around user experiences and their product’s performance. As a Product Manager, it’s easy to dismiss these requirements as “prescriptive”, “solutionizing” or “bespoke”, but they’re often a valuable source of insights.

I always read through any list of customer requirements diligently (no matter how long or detailed), and try to piece together the core needs that motivate them to state these requirements. Solving these core needs leads to a much better solution and a lot less work.

### How does PostHog do this?
At PostHog, we have an advantage over most companies in that we're an open-source project with a large community. As a result, we regularly receive feature requests in the form of GitHub issues - so it's mostly a matter of reading each one and speaking with users about them. 

Interested in submitting an idea or seeing what the community has proposed? [Check out our GitHub repo!](https://github.com/PostHog/posthog/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

## Surveys
Asking people what their needs are at scale is a great way to validate the need for your product and get a sense of which problems to prioritize. When surveying people, ask the right mix of open and closed questions to increase response rates and allow for more creative answers.

Keep your surveys short so that people can complete them quickly and easily. You may need to incentivize people to respond - but be aware that heavy incentives may provide biased answers. Additionally, look to reduce bias by randomly sampling your user base.

Another option to a scaled survey is to hold a focus group - a cross between the customer interview and a small survey which can yield high-confidence results. It’s essential to limit the possibility of people influencing each other to give the same answer, and it can be helpful to get people to write down their answers before sharing them with the group.

### How does PostHog do this?
In addition to collecting user feedback through direct conversations, we occasionally run surveys via our Slack community to find out how we're doing. We use this primarily as a tool for collecting ideas on topics outside of our core product, such as new community or marketing iniatives. 

Want to find out more about our community? You can join [our community page](/posts) today!

## Metrics
Monitor how people are using your product,  as they may be getting stuck when trying to accomplish something. You can piece together key pieces of information from success metrics to see what differs between users who are successful and those who are not, to shed light on unmet user needs.

You can use PostHog to monitor user behaviors through metrics across your product using our [trends tool](/product-features/trends).

### How does PostHog do this?
It's fair to say that metrics are a vital part of the way we work at PostHog and, unsurprisingly, we use our own product to collect such information. We have dedicated dashboards setup for most teams and [a north star metric we use](/blog/north-star-metrics) as a company to stay on track, but we also enable everyone to query the data themselves and discover new insights.

If you're struggling to define the best metrics for your team, [we always recommend the AARRR 'pirate' framework](/blog/aarrr-pirate-funnel) as a good starting point. 

## Session recordings
There is no substitute for observing a user use your product in their natural environment. As long as you randomly sample customers you’re likely to get unbiased results here - the users will not change their behavior due to your presence. Watching session recordings can give valuable insights into why people are failing to achieve something with your product: perhaps they’re accessing your product through their mobile browser and it’s much harder to use. Watching session recordings provides a lot of context for this type of issue. 

### How does PostHog do this?
One of the features PostHog offers is the ability to [record and replay user sessions](/manual/recordings) in your product. So, naturally, we use this feature on a daily basis to see how users are interacting with our product and our website - all while redacting any sensitive information to protect their privacy. 

Session recordings are often an invaluable tool for us, which is why we recently updated them to be faster and easier to use in [PostHog v1.30](/blog/the-posthog-array-1-30-0).

## Competitive research
Leveraging first principles is a great way to understand needs without being biased by current market solutions, but looking at these existing solutions can help you validate and understand your users’ needs.

Look at your competitor’s products and ask yourself, “Why do they have this feature?”. This will help you identify the problems they were solving for and build a better solution.

### How does PostHog do this?
Competitor research is an ongoing process at PostHog, which involves both actively looking into our competitor's products and communitities to identify opportunities, as well as the market at large. 

There's no shortcut here; research takes time to do and has to be done thoroughly. However, it's also something that is supported by other types of research - many times in user feedback calls we hear from customers who have used competitors in the past, such as Saga, who have run Mixpanel and PostHog side-by-side to compare performance.

## Further reading

- [Finding your North Star metric and why it matters](/blog/north-star-metrics): Successful products need actionable metrics. Here's how to find them.

- [An introduction to customer retention](/blog/introduction-to-customer-retention): Explains customer retention, why it's important and tactics you can use to reduce churn

- [How to achieve B2B product market fit](/blog/how-to-product-market-fit): How to approach finding market fit for a B2B product

> PostHog is an open-source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />
