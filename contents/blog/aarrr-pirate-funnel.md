---
date: 2022-08-03
title: "How to build and use an AARRR pirate funnel (aka pirate metrics)"
description: "The AARRR framework, also known as "pirate metrics" or the AARRR funnel, is a classic framework for understanding customer behavior."
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: [andy-vandervell]
featuredImage: ../images/blog/aarrr-pirate-funnel/pirate-metrics.jpeg
featuredImageType: full
categories: ["Product analytics", "Guides"]
---

The AARRR framework, also known as "pirate metrics" or the AARRR funnel, is a classic framework for understanding customer behavior. It's useful for marketers, product managers and growth hackers at startups.

In this guide, you'll learn:

- [How the AARRR funnel works](#how-does-the-aarrr-funnel-work)
- [Why you should use the AARRR framework](#why-should-you-use-the-aarrr-framework)
- [How to build an AARRR pirate funnel](#how-to-build-an-aarrr-pirate-funnel)
- [How to drive growth using pirate metrics](#how-to-drive-growth-using-pirate-metrics)

## How does the AARRR funnel work?

The five pirate metrics are:

- **Acquisition:** How many users signed up to your product?

- **Activation:** Do those new users actually use the product?

- **Retention:** Do your activated users continue to use the product?

- **Revenue:** How many users go on to pay you and how much?

- **Referral:** Do your users like the product enough to share it?

Some versions add a sixth category, Awareness, but the original framework created by Dave McClure in 2007 holds true.

Tracking the five pirate metrics will give you a complete, end-to-end view of user behavior, and help you understand areas of weakness and opportunity.

McClure visualized the AARRR funnel in a table like the one below. 

This version is what the funnel might look like for our product, PostHog, an all-in-one product platform comprising [product analytics](/product), [session recording](/product/session-recording), [feature flags](/product/feature-flags) and [more](/blog/using-posting) – note, the figures here are purely illustrative.

| **Category** | **User Status**                                      | **Conversion** |
|:------------:|:----------------------------------------------------:|:--------------:|
| Acquisition  | Visits website                                       | 100%           |
| Acquisition  | Enters signup funnel                                 | 30%            |
| Acquisition  | Creates account                                      | 10%            |
| -            | -                                                    | -              |
| Activation   | Deploys product and ingests events                   | 8%             |
| Activation   | Creates an insight, watches recording etc.           | 7%             |
| -            | -                                                    | -              |
| Retention    | Logs in at least once per week                       | 5%             |
| Retention    | Invites a colleague / creates a team                 | 4%             |
| -            | -                                                    | -              |
| Revenue      | User starts paying / enters card details             | 3%             |
| Revenue      | User continues to pay long term                      | 2%             |
| -            | -                                                    | -              |
| Referral     | Recommends to a friend                               | 1%             |
| Referral     | Reviews product or shares on social media            | 1%             |

Applying conversion rates is optional – the real value comes from forming an understanding your potential customer journey, and the metrics you need to track to monitor it effectively. 

## Why should you use the AARRR framework?

So those are the fundamentals of the pirate metrics framework, but why should you use it? There are a few key benefits:

1. **It's about users, not organizations:** B2B products should avoid optimizing for specific companies. Build for a company's end users and its activation, retention and revenue will follow. 

2. **It creates a baseline single source of truth:** It's easy to get lost if you don't know what "normal" looks like. Your pirate metrics give you a baseline.

3. **It acts as an early warning system:** Once you have a clear picture of historical trends, it'll be obvious when something has changed for good or ill.

4. **It helps you identify weaknesses and opportunities:** Are you acquiring, activating and retaining users, but not seeing revenue growth? It's time to focus on monetization. Retaining well, but not seeing growth? You have an acquisition problem.

5. **Pirate metrics are comparative:** A CEO has different needs to a salesperson, so it's sensible to consider activation and retention differently. You can use your pirate metrics to compare different cohorts of users.

> 💡 **PostHog Tip:** You can apply cohorts to any insight in PostHog, but you can also apply them to entire dashboards of insights. Simply create your cohort and then click 'Add filter' on your AARRR dashboard (it's at the top next to the date range), search for your cohort and then apply.

## How to build an AARRR pirate funnel

So you're sold on the AARRR framework, how do you get started?

It all starts with how you track user behavior in your product. While you can use Google Analytics to track some pirate metrics, it's not so good at tracking specific user behavior in products. Enter product analytics.

There's no shortage of choice in the product analytics space. [Amplitude](/blog/posthog-vs-amplitude) and [Mixpanel](/blog/why-i-ditched-google-analytics-for-posthog) are the market leaders, but better value alternatives like [PostHog](https://posthog.com/) and [Matomo](/blog/posthog-vs-matomo) mean you don't have to pay through the nose to get actionable analytics.

If you don't already have product analytics, take a look at [what PostHog offers](https://posthog.com/) or [book a demo](/book-a-demo) to see the product in action. A business intelligence platform might be useful as well – we use Metabase.

Once you've chosen an analytics platform, you're ready to start finding your pirate metrics and building a dashboard to track them.

Let's take a look at some examples, starting at the top.

### 1. Acquisition

- How many users signed up?
- How many people downloaded the app?
- How many users hit the landing page?
- How many people signed up to a newsletter?
- How many unique users visited the website?
- How many users viewed a product listing?
- Signup conversion rate

Acquisition is probably the easiest metric to define, but what you track will depend on what kind of product you're building.

For an e-commerce website, overall unique users is an important metric, but user signups is better for B2B products.

It may also be prudent to add a quality metric here, too. Tracking signups based on an ideal customer profile (ICP) can be important to avoid over optimizing for the wrong kind of new users.

> 💡 **PostHog Tip:** People call it the pirate funnel, but the framework doesn't dictate where you should spend your time. Retention is a great indicator of [product-market fit](/blog/how-to-product-market-fit) and user satisfaction. Don't start with acquisition just because it's at the top.
 
### 2. Activation

- New users who complete a specific action in their first week
- New users who engage with your core feature
- New users who complete the onboarding process
- New users who enable a third-party integration
- New users who who spend x minutes using the product/website

Some users create accounts but never use your product. Tracking activation helps you isolate onboarding issues from long term retention issues.

Don't be afraid to go deep here. Good activation metrics capture the "aha" moment a user have when they get value from your product.

> 💡 **PostHog Tip:** It's a good idea to double check your chosen activation metric leads to increased retention. To do so, [create a cohort of activated users](/docs/user-guides/cohorts) and check you retain them significantly better than non-activated but signed-up users. If your retention doesn't change, you need to rethink your activation metric.

### 3. Retention

- Activated users who came back within n-days/weeks/months
- How often activated users come back and perform an action

Retention is one of the most important metrics in any business. If you nail activation and retention, it's a good sign you have a product people value.

For most products, measuring retention means defining a usage interval – i.e. how often you expect your retention event to occur. Do you expect users to come back every day, week or month.

You can also track unbounded retention, where you track if/how often users return without a specific interval.

> 💡 **PostHog Tip:** There are two ways to track retention in PostHog. Create a [retention insight](/docs/user-guides/retention) for tracking the percentage of users who performed an event within a given time period; use a [stickiness insight](/docs/user-guides/stickiness) to track how many times an activated user returned and performed an action. And, whatever you're measuring, make sure you're tracking activated users and not 'all users'.

### 4. Referral

- Percentage of users who invite their colleagues to use your product
- Percentage of users who invite their friends to download your app
- Percentage of users who submit a review of your product / app

Is there a better validation for your product than someone inviting a colleague, or a friend, to use it?

It's a great sign that people enjoy using what you've built and a powerful driver for word-of-mouth growth – aka, the best kind of growth.

Referral metrics are especially important for products or services that have a growth loop – i.e. when the product experience is improved through multiple users, or when friends are using it together.

Referrals can also be both internal (more users from the same organization) or external.

### 5. Revenue    

- Monthly recurring revenue (MRR)
- Annual recurring revenue (ARR)
- Average basket value (ABV)
- Average revenue per user (ARPU) or per account (ARPA)

What you track here will depend on your business.

Monthly recurring revenue (MRR) is good for a B2B SaaS products. B2C companies businesses may prefer average revenue per user (ARPU), while e-commerce platforms prefer Average Basket Value (ABV). 

If you can imagine three or four random letters, it's probably an acronym for a revenue metric!

> 💡 **PostHog Tip:** You can send revenue data to PostHog by defining a property and setting a numerical value on that property. You can then visualize revenue data in Trends using event property averages, sums, percentiles and formulas. You can even integrate with payment systems via the [PostHog App Store](/apps).

## How to drive growth using pirate metrics 

So, you've started tracking user behavior, chosen your pirate metrics and built your dashboard... what next? We recommend taking the following steps:

### 1. Validate your metrics

As noted earlier, it's a good idea to check your metrics before you start making business critical decisions! Validating your main activation metric leads to better retention is the big one, but review them all periodically. 

### 2. Prioritize your metrics

Don't start with Acquisition because it's at the top. Instead, ask yourself... what's your biggest problem right now? 

Most early-stage startups should focus their efforts on retention and activation. A product with loads of signups and terrible activation and retention isn't a product, it's a churn machine.

Even products that rely on viral growth (e.g. social media apps) need some confidence in their user experience. First impressions last.

### 3. Assign metric owners

AARRR is sometimes considered a "marketing framework". This is nonsense. It spans disciplines, which is why it's a useful framework for product-led growth. And if you want to influence them all, people and teams need to own them.

At PostHog, we're [organized into small teams](/handbook/people/team-structure/why-small-teams).

Here's how our earlier table might look if we assigned different PostHog teams to it:

| **Category** | **User Status**                                      | **Team**                   |
|:------------:|:----------------------------------------------------:|:--------------------------:|
| Acquisition  | Visits website                                       | Marketing                  |
| Acquisition  | Enters signup funnel                                 | Marketing / Website & Docs |
| Acquisition  | Creates account                                      | Website & Docs             |
| -            | -                                                    | -                          |
| Activation   | Deploys product and ingests events                   | Platform                   |
| Activation   | Creates an insight, session recording etc.           | Growth / App Teams         |
|              |                                                      |                            |
| Retention    | Logs in at least once per week                       | Growth / App Teams         |
| Retention    | Invites a colleague / creates a team                 | Growth / App Teams         |
|              |                                                      |                            |
| Revenue      | User starts paying / enters card details             | Growth / Customer Success  |
| Revenue      | User continues to pay long term                 | Growth / Customer Success / Platform  |
|              |                                                      |                            |
| Referral     | Recommends to a friend                               | All                        |
| Referral     | Reviews product or shares on social media            | Marketing                  |

As you can see, there is overlap at all levels of the funnel. "Recommending to a friend" is a quality metric that all teams influence through their work. 

### 4. Research, test and iterate

This is where effective analytics become essential. Your pirate metrics identify problems and opportunities, but you need to drill down deeper to understand the causes. 

Use session recordings to observe real users using your product, develop solutions and A/B test them to test their effectiveness.

Once you've found good solutions, roll them out to your users and measure the results. It's best to roll our your solution to a subset of users first to make sure they have the expected impact – use [feature flags](/product/feature-flags) to do this.

Dave McClure's original framework suggests you spend 80% of your effort on refining and improving existing features, and 20% on new ones. It's a good rule of thumb.

> 💡 **PostHog Tip:** You can use PostHog at every stage of this journey. Use product analytics to track user behavior, session recording to observe and identify real user pain points, experimentation to run A/B tests and multivariate tests, and feature flags to stagger feature releases.
 
## Takeaways and further reading

1. There's a reason pirate metrics is still popular 15 years since its inception.  It's simple on the surface, but unlocks great depths of insight into user behavior, products and their trajectory. It's a not a cure-all for success, but it provides clarity and alignment for all teams in a startup.

2. When implementing it, it's best to focus on one or two metrics to improve at a time. Trying to optimize all of them simultaneously is maddening unless you have enough dedicated resource to deploy. 

3. Less is more when it comes to metrics, too. It might be tempting to have three or four measures for retention, for example, but try to stick to one or two for each category.  

Here's some recommended further reading around product growth and user engagement:

- **[How to achieve B2B product market fit](/blog/how-to-product-market-fit)**: There's no universal standard for achieving market fit, but this guide introduces problem-solving techinques to help you find it for a B2B product.

- **[Dave McClure's original Startup Metrics for Pirates deck](https://www.slideshare.net/dmc500hats/startup-metrics-for-pirates-nov-2010):** McClure refined his original deck from its inception in 2007. This version is from 2010. 

- **[The most useful B2B product metrics for SaaS companies](/blog/b2b-saas-product-metrics):** Need help choosing the right metrics for your product? This guide looks specifically at product metrics and which ones are worth measuring.

- **[Why Focusing Too Much on Acquisition Will Kill Your Mobile Startup](https://phiture.com/mobilegrowthstack/why-focusing-on-acquistion-will-kill-your-mobile-startup-e8b5fbd81724/?utm_source=pocket_mylist):** This 2017 article remixes the AARRR framework, placing a greater emphasis on retention and activation. It's particularly relevant for mobile app startups.

- **[How to work out what your users really need](/blog/how-to-work-out-what-users-need):** How to use 1:1 customer interviews, surveys, metrics and session recordings to work out what your users really need.

<NewsletterForm compact />