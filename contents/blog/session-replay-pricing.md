---
date: 2024-07-23
title: "We’ve decided to make less money [Part 1]"
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/take_my_money_11433edb48.png
author:
  - james-hawkins
featuredImageType: full
category: PostHog news
---

## TL;DR
 
- We’ve optimized our session replay pipeline and infrastructure.
- We’re passing the savings onto you by making session replay _drastically cheaper_, especially at lower volumes.
- We’re now the cheapest session replay tool among competitive products.

~~And this is just Part 1...~~ 

[Part 2 is now live](/blog/analytics-pricing).

## How will this impact me?

It depends on your usage, but as an example: if you capture 25k session recordings per month your bill will now be $85 a month, down from $430 a month. That's a huge $4,140 annual saving.

This makes PostHog cheaper than any competing tool with similar features that publishes its pricing.

![new pricing](https://res.cloudinary.com/dmukukwp6/image/upload/25k_replays_9103dd270a.png)

Of course, many tools don’t publish pricing. That’s their choice, but we’re pretty confident it’s not because they’re secretly great value. How else are they going to justify those huge outbound sales teams, eh?

We’re not just cheaper than replay tools designed for developers, either. Anyone using Hotjar for their website or web app can also save by switching to PostHog.

And, unlike Hotjar, we support [session replays on mobile](/docs/session-replay/mobile) with our open beta for [iOS](/docs/libraries/ios) and [Android](/docs/libraries/android) SDKs – yes, [we are working on React Native](https://github.com/PostHog/posthog/issues/13269), folks, but feel free to vote for it on [our public roadmap](/roadmap) anyway.

![posthog-vs-hotjar](https://res.cloudinary.com/dmukukwp6/image/upload/hotjar_vs_posthog_1e7afaea71.png)

You can [calculate your new price](/pricing) on the pricing page, but here’s a breakdown of the changes at different volumes:

| &nbsp;                 | **Old price** | **New price** | **Change**   |
|------------------------|---------------|---------------|--------------|
| **5,000 recordings**   | $0            | $0            | No change    |
| **25,000 recordings**  | $430          | $85           | 5.1x cheaper |
| **50,000 recordings**  | $505          | $173          | 2.1x cheaper |
| **100,000 recordings** | $640          | $273          | 2.3x cheaper |
| **250,000 recordings** | $1,025        | $543          | 1.9x cheaper |

As before, everyone also gets 5,000 free recordings every month, too. Free stuff isn’t limited to the free tier.

## Why are we doing this?

Because our [pricing principles](/handbook/engineering/feature-pricing) dictate:

1. We should charge as little as possible while remaining margin positive. We don’t believe in loss-leaders, or squeezing customers for the maximum they're willing to pay – aka "pricing to value". 

2. The true value of PostHog comes from using all our products together. We make money by onboarding customers onto more of them, not maximizing the profitability of individual tools.

The whole “loss-leader” thing is important, btw. Loss-leaders are bad for customers and companies. No one enjoys surprise price increases when a company decides it wants to make money now, or seeing products sunsetted because they’re not sustainable anymore.

We believe in products that are both cheap and sustainable.

We can do this because we’re efficient. We’re self-serve. We don’t do outbound sales. We don’t waste your time (or our money) on lengthy sales cycles.

## Do I need to do anything to save money?

Nope. Existing customers have been migrated to the new pricing. You should have an email with the details.

Not using PostHog yet? You can [sign up here](/pricing). 

## And this is just Part 1?

Yes.

## What’s coming next?

Part 2.

## When?

Next week.

## What should I do now?
Figure out how to spend the money you’ve saved? Some suggestions:

- Donate to [Herts & Middlesex Wildlife Trust](https://www.hertswildlifetrust.org.uk/) in the UK, where the hedgehog population has sadly fallen by 50% over the last 20 years. Max, our Hedgehog in Residence, would appreciate it. They’re so cute and round, and [lactose intolerant](https://www.wwf.org.uk/learn/fascinating-facts/hedgehogs).
- Buy something from our [merch store](/merch), like this [stylish Carhartt cap](/merch?product=posthog-carhartt-cap), this [awesome data warehouse t-shirt](/merch?product=data-warehouse-t-shirt), or the [world’s most adorable sticker pack](/merch?product=posthog-meme-sticker-pack).
- Buy a billboard on the 101.

Alternatively, if you haven’t already, you can try one of our other products, like product analytics, feature flags, surveys, or our [recently released data warehouse](/blog/data-warehouse-launch). They all have [generous free tiers](/pricing), too.

<NewsletterForm />
