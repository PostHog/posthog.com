---
title: Per-product activation
sidebar: Handbook
showTitle: true
---

Because PostHog offers so many products, and people sign up with all sorts of different needs, we track activation separately for each product. 

Every product should have activation criteria - these are used to determine if a user has activated for a specific product yet. If they haven't, and they've showed [intent for that product](/handbook/growth/growth-engineering/product-intents), we can nudge them in the right direction. These are also used to understand what retention looks like for the product, and to figure out what PostHog can do to offer a better experience!

## How we track activation, and how to set up an activation query for a new product

This is the basic structure of our activation queries:

1. An organization triggered a 'product intent' -> This is the 'upfunnel' metric
2. An organization met the 'activation criteria', usually one, multiple, or a set of qualifying events in a given time period (e.g. 14 days) -> This is the 'downfunnel' metric
3. An organization triggered an event correlating with product usage 3 months after they showed product intent -> This is the retention / survived metric

Here is an example structure:

![image](https://res.cloudinary.com/dmukukwp6/image/upload/product_analytics_activation_ff38af6d30.png)

You can find all per-product activation queries on <PrivateLink url="https://us.posthog.com/project/2/dashboard/130345">
this dashboard</PrivateLink>.

### Picking the right activation criteria

The ideal activation metric strikes a balance: enough companies should reach activation (so it's not too restrictive), while those who activate should have high retention (so it's not too easy). To find a couple of potential definitions, you want to look at product usage and think about what behavior *could* correlate with successful activation (aka the "aha-moment"). This could be things such as

1. Has done a key event once (such as launched an experiment)
2. Has done a key event multiple times (such as analyzed 2 insights)
3. Has done a combination of key events (such as watched 5 recordings, and set a recording filter)

To pick the best activation definion, it's recommended to write the activation queries for multiple potential activation definitions (~5-10), and compare the activation and retention numbers. This leads to a much higher confidence in the activation metric than just picking your best guess.

Which definition is the best indicator for long term retention? You want to pick a definition that gets a sizable number of organizations to activate, but also to retain. But be careful: If you pick a activation definition where only 1% activate, and 100% of those 1% retain, your activation metric is too narrow!

Note on the retention / survived definition: For this, it's recommended you pick whatever tells you they are an active user. It can be the same as your activation definition, or something a bit simpler, as long as it is closely related to the user actually using the product (e.g. in replay, activation is currently defined as analysing 5 recordings AND setting a filter, usage is simply defined as having analysed one or more recordings).

If you haven't already, make sure you also track [product intents](/handbook/growth/growth-engineering/product-intents) for your product. It's worth noting that adding new product intents will impact your activation rates (e.g. an existing user intent might be stronger or weaker than an onboarding intent). If you are comparing activation rates historically, it might be worth filtering for intents that rarely change, such as "onboarding product selected".

[Read this blog post](/product-engineers/activation-metrics) for a deep dive into how we first came up with our activation definions.

### Structure of the SQL query

Our activation SQL queries consist of two parts: A materialised view to count the eligible events, a SQL query on top of the materialised view to count the conversion percentages. We use materialised views to make these queries more performant.

We store the activation logic in SQL queries and not in code to make it easier to see our activation definitions, to experiment with new definitions, and to drill down to understand why a certain bucket might not perform so well.

**The following activation logic is stored in the materialised views:**

1. Count only the first product intent per organization (since product usage intents can be triggered multiple times by the same org), as well as filter out cross sell product intents
2. Check if an organization meets the activation definition within 30 days of showing product intent
3. Check if an organization meets the retetion / survived definition within 3 months of showing product intent

Here is an example <PrivateLink url="https://us.posthog.com/project/2/sql?open_view=01966c82-9958-0000-7959-1728ad7dd6d4">
materialised view query</PrivateLink>. To write your own, we recommend copying the query and change the product & event filtering criteria as needed.

**The following logic is stored in the SQL query:**

1. Check if a organization is both activated AND retained to be counted in retention / survived
2. Calculate the conversion percentages from product intent -> activation -> retention / survived

To write your own, we also recommend copying one of the <PrivateLink url="https://us.posthog.com/project/2/insights/ccIWa4br">existing queries</PrivateLink>. All our activation queries follow the same structure, which we should also follow for new products. Once you've found a good definion of activation for your product, please do add the final activation query to <PrivateLink url="https://us.posthog.com/project/2/dashboard/130345">this dashboard</PrivateLink>.

## Tracking activation in the code

We use SQL queries to analyze activation. In addition, we track product intents and activation in the code. We do this so that in the future we could act on this, e.g. someone showed intent, but they didn't activate? Show them in an-app banner or send them an email.

To add a new product to this, you can add the activation criteria in the [product intent model](https://github.com/PostHog/posthog/blob/master/posthog/models/product_intent/product_intent.py#L77-L82).

This code is run every time an intent is updated. For example, if the activation criteria is "save 4 insights", and we send a product intent every time someone clicks "new insight", we'll also check at that time if they have 4 insights saved, and if so mark them as activated.

## Why does this matter?

Tracking activation is important, because it tells us how many companies start using our products successfully each month, and how many retain. Measuring it month over month allows us to see trends, and whether improvements to the product actually made a difference.

If the activation metrics look good, it gives us the peace of mind to focus on new feature development. But if they trend downwards, it's probably a good time to look into our onboarding and "first time user" funnels to see in which areas our UX can be improved.
