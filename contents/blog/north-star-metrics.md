---
date: 2021-11-12
title: Finding your North Star metric and why it matters
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["andy-vandervell"]
featuredImage: ../images/blog/blog-generic-2.png
featuredImageType: full
---

Successful products need actionable metrics and for many businesses this starts with identifying a 'North Star' metric.

## What is a North Star metric?
In its simplest form, a North Star is a metric which provides a singular focus for a company or product's growth and success. Every department should understand it and how they influence it – either directly or indirectly. It's something you should monitor regularly - perhaps by [adding it to a PostHog dashboard](https://posthog.com/docs/user-guides/dashboards), for example. 

North Star metrics can and should change over time. What makes sense for an early-stage start-up won't be the same for an established business, so it's a metric that should be interrogated frequently to ensure it's still the right one for you.

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
Are you trying to convert free users into paid users? If so, customer growth might be a good place to focus. The perfect example here is everyone's favourite/most-hated daily distraction: **Slack**. Just remember to avoid vanity metrics like registered users. Monitor paid users or teams instead, as these are revenue generating and speak to the quality of experience and not just your ability to acquire email addresses.

### User experience
User experience metrics are numerous and will differ depending on the business or product, but they will typically directly or indirectly reference retention. If people enjoy using a product, they're more likely to continue to use it and recommend it to a friend. It's a good choice for early-stage startups or businesses which rely on word-of-mouth growth.

## PostHog's North Star Metric
As an open-source product analytics company, our ultimate mission is to "increase the number of successful products in the world". 

For us that means giving engineers the means to easily capture meaningful data about how people use their product, then use that data to improve it. Engineers can install PostHog and within a few hours, analyze qualitative and quantitative data captured from their product.

That's why we've chosen a user experience North Star metric: Discoveries.

We define Discoveries as:

 1. **Analyzing any insight** (e.g. [trends](https://posthog.com/docs/user-guides/trends), [funnels](https://posthog.com/docs/user-guides/funnels), [paths](https://posthog.com/docs/user-guides/paths), and [lifecycle](https://posthog.com/docs/user-guides/lifecycle) for 10 seconds or more
 2. **Analyzing a [session recording](https://posthog.com/docs/user-guides/recordings)** for 10 seconds or more.

### Why did we choose a user experience metric?

We could have chosen a customer growth metric for our North Star, but as an early-stage startup this felt premature. 

PostHog is product-led, so the most important thing for us is knowing that engineers who use PostHog are discovering insights to improve their products. It validates our work and enhances our understanding of what our users need.

When we conducted user cohort tests to decide on our North Star Metric, we found Discoveries retained 2.3x more users than the alternative metric.

For us, retaining users is the first step on the path to profitability and a metric that many different teams (e.g. engineering, developer relations and content) can support.

## How to track your North Star metric

Product analytics platforms are the ideal way to track your North Star metric, as they enable you to pull a variety of data into a single platform and correlate it to other activities. 

Naturally, we think PostHog is the best product analytics platform available because it enables you to deploy analytics onto your own infrastructure. That means you don't need to rely on third parties which may be blocked by ad blockers or privacy features, nor do you need to send any data to a third-party platform. This approach increases the accuracy of your data, minimizes the risk of security breaches and gives you greater control. 

Of course, there are plenty of other product analytics tools - including [open-source analytics platforms](https://posthog.com/blog/best-open-source-analytics-tools), as well as closed-source alternatives such as MixPanel, Amplitude and Pendo. 

> New to product analytics? Check out our [introduction to product analytics](https://posthog.com/blog/what-is-product-analytics), or [request a demo with one of our engineers](https://posthog.com/book-a-demo) to get started with PostHog. 

## Why you shouldn't use Google Analytics to track your North Star metric

Google Analytics is good for a lot of things, especially if you want to track basic web metrics such as pageviews or  bounce rate. However, as a _web_ analytics platform it is limited to tracking only specific metrics for websites. It can't track other types of events, nor does it offer the same breadth of analysis tools that a product analytics platform like PostHog does. 

You couldn't, for example, use Google Analytics to track a North Star metric such as Discoveries. Nor could you self-host it on your own infrastructure. 

Ultimately, PostHog is a better fit for tracking both high-level and detailed product metrics, while Product and Engineering teams routinely find that [Google Analytics doesn't offer the depth of insight they need](https://posthog.com/customers/mention-me). 

> PostHog is an open source analytics tool which enables data and engineering teams to build better products faster and without writing SQL. [Try PostHog for free today](https://posthog.com/signup) or [book a demo](https://posthog.com/book-a-demo) to learn more.
