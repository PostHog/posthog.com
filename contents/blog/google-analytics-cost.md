---
title: How much does Google Analytics actually cost?
date: 2024-12-03
author:
 - ian-vanagas
rootpage: /blog
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-vs-ga4/posthog-vs-ga4.jpeg
featuredImageType: full
tags:
 - Guides
---

_**TL;DR:** Google Analytics 4 is free (with limits) while its enterprise tier, Google Analytics 360, starts at $50,000 per year._

Some of humanity's great mysteries: What happens after death? Where did life come from? Are aliens real? How much does [Google Analytics](/blog/google-analytics-to-posthog) actually cost? This post attempts to answer the only one that can be wrapped up in a single blog post. 

Thanks to its connection with Google, early entrance into the [web analytics](/web-analytics) market, and initial price tag (free), Google Analytics has long been the most popular product in its category. According to [BuiltWith](https://trends.builtwith.com/analytics/Google-Analytics), as of December 2024, it's used by 50% of the top million sites.

![BuiltWith graph](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_29_at_10_42_08_d308dcfae1.png)

The confusion about the cost of Google Analytics comes from the fact that it's actually two products:

1. **Google Analytics 4 (GA4):** The free version a majority of people use.
2. **Google Analytics 360 (GA360):** The paid version built for enterprises.

Although the core features of both are the same, there are differences between them, with price being the most significant. This post details these differences and helps you figure out what Google Analytics will end up costing you.

## Google Analytics 4 is free (but limited)

[Google Analytics 4](/blog/posthog-vs-ga4) (GA4) is Google's latest iteration of analytics. It replaced Universal Analytics on July 1st, 2024 much to its users' chagrin. GA4 includes many standard features of analytics tools including:

- Customizable capture and reporting of behavioral and demographic data
- Traffic and acquisition analysis
- Conversion tracking and funnels
- User paths to track flows and drop-offs
- Retention for users and revenue
- Monetization analytics to track purchase value, LTV, and revenue metrics
- UTM tracking and advertising analytics for marketing and Google Ads campaigns

Although Google loves to talk about all of GA's features, one thing they don't talk about is GA4's limitations. You can think of GA4 as the **free plan** of their analytics product. This means it has [limits](https://support.google.com/analytics/answer/11202874?sjid=1063875790934107320-NC) like:

- Up to 500,000 sessions per report before sampling
- Data retention up to 14 months
- 25 event parameters per event
- 25 user properties per property
- 50 custom dimensions/metrics per property
- 100 audiences
- 200 explorations per user
- BigQuery export is limited to 1M events daily

While most GA users are under these limits, those getting close to the limit will likely need to upgrade to Google Analytics 360, the enterprise version of the product.

### How and why is GA4 free?

All businesses have costs, and as big as Google is, this is still true for them. There are multiple reasons why GA4 is free to use:

1. The limits to data retention, size, and querying limit the most expensive potential costs they could face.

2. By having strong integrations with Google Ads, GA4 encourages users to buy more of them. Ads have traditionally been Google's primary revenue driver, so other products can operate at losses.

3. Your data is valuable to Google. It helps them improve ad targeting, product development, and data infrastructure among many other benefits. [GA has been declared illegal](/blog/is-google-analytics-illegal-microsite) in many countries because of this.

4. It leads to Google Analytics 360. For a company like Google, the money is in the massive enterprises. Casting a wide net, creating an ecosystem of support and information, and locking them in with a free product inevitably leads to more enterprise deals.

## Google Analytics 360 is expensive

From what I can gather, when you start hitting the limits of GA4, you get an invite into the secret club that is Google Analytics 360 (GA360). This is Google's enterprise version of analytics.

![GA360 target customers meme](https://res.cloudinary.com/dmukukwp6/image/upload/image_ec753abf75.png)

How much GA360 costs is a bit of a mystery, Google doesn't list it anywhere officially. This is because it is provided by resellers AKA "sales partners." These are organizations and consultants that help Google sell GA360 licenses and provide related services like dedicated support, implementation, optimization, and analysis. Two examples give an idea of pricing:

- [Cardinal Path](https://www.cardinalpath.com/blog/ua-360-vs-ga4-360-pricing-model), a leading partner for Google Marketing Platform services, states that the suggested retail price of GA360 starts at $50,000 per year. This entitles customers to 25M events per month.

- [Infotrust](https://infotrust.com/wp-content/uploads/2018/10/google-analytics-adobe-analytics.pdf), a marketing and analytics consultancy, says typical pricing starts at $150,000 per year in the US for up to 500M hits.

> **How much would PostHog cost for those amounts?** Unlike Google, PostHog has [fully transparent pricing](/pricing). 25M [anonymous events](/docs/data/anonymous-vs-identified-events) per month would cost $791 per month or $9492 per year. 500M anonymous events would cost $7,118 per month or $85,416 per year.

Both sources mention that beyond the minimum $50-150k organizations pay, pricing is then usage-based based on the volume of data you capture. 

### What are the features of GA360?

The primary benefit is [upgrades](https://support.google.com/analytics/answer/11202874?sjid=1063875790934107320-NC) to all the limits of GA4. These include:

| **Feature** | **Standard GA4** | **Google Analytics 360** |
| --- | --- | --- |
| **Event parameters** | 25 per event | 100 per event |
| **Custom dimensions and metrics** | 50 per property | 125 per property |
| **API daily quota** | 200,000 tokens | 2M tokens |
| **Data freshness** | 4-8 hours | ~1 hour |
| **Data retention** | Up to 14 months | Up to 50 months |
| **Conversions** | 30 | 50 |
| **Audiences** | 100 | 400 |
| **Shared explorations** | 500 per property | 1,000 per property |
| **Exploration sampling** | 10M events per query | 1B events per query |
| **Distinct app events** | 500 per instance | 2,000 per instance |
| **BigQuery daily exports** | 1M events | Billions of events |

On top of this, you get:

- Unsampled explorations, rollup properties, subproperties
- Enterprise-level support and SLAs
- Advanced integration capabilities with other Google Marketing Platform products

## The opportunity cost of Google Analytics

There is another cost Google Analytics doesn't want you to think about: all the time, money, and effort that could be going towards better options.

The potential problems can be summed up by looking at the two words that make up its name:

### 1. It's Google

Google Analytics is a small fish in the large pond that is Google. The company has proven time and again that it will shut down beloved projects on a whim (see [Optimize](/blog/google-optimize-alternatives), Universal Analytics, and all of [Killed by Google](https://killedbygoogle.com/)). 

When a product does work, it mostly only works with Google and rarely includes outside integrations. Want to send, query, or export data to/from an external source like your CRM, payment processor, or data warehouse? Tough luck!

### 2. It's just analytics

Although Google Analytics is strong when it comes to [web](/web-analytics) and [product analytics](/product-analytics), the landscape of tools organizations rely on now has expanded dramatically and GA hasn't kept up. It lacks [session replays](/session-replay), [A/B testing](/experiments), [surveys](/surveys), [marketing automation](/cdp), and more. This means you miss out on a lot of potential benefits these tools provide.

## How PostHog is different

We've written a full post on [how GA4 and PostHog compare](/blog/posthog-vs-ga4), but as a quick summary:

1. **We're transparent.** Everything from our [pricing](/pricing) to [code](https://github.com/PostHog/posthog) to [strategy](/handbook) is open for anyone to see.

2. **We're built for engineers.** This means [SDKs](/docs/libraries) for popular languages, [docs](/docs) for (nearly) everything you want to build, [APIs](/docs/api) you can actually use, and direct [SQL](/docs/hogql) access to your data.

3. **We integrate with other tools.** Our [data warehouse](/docs/data-warehouse) allows you to import and query data from sources like [Stripe](/tutorials/stripe-reports), [Hubspot](/tutorials/hubspot-reports), and [Zendesk](/tutorials/zendesk-reports) while our [CDP](/docs/cdp) lets you send data anywhere like [Zapier](/docs/cdp/destinations/zapier), [Google Ads](/docs/cdp/destinations/google-ads), and [webhooks](/docs/cdp/destinations/webhook).

On top of all this, we've got a generous free tier. You can [sign up](https://us.posthog.com/signup) and get started for free right away. 
