---
date: 2022-06-16
title: The most useful B2B SaaS product metrics (and how to measure them)
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/b2b-product-metrics/b2b-product-metrics.jpeg
featuredImageType: full
categories: ["Guides", "PostHog Academy", "Product analytics"]
author: ["andy-vandervell"]
---

So, you're building a B2B SaaS product.

Everyone knows you've got to measure stuff to succeed. This is not news. 

What, why, and how? These are the questions that matter.

In this guide we will:

1. Reveal [what makes a good metric](#what-makes-a-good-b2b-product-metric) for a B2B product
2. Explain the [common metrics used by B2B SaaS companies]((#common-b2b-saas-product-metrics)
3. [Recommend good metrics](#recommended-b2b-product-metrics) for most B2B SaaS products

Please note: this guide is about _product_ metrics, rather than revenue or wider business metrics. Naturally, they're important too.

Most product analytics tools, such as Mixpanel and [Amplitude](/blog/posthog-vs-amplitude), allow you to track the metrics in this guide.

If you don't already have product analytics, or are thinking of switching, consider PostHog. We're an open-source analytics platform that combines the best of Mixpanel + Hotjar + Optimizely + LaunchDarkly into one tool you can host yourself.

Read our [product page](/product) and [documentation](/docs) if you're interested.

> This article is part of our [PostHog Academy series](/blog/categories/posthog-academy) where we explain the fundamentals of product analytics.

## What makes a good B2B product metric?

Good metrics are understandable, comparative, specific and actionable.

Here's what those mean in a little more detail:

1. **Understandable:** Can you easily explain a metric to anyone in the business? If you can't, it's unlikely people will want to use or refer to it.

2. **Comparative:** Can you benchmark a metric against your industry, or compare internally using cohorts?

3. **Specific:** Some broad trends are useful, but we recommend metrics that measure specific actions. Don't measure how long users use your product, measure how long it takes for them to get value from it.

4. **Actionable:** Can you easily identify actions to take when you see a drop in a metric? If yes, you're onto a winner. Specific metrics are the most actionable metrics, too.

It's not realistic achieve all four in every metric you use, but three out of four is a good benchmark.

## Common B2B SaaS product metrics

Coming up are some of the most common metrics for SaaS products. We explain what they are, how to measure them, and how useful they really are.

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

The retention rate formula is `((customers at end of period - new customers) / customers at start of period) x 100`. So, a business who began a month with 3,000 customers, acquired 150 new customers, and ended the month with 3,100 customers, would have retention rate of 98.3%.

**Is it useful?** This is one of those fundamental metrics everyone should be measuring. If you're growing quickly but not retaining users well, you know you've got a problem. 

> **Retention rate vs churn rate:** Churn rate is the inverse of retention – it's the proportion of customers who left during the measured period. A retention rate of 98.3% would equal a 1.7% churn rate and vice versa. 

### DAU/MAU ratio

**What is it?** Sometimes referred to as stickiness, a DAU/MAU ratio tells you what percentage of your customers are power users. The formula is `(daily active users / monthly active users) x 100`. A product with 100 DAUs and 1,000 MAUs would have a ratio of 10%.

What constitutes a good ratio depends on the sector, but a [2017 report by Mixpanel](https://discover.mixpanel.com/rs/461-OYV-624/images/2017-Mixpanel-Product-Benchmarks-Report.pdf) suggests SaaS products average 13%, and that a good ratio is 20% or more.

**Is it useful?** Yes, but you need to be careful as a large increase in monthly users can skew your ratio. It's best used by late-stage companies with predictable monthly growth, which is probably why it's popular at Facebook.

 <NewsletterForm
compact
/>

### Feature usage

**What is it?** The specifics will vary depending on the product, but this is all about tracking what people are doing. 

At PostHog, our main product metric is [Discoveries](/handbook/product/metrics), which amalgamates a number of actions as one usage metric. 

We view this figure as more important than the number of active users. If the number of Discoveries is growing, we know we're on the right path. 

**Is it useful?** You're in serious trouble if you're not tracking feature usage, and it's where a [product analytics platform](/product) like PostHog is vital. Trying to do this with Google Analytics is a losing battle.

### Net Promoter Score (NPS)

**What is it?**  NPS is a well-known customer satisfaction metric, and a good indicator for future customer retention and product market fit. 

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

## Recommended B2B product metrics

Every product requires a different metrics, but these are the metrics we'd recommend for most B2B products:

- **Active users (DAU / WAU / MAU)** because it's a fundamental metric that underpins others, and allows you to measure user growth over time.

- **Customer retention rate** because it will alert you to problems if you have them, and it's highly comparable.

- **Feature usage** because it's vital to measure the value you're offering to users, and will help you learn what they find most useful.

- **Net Promoter Score (NPS)** because it's a ubiquitous, easy to understand metric you can benchmark against your industry.

- **New user activation** because helping new users generate value quickly will drive satisfaction and word of mouth growth.

You don't need to measure all of these to be successful, and other metrics might be better for your specific product, but they're a good starting point.

And if you're in need a product analytics platform to track them, learn [how we can help](/product).

## Further reading

- [How to achieve B2B product market fit](/blog/how-to-product-market-fit): There's no universal standard for achieving market fit, but this guide introduces heuristics to help you find it

- [How to measure product engagement](/blog/how-to-product-market-fit): Guide to defining engagement for your platform, and how to use analytics tools to measure and build on the results

- [Finding your north star metric](/blog/north-star-metrics): All Saas products can benefit from a north star metric and this guide will help you find one

 <NewsletterForm
compact
/>