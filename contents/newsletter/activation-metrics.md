---
title: The first metric product engineers should care about
date: 2025-01-21
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/newsletter/activation-metrics/super-hog.png
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Founders
  - Blog
---

In your journey to become a world-class product engineer, there is one metric that stands out in its early relevance to both product and business decisions: **activation**.

Let me explain why.

## The mysterious definition of activation

Your journey to understand activation starts with a definition, but when you look around you'll find a bunch of different advice. Some say it's your "aha" moment, others, when you show your product's value, and others, when you make your users happy, but none of these are definitive.

So why isn't there a simple, shared definition?

1. **Activation is unique to your product.** There's no standard way to define activation (this is also why benchmarks suck).[^1]

2. **It could be many things.** There are likely many things you want users to do in your product: complete onboarding, upload a file, share a link, watch a video. Activation could mean doing any of these (or a combination of them).

3. **Activating may mean doing something multiple times.** Adding to the complexity is that someone might need to do something multiple times in order to get it. For example, to activate into our session replay product means analyzing not one but five replays. 

![Replay](https://res.cloudinary.com/dmukukwp6/image/upload/replay_bc46055955.png)

## Why you should care about activation metrics

If activation is so hard to define, why should you care about it, especially as a product engineer with many other metrics to care about?

### 1. It's a clear starting point

Once you find your activation metric, it is one of the clearest ways to improve your product. Everyone, from business teams to designers to engineers, can agree that activation is important. It creates alignment between these teams.

There are so many [potential metrics to track](/product-engineers/b2b-saas-product-metrics). Of course, you can start by tracking general usage, but doing this doesn't really tell you anything. Activation is a metric that is relatively easy to figure out (we'll explain in the next section) and provides a clear business use. 

### 2. It's something engineers can actually control

Activation is part of the [AARRR funnel](/product-engineers/aarrr-pirate-funnel). Above it, at the top of the funnel, is acquisition which is mostly a responsibility of marketers. Engineers can't do much to acquire new users.

Below it is retention, revenue, and referral. The last two are mostly platform-level metrics and largely the responsibility of a smaller growth team. 

That leaves activation and retention as the responsibilities of product engineers. Because activation is the start, it has the biggest impact on retention. It is a good first place to optimize. 

