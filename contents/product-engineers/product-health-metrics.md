---
title: The most useful product health metrics
date: 2023-12-05
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

A product is a complicated system you want to keep healthy. Product health metrics help measure the well-being of your product and uncover areas in need of changes to get it back to healthy.

In this guide, we cover:

1. What is a product health metric?
2. Common product health metrics to measure
3. How to choose the right product health metrics

> **Want to get started fast?** Try our pre-built [product health dashboard template](/templates/health-dashboard) to monitor the most important metrics with one click.

## What is a product health metric?

If a product is like the human body, then product health metrics are the vital signs. They are the body temperature, blood pressure, and pulse rate of a product. They help you monitor the experience of your product and show the impact of changes, updates, and the competitive environment.

Product health metrics are usually steady. Dramatic changes are a bad sign. Just like a spike in your body temperature means you are sick, a spike in a product health metric is worth investigating. 

If a dramatic change doesn't prompt a change in your work, your health metric isn't valuable. A doctor is useless if you never listen to them. A good product health metric is a summary of a product, so it must be abstract enough to remove unnecessary details, but detailed enough to remain actionable.

Beyond, monitoring for dramatic changes, companies aim to improve product health metrics over weeks and months. Like how consistently exercising improves your pulse and respiration rates, enhancements and bug fixes improve your product health.

### What types of companies use product health metrics?

Later-stage companies with mature products with product-market fit generally care more about health metrics. This is because they care more about providing a consistent, high-quality experience than finding product-market fit.

[Early-stage startups](/blog/early-stage-analytics) searching for [product-market fit](/blog/measure-product-market-fit) often pivot and require radically different metrics. This doesn’t mean early products are "sick," they just haven’t figured out what "healthy" means yet.

## Common product health metrics to measure

Product health metrics largely fit into three categories:

1. Adoption
2. Engagement
3. Retention

### New user growth (adoption)

A healthy product grows consistently. What "consistent" means depends on the industry. For example, a consumer app expects more users to signup than a complicated B2B SaaS platform. What’s true about both of them is they want the growth to continue. Like a body, if new cells stop being created, that has consequences for your health.

![New user growth](../images/blog/product-health-metrics/growth.png)

If growth is slowing, your product, positioning, or strategy might need to change. It is a sign:

- your product isn’t appealing enough to your target users
- you have the wrong features for your users
- you aren’t targeting the right users

### Churn rate (retention)

[Churn rate](/product-engineers/churn-rate-vs-retention-rate) is the rate users stop using the product. When a user churns, it means they haven’t returned to use the product recently. 

For SaaS or products relying on recurring usage (and revenue), churn might be the most important health metric. This is because it is one of the key drivers of revenue and growth (along with new user growth).

![Churn rate](../images/blog/product-health-metrics/churn.png)

Some products have a naturally high churn, so having a high churn rate isn’t always a bad sign. A dramatic increase in churn is a bad sign though. It means something has changed significantly with your product and should be investigated.

### Daily, weekly, and monthly active users (engagement)

To measure health between new users joining and existing users churning, companies look at active users. This is a measure of users using your product calculated on a daily, weekly, or monthly basis.

Consistent growth in active users means:

- signups are continuing
- you are keeping users engaged
- users aren’t leaving

Doing a ratio of these values such as DAU/MAU can be useful. This helps you understand how frequently people are engaging with the product and the "intensity" of this usage. You can use PostHog’s formula mode to calculate this. 

![DAU/MAU ratio](../images/blog/product-health-metrics/daumau.png)

### Feature usage (engagement)

Having users is great, but you want them to actually use your product. Measuring feature usage helps you do this. 

This tracks the usage of parts of your product, such as creating, analyzing, or sharing content. A way to do this is with the [lifecycle insight](/docs/product-analytics/lifecycle). It enables you to see new, returning, and resurrected usage of the feature as well as how many users have gone dormant.

![Lifecycle](../images/blog/product-health-metrics/lifecycle.png)

Feature usage helps you understand the health of individual parts of your product. Like the body, if you heal the "sick" parts, the whole is healthier. Feature usage improves prioritization by aligning development time with usage.

### Session duration (engagement)

Depending on the product, session duration, or its average, is a useful product health metric. It is a general measure of user engagement showing if users are spending significant time in your product. If this changed significantly, something shifted in your app to cause users to spend less time there.

For products reliant on power users, the extremes of session duration can reveal more. The average session duration can be misleading as low-quality users can drag down the average. Power user session duration shows users are reliant on it and this is a promising sign for startups.

For utilities, seeing the average session duration _go down_ can be a good sign. This is because your product is becoming more efficient at doing what users want it to do. Time is money, so saving it for users makes your product more valuable.

![Session duration](../images/blog/product-health-metrics/duration.png)

## How to choose the right product health metrics

Picking the right product health metrics goes back to what makes a good one. It must be something you want to:

- improve slowly, but a dramatic change would cause concern and intervention.

- know and track because it makes a difference in the quality of the product and experience for users.

As examples, let's go over some types of products and look at what a good health metric might be for them:

- **Subscription B2C:** Need high growth in new user growth and always be aware of churn rate and cohort retention because both are likely to be high. If you see good signs in extreme session duration and daily and weekly active users, you're on your way to [product-market fit](/blog/product-market-fit-game).

- **Ad-based B2C:** The more time users spend in the app the better. It means more content created and ads shown. Average session duration, DAU/MAU intensity, and daily and weekly active users are all ways of monitoring this.

- **Marketplaces:** Need to see engagement on both sides of the marketplace, users don't matter as much as listing and sales do. Feature usage (listing, buying), supplier and buyer lifecycle (check both reoccur and return), and new supply growth all provide insights into a marketplaces'  health.

- **B2B SaaS:** Organizations matter more than users, the bigger the organization the better. Keep an eye on new organization growth, feature usage, and organization churn rate to ensure they are targeting and engaging the right organizations with their product.

- **B2B Usage/User-based:** When you are usage-based, you care more about feature usage, average session duration, and daily and weekly active users. Large users will drive a significant amount of the revenue, so ensuring they are happy is key.

Choosing the right level of detail is also important. 

- Too specific causes the metric to not be representative of the product’s health. For example, pricing page conversion likely has more to do with what's on the page than what's in the product.

- Too broad means the metric isn’t actionable and makes it unclear what interventions you can do to improve an issue. For example, it's unclear what you build now to raise pageviews or unique sessions.

Connecting health metrics to OKRs helps make them specific and actionable. It also creates ownership that helps the product improve. If your health metrics don't improve your product, it’s a sign to rethink your health regime towards something that does.

## Further reading

- [The most useful B2B SaaS product metrics](/blog/b2b-saas-product-metrics)
- [Finding your North Star metric and why it matters](/blog/north-star-metrics)
- [What is real user monitoring (and how to set it up)](/blog/real-user-monitoring)
