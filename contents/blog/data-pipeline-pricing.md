---
date: 2025-09-11
title: Data pipelines just got cheaper (and fairer)
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog_is_the_cheapest_e77c4ea4a5.jpg
author:
  - abe-basu
featuredImageType: full
tags:
  - PostHog news
---

> ## TL;DR
>
> - We're switching billing for data pipelines from **events ingested** to **rows exported** and **trigger events**.
> - This means you'll be billed for what you *actually* use, which matches our [pricing principles](/handbook/engineering/feature-pricing).
> - For nearly all of you (98%), this makes using pipelines **cheaper**. If you ingest loads of events but don't export much data, things just got much more affordable. Most teams will reduce their bills by 87%.
> - Free allowances remain generous: 10,000 free trigger events and 1M free rows to export

## Wait, what's changing?

Until now, billing for [data pipelines](/docs/cdp) has been based on all your **events ingested**, regardless of whether they were used in pipelines or not. That made sense at first, but it also meant you were sometimes paying for functionality you didn't really use — like being billed for a buffet when you only ate the bread rolls.

We're fixing that. From now on, you'll pay based on:

1. **Rows exported:** The actual data leaving PostHog via [batch exports](/docs/cdp/batch-exports) and landing in your destinations.  
2. **Trigger events:** The events that actually kick off actions in your pipelines.

No more phantom charges for uneaten bread rolls.

## Why this change?

Because our [pricing principles](/handbook/engineering/feature-pricing) say you should pay for the value you get, not the noise around it. Rows exported and trigger events are a much truer measure of what you actually *use*.  

The best part, for the vast majority of customers, this is going to be cheaper, reducing your monthly data pipeline bill by 87% on average. This means:

- If you only export a fraction of your ingested data, you'll pay less.  
- If you wanted to try pipelines but were scared by high costs from ingestion-based billing, you can now jump in without breaking the bank.  

It's fairer and friendlier on your wallet.

If you're part of the (very) small subset of customers who would see an increase in price, we will start you off with a 50% discount for a month so you can see how your usage changes and add billing limits if needed.

## Free tiers (still generous!)

One of our most important pricing principles is that it should be free to use PostHog at smaller scales or to get started. That's why all PostHog apps have a generous free allowance you can use every month. Data pipelines are no different. 

- **10,000 trigger events free** each month  
- **1 million rows exported free** each month  

That's a lot of [Slack messages](/docs/cdp/destinations/slack), [ad conversions](/docs/cdp/destinations/linkedin-ads), and [data backed up to S3](/docs/cdp/batch-exports/s3). It should be plenty to get started, or even to keep going, depending on your setup. 

To learn more about usage-based pricing beyond free tiers and to calculate potential costs, check out our [pricing page and calculator](/pricing).

## What's next?

If you're already using pipelines, you don't need to do anything — your billing will automatically switch to the new system starting today and will apply to usage going forward. Your usage up until yesterday is billed under the old pricing scheme and you can see both charges in the billing page for this month. 

If you are forecasted an increased bill because of the price change, we will automatically apply a 50% discount for the next month.

If you've been waiting for a better reason to try data pipelines out, well… this is it.  

[Head to your pipelines dashboard](https://us.posthog.com/pipeline/destinations) and start batch exporting data or sending events to destinations the cheaper, fairer way.