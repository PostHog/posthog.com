---
date: 2024-06-21
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

## tl;dr

* It is now possible to use PostHog's product and web analytics for up to 80% less, depending on your volumes, making us cheaper than any popular competitive product.

* We have a new event processing option that allows you to capture events without person information.

* Previously we processed every event with person information.

* This allows us to reduce our costs for events that do not need person information. We can pass this saving to our customers.

* If you use this option, we are by far the cheapest way to track your product compared to any major analytics competitor.

<ProductScreenshot
  imageLight={Pricing} 
  imageDark={PricingDark} 
  alt="New PostHog pricing" 
  classes="rounded"
/>

## Pricing before and after

| Tier (up to) | New event price without person information | Previous pricing / our new pricing for events with person information |
| ---- | ----- | ----- | ----- |
| 1M | $0 | $0 | $0 |
| 2M | $0.0000198 |  $0.000248 |
| 15M | $0.0000343 |  $0.000104 |
| 50M | $0.0000295 |  $0.0000655 |
| 100M | $0.0000218 |  $0.0000364 |
| 250M | $0.0000150 | $0.0000187 |
| ∞ | $0.000009 | $0.00001 |

Note: We can offer further discounts if you are beyond 250M events/month regardless. At that scale, we suggest you talk to us.

## Who is this for?

Anyone who:

- Isn't tracking an existing event type because it is high volume and thus would have been prohibitively expensive.

- Has a marketing or content website with lots of anonymous traffic – you can now track this much less expensively than before.

- Is tracking API or server events (especially at high volumes) – you can now track this much less expensively than before.

- Is a price-sensitive customer and is willing to lose some functionality for a lower spend with us.

## How we compare to our competitors

* This makes us the best value popular (>$10M in revenue) product analytics software by a long way.

* Apart from being more expensive, everyone else _also_ has far fewer features available in their free or lower-priced tiers – we only limit team-oriented features, like advanced permissioning.

* Direct comparisons are tricky because most alternatives [don't publish their full pricing](/blog/transparent-enterprise-pricing), but below you can see how the new pricing options [compare to Mixpanel](/blog/posthog-vs-mixpanel).

<ProductScreenshot
  imageLight={PricingComparison} 
  imageDark={PricingComparisonDark} 
  alt="New PostHog pricing compared to Mixpanel" 
  classes="rounded"
/>

## What's the downside of sending this type of event?

There are some limitations with the new event type. You cannot:

- Filter on persons.
- Create cohorts filtered on person properties.
- Target by person properties for feature flags, A/B tests and surveys.
- Receive initial UTM values for tracking marketing campaign performance (only the most recent).
- View a person’s profile in the app, or query the persons table in our SQL insights.
- Use [groups functionality](/docs/product-analytics/group-analytics) on standard events (without person profiles).

If you need the above functionality, just continue to send person information with your events (no need to change anything), for events where the specific functionality is needed.

## FAQs

### Is this change sustainable?

Yes! Here's why:

  * Out of all the major competitors we have, we believe we are by far the most efficient – we are 100% inbound, so we don't need to pay for an outbound sales team, and grow through word of mouth.

  * This pricing still reflects us making a positive margin on every event sold.

  * We suspect this will increase our word-of-mouth growth and increase our retention, so we are likely to make more revenue with this change, but at a lower margin.

  * The majority of our customers use multiple products that we offer, so we wind up making a little money off a lot of products - our competitors are not as wide, so we believe long term we can undercut.

### Why aren't you making the events with person properties cheaper too?

  * Events with person properties cost a lot more for us to ingest and query. Allowing customers to choose to not send person properties for certain event types means we can cut our own costs of providing our product to our customers. This aligns our interests with our customers, and means we can make a positive margin on all events ingested (beyond our free tier), so it is sustainable but not greedy!