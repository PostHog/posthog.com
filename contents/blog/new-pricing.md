---
date: 2024-06-24
title: 'PostHog is now up to 80% cheaper'
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog_is_the_cheapest_e77c4ea4a5.jpg
author:
  - james-hawkins
tags:
  - PostHog news
---
import {ProductScreenshot} from 'components/ProductScreenshot'

export const Pricing = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog_pricing_ba910c9535.jpg"
export const PricingDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog_pricing_dark_6b11387d6c.jpg"
export const PricingComparison = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog_pricing_comparison_f0c9e11f40.jpg"
export const PricingComparisonDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog_pricing_comparison_dark_ecf7d726c0.jpg"

## TL;DR

* You can now use PostHog's product and web analytics for up to 80% less, making us cheaper than any popular competitive product.

* This is possible because we've introduced a new event processing option that enables you to capture events without person information. 

* Events _without_ person information cost less for us to ingest and query. We're passing this saving onto you by introducing cheaper base event pricing and a new "Person profiles" add-on.

* Events with person profiles enabled cost the same as our old event pricing. Existing customers will see a new line item labelled "Person profiles" on their invoice. Your price has not gone up.

* You decide when you do or don't include person information on an event.

## How much cheaper are the new base events?

At lower volumes, our new event pricing is 80% cheaper than before – it's ideal for tracking the behavior of logged-out users, such as users on your marketing website.

We expect people to use a combination of events with and without person profiles, which you can see visualized below.

<br />

<ProductScreenshot
  imageLight={Pricing} 
  imageDark={PricingDark} 
  alt="New PostHog pricing" 
  classes="rounded"
/>

This pricing makes us better value than any popular (>$10M in revenue) product analytics tool. 

Below you can see how our new pricing compares to Mixpanel's up to 20 million events – the limit of its "transparent" pricing. 

<ProductScreenshot
  imageLight={PricingComparison} 
  imageDark={PricingComparisonDark} 
  alt="New PostHog pricing compared to Mixpanel" 
  classes="rounded"
/>

And we continue to offer the most generous, feature complete free tier of any analytics tool.

The table below is a side-by-side comparison of our new base event pricing, and pricing for events with person profiles enabled. 

| **Monthly events** | **New base event price** | **Base events + person profiles** | **Percentage diff.** |
|--------------------|--------------------------|-----------------------------------|----------------|
| **Up to 1m**       | Free                     | Free                              | -              |
| **1-2m**           | $0.0000500 / event       | $0.0002480 / event                | -80%           |
| **2-15m**          | $0.0000343 / event       | $0.0001040 / event                | -67%           |
| **15-50m**         | $0.0000295 / event       | $0.0000655 / event                | -55%           |
| **50-100m**        | $0.0000218 / event       | $0.0000364 / event                | -40%           |
| **100-250**        | $0.0000150 / event       | $0.0000187 / event                | -20%           |
| **∞**              | $0.0000090 / event       | $0.0000100 / event                | -10%           |

> **Remember:** Base events and person profiles combined cost the same as our previous per event pricing.

## When should I use the new processing option?

We use it in places where we're only interested in aggregate data, such as for logged-out users on our website.

It could also be useful when:

- You're willing to lose some functionality for lower bills.
- You want to track API or server events, especially at high volumes. 
- You run a large e-commerce or content website with millions of users.
- You're not tracking an existing high-volume event because it would be prohibitively expensive.
- You want to use [autocapture](/docs/product-analytics/autocapture) to track events, but have turned it off to save money.

## How do I start using it?

For most people, it only requires a simple config change to include `process_persons: "identified_only"`. 

This will track anonymous traffic without person profiles, and start collecting person information any time an identifying action is taken (i.e. using `identify()`, `group()`, setting person properties with `$set`, etc).

You can get instructions for this and other use cases in our [persons documentation](/docs/data/persons).

## What's the downside?

When sending events without person information, you cannot:

- Filter on persons (e.g. an individual user)
- Create cohorts filtered on person properties (e.g. paying vs non-paying users)
- Target by person properties for feature flags, A/B tests and surveys.
- Receive initial UTM values for tracking marketing campaign performance (only the most recent).
- View a person’s profile in the app, or query the persons table in our SQL insights.
- Use [groups functionality](/docs/product-analytics/group-analytics) on standard events (without person profiles).

If you need the above functionality, just continue to send person information with your events (no need to change anything), for events where the specific functionality is needed. 

Person profiles are not an all-or-nothing thing. You can use them on any traffic where you need more detailed information, and skip them when you don't need that detail.

## Why are we doing this?

The short answer? Because we can.

The slightly longer answer? Because it's the right thing to do for both our users and our business.

Most of our competitors are inefficient. They employ huge outbound sales teams to grow revenue. Their salaries and commissions for closing deals are passed onto their customers through higher prices.

In contrast, we're 100% inbound. We grow mostly through word of mouth, and we charge based on actual usage. 

We make a modest positive margin on each event sold, but we grow our revenue through helping you grow and (hopefully) onboarding you onto other tools, like session replay, feature flags, and surveys as well.

We think this is better for everyone than trying to squeeze you for every cent you have.

> ## FAQ
>
> #### Will my bill go up if I continue to use person profiles?
>
> No. Events with person profiles enabled cost the same as our old pricing. You'll see a new line item on your invoice, but what you pay won't change if you send person profiles on every event. 
>
> #### Why aren't you making the events with person profiles cheaper?
>
> Because events with person profiles cost a lot more for us to ingest and query. Not sending person information for certain events, however, saves us money, so we're passing that on.
>
> This aligns our interests with our customers, and means we can make a positive margin on all events ingested (beyond our free tier), so it is sustainable but not greedy!
>
> We're also working on reducing costs for events with person profiles enabled. When we do, we'll pass this saving on, too.