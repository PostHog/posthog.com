---
date: 2025-12-12
title: How to actually measure product engagement
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - jina-yoon
  - hanna-crombie
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/lw-queries.png
featuredImageType: full
category: Product growth
tags:
  - Product metrics
  - Guides
---

Everyone wants high product engagement. It's one of those things that sounds obviously good, like "growth" or "traction." But what does it actually mean, and how do you measure it? 

In this blog, we'll explain what it is, common ways people measure it, and what metrics startups should actually focus on.

**Contents:**

- [What is product engagement?](#what-is-product-engagement)
- [What are product engagement metrics?](#what-are-product-engagement-metrics)
- [Common engagement metrics](#common-product-engagement-metrics)
- [How to measure product engagement for startups](#how-to-measure-product-engagement-for-startups)
- [Quick recap](#quick-recap)
- [Further reading](#further-reading)

## What is product engagement?

Product engagement is simply about how people interact with your product. This includes how frequently they use it, what they do in it, how deeply they engage, whether they come back, and more. 

You want to measure it because meaningful product engagement = value for your users = $$$ for your business.

*How* you choose to measure it depends on your business’s goals. Different product types and industries will have very different product engagement metrics. 

For example, increased [session time](/tutorials/time-on-page) is great for a mobile game that relies on ad revenue, but the same numbers could indicate an awful UX for a B2B fintech product. Context matters.

This also means startups should prioritize different engagement metrics than established enterprises. (Skip ahead to [How to measure product engagement for startups](#how-to-measure-product-engagement-for-startups) if that’s what you’re looking for.)

## Common product engagement metrics

There are a ton of different ways to measure how people interact with your product. Here are the most common metrics people track.

### Raw behavioral metrics

These are raw numbers from what users are doing with your product.

- **Sessions per user:** How often they open/use the product. High session count might mean your product is sticky (like Instagram or Candy Crush).

- **Session length/time in product:** Useful for media products where longer = better (like YouTube or Spotify). Not so good if efficiency is the goal (like a banking app).

- **Feature adoption/breadth:** How many features of your product someone uses. Useful for B2B software if upselling from one product to multiple offerings is your goal.

- **Specific actions completed:** The concrete things users do, like files created in Figma or searches performed in Google. (These are often the best candidates for [North Star metrics](/founders/north-star-metrics)!)

- **Frequency of use:** Daily, weekly, monthly active users (DAU/WAU/MAU). Shows baseline usage patterns, but doesn’t tell you if the usage is meaningful.

- **Depth of engagement:** How far your users get. Someone who completes onboarding and uses 3 features is more engaged than someone who signs up and bounces.

### Calculated metrics

These are derived by doing math on the raw metrics above to answer specific questions.

- **[Activation rate](/product-engineers/activation-metrics):** % of users who complete key early actions that correlate with retention. Helps you understand if people are experiencing value quickly enough to come back. (For startups, the hard part is defining what those "key early actions" are.)

- **Stickiness (DAU/MAU ratio):** How many days per month your active users show up. Good stickiness varies wildly (e.g., a daily habit-tracking app might be high, a travel app is naturally low).

- **[Retention rate](/product-engineers/customer-retention-metrics):** % of users still active after X days/weeks/months. Usually tracked by cohort (i.e., for users who signed up in January, how many are still here in March?).

- **[Churn rate](/product-engineers/churn-rate-vs-retention-rate):** % of users who stop using the product over a time period. Commonly used for subscriptions where you can clearly see when someone cancels, like Netflix.

- **Engagement scores:** Sometimes called Product Engagement Score (PES). Weighted composites of multiple metrics meant to represent per user/account engagement in a single number. 

> **Product Engagement Scores (PES)** are popular among the interwebz because having a single representative number sounds nice and looks pretty on dashboards. In practice, it's extremely reductive and rarely useful since you lose so much context when combining these numbers arbitrarily, so we don't recommend using them.

## How to measure product engagement for startups

Now that you know what all these buzzwords mean, here's how to actually make sense of them for your startup. 

First off, there’s no need to obsess over a dozen engagement metrics from the start. Until you've solidly found product-market fit, your team should still be focused on one number: your [North Star metric](/founders/north-star-metrics).

North Star metrics are numbers that are simple to communicate, easy to measure, and are an [obvious precursor to revenue](/docs/new-to-posthog/getting-hogpilled). They're typically one of the raw behavioral metrics from above, like rides booked on Uber, for example. (And if the semantics are bothering you, yes – technically, your North Star metric _is_ an engagement metric.)

We recommend prioritizing your North Star at this point since engagement metrics are only meaningful if they help you understand your product's value. When you're early on, value is best indicated by your North Star metric.

When your North Star isn't moving the way you want, THEN you can dig into supporting metrics like activation or retention to figure out why.

> **Don’t underestimate the value of qualitative data.** Numbers are useful and all, but sometimes just [talking to your users](/newsletter/talk-to-users), watching [session replays](/tutorials/explore-insights-session-recordings), or sending [surveys](/tutorials/survey) will lead to your biggest breakthroughs as a startup. Don’t tunnel on the quant.

# Quick recap

- A product engagement metric is only useful if it indicates users are getting value out of your product.
- How you choose to measure product engagement varies wildly between different products, ICPs, industries, and stages.
- Don’t get caught up tracking all the different types of metrics. Until you find PMF, focus on your North Star metric and use product engagement metrics as diagnostic or supportive tools.

## Further reading

- [Finding your North Star metric and why it matters](/blog/north-star-metrics): Successful products need actionable metrics. Here's how to find them.

- [B2B Product Metrics 101](/blog/b2b-saas-product-metrics): Everything you need to know about metrics for B2B SaaS products.

- [WTF is activation and why should engineers care?](/newsletter/wtf-is-activation): Why engineers should care about activation rates.

<NewsletterForm />

