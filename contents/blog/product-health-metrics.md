---
title: The most useful product health metrics
date: 2023-02-28
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/transparency.jpeg
featuredImageType: full
category: Product growth
tags:
 - Guides
 - Product metrics
---

Like the human body, a product is a complicated system you want to keep healthy. Measuring product health with metrics helps this happen. They help you understand what parts of your product are working as expected and what parts need interventions to make them healthy.

This post goes over:

1. what makes a good health metric
2. common product health metrics
3. how to choose the right product health metrics

## What is a product health metric?

If you think of a product like a human body, then product health metrics are like the vital signs. They are the body temperature, blood pressure, pulse rate, and respiration rate of a product. They are a way to constantly judge how your product is doing. They show how changes, updates, and the environment are impacting it.

Product health metrics are usually steady. Radical changes are a bad sign. Having your temperature way above average means you are sick and need medicine. If a product health metric sees a radical change, it needs intervention.

Companies aim to improve product health metrics steadily over the long term. Like how exercise improves your pulse and respiration rates, adding enhancements and fixing bugs improve your product health metrics.

Because they are constantly measured and steadily improved, product health metrics generally update in real-time and changes are measured over a length of time. For example, a product health metric might be down for the week, which triggers a minor adjustment in focus for next week. It can at the same time be up for the month, which is an encouraging sign. 

Another similarity to your body’s health is that mature products generally care more about them. Early-stage companies are searching for product fit. This often requires product changes or pivots that lead to radical changes in product health metrics. It doesn’t mean the product is "sick," it means they haven’t figured out what "healthy" means yet.

## What makes a good product health metric?

A good health metric is one you monitor regularly and makes a difference if it changes significantly. It must be a metric that matters, and is likely to change if something goes wrong. It is a summary of a product, so it must be abstract enough to remove unnecessary details, but detailed enough to provide actionable information.

The key to actionable information is that you must act on it. If a change in your product health metrics doesn’t prompt a change in your development or strategy, the product health metrics aren’t good. A doctor is useless if you never listen to them. 

For example, if you see a drop in session duration, it might mean your product isn’t engaging enough and you must focus on improving engagement. This should lead you to figure out ways to improve engagement and prioritize that work over other work. If the drop in session duration doesn’t inspire change, it isn’t a good health metric.

## Common product health metrics

Common product health metrics are largely split into three categories:

1. Adoption
2. Engagement
3. Retention

Each of these categories has metrics within, which we go over below.

### New user growth

A healthy product grows consistently. What "consistent" means depends on the industry. For example, a consumer app expects more users to signup than a complicated B2B SaaS platform. What’s true about both of them is they want the growth to continue. Like a body, if new cells stop being created, that has consequences for your health. 

If growth is slowing, your product, positioning, or strategy might need to change. It is a sign:

- your product isn’t appealing enough to your target users
- you have the wrong features for your users
- you aren’t targeting the right users

Using this new user growth as a product metric helps you monitor and improve this.

![New user growth](../images/blog/product-health-metrics/growth.png)

### Churn rate

[Churn rate](/blog/customer-churn-analysis-guide) is the rate users stop using the product. When a user churns, it means they haven’t returned to use the product recently. As a product health metric, churn lets you know whether users are leaving your product. 

Churn rate is a key metric for many products and businesses. For SaaS or products relying on recurring usage (and revenue), churn might be the most important metric. This is because it is one of the key drivers of revenue and growth (along with new user growth).

![Churn rate](../images/blog/product-health-metrics/churn.png)

Some products have a naturally high churn, so having a high churn rate isn’t always a bad sign. A dramatic increase in churn is a bad sign though. It means something has changed significantly with your product and should inspire an intervention.

### Daily, weekly, and monthly active users

Between new user growth and churn rate is active users. This is a measure of users using your product calculated on a daily, weekly, or monthly basis.

Consistent growth in active users means:

- signups are continuing
- you are keeping users engaged
- users aren’t leaving

Active users are the lifeblood of your product, so seeing them continue to grow means a product is healthy. Blood must continue to flow for your body to work, the same is true with your product.

Doing a ratio of these values such as DAU/MAU can also be useful. This helps you understand how frequently people are engaging with the product. You can use PostHog’s formula mode to calculate this. 

![DAU/MAU ratio](../images/blog/product-health-metrics/daumau.png)

### Feature usage

Having users is great, but you want them to actually use your product. Measuring feature usage helps you do this. This is tracking the usage of parts of your product, such as creating, analyzing, or sharing content.

Feature usage helps you understand the health of individual parts of your product. Like the body, if you heal the "sick" parts, the whole is healthier. Feature usage improves prioritization by aligning development time with usage.

Feature usage is a more specific health metric than new user growth or churn rate. It shows the health of specific features, which enables it to be more actionable.

### Session duration

Depending on the product, session duration, or its average, are useful product health metrics. It is a general measurement of user engagement. This is because it shows if users are spending significant time in your product. If this was to change significantly, something fundamentally shifted in your app.

For some products, the extremes of session duration might be more important. This enables you to monitor the health of your product for power users, which could be different, but more important, than average users.

![Session duration](../images/blog/product-health-metrics/duration.png)

## How to choose the right product health metrics

The "right" product health metric depends on your product, company, stage, industry, and infinitely more variables. Picking one goes back to what makes a good product health metric. It must be something you want to:

- improve slowly, but a dramatic change would cause concern and intervention.
- monitor in the short run (daily, weekly) and improve in the long run.
- know and track because it makes a difference in the quality of the product and experience for users.

Choosing the right level of detail is also important. Being too specific causes the metric to not be representative of the product’s health. Being too broad means the metric isn’t actionable and makes it unclear what interventions you can do to improve an issue.

Connecting health metrics to OKRs helps make them specific and actionable. It also creates ownership that helps the product improve. Improving the product, and users’ experience with it, is what health metrics should ideally do. If they aren’t, like a diet that doesn’t see results, it’s a sign to rethink your health regime towards something that helps your product improve.

## Further reading

- [The most useful B2B SaaS product metrics](/blog/b2b-saas-product-metrics)
- [Finding your North Star metric and why it matters](/blog/north-star-metrics)
- [Building an AARRR pirate funnel (how and why)](/blog/aarrr-pirate-funnel)