![Funnel](https://res.cloudinary.com/dmukukwp6/image/upload/funnel_6ceda3e07e.png)

### 3. It's upstream of other metrics

In a way, activation is the base rate for the rest of your product. All of your metrics are downstream of your activation rate. Only activated users actually use your product. Having as many of them as possible is important.

On top of this, having a clear activation rate makes it easier to have a clear picture of other metrics down the funnel. For example, a poor referral rate could just be a product of not enough users being activated and getting there. A larger sample size (more activated users) lets you do a proper analysis of the down funnel metrics.

## How we find activation metrics at PostHog

At PostHog, we have a lot of experience [finding our activation metric](/product-engineers/activation-metrics). This is because we have 8+ products, each requiring their own activation metric. This metric could be some combination of 10+ events that are all important for the product.

Our process starts by gathering a big list of events we think might "hook" users into our product. We get these by looking at usage of that specific product and by asking customer-facing teams what they think.

![Message](https://res.cloudinary.com/dmukukwp6/image/upload/message_4119900c6c.png)

Next, we create groups of 3-5 events to test together. We aimed for 5-10 different groups, including the number of times the event occurs (e.g. watched 5 replays vs. watched 1 replay).

![Groups](https://res.cloudinary.com/dmukukwp6/image/upload/image_16_bf16064d65.png)

With our potential activation event groups, we write a query to test how they correlate with retention:

1. Get companies that start with our product broken down by month. We use group analytics for this, but you could just do users too.

2. Filter for companies who completed the activation event group in the required time. We require companies to activate within 30 days of signing up. 

3. Calculate retention for successful companies. We check to see how many of them are still using the product 3 months after starting.

![Activation](https://res.cloudinary.com/dmukukwp6/image/upload/image_17_a3f3ac0bfe.png)

We then compare the retention against our product's average retention rate for all companies. We look for a retention percentage that's nominally higher than our average retention rate. 

Because we retained two of the three activated companies in the above example, we have a retention rate of 66% for activated companies. This means:

- If our average retention was 50%, this would be a good activation metric 🥳
- If our average retention was 75%, this would be a bad activation metric 😭

We repeat to ensure there is a large enough sample of activated companies in the retention calculation and that one potential activation event group is dramatically better than the others.

> **Want to see the full real SQL query we used for this?** Check out our post on [How we found our activation metric (and how you can too)](/product-engineers/activation-metrics).

## What to do with activation metric once you have it

![Dog chasing activation metrics](https://res.cloudinary.com/dmukukwp6/image/upload/dog_5bc8932441.png)

### 1. Track it accurately

Because the events for your activation metric now stand out, it's worth investing time to make sure they are tracked accurately. This means:

1. **Refining when it is captured.** For example, is it better to capture an `uploaded file` event when it *starts* or *completes*? Completed is more accurate because it removes errored and retried uploads.

2. **Making sure it is firing properly.** We found that the `recording analyzed` event wasn't when we looked.

3. **Capturing it on the server.** Client-side events can be ad blocked. Capturing your activation events on the server ensures you get them all.

### 2. Review it

Once we have an activation metric, it becomes part of our recurring growth reviews. 

- If it has dramatic changes, figure out the causes of that. Was it a change we made? Generally, we are happy when activation stays stable.

- If we made changes aimed at improving activation, did they work? If not, why? If yes, is there more we can do?

The outcome of our growth reviews is a list of action items to do and then review in the next meeting.

### 3. See how it correlates with other areas

As activation is one part of the funnel, you can use it to evaluate and improve other parts of the funnel. For example, in the up-funnel

1. Find out what marketing activities have an impact on activation. For example, we found that viewing two web pages before signing up leads to a dramatically higher activation rate. 
2. Target marketing and onboarding work to improve activation rates.
3. Improve sales results by using activation as a sales lead health check.

In the down-funnel:

1. Look at activation's impact on retention beyond 3 months.
2. Compare revenue for activated vs non-activated users.
3. Finding ways to convert activated users into referrers.

A special, related one for us (and other multi-product companies) is **cross-sell**. Getting people to activate into multiple products is extremely valuable to us, they are much more likely to pay and pay much more when they do.

Because of the importance of cross-sell, we look at how the activation of one product impacts another, figure out the "right" products for a user's lifecycle, and look for opportunities to promote "cross-activation." This is a big area of focus for our growth team upcoming.

### 4. Just improve it

![Improve](https://res.cloudinary.com/dmukukwp6/image/upload/improve_15c3b39891.png)

Finally, there's only so much analyzing your activation rate you can do. Eventually, you try to improve it by helping users activate faster or providing them more motivation to activate. This is done by:

- Creating email campaigns focused on your activation events
- Tracking signup to activation conversion with [funnels](/docs/product-analytics/funnels)
- Running [experiments](/docs/experiments) with your activation events as a goal metric
- Launching [surveys](/docs/surveys) asking people why they don't activate
- Connecting activation to sales or revenue data with our [data warehouse](/docs/data-warehouse)

When I asked [Paul Copplestone](https://x.com/kiwicopple), CEO of [Supabase](https://supabase.com/), how they tried to improve their activation metric of "weekly active databases," he said:

> Is it ever 1 thing? This metric has many drivers: increase new databases (by increasing new signups or make it compelling for existing signups to spin up many databases), reduce churn by ensuring no scalability issues, increase the growth of the database from "just trying it out" to "using in production" by reducing friction when building, etc.

In our case, because  `replay list filter added` is part of our activation metric, focused on changes that encourage users to use playlists like our "What to watch" tab with playlist templates:

![What to watch](https://res.cloudinary.com/dmukukwp6/image/upload/whatwatch_52436ea8ae.png)

If you're stuck, Lenny's post on activation metrics includes [119 different ways](https://www.lennysnewsletter.com/i/77646597/what-are-the-most-common-ways-to-increase-activation) to try to increase activation.

<NewsletterForm />

[^1]: **What about my benchmarks bro?** Lenny's activation post also has some [nice benchmarks for activation](https://www.lennysnewsletter.com/p/what-is-a-good-activation-rate) but the ranges are extremely wide. Because the definition of "activation" varies between businesses, there's no real way to compare. When you are battling to increase your activation rates by single digit percentage points, having a range of 20%+ between "ok" and "good" isn't helpful.


