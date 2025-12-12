---
date: 2025-12-11
title: How to actually measure product engagement
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - jina-yoon, hanna-crombie
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/lw-queries.png
featuredImageType: full
category: Product growth
tags:
  - Product metrics
  - Guides
---

If you search for “product engagement metrics”, you’ll get listicles of 15+ metrics with no context on what they mean or which ones matter. Are engagement metrics the same as retention metrics? Should you track stickiness or activation first? How do I make sense of session times?

In this guide, we’ll actually explain what product engagement is, common metrics people use, and what startups should focus on measuring.

**Contents:**

- [What is product engagement?](#what-is-product-engagement)
- [What are product engagement metrics?](#what-are-product-engagement-metrics)
- [Common engagement metrics](#common-product-engagement-metrics)
- [How to measure product engagement for startups](#how-to-measure-product-engagement-for-startups)
- [Quick recap](#quick-recap)
- [Further reading](#further-reading)

## What is product engagement?

Product engagement is simply about how people interact with your product. This includes how frequently they use it, what they do in it, how deeply they engage, whether they come back, and more. You want to measure it because meaningful product engagement = value for your users = $$$ for your business.

*How* you choose to measure it depends on your business’s goals. Different product types and industries will have very different product engagement metrics. For example, increased session time is great for a mobile game that relies on ad revenue, but the same numbers could indicate an awful UX for a B2B fintech product. Context matters.

This also means startups should prioritize different engagement metrics than established enterprises. (Skip ahead to How to choose product engagement metrics for your startup if that’s what you’re looking for.)

## Common product engagement metrics

There are a ton of different ways to measure how people interact with your product. Here are the most common metrics people track. Most of them won't matter for your startup, but you need a basic understanding to know what to choose.

### **Raw behavioral metrics**

These are raw numbers from what users are doing with your product.

- **Sessions per user:** How often they open/use the product. High session count might mean your product is sticky (like Instagram or Candy Crush).
- **Session length/time in product:** Useful for content or media products where longer = better (like YouTube or Spotify). Not so good if efficiency is the goal (like a banking app).
- **Feature adoption/breadth:** How many different features of your product someone uses. Useful for B2B software if upselling from one product to multiple offerings is your goal.
- **Specific actions completed:** The concrete things users do, like files created in Figma, or searches performed in Google. (These are often the best candidates for North Star metrics!)
- **Frequency of use:** Daily, weekly, monthly active users (DAU/WAU/MAU). It shows baseline usage patterns, but doesn’t tell you if the usage is meaningful.
- **Depth of engagement:** How far into your product users get. Someone who completes onboarding and uses 3 features is more engaged than someone who signs up and bounces.

### **Calculated metrics**

These are derived by doing math on the raw metrics above to answer specific strategic questions.

- **Activation rate:** % of users who complete key early actions that correlate with retention. Helps you understand if people are experiencing value quickly enough to come back. (For startups, the hard part is defining what those "key early actions" are.)
- **Stickiness (DAU/MAU ratio):** How many days per month your active users show up. Good stickiness varies wildly (e.g., a daily habit-tracking app might be high, a travel app is naturally low).
- **Retention rate:** % of users still active after X days/weeks/months. Usually tracked by cohort (i.e., for users who signed up in January, how many are still here in March?).
- **Churn rate:** % of users who stop using the product over a time period. Commonly used for subscriptions where you can clearly see when someone cancels, like Netflix.
- **Engagement scores:** Sometimes called Product Engagement Score (PES). Weighted composites of multiple metrics meant to represent per user/account engagement in a single number. Extremely reductive and rarely useful.

## How to measure product engagement for startups

Now that you know what all these buzzword metrics are, here's how to actually measure product engagement as a startup. 

First off, there’s no need to track a dozen engagement metrics from the start. At this point, you and your team should still be focused on one number: your North Star metric. 

North Star metrics are numbers that are simple to communicate and easy to measure. They're typically one of the raw behavioral metrics from above, like rides booked on Uber, for example. A great North Star metric enables someone to quickly grasp your business's goals because it's an obvious precursor to revenue. They’re also a great signal for product-market fit.

When your North Star isn't moving the way you want, THEN you can dig into supporting metrics like activation or retention to figure out why.

- [Don’t underestimate the value of qualitative data. Numbers are useful and all, but sometimes just talking to your users, watching session replays, or sending surveys will lead to your biggest breakthroughs as a startup. Don’t tunnel on the quant.]

# Quick recap

- A product engagement metric is only useful if it indicates users are getting value out of your product.
- How you choose to measure product engagement varies wildly between different products, ICPs, industries, and stages.
- Don’t get caught up tracking all the different types of metrics. Focus on your North Star metric and use product engagement metrics as diagnostic or supportive tools.

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/how-to-measure-engagement/product-engagement-metrics.jpeg)

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/how-to-measure-engagement/correlation.png)

## Further reading

- [Finding your North Star metric and why it matters](/blog/north-star-metrics): Successful products need actionable metrics. Here's how to find them.

- [What is user segmentation?](/blog/how-to-do-user-segmentation): A quick guide to user segmentation and how to apply it to your business

- [B2B Product Metrics 101:](/blog/b2b-saas-product-metrics): Everything you need to know about metrics for B2B SaaS products

<NewsletterForm />

