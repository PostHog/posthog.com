---
date: 2024-07-10
title: You can now sync data from external sources into PostHog
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_92b43aa9de.jpg
author:
  - joe-martin
featuredImageType: full
tags:
  - PostHog news
---

> ## TL;DR
>
> - Data warehouse is now out of beta, with pre-built connectors for Stripe, Hubspot, Zendesk, and more.
>
> - You can use synced data across most PostHog tools, such as analyzing data with insights and HogQL.
>
> - We're introducing usage-based pricing, with your first 1M synced rows for free every month.
>
> - As thanks, beta users will get an increased free allowance and 30 days of free usage.

After a month-long public beta, our data warehouse is ready for prime time. We’re releasing it into general availability, so teams can start syncing data from other sources and working with it in PostHog. 

Why would you want to get non-product data into PostHog? So you can do things like...

- [Sync Stripe data](/tutorials/stripe-reports) to analyze how sign-ups correlate to MRR, revenue, and churn.
- [Sync Hubspot data](/tutorials/hubspot-reports) to identify leads based on their actions, pageviews, and churn-risk.
- [Sync Zendesk data](/tutorials/zendesk-reports) to see how ticket volume and SLA metrics impact usage and churn.

All that is just using our pre-built connectors. You can also bring data into PostHog from almost anywhere using [Snowflake, Cloudflare R2, Amazon S3, Google Cloud Storage](/docs/data-warehouse/setup), or [custom sources](/docs/data-warehouse/setup#linking-a-custom-source) — and we’re fascinated to see what further use cases teams will come up with. 

Over the beta we’ve already seen teams sync everything from their bank data (for analyzing P&L without an accountant) to CRMs (for monitoring sales team performance). Teams like [Headshot Pro, for example, have synced Google Adwords](/customers/headshot-pro), so they can analyze marketing data in detail and attribute it to sign-ups and usage.

Ultimately, this is why we’ve poured so much attention into building our data warehouse recently — so we can give you the tools they need you [build more successful products](/handbook/why-does-posthog-exist). If that means working with external data, then that’s what the data warehouse (along with [HogQL](/docs/hogql) and [insights](/product-analytics)) is for. 

As always, we want to make sure [our pricing](/pricing) is fair, margin-positive, and usage-based. So, we'll bill based on the number of rows that get synced each month — after a generous free allowance that should offer more than enough to support smaller teams and side projects. If you're ready to get started, [sync your first data source now](https://us.posthog.com/pipeline/sources)!

> As a **thank you to our beta users** we’re offering an increased free allowance for teams that synced any data during the data warehouse beta. Check your email for details!
