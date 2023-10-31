---
date: 2022-10-26
title: The most useful B2B SaaS product metrics
featuredImage: ../images/blog/b2b-product-metrics/b2b-product-metrics.jpeg
featuredImageType: full
author:
  - andy-vandervell
tags:
  - Product analytics
  - Product metrics
  - Product engineers
  - Growth engineering
  - Growth
crosspost:
  - Founders  
---

So, you're building a B2B SaaS product.

Everyone knows you've got to measure stuff to succeed. This is not news. 

What, why, and how? These are the questions that matter and the answers lie in the product metrics you track.

In this guide, we'll cover:

1. [What makes a good metric](#what-makes-a-good-b2b-product-metric) for a B2B product
2. [The common metrics used by B2B SaaS companies](#common-b2b-saas-product-metrics)
3. [How to choose your product metrics](#how-to-choose-your-product-metrics) 

> **Note:** This guide is about _product_ metrics, not revenue or wider business metrics like customer lifetime value (LTV) or average revenue per user (ARPU). Naturally, they're important too, but this guide is all about the metrics of most interest to product teams.

## What are product metrics?

Product metrics capture how people use your product **and** how that impacts your business. 

For example, if the number of new users who successfully use your product (aka new user activation) declines, you can expect this to lead to a decline in the number of paying users.

Product metrics are essential for understanding the overall [health of your product](/blog/product-health-metrics) and areas of weakness, and they also help guide your product decisions.

## What makes a good B2B product metric?

Good metrics are understandable, comparative, specific and actionable.

Here's what those mean in a little more detail:

1. **Understandable:** Can you easily explain a metric to anyone in the business? If you can't, it's unlikely people will want to use or refer to it.

2. **Comparative:** Can you benchmark a metric against your industry, or compare internally using cohorts?

3. **Specific:** Some broad trends are useful, but we recommend metrics that measure specific actions. Don't measure how long users use your product, measure how long it takes for them to get value from it.

4. **Actionable:** Can you easily identify actions to take when you see a drop in a metric? If yes, you're onto a winner. Specific metrics are the most actionable metrics, too.

It's not realistic to achieve all four in every metric you use, but three out of four is a good benchmark.

## Common product metrics

Coming up are some of the most common metrics for products. We explain what they are, how to measure them, and how useful they really are.

Think we missed one? Make a suggestion via [our website repo](https://github.com/PostHog/posthog.com).

### Active users (DAU / WAU / MAU)

**What is it?** This is a pretty obvious one, but it's important to consider how you define an active user. Setting a low bar (i.e. user logged in) might look good on a pitch deck, but it counts for nothing if they're not doing anything.

**Is it useful?** It's important to track, but it's best used in combination with other metrics, or to calculate other more meaningful metrics.

### Adoption rate

**What is it?**  Adoption rate is a product health metric that tells you what percentage of total signups turned into active users in any given period. 

Your adoption rate is `(new active users / signups) x 100`, so 40 new active users and 200 signups equals an adoption rate of 20%.

**Is it useful?** We'd argue not. There are better, more specific measures for product health, like [new user activation](#new-user-activation).

### Customer retention rate

**What is it?** Customer retention rate is a classic metric that calculates the proportion of customers you retain from one period to the next. 

Early-stage companies might prefer to focus on customer retention, but revenue retention becomes more important once you've acquired a solid base of paying customers.

While you can calculate it as a monthly or annual metric, it's commonly visualized in a retention chart (aka retention matrix), which shows you how well customers retain over a longer periods of time.

The retention rate formula is `((customers at end of period - new customers) / customers at start of period) x 100`. So, a business that begins a month with 3,000 customers, acquires 150 new customers, and ends the month with 3,100 customers, would have retention rate of 98.3%.

**Is it useful?** This is one of those fundamental metrics everyone should be measuring. If you're growing quickly but not retaining users well, you know you've got a problem. 

> **Retention rate vs churn rate:** Churn rate is the inverse of retention – it's the proportion of customers who left during the measured period. A retention rate of 98.3% would equal a 1.7% churn rate and vice versa. 

### DAU/MAU ratio

**What is it?** Sometimes referred to as stickiness, a DAU/MAU ratio tells you what percentage of your customers are power users. The formula is `(daily active users / monthly active users) x 100`. A product with 100 DAUs and 1,000 MAUs would have a ratio of 10%.

What constitutes a good ratio depends on the sector, but a [2017 report by Mixpanel](https://discover.mixpanel.com/rs/461-OYV-624/images/2017-Mixpanel-Product-Benchmarks-Report.pdf) suggests SaaS products average 13%, and that a good ratio is 20% or more.

**Is it useful?** Yes, but you need to be careful as a large increase in monthly users can skew your ratio. It's best used by late-stage companies with predictable monthly growth, which is probably why it's popular at Facebook.

### Feature usage

**What is it?** The specifics will vary depending on the product, but this is all about tracking what people are doing. 

At PostHog, our main product metric is [Discoveries](/handbook/product/metrics), which amalgamates a number of actions as one usage metric. 

We view this figure as more important than the number of active users. If the number of Discoveries is growing, we know we're on the right path. 

**Is it useful?** You're in serious trouble if you're not tracking feature usage, and it's where a [product analytics platform](/product) like PostHog is vital. Trying to do this with Google Analytics is a losing battle.

### Net Promoter Score (NPS)

**What is it?**  NPS is a well-known customer satisfaction metric, and a good indicator for future customer retention and [product-market fit](/blog/product-market-fit-game). 

On a scale of 1 to 10, users who select 9 or 10 when asked "how likely are you to recommend us to a friend of colleague" are promoters. Those who vote 0 to 6 are detractors.

You NPS score is the `% of promoters - % of detractors` and scores range between `-100` (100% negative) and `+100` (100% positive).

Any score above zero is technically good, but most sources put the industry average for B2B SaaS products somewhere [around +30](https://www.getbeamer.com/blog/good-nps-for-saas) to [+40](https://www.retently.com/blog/good-net-promoter-score/). 

**Is it useful?** There's a reason NPS is an industry standard. Measuring NPS over time is a powerful way to understand the evolution of your product, and improving it is a clear sign your customers are happy with the changes you're making. Definitely worth tracking, but you need other metrics or follow-up questions to understand changes in your NPS score.

### New user activation

**What is it?** New user activation is similar in purpose to adoption rate, but it's more specific. It measures the percentage of new users who completed a specific task in their first week.

The formula is `(new users who completed key action / total number of new users) x 100`.  

**Is it useful?** This is an essential metric because, unlike adoption rate, it's measuring the success of your new users, not their mere existence. 

You want new users to find the value in your product as quickly as possible, and this is the perfect metric to measure that. 

Improving activation is widely regarded as one of the best ways to improve monthly recurring revenue (MRR).

### Productivity

**What is it?**  Unlike session duration, which is vague measure of "time spent in the product", productivity is about measuring how long it takes to complete specific tasks. Rather like feature usage, it's all about what people are doing.

**Is it useful?:** It's a good metric if your product has consistent user journeys, but is best avoided if your product gives users lots of customization options – we don't track it PostHog for this precise reason. 

### Session duration

**What is it?** You can measure individual user sessions, but it's more commonly expressed as an average of all user across a website or application.

**Is it useful?** Honestly, for B2B products, not very. It's useful to track how long it takes people to do specific actions, but broader session duration metrics tell you little and can lead you to optimize for the wrong behaviors.

### Support requests per user

**What is it?** It's easy to think support requests are a bad thing, but it really depends on the circumstances. 

If you're an early-stage product, support requests can be a sign that your users are engaged with your product but running into problems. This sounds bad, but getting requests is much better than users churning. 

Monitoring support requests is best monitored after an update, or the introduction of a new feature.

**Is it useful?** Consider this more of a circuit breaker for deeper investigation. It's worth monitoring for big spikes in requests, but it can be misleading for all sorts of reasons. Keep an eye on it, but don't become obsessed by it.

### Time to activation

**What is it?** How long does it take for people to start using your product after they sign-up? Watching [session recordings](/product/session-recording) is a useful to diagnose problems with this metric.

**Is it useful?:** This can be a good metric if your product has a complex but well-defined setup process. Otherwise, you're better off using a metric like new user activation that captures a specific key action for your product.

### User invites and shares

**What is it?** Users inviting their colleagues, or sharing what they're doing, is an engagement metric and a user experience indicator.

[Experimentation](/product/experimentation-suite) can help you find ways to encourage users to invite their colleagues.

**Is it useful?** Inviting colleagues to create an account is a sure sign users are getting value from your product, and will reduce churn among your customers. What's not to like about that?

## How to choose your product metrics

When choosing your product metrics, first remember the four qualities of good metrics we mentioned earlier: understandable, comparative, specific and actionable.

They're all important in isolation, but more powerful when combined. Here's an example of how this works.

Our product, [PostHog](https://posthog.com/), is all about helping engineers and product teams discover insights about product usage. 

In PostHog, users can:

- Create and analyze insights that track trends over time such as how well users convert, what paths they take, and how well they retain.

- Use dashboards to combine insights into cohesive reports on any element of the product experience. We've built a [B2B SaaS product metrics dashboard template](/templates/b2b-dashboard) you can use.

- View session recordings of real customers to understand where they get stuck or how they use the product.

- Use feature flags to test and run experiments before rolling features out.

To capture all this activity, we created a composite metric we call [Discoveries](/handbook/product/metrics). We define Discoveries as any time a PostHog user analyzes an insight, dashboard, recording, or correlation analysis report for 10 second or more.

What makes this a good product metric for us? Let's break it down:

- **Is easy to understand?** Yes. While it combines several different events into one action, they're all easy for anyone who knows the product to understand.

- **Is it comparable?** Absolutely. We can use this metric to compare power users to average users and compare different cohorts based on multiple criteria (e.g. paying vs non-paying customers, job title etc.). It's also sensitive to changes in the product, so we can see whether our users make more or fewer discoveries when we make a change.

- **Is it specific?** Yes. Again, while it's a composite metric, each individual event captures users getting value from our product.

- **Is it actionable?** Yes. If this metric drops, it immediately gives us several avenues of investigation to understand the cause.

Not all useful product metrics follow this trend – active users is a notable exception – but it's a good acid test to apply to any metric you're considering.

### Recommended B2B product metrics

To help get you started, we've chosen five metrics that are useful for any B2B product. You will want to augment and adapt these for your specific needs, but 

- **Active users (DAU / WAU / MAU)** because it's a fundamental metric that underpins others, and allows you to measure user growth over time.

- **Customer retention rate** because it will alert you to problems if you have them, and it's highly comparable.

- **Feature usage** because it's vital to measure the value you're offering to users, and will help you learn what they find most useful.

- **Net Promoter Score (NPS)** because it's a ubiquitous, easy to understand metric you can benchmark against your industry.

- **New user activation** because helping new users generate value quickly will drive satisfaction and word of mouth growth.

You don't need to measure all of these to be successful, and other metrics might be better for your specific product, but they're a good starting point.

And if you're in need a product analytics platform to track them, learn [how we can help](/product).

## Further reading

For more inspiration around measuring product success, we recommend reading our [guide to AARRR pirate metrics](/blog/aarrr-pirate-funnel) – a popular framework for understanding user behavior and discovering opportunities.

You may also find the following guides useful:

- [How to achieve B2B product market fit](/blog/product-market-fit-game): There's no universal standard for achieving market fit, but this guide introduces heuristics to help you find it

- [Finding your north star metric](/blog/north-star-metrics): All SaaS products can benefit from a north star metric and this guide will help you find one

- [How to measure product-market fit](/blog/measure-product-market-fit): Product-market fit isn't just an ephemeral gut feeling. You can measure it, and it moves as your customer's needs change. 
