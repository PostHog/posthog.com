---
title: Pricing principles
sidebar: Handbook
showTitle: true
---

## In an ideal world, Posthog’s pricing enables users and organizations to:

1. Use PostHog for free if they are hobbyists or pre-PMF.
2. Experience the product before paying for it.
3. Start paying when they are ready, on their own, with few hurdles.
4. Transparently pay for the value they receive.
  - e.g. Usage-based pricing on events, recordings.
  - e.g. Paying per product, so they only pay for what they use.
5. Make it a no-brainer to pick PostHog over other competitors.


## Our goals with these principles are to: 

- Keep the engineers at PostHog as close to our customers as possible, so they can build new products or improve existing in ways that are most impactful for them.
- Maintain low barriers to entry for our customers, so they can see value in PostHog quickly.
- Ensure transparency around the value we provide to our customers.
- Tightly couple our success with that of our customers’. The more we can help them succeed, the more we will succeed – e.g. with usage-based pricing.

It's important we evaluate all new features, and shifts in our pricing plans, to ensure they align with our pricing values.

## In the real world

Sometimes these principles still leave room for questions – what, if anything, should be available in the free tier? What about enterprise customers? 

For these types of questions, we've defined a runbook for deciding which plans, and at what limits, features should be assigned to.

### We should match the cheapest competitor

In general, we should roughly match the pricing of the cheapest big competitor for that product, so long as the unit economics make sense, to make it a no-brainer to use PostHog.

We can do this because we can upsell customers multiple of our other products. The total ACV is higher even if the per-product ACV is lower. 

It's better for customers because they get all these tools that are well integrated for the cheapest possible price.

### Features that increase our stickiness should be free (with a reasonable limit)

A good question to ask yourself here is, "If I were to switch away from PostHog, would I feel like I am losing anything by switching?"

For example, if someone were to consider moving from PostHog to some other provider, cohorts would need to be manually recreated in the other provider, which would be tedious. However, something like Web Performance just happens and doesn't require any user involvement, so isn't sticky.

### Product pricing should include everything required to use that product

When one of our products has a dependency on another of our products, we should bundle the cost of the dependencies in with the product's pricing so customers only pay once for using a given product.

For example, when someone calls a feature flag, we send a $feature_flag_called event so we can have stats. In this case, we don't charge for those events, as the events are solely related to feature flags.

### Other guidelines

- We should always ask ourselves how newly release features should be priced, even if it's launching as a free product. A default behavior is good, but it shouldn't be used as a replacement for critically thinking about where something fits into our pricing scheme.

- Our default assumption for new features is that full usage is only available on the paid plans.

- Features that need to be experienced in order to demonstrate value should be available on the free plan but with a reasonable limit.

- Features that have the potential to grow our word-of-mouth should be free – e.g. we shouldn't (and don't) charge for extra users in an org. because the more people we get inside PostHog, the better.

- Features that are focused around extra security, permissioning, compliance, or other enterprise-style upgrades should be reserved for our enterprise pricing tier.

- Unless there is a very good reason not to, we should grandfather existing customers' pricing tiers to avoid unexpected pricing changes.


