---
title: Pricing principles
sidebar: Handbook
showTitle: true
---

## In an ideal world, Posthog’s pricing enables users and organizations to:

- Use PostHog for free if they are hobbyists or pre-PMF
- Consider PostHog as a candidate amongst the array of alternate options
- Experience the product before paying for it
- Start paying when they are ready, on their own, with few hurdles
- Transparently pay for the value they receive
  - Eg. Usage-based pricing on events, recordings
  - Eg. Paying per product so they only pay for what they use


## Our goals with these principles are to: 

- Keep the engineers at PostHog as close to our customers as possible so that they can build new product or improve existing in ways that are most impactful for them
- Maintain low barriers to entry for our customers so they can see value in PostHog quickly
- Ensure transparency around the value we provide to our customers
- Tightly couple our success with that of our customers’ - the more we can help them succeed, the more we will succeed
  - Eg. with usage-based pricing

It's important that every time we create a new feature or shift our pricing plans we evaluate the changes alongside these principles to make sure we are making changes that align with our pricing values.

## In the real world

Sometimes these principles still leave room for questioning - what, if any, should be available in the free tier? What about enterprise customers? For these types of questions, we've defined a runbook for deciding which plans and at what limits features should generally be assigned to.

- For each feature that is released, we should always ask ourselves how it should be priced. A default behavior is good, but it shouldn't be used as a replacement for critically thinking about where something fits into our pricing scheme,
- Default assumption for new features is that full usage is only available on the paid plans.
- Features that need to be experienced in order to demonstrate value should be available on the free plan but with a reasonable limit
- Features that increase our stickiness should be available on the free plan but with a reasonable limit
  - A good question to ask yourself here is, "If I were to switch away from PostHog, would I feel like I am losing anything by switching?"
  - For example, if someone were to consider moving from PostHog to some other provider, Cohorts would need to be manually recreated in the other provider, which would be tedious. However, something like Web Performance just happens and doesn't require any user involvement, so isn't necessarily a stickyness-generating thing.
- Features that have the potential to vastly grow our word-of-mouth should be free.
  - Eg. we shouldn't (and don't) charge for extra users in an org because the more people we get inside PostHog, the better.
- Features that are focused around extra security, permissioning, compliance, or other enterprise-style upgrades should be reserved for our enterprise pricing tier.
- When possible, we should try to grandfather existing customers' pricing tiers to avoid unexpected pricing changes. However, this does not mean that they should get all new features, only that they get to continue using their existing features at the price they originally agreed to. Upgrading to a "current" plan to get new features should be easy.
