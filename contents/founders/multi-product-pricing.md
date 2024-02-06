---
date: 2023-04-17
title: What we've learned about multi-product pricing (so far)
author:
  - james-hawkins
featuredImage: ../images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
tags:
  - Revenue
  - Product
  - Founders
crosspost:
  - Blog  
---

PostHog started as a single product company. We just sold product analytics with a bunch of large extra features thrown in – session replay, feature flagging, experimentation, and even a Customer Data Platform.

We charged by event ingested. Obviously, we wound up with abuse – a handful of high volume users would send zero events, but would use our JavaScript snippet to do just session replay, to store _millions_ of recordings.

We decided a multi-product pricing strategy had long term advantages, and – to be frank – we had to stop people abusing recording, and we didn't want to limit it for users already paying us a healthy amount. This is what we've learned so far. 

## 1. Usage increased when we started charging

The most important thing, but the one we didn't anticipate, was charging for session replay very quickly led to more usage.

Why? Positioning. 

If you see two products listed side-by-side on a website, you know each is being treated as a first-class citizen. Beforehand, we were "product analytics++". That meant no one was taking our session replay feature seriously.

The moment we started charging, awareness increased. Users took the feature more seriously, and they shared more demanding feedback – paying users are less bug tolerant!

We put a small team on it, who quickly iterated with customers and improved the product. Session replay took off as a result – it now has similar daily usage to product analytics.

## 2. Focusing on paying customers improves the free product (and drives growth)

We spent the first year and a half of PostHog prioritizing our open-source project – we wanted to build an inbound sales model, so we could double down on product rather than investing in cold calling. Leverage, baby. This meant we'd need a great free product and a reasonably large community. After 18 months, we were ready to focus on our first paid product – product analytics.

Our only company goal at this point was to get 5 reference, paying customers. By going really deep with this handful, we realized that we needed to improve our funnel experience – a core part of our product. We '[nailed funnels](new-vp-nailing-funnels)', and revenue started climbing as a result. However, delightfully, our _free_ user numbers also started growing much faster.

This journey has repeated itself with session replay. 

Since the free and paid session replay products are largely the same, except for a usage limit with the free product, focusing on more demanding, paid users improved the product for everyone and drove word-of-mouth growth.

And, better yet, it's very easy to justify making improvements for paying customers, since it's long-term sustainable.

## 3. It gives our small teams more autonomy

One of the core learnings we've already had is that a small team structure suits a multi-product approach really well. The concept is a small, multi-disciplinary team should be able to ship into production with as little outside interference as possible. Each team is designed to work like a startup. 

Our reasoning? If we want a wide product, we need to optimize for speed over control... and startups get the most functionality built per person. You won't manage to compete on both _polish_ via controlling a team more tightly _and_ being wider at the same time, which requires autonomy.

Our pricing plans feed into this. In the long run, we want each small team to have control over their pricing – they've got all the user context after all, and they can get some coaching on how to do this from others in the company if needed.

## 4. It allows us to compete on price sustainably

Do you want to buy 5 individual products at $10 each, or all 5 for $20?

Charging by product means you can out compete all of your competitors on price.

To get to this point, we're starting to build data on cross-selling to know that we'd get it right, so we'll figure that out over the next year and hopefully will be able to lower prices as a result.

If you're thinking about applying this concept to your business, success depends on where in the market you focus (you need to be able to sell more to the same users to avoid a complex sales motion) and how price sensitive they are. If people don't care about price in your market, there's no point either.

## 5. It's a clever way to scale exponentially (we think)

We charged for session recording in December. By March, it was 10% of our revenue. Most of the users paying are new.

That sounds good but, in absolute terms, we'd get double the revenue from it with the same engineering input if we were twice the size when we launched it. 

As we get bigger, and we ship more products, each one will get more traction with the same cost to deliver it. And, in fact, each new product brings us more top-of funnel growth – since it means there are more reasons for people to find PostHog in the first place.

## What's the catch?

We have a hideously complex internal billing and reporting system – it needs to be hyper-flexible to cope with a wide range of differently-structured pricing mechanisms, hence the decision to build it. We keep adding more functionality into it. Send help! We'd love any recommendations you may have. We know usage based pricing is becoming much more normal, thankfully.
