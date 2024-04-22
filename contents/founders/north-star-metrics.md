---
date: 2022-09-14
title: Finding your North Star metric and why it matters
author:
  - andy-vandervell
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/give-back-friday.png
featuredImageType: full
tags:
  - Founders
  - Growth
  - Product
  - Product analytics
  - Product engineers
  - Product metrics
crosspost:
  - Product engineers
  - Blog
---

Successful products need actionable metrics and for many businesses this starts with identifying what many refer to as a 'North Star' metric.

This article explores the different types of North Star metrics using examples from well-known tech companies, and how you can find the right kind of metric for your business.

**Contents:**

- [What is a North Star metric?](#what-is-a-north-star-metric)
- [Types of North Star metrics](#types-of-north-star-metrics)
- [PostHog's North Star Metric](#posthogs-north-star-metric)
- [How to track your North Star metric](#how-to-track-your-north-star-metric)
- [Further reading](#further-reading)

> **Changelog**
> - Nov 12, 2021: Original article publish date
> - Set 14, 2022: Added how to subscribe to insights and dashboards

## What is a North Star metric?
In its simplest form, a North Star is a metric which provides a singular focus for a company or product's growth and success. Every department should understand it and how they influence it – either directly or indirectly. It's something you should monitor regularly - perhaps by [adding it to a PostHog dashboard](https://posthog.com/docs/user-guides/dashboards), for example. 

North Star metrics can and should change over time. What makes sense for an early-stage start-up won't be the same for an established business, so it's a metric that should be interrogated frequently to ensure it's still the right one for you. North Star metrics are also a way to [measure product-market fit](/blog/measure-product-market-fit).

### Examples of good North Star metrics

 - **Facebook:** Daily active users
 - **Airbnb:** Nights booked
 - **Uber:** Number of rides

Good North Stars are measurable and top-level. They're not the only metric a business will measure, but rather an indicative one that's influenced by numerous others.

Airbnb's North Star is the number of nights booked in any given period. That's a data point influenced by quantitative metrics such as inventory and demand, but also qualitative ones such as user experience.

A good North Star metric will:

 1. Define the value you deliver
 2. Measure company progress
 3. Focus on the long-term

Conventional wisdom suggests North Stars should directly or indirectly lead to revenue, but how important this is will depend on where you are as a business. Many companies, including **Netflix** and **Spotify**, deliberately avoid revenue North Stars in favor of quality or engagement metrics that drive retention.

### Examples of bad North Star metrics
 - Registered users
 - Brand awareness
 - Funding

What do these bad North Stars have in common? They're vanity metrics.

If Facebook focused purely on the number of registered users it had, it would be ignoring a more powerful one: how long and often users use their products. 

While these metrics can be important in isolation, they don't measure value or revenue.  Bad North Stars, and bad metrics in general, create performance incentives that work against your long-term success.

## Types of North Star metrics
Before you can find your North Star, it's useful to understand the different types of North Star metrics and the kinds of businesses they best apply to:

### Revenue / revenue optimization
Metrics such as annual recurring revenue (ARR) or average order value (AOR) are examples of pure revenue metrics. We think this is a poor choice for an early-stage startup and is better applied to established businesses where customer growth or engagement has plateaued.  

### Consumption
Examples of consumption metrics include bookings and sales. These kinds of metrics are good for marketplaces and platforms such as **Airbnb**,**eBay** or **Uber**. Consumption growth is distinct from revenue as you're looking at the _volume_ of sales events rather than the quality or value of them.

### Engagement 
Examples of engagement metrics include active users (daily, weekly or monthly) or engaged time. This metric is ideal for an ad-driven business like **Facebook**, where the number of active users will ultimately drive revenue metrics like ad impressions.

### Growth efficiency
If you're selling something like a physical product or service, growth efficiency is a possible North Star for you. This could be defined as the margin on your product or, particularly for any subscription-based service, the cost of acquiring new customers. Think **Manscaped**, **Dollar Shave Club** or even **Apple** – upgrading the RAM on a MacBook is expensive for a reason.

### Customer growth
Are you trying to convert free users into paid users? If so, customer growth might be a good place to focus. The perfect example here is everyone's favorite/most-hated daily distraction: **Slack**. Just remember to avoid vanity metrics like registered users. Monitor paid users or teams instead, as these are revenue generating and speak to the quality of experience and not just your ability to acquire email addresses.

### User experience
User experience metrics are numerous and will differ depending on the business or product, but they will typically directly or indirectly reference retention. If people enjoy using a product, they're more likely to continue to use it and recommend it to a friend. It's a good choice for early-stage startups or businesses which rely on word-of-mouth growth.

## PostHog's North Star Metric
As an open-source analytics company, our ultimate mission is to "increase the number of successful products in the world". 

For us that means giving engineers the means to easily capture meaningful data about how people use their product, then use that data to improve it. Engineers can install PostHog and within a few hours, analyze qualitative and quantitative data captured from their product.

That's why we've chosen a user experience North Star metric: Discoveries.

We define Discoveries as:

 1. **Analyzing any insight** (e.g. [trends](https://posthog.com/docs/user-guides/trends), [funnels](https://posthog.com/docs/user-guides/funnels), [paths](https://posthog.com/docs/user-guides/paths), and [lifecycle](https://posthog.com/docs/user-guides/lifecycle) for 10 seconds or more
 2. **Analyzing a [session recording](https://posthog.com/docs/user-guides/recordings)** for 10 seconds or more.

### Why did we choose a user experience metric?

We could have chosen a customer growth metric for our North Star, but as an early-stage startup this felt premature. 

PostHog is product-led, so the most important thing for us is knowing that engineers who use PostHog are discovering insights to improve their products. It validates our work and enhances our understanding of what our users need.

When we conducted user cohort tests to decide on our North Star Metric, we found Discoveries retained 2.3x more users than the alternative metric.

We feel retaining users is the first step on the path to profitability and a metric that many different teams (e.g. engineering, developer relations and content) can support. Retention also supports our focus on word of mouth growth as happy users are more likely to recommend PostHog.

## How to track your North Star metric

Needless to say, a product analytics platform like PostHog is essential for tracking any North Star metric. Tools like Google Analytics simply don't offer the [depth of insight needed](https://posthog.com/customers/mention-me), which also rules out popular privacy-first alternatives like Plausible, Fathom, and Umami.

**If you're already using PostHog**, we recommend creating a dashboard featuring your chosen North Star metric (plus other [key product metrics](/blog/b2b-saas-product-metrics)) and adding it to your PostHog project homepage. This ensures you and your team can keep an eye on progress each time you login. Better still, you can have regular updates on any insight or dashboard delivered to a Slack group on any schedule you choose – subscriptions are accessible via the '...' menu. Read our [product manual](/using-posthog) for guidance on the different types of insights you can create.

**If you're not a PostHog user**, we recommend silently contemplating the consequences of this grievous error, and then reading our [product detail pages](/product) or [sign up for PostHog Cloud](/signup). If you have questions, [book a demo](/book-a-demo) with our customer success team.

## Further reading

- [How to achieve B2B product market fit](/blog/product-market-fit-game): How to approach finding market fit for a B2B product

- [Introduction to SaaS product metrics](/blog/b2b-saas-product-metrics): A guide to common B2B product metrics and how to measure them

- [How to measure product engagement](/blog/how-to-measure-product-engagement): How to define engagement for your platform, and how to use analytics tools to measure and build on the results

<ArrayCTA />
