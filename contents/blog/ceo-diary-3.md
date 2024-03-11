---
date: 2021-11-12
title: Cancer and revenue - the latest board meeting
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - james-hawkins
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
category: CEO diaries
---

It has been a dramatic month.

Four weeks ago, our 16 month old daughter was diagnosed with [retinoblastoma](https://www.nhs.uk/conditions/retinoblastoma/#:~:text=Retinoblastoma%20is%20cancer%20of%20the,form%20a%20cancer%20called%20retinoblastoma.) - a fairly rare form of cancer that affects the eyes.

>Update April 2022: we've finished chemo, she's now done with treatment and we're in regular testing mode. There's a very high chance it comes back, but we'll take this as a win!

## It got bad, fast

The sequence of events:

* Her left iris became darker than her right one over the course of a few days.
* We showed an optician a day or two later at a regular eye appointment we already had scheduled. We were referred to a specialist, but with more than a month of waiting.
* Over the next couple of days her pupil got dilated. We were told to go to A&E immediately. 
* Within two days we had a diagnosis of cancer in both her eyes. Eyes with retinoblastoma are graded from A (least advanced) to E (most advanced) for the disease - one of her eyes was an E (certain removal), the other was a D. She had a range of other symptoms and raised lymph nodes in her head and neck, which caused concern that it had spread. That has only happened once in the last eight years in the UK.
* Within a further two weeks, she'd had five general anaesthetics for a range of tests, including surgery to remove one of eye and fit a [Hickman line](https://en.wikipedia.org/wiki/Hickman_line) for chemotherapy. Each time a toddler has a general anaesthetic, they cannot eat for up to six hours beforehand. The appointments run around two to three hours late on average, and we had a large amount of travel. All of this, combined with uncertainty, was the hardest part. We also moved house, which was a good thing - it was a nice upgrade, and we had lots of help from family.
* A month after the diagnosis, we've had final confirmation that it hasn't spread outside her eyes. Chemo has started to treat her seeing eye and we're coming to the end of the first week of that. Hopefully the tumours will respond to the chemo - there is a 66% chance of saving her seeing eye.

## "You're so brave"

We've heard this a lot, but the reality is that we have no choice.

When you get a diagnosis, there's no debate - you have to get over the next hurdle. It's very clear that we're on a long ride, and we will parent through this.

## 100% remote, 0% regrets

For the first few weeks, it was unclear if it had spread. In the early days, both my wife and I had living nightmares - finding ourselves day dreaming about the worst case scenario. I was grateful that I was lucky enough to work from home and be present during these periods.

I was worried about balance. I decided that if the cancer hadn't spread, we'd end up on a cycle of chemo, largely at home, which I could work around. If it had spread, I'd need to learn more to make a decision. It'd be horrible to be commuting.

## So, the board meeting

Cancer has taken an eye; my way of saying screw you to the disease is that I'm not going to let it take away or reduce the opportunity at PostHog for anyone directly or indirectly (including my family!) involved.

PostHog has made tremendous progress. Our goal for August was to get five reference customers for our paid self-hosted product. We've gone way past that and are at around 10, with around 100 paying customers on PostHog Cloud, and a further 8,000ish companies deployed in total.

There are two modes for [product market fit](https://www.ycombinator.com/library/5z-the-real-product-market-fit):

* 0 to 1
* 1 to many

This means we feel that:

* Open source project = 1 to many mode
* PostHog Cloud = 1 to many mode (although we are focused on self-hosted)
* PostHog Scale = 1 to many mode

## Next up

We now need to:

* More in: Accelerate growth of the open source product and the Scale product.
* More out: Get higher order values. We are working on our Enterprise product. This has a longer cycle since larger organizations are slower moving.

We believe these two activities will compound.

### More in

This is an unknown unknown; the only way to figure it out is to get started making our own luck.

We've been blessed with mainly organic growth to date. The advantage is that this product-led channel is very leveraged - we can double down on our product and we will grow faster (more word-of-mouth growth, and better retention). However, we can't create wild product improvements overnight (mostly) - we need to push on more channels than this to accelerate.

As we created our reference customers, we've realized what the most successful users of PostHog [have in common](/handbook/strategy/overview).

First, we need to create a scorecard. Long term revenue is the _output_ but we want to look upstream for a metric that is more controllable, with a faster feedback loop.

We are creating a simple algorithm that scores each company that deploys (and is opted in). This is based on their usage and company data. We're doing this by sending [PostHog data to Hubspot](https://github.com/PostHog/hubspot-plugin) and using their lead scoring. This lets us figure out if we're getting high quality signups. Once we have this, we can figure out if our work in marketing and developer relations is having an impact.

### More out

We've some huge fans using us in massive enterprises. It stands to reason - they care greatly about data control, and they're able to deploy PostHog the day they find it since all data stays in their infrastructure, and they can start for free.

We are going to put more focus on our pricing and adoption model for enterprises. Should we start on the open source project, grow to PostHog Scale in a few places, then grow to Enterprise? Or should we go from PostHog open source to PostHog Enterprise? We'll find out by experimenting and talking to users.

## Back to business

I'll be taking advantage of our random working hours for sure, but it's great to be back and building.

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_
