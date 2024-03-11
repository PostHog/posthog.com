---
date: 2022-03-23
title: 'PostHog Launch Week I: A Universe of New Features'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/launch-week-teaser.jpeg
featuredImageType: full
author:
  - andy-vandervell
category: PostHog news
tags:
  - Launch week
  - Product updates
---

PostHog made huge strides in 2021. To name just a few landmarks, we: 

- Raised a [$15 million Series B ahead of schedule](/blog/why-we-raised-a-15m-series-b-ahead-of-schedule)
- Became one of [YC's top-valued companies](/blog/yc-top-companies)
- Rebranded our website [in just four weeks](/blog/postmortem-rebrand)
- Migrated from [postgresql to ClickHouse](/blog/how-we-turned-clickhouse-into-our-eventmansion)
- Achieved product market fit for PostHog Scale

All of this (and more) lead to huge growth. Users grew by 4x, the number of open source contributors doubled and we acquired [numerous reference customers](/customers).

But this is just the beginning. We've also been busy making PostHog a broader and more powerful tool for making great products. 

To celebrate, we're officially launching a new feature or initiative every day this week. Welcome to _PostHog Launch Week I: A Universe of New Features_.

## Chapter I: Data Management

- **Starring:** Alex Kim
- **Introducing:** New Data Management UI, event definitions, definition tagging and many more

As the biggest dogfooder of our own product, we were beginning to see the consequences of the lack of in-house tools to manage our data. All the use cases we saw boiled down to a few common pain points:

1. It is hard to understand events, actions, and properties that you yourself didn't set up.
2. Data decays quickly, and most of the time fails to stay up-to-date with instrumentation.
3. Event-level context in insights and dashboards is difficult to share with external people and new team members.

We set out to solve these pain points and the result is the new Data Management experience we're introducing today on PostHog Cloud and next week for self-hosted.

**Read:** [Introducing Data Management for PostHog](/blog/data-management-feature)

## Chapter II: Project Sparkle

- **Starring:** Karl-Aksel Puulmann, Harry Waye and Guido Iaquinti
- **Introducing:** Sharded ClickHouse and easier self-hosted deployments

We created 'Project Sparkle' to address two challenges: to **make PostHog scalable for anyone** and to **make self-hosting PostHog easier**.

In [The secrets of PostHog query performance](/blog/secrets-of-posthog-query-performance), Karl-Aksel Puulmann details the work we've done to make PostHog faster and more scalable, including (among other things) a massive 55% improvement to query performance on PostHog Cloud.

In [How we’re making PostHog deployments easier](/blog/improving-posthog-deployments), Harry Waye and Guido Iaquinti explain how PostHog's architecture has evolved since its launch in 2020, and the steps we're taking to make self-hosted deployments easier, including multi-layered testing and improved monitoring.

Finally, we're delighted to officially confirm our [partnerhship with Altinity](/blog/posthog-altinity-announce) and the launch of [PostHog Marketplace](/marketplace). You may know [Altinity](https://altinity.com/) as experts in all things ClickHouse and data infrastructure. Altinity will be offering a variety of services to help give large organizations on PostHog an increased level of support for self-hosted deployments.

Going forward, the marketplace is where you’ll be able to find third-party services which layer on top of PostHog, such as companies offering support, integration or development services. Altinity is the first such company, but there are more to come in the future. 

## Chapter III: Experimentation

- **Starring:** Neil Kakkar
- **Introducing:** A/B testing, multivariate tests and statistical significance

Everyone has an opinion about user experience, and that's fine. But it's vital to test those opinions and validate what works, which is why we built our Experimentation suite. 

Experiments allow you to choose a target metric, choose specific people to run this experiment on, and set how long the experiment runs for.

Thanks to Feature Flags, you can then easily validate whether each variant looks good, launch your experiment, and wait for data to come in. We run a Bayesian analysis on the data to give a probability for each variant being the best, show a graph of how things are looking for each variant, and whether the results are statistically significant or not. It's awesome.

Today, Neil Kakkar shares three things we've learned about running effective A/B tests. If you want to build better products, we seriously recommend giving it a read.

**Read: [What launching Experimentation taught us about running effective A/B tests](/blog/experiments)**

## Chapter IV: Collaboration

- **Releasing:** Thursday, March 24
- **Starring:** Rick Marron and Paolo D'Amico
- **Introducing:** Granular dashboard permissions, automatic insight naming and much more  

95% fresh on Tasty Earthworms

## Chapter V: Session Recording

- **Releasing:** Friday, March 25
- **Starring:** Rick Marron
- **Introducing:** The most addictive feature you'll ever know

"So good, I wrote a 1,000 word Twitter thread about it" - A Twitter user, probably

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_


