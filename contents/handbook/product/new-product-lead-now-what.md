---
title: I'm the lead for a new product. Now what?
sidebar: Handbook
showTitle: true
---

Congrats! You've been nominated as the lead for a new or existing product. We've launched a number of products at PostHog over the years, and this is our mini-handbook for how to do it well.

> If you're a new lead for an existing product, not all of this doc will apply to you. However, it's still worth a read, as it describes the launch process and how we got to where we are fairly well.

## Step 1. Write up a "new product" RFC

Even if you have a general idea of what your product will do, the RFC process will allow you to think through the ins-and-outs of your product, collect feedback from other team members, and start thinking about launch plans.

Use the [New product RFC template](https://github.com/PostHog/product-internal/blob/main/requests-for-comments/templates/request-for-comments-new-product.md) as a guide. You don't have to follow it precisely - feel free to include whatever other sections you think are relevant. 

> Don't be afraid to deviate from your initial RFC as you go. *[Insert quote about plans being useless but planning invaluable...]*

## Step 2. Build it. Fast.

Speed is our differentiator as an engineering org. We grow fast by building fast. Here are some guidelines we've learned about how to build fast.

* **Don’t innovate on the MVP**
  * Give customers something they're already familiar with first. Innovation can happen later
* **Don't overthink the integration**
  * We stressed about how to integrate the data warehouse deeply into the product early on. People are happy to use our products pretty separately in the early days - we don't need to be better than the rest of the market on day 1 of launching.
* **Don’t even think about pricing until you have users. If people are using it, money will come.**
  * Pricing is distracting and complicated and it's not necessary to ship a product and start getting feedback. You should move existing free users onto a paid plan if you create a paid plan later, but give them more usage as a thank you, and be upfront during the free period about this.
* **We need separate teams to build new products. Don't create them within an existing team.**
  * Shipping from within an existing team causes things to take much longer because you'll get pulled onto bugs, merging PRs etc.
* **Don't put new people on new products. Definitely don't have new people _lead_ new products.**
  * Learning how PostHog works isn't going to happen on a fresh product quite so well. Take people from existing teams to run the new product so they can do that having learned the PostHog way.
* **Force usage from internal users as soon as possible**
  * We are a really good user for most of our products, so why wouldn't we. The best way to do this is force usage before we're fully ready, which will really focus the team on building the right things
* **One person teams are fine to get started, but we should add a second person very quickly.**
  * This avoids the need for hiring to block getting started, and longer term prevents loneliness and helps with shipping speed.
* **Build "must have" features ahead of more SDK coverage.**
  * Sometimes we could add more SDKs "to get more growth", but we should start by making sure we can offer the bare minimum within the most popular SDKs we support (posthog-js, python, typescript). Don't default to loads of SDKs if you know you have huge feature gaps as that will disappoint lots of users.
 
### Launching

// JOE TO FILL OUT

You can also read more detail on the process of [launching a feature or product into beta](/handbook/product/releasing-as-beta).

## Step 3. Price it

At some point most of our products should be paid-for products. Start this process with a pricing RFC using the [pricing RFC template](https://github.com/PostHog/product-internal/blob/main/requests-for-comments/templates/request-for-comments-new-pricing.md?plain=1). 
