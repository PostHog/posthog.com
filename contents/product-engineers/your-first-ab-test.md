---
title: How to think about your first A/B test (why, when, and where)
date: 2024-01-11
author: ["ian-vanagas"]
featuredImage: ../images/blog/experiment-hog.jpg
featuredImageType: full
tags: 
  - AB testing
  - Product engineers
---

Most A/B testing products won't tell you this, but everyone doesn't need to be A/B testing all of the time. Because of this, it can be tricky to figure out why, when, and where you should run one, especially if you haven't run one before. To help you make these decisions, we've put together this guide on running your first A/B test.

> Want background about A/B testing and how to run a good one? Check out [our A/B testing guide for engineers](/product-engineers/ab-testing-guide-for-engineers). We skip how A/B tests work and their specific implementation in this guide.

## Why run your first A/B test?

The first question you must answer when thinking about A/B testing is **why?** 

An obvious answer is that you want to improve your product and business, but there are many other ways to do this. 

A/B tests are technically free, but they have hidden costs like:

- The work it takes to get up to speed with A/B testing concepts and systems.
- The time to plan, implement, and coordinate A/B tests.
- The potential distraction A/B tests are on higher impact, strategic work.

If these costs don't scare you away, A/B tests are a great way to measure the impact of non-strategic changes, such as positioning, design, and flows (signup, subscription, onboarding). They aren't going to make or break your product or business, but they make it a lot better if they succeed. 

Specific benefits for these types of changes include:

- **Significant improvements to your most important metrics.** Ideally, A/B tests aim to improve and optimize your metrics like signups, conversion, subscriptions, and revenue. Every successful test directly makes your company more successful.

- **Clarity on the impact of your changes.** A/B tests provide precise stats on a change's impact on your goal metrics. Rather than looking at a range of feedback and metrics to understand the impact of a change, you can look at one test.

- **Protection from the downside.** Changes always come with risks. They can negatively impact all the same metrics you are trying to improve. By tracking a specific change's impact, ****A/B tests help prevent you from shipping changes that make your product worse.

## When to run your first A/B test?

Once you're convinced of the upsides, you need consider **when** to start running A/B tests. 

There are 5 rules of thumb:

1. **You have traction.** You aren't early in [your quest for product-market fit](/founders/product-market-fit-game). You're not figuring out what sticks. You have consistent usage and growth and you're looking to optimize it.

2. **Obvious optimizations lead to significant gains.** You improved the areas you want to A/B test on like the home and signup page. The obvious changes made a major improvement to your goal metrics. Obvious optimizations often don't need testing.

3. **What to build next isn't obvious**. You have multiple options for [what to build next](https://newsletter.posthog.com/p/how-we-decide-what-to-build), but data and feedback aren't pointing in a specific direction. You don't have the data needed to make a good decision, and the wrong decision can have significant negative consequences.

4. **Volume is large enough to make a difference.** You have enough users, pageviews, revenue, or whatever your goal is that a 5%-15% percent increase is a big result. For a site with 100s of visitors, a 5% increase in conversion doesn't help much, a 10x increase in visitors does.

5. **Your unit economics support it.** You make money or have a strong idea of how you are going to make money. Increasing the metrics you care about will actually help the business instead of distract from figuring this out.

Starting to A/B test too early will waste a lot of time and energy, so err on the side of caution.

## What to do before running your first A/B test?


There's some prep work to do once you're confident you want to start testing. 

First, if you don't have it already, you need tracking. An A/B test without tracking is pointless. The whole point is to understand the impact changes have, and without tracking you won't know.

Second, you need a system to manage A/B tests. This system needs to store information related to the test, split users into test and control groups, control what variant each group sees in-app, track related behavior, report metrics, and calculate impact.

There are numerous [A/B testing tools that do both](/blog/best-open-source-ab-testing-tools), but we think [PostHog](https://us.posthog.com/signup) is a great option because it combines tracking and A/B testing in [one snippet or SDK installation](/docs/getting-started/install), automatically captures events like pageviews and button clicks, splits users into test and control groups, calculate statistical significance, and more.

Once tracking and an A/B testing system are in place, you should [run an A/A test](/tutorials/aa-testing) to ensure they are set up properly. An A/A test is the same as an A/B test, but both groups get the same functionality. Your goal is to **not** see a statistically significant difference between the groups. If you do, you know your setup is wrong.

Once you're confident in all this, you can go ahead and develop your goal, hypothesis, and variants, and finally, implement your test. We cover all these points in [our complete guide to A/B testing](/product-engineers/ab-testing-guide-for-engineers). 

## Where to run your first A/B test

You can run an A/B test anywhere, but that doesn't mean you should. Especially for your first A/B test, you want to run it somewhere obvious. This means it should be easy to implement with a large potential impact.

[Monzo](/product-engineers/ab-testing-examples) calls these obvious, easy-to-implement A/B tests "pellets" and prefers them to big, slow "cannonballs." They suggest these are usually found at the top of the funnel. Here are example locations, goals, and changes for your first A/B test:

| Location | Goal | Change |
| --- | --- | --- |
| Homepage | Clickthrough rate, bounce rate | Header copy, buttons, section structure. |
| Signup flow | Signup conversion | Adding OAuth signup (Google, GitHub), testimonials. Removing form options. |
| Subscription flow | Subscription conversion, revenue | Defaults, savings calculator, form structure. |

[Funnels](/docs/product-analytics/funnels) are often a great way to find the first areas for your A/B tests. You can use them to track key flows, figure out which areas have the largest drop off, and then target those areas with A/B tests. 

## How A/B testing compounds

The true power of A/B testing comes from repeated experimentation. Running A/B tests repeatedly provides multiple compounding gains:

- You become familiar with A/B testing systems and processes, making it easier to create, implement, and manage them.

- You create an [experimentation mindset](/product-engineers/how-to-start-a-growth-team) and discover more ideas for experiments. More of your organization becomes familiar with A/B testing and they develop ideas as well.

- Repeatedly improving goal metrics like conversion, signup rate, and revenue has compounding benefits on your product and business and leads to exponential growth.

For any of these to happen, you must get A/B testing right. There are [a lot of mistakes you can make](/product-engineers/ab-testing-mistakes), but hopefully, this guide has provided the information you need to start in a good spot.

Got a question? Leave a comment and we'll do our best to answer.

## Further reading

- [When and how to run group-targeted A/B tests](/product-engineers/running-group-targeted-ab-tests)
- [How to safely test in production (and why you should)](/product-engineers/testing-in-production)
- [Multivariate testing, explained (with examples)](/product-engineers/what-is-multivariate-testing-examples)