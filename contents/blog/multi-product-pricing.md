---
date: 2023-03-25
title: Our journey with multi product pricing 
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - james-hawkins
featuredImage: ../images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
category: CEO diaries
---

PostHog started as a single product company. We just sold product analytics with a bunch of large extra features thrown in - session replay, feature flagging, experimentation, and a Customer Data Platform thrown in.

We charged by event ingested. Obviously, we wound up with abuse - a handful of high volume users would send zero events, but would use our Javascript snippet to do just session replay, to store _millions_ of recordings.

We decided a multi product pricing strategy had long term advantages  , and - to be frank - we had to stop people abusing recording, and we didn't want to limit it for users already paying us a healthy amount.

## It's a way to take extra products seriously

The most important thing, but the one we didn't anticipate, was charging for session recording very quickly led to more usage.

Eh? 

Positioning. If you see two products listed side-by-side on a website, you know each is being treated as a first class citizen. Beforehand, we were "product analytics++". That meant no one was taking our session replay feature seriously.

The moment we started charging, more users realized the feature existed, the more seriously they took it, and the more demanding their feedback. Paying users are less bug tolerant!

We put a small team on it, who quickly iterated with customers and improved the quality.

Growth of session replay took off - it now has similar daily usage to product analytics.

## Outcompete on price, sustainably

Do you want to buy 5 individual products at $10 each, or all 5 for $20?

Charging by product means you can outcompete all of your competitors on price.

We don't actually do this yet - we don't think we've enough data on cross-selling to know that we'd get it right, so we'll figure that out over the next year and hopefully will be able to lower prices as a result.

Disclaimer: this also depends where in the market you focus and how price sensitive it is.

## More autonomy for small teams

We have a small team for each of our products - from 2 to 6 people. The concept is a small team should be able to ship into production with as little outside interference as possible. Each team is designed to work like a startup. Our reasoning? If we want a wide product, we need to optimize for speed over control... and startups get the most functionality built per person.

In the long run, we want each small team to have control over their pricing - they've got all the user context after all, and they can get some coaching on how to do this from others in the company if needed.

## Long term it's a clever way to scale exponentially, we think

We charged for session recording in December. By March, it's 10% of our revenue. Most of the users paying are new.

That sounds good, but in absolute terms - we'd get double the revenue from it with the same engineering input if we were twice the size when we launched it. As we get bigger and we ship more products, each one will get more traction with the same cost to deliver it. And, in fact, each new product brings us more top-of funnel growth - since it means there are more reasons for people to find PostHog in the first place.

## What's the catch

We have the world's most complex internal billing and reporting system. We knew it'd need to be hyperflexible to cope with a wide range of differently-structured pricing mechanisms. We keep adding more functionality into it. Send help! We'd love any recommendations you may have.