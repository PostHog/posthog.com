---
date: 2023-04-27
title: 10 things we've learned about pricing for SaaS startups
author:
  - andy-vandervell
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/equity.png
featuredImageType: full
tags:
  - Founders
  - Revenue
crosspost:
  - Founders
  - Blog
---

We build PostHog for [product engineers](/blog/what-is-a-product-engineer). We define product engineers as full-stack engineers who:

- Write full-stack code with a focus on the front end.
- Enjoy speaking directly with customers and understanding their problems.
- Rapidly iterate solutions that solve their problems.

The TL;DR is product engineers care about customer value.

And, that being the case, good product engineers have to care about pricing because **perceived value** and **what customers pay** are **inextricably linked**.

**This week’s theme is:** Pricing for SaaS products

> This post was first published in our Substack newsletter, [Product for Engineers](https://newsletter.posthog.com/). It's all about helping engineers and founders build better products by learning product skills. We send it (roughly) every two weeks. [Subscribe here](https://newsletter.posthog.com/subscribe).

## 1. Talk to your customers about pricing

In his [2014 article](https://longform.asmartbear.com/pricing-determines-your-business-model?utm_source=posthog-newsletter&utm_medium=email), WP Engine founder Jason Cohen argues “price is as important as any other feature to determine product/market fit”, so it’s vital to talk to customers about it.

Why? He asks, how many times have you…

- “heard someone agree that “it would be great if someone did X,” but when you show them a demo of X, but it costs $700, and they don’t buy?”

- “seen a review of an iPhone app hung up on pricing trivialities?” E.g. “It would be pretty good at $0.99, but it’s not worth $1.99.”

- “seen someone struggle with the freemium version because they refuse to pay anything at all, even though they like and use the product?”

Price “fundamentally determines the nature of the product”. Failing to talk to your customers about it will lead you into these traps.

Read [Pricing determines your business model](https://longform.asmartbear.com/pricing-determines-your-business-model) for more.

## 2. Treat your pricing like a product
Given price “fundamentally determines the nature of the product”, it makes sense to treat pricing like a product, argues PostHog’s Raquel Smith.

Here’s how to do it:

1. Hire or assign an owner: ”A product without an owner is as good as dead”.

2. Figure out who your “customers” are what they value: Customers can be external (customers) or internal (product teams, sales, customer success etc.)

3. Build and maintain your pricing tooling: “Code without testing or maintenance is, well, dead. And products that are dead are not products.”

4. Experiment often: Experiments you can run include how products/features are showcased, free vs paid, how/how much you charge, full product trials, and more.

5. Repeat steps 2-4: Your business is always changing so “rinse & repeat, over and over again.”

Read [How (and why) we treat pricing like a product](https://posthog.com/blog/how-to-treat-your-pricing-like-a-product?utm_source=posthog-newsletter&utm_medium=email) for more.

## 3. Define your pricing principles
Once you’re treating your pricing like a product, it’s important to define some principles to apply as your product and pricing evolves.

What does this look like? Here’s an excerpt from ours:

“We should always ask ourselves how newly released features could be priced, even if it's launching as a free product initially. A default behavior is good, but it shouldn't be used as a replacement for critically thinking about where something fits into our pricing scheme.”

Read [PostHog’s pricing principles](https://posthog.com/handbook/engineering/feature-pricing?utm_source=posthog-newsletter&utm_medium=email) in our public handbook for more.

## 4. Freemium + free trial can work together
Freemium models are better for bottom-up user growth; trials are better for driving revenue... and you can have both.

Airtable ($11bn valuation) combines its freemium model with a 14-day reverse trial, where new users get time-limited access to its “most popular” paid tier, and default to the free product if they don’t convert.

![airtable-pricing](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/saas-pricing-lessons/airtable-pricing-page.png)

Here’s Airtable’s Head of Growth, Lauren Isford, on the benefits of reverse trials:

> “The reverse trial is a great option for fostering that longer-term user relationship. It gives users time to get to know your product, including a short window to explore the most advanced features available to them, but holds space for them to reengage with you about conversion when they’re ready.” – [Source](https://kylepoyar.substack.com/p/your-guide-to-reverse-trials)

Read this [great primer on the different types of free trial](https://elenaverna.substack.com/p/trial-configurations-explained?utm_source=posthog-newsletter&utm_medium=email) for more.

## 5. Price your product for teams, not individuals
Why? As Kyle Poyar explains:

> “Single-user products see poor unit economics (low retention, low LTV:CAC, high support burden). Teams products look more like the B2B SaaS economics we know and love. Team revenue is worth $$$ – it should be valued accordingly.”

PLG companies should:

> “…land with an individual and then create products and pricing to go from individual to team as fast as possible.”

Read [Your guide to PLG pricing 201](https://kylepoyar.substack.com/p/your-guide-to-plg-pricing-201?utm_source=posthog-newsletter&utm_medium=email) from Kyle Poyar’s Growth Unhinged for more.

## 6. Sticky features should be free (with a reasonable limit)
This is one of our pricing principles.

In PostHog, cohorts are free with a limit because porting them to another provider is tedious, making cohorts a sticky feature for us.

Sticky features improve retention, so making them free will make your product stickier and improve retention.

Read [How to discover features that drive user retention](https://posthog.com/tutorials/feature-retention?utm_source=posthog-newsletter&utm_medium=email) using PostHog.

## 7. Pricing changes can be great PR
A pricing change is just as good a marketing/growth opportunity as a flashy new feature.

[Tailscale recently](https://tailscale.com/blog/pricing-v3?utm_source=posthog-newsletter&utm_medium=email) announced an improved free tier and payment plans that “should save money for essentially everyone”. Users [were delighted](https://news.ycombinator.com/item?id=35615848):

![tailscale pricing](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/saas-pricing-lessons/hackernews-quote.png)

Tailscale is also a classic example of how to price for teams, not individuals.

Read [How our free plan stays free](https://tailscale.com/blog/free-plan?utm_source=posthog-newsletter&utm_medium=email) for more on Tailscale’s freemium model.

## 8. Charging as much as you can is short-sighted
Also known as “pricing to value”, here’s why we don’t do it:

> ”[Pricing to value] gives you no room – if the service is at all below initial expectations, the customer may churn. And given you likely don't know the precise dollar value for a given customer, you'll end up losing customers for pricing reasons, or at least being a pain to negotiate with. As a VC-backed company, I'd prefer happy customers, momentum and more growth.

“There are exceptions to this rule – relationship-driven enterprise sales, for example. But, long term, **anyone pricing like this is asking to get disrupted**.”

Read [Counterintuitive lessons about our pricing](https://posthog.com/blog/pricing-lessons?utm_source=posthog-newsletter&utm_medium=email) for more.

## 9. Don’t assume $x.99 pricing is better

Conventional pricing wisdom dictates you should pick a round number price and subtract 1 cent, but don’t assume this is right for you.

As highlighted by Gergely Orosz, Substack recently ran an experiment showing a “significant decrease in the free-to-paid conversion rate” when showing $x.99 prices.

![substack pricing](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/saas-pricing-lessons/substack-experiment.png)

Don’t assume $x.99 is better for your product. Test it.

## 10. Charging for a feature can increase usage

It sounds counterintuitive, but this was our experience when we started charging for session replays – previously a free feature – in PostHog.

Why? Because customers saw it was a first-class citizen, not a bolted on freebie alongside our product analytics suite:

“The moment we started charging, awareness increased. Users took the feature more seriously, and they shared more demanding feedback – paying users are less bug tolerant!

“We put a small team on it, who quickly iterated with customers and improved the product. Session replay took off as a result – it now has similar daily usage to product analytics.” – James Hawkins, PostHog CEO

Read [What we've learned about multi-product pricing (so far)](https://posthog.com/blog/multi-product-pricing?utm_source=posthog-newsletter&utm_medium=email) for more.

*Words by Andy Vandervell, who is enduring a years-long unscheduled disassembly.*

> Originally published in our Substack newsletter, [Product for Engineers](https://newsletter.posthog.com/). It's all about helping engineers and founders build better products, and successful companies. Don't miss out... [subscribe here](https://newsletter.posthog.com/subscribe).
