---
date: 2024-03-21
title: 'PostHog is now up to X cheaper'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - james-hawkins
category: PostHog news
tags:
  - Product updates
---

## tl;dr

* It is now possible to use PostHog for X less
* This change applies to all existing and new customers
* The average customer can save X%
* This cuts pricing for product analytics and web analytics
* We are intending on more price cuts, this is the start!

## Pricing before and after

| Tier (up to) | Personless Price (per event) | Previous pricing / our new pricing for events with person propertie |
| ---- | ----- | ----- | ----- |
| 1M | $0 | $0 | $0 |
| 2M | $0.00002 |  $0.000248 |
| 15M | $0.00002 |  $0.000104 |
| 50M | $0.00002 |  $0.0000655 |
| 100M | $0.00002 |  $0.0000364 |
| 250M | $0.000009 *price changes here | $0.0000187 |
| ∞ | $0.000009 | $0.00001 |

(we can offer further discounts if you are beyond 250M events/month regardless - at that scale, we suggest you talk to us)


<INSERT GRAPH SHOWING OUR PRICING CURVE BEFORE AND AFTER>

## Why we're excited to be the cheapest

* we think this makes us the best value product by a long way
* everyone else severely limits features available in their free or lower priced tiers - we don't
* we have resisted this temptation and think by changing slightly the data we capture, we can pass these savings a
* the markets we're in are commoditized - everyone's products are pretty similar
* we thinking prov

<INSERT GRAPH COMPARING US TO COMPETITORS>

## What's the downside of sending this type of event?

If you are a price sensitive customer, we'd recommend you make this change for anonymous traffic.

The reason we don't recommend this for _all_ anonymous traffic if you are less price sensitive is that if you send persons without properties, there are some downsides of this tradeoff:

* users' profiles won't have any properties set (such as email addresses), so you won't be able to identify specific users
* you can't filter your visualizations based on user properties, or adjust targeting of cohorts based on them
* you won't be able to track users across multiple visits, multiple sites or across different devices - they will show up as separate users
* you won't be able to use our "transformer" plugins - such as geoip

All of our functionality, with the above limitations, will still work even at this dramatically lower price.

## FAQs

* Is this change sustainable?
  * Yes!
    * out of all the major competitors we have, we believe we are by far the most efficient - we are 100% inbound and grow through word of mouth
    * this pricing still reflects us making a positive margin on every event sold
    * we suspect this will increase our word of mouth growth and increase our retention, so we are likely to make more revenue with this change, but at a lower margin
    * the majority of our customers use multiple products that we offer, so we wind up making a little money off a lot of products - our competitors are not as wide, so we believe long term we can undercut.
* Why aren't you making the events with person properties cheaper too?
  * Events with person properties cost a lot more for us to ingest and query. Allowing customers to choose to not send person properties for certain event types means we can cut our own costs of providing our product to our customers. This aligns our interests with our customers, and means we can make a positive margin on all events ingested (beyond our free tier) so it is sustainable but not greedy!