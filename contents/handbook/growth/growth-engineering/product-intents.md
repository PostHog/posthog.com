---
title: Activation & product intents
sidebar: Handbook
showTitle: true
---

Because PostHog offers so many products, and people sign up with all sorts of different needs, we track activation separately for each product. 

> To learn more about what activation is and how we measure it, check out [this blog post](https://posthog.com/product-engineers/activation-metrics).

To make sure we're measuring activation properly, we need to know when someone is interested in using a product. If we put everyone who signs up into the activation funnel for each product - without even knowing if they are actually interested in it - then we'd end up with a super large top of funnel, murky metrics, and a dismal activation rate for all products.

So instead of just putting all people into each activation funnel, we try to identify people who are interested in using a product. In other words, we identify people who show _intent_ to use a product, and we record these people (and the moment the intent happened) as events. These types of events are called _product intents_. The product intents mark the top of the funnel for each product's activation funnel.

Product intents are:
- Flexible, so they can happen anywhere and any time
- Stored in the database, so we can use them in the product if we want
- Convertible, so we know if someone who has shown intent for a product has successfully activated

## When should I start capturing product intents?

As soon as your product is in any sort of public beta you should start tracking product intents. This is _not_ because you should be hyper focusing on your product's activation numbers at this stage - instead it is so that we can start collecting data for later on when we want to determine a good activation metric.

So, collecting product intents should be a precursor to any sort of public release. 

## What makes a good product intent?

People click around in the UI a fair amount, so generally you want to find something sufficiently deep, or something that happens multiple times, before saying someone has shown intent. Here are a few examples:

- In onboarding, we ask people what products they are interested in. This is a very direct way of indicating intent! If your product has an onboarding flow, we automatically collect a product intent for it.
- For data warehouse, when someone actually clicks to set up a source, we consider that an intent. It's a couple pages deep, so people who've gotten there are less likely to just be clicking around.
- If someone views docs for your product multiple times (you could keep a counter in localstorage), that could be sent as a product intent.

## Is the onboarding product intent good enough for my product?

Nope. Lots of people join PostHog with a single product in mind - and then later realize that we offer other products they also want to use. Each product should have product intents being recorded somewhere past onboarding, so they aren't missing out on data about these types of post-signup customers. 

## How do I use these product intent things? 

Generally we've made the plumbing such that recording these product intents is quite easy.

1. Figure out where you think the product intent event should happen.
2. When someone clicks that button / views that page / does that thing, then simply call [`addProductIntent` in the `teamLogic`](https://github.com/PostHog/posthog/blob/master/frontend/src/scenes/teamLogic.tsx#L155). That fires off an API request that records the product intent in the [database](https://github.com/PostHog/posthog/blob/master/posthog/models/product_intent/product_intent.py) and sends the event for you. You don't need to send the event yourself - it's all handled.
    - You must include the _context_ of the intent with this API call, this is so that you can understand what is driving product intent in the analytics. You can store this in the `intent_context` - and you can find existing intent contexts [here](https://github.com/PostHog/posthog/blob/master/frontend/src/lib/utils/product-intents.ts).

## Product Activation

Every product should have activation criteria - these are used to determine if a user has activated for a specific product yet. If they haven't, and they've showed intent for that product, we can nudge them in the right direction. These are also used to understand what retention looks like for the product, and to figure out what PostHog can do to offer a better experience!

To add a new product to this, you can add the activation criteria [here](https://github.com/PostHog/posthog/blob/master/posthog/models/product_intent/product_intent.py#L77-L82).

This code is run every time an intent is updated. For example, if the activation criteria is "save 4 insights", and we send a product intent every time someone clicks "new insight", we'll also check at that time if they have 4 insights saved, and if so mark them as activated.

This part of the product intent plumbing needs some work - we should be able to manually trigger activation checks whenever someone does a certain action (not an Action like a grouping of events but a generic action like something that you just do). If you want to make that change, please do - and update these docs!


## Cross Sells

As well as understanding what actions users take when trying out a product, it's also useful to encourage users to try out other products that would be helpful for them. If you are using product analytics for example, session replay is a really helpful way to understand *why* a metric is what it is. If you are creating an onboarding funnel to understand your conversion, running an experiment to improve that conversion would be helpful.

We track cross-sells within the product using the same product intent framework. There is a helper for this in the `teamsLogic` called [`addProductIntentForCrossSell`](https://github.com/PostHog/posthog/blob/master/frontend/src/scenes/teamLogic.tsx#L158), which you can use to track cross sells. You can find these in analytics using the usual event for product intent (`user showed product intent`) and filtering by `type=cross_sell`.

## Why does this matter?

It's important that we understand if people who are trying to use our product are actually successful in doing so. This is a likely imperfect, but better-than-nothing, way to do that. If people aren't having the success we'd expect for a mature product (ie no large feature gaps with competitors), then we should probably look into why - and this gives us a cohort of people to examine, talk to, and track.
