---
title: How we measure feature success at PostHog
date: 2023-04-24
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/open-source-testing-tools/testinghog.png
featuredImageType: full
category: Inside PostHog
tags:
 - Guides
 - Feature flags
---

When it comes to new features, success can be tough to define. Although a business can succeed as a whole, what it means for a feature to succeed is less clear.

At PostHog, we care about enabling teams to understand and measure feature success (we have [an entire team dedicated to it](/handbook/small-teams/feature-success)). As part of helping you do this, this post details what feature success is, and how we measure it at PostHog. We go through the real launch of a new feature (sampling) and explain how we measured success along the way.

## Defining feature success

We decide to build a feature based on quantitative and qualitative feedback combined with our thoughts on what’s best. Once we decide to build a feature, we start to judge its success based on if it:

1. Solves a user problem. Key to this is understanding and defining users’ problems, then figuring out ways to solve them that fit with the product and business. 
2. Is actually used. No matter how good you think your feature is, if it doesn’t get used, it isn’t benefitting users.

Feature success is the process of enabling, measuring, and evaluating the combination of the above points. It is planning for how to develop a successful feature, a system for measuring its ongoing usage, and a process for evaluating its success.

## How we measure feature success at PostHog

Measuring feature success at PostHog is a multi-step process that goes hand-in-hand with our release process. The multi-step approach to feature success ensures we are building the right solution and that users actually care and use the solution we are building.

To help you connect this to reality, we will follow along with how one of our engineers, [Yakko](/handbook/company/team), recently built, measured, and evaluated one of our new features: [sampling](/docs/product-analytics/sampling).

> **What is sampling?** The sampling feature speeds up queries by analyzing a portion of the data and extrapolating the results.

![Sampling in action](../images/blog/measuring-feature-success/sampling.gif)

### 0. Deciding to build a feature

From the thinking and decision about building a feature comes the criteria for evaluating its success. 

Yakko decided to work on sampling because:
1. Slow results on complex queries were causing frustrations for large customers. This ties to the product analytics team objective of "[make PostHog performance frustration free for our 10 largest customers](/handbook/small-teams/product-analytics#objective-2-make-posthog-performance-frustration-free-for-our-10-largest-customers)."
2. Sampling felt like a simple solution that could be implemented quickly.
3. Manually benchmarking the impact of 10% sampling on large customers' queries confirmed 3-10x improvements in speeds with only a 1-2% loss in accuracy.

This showed that sampling was technically feasible and it was worth doing now.

### 1. Build an MVP and test it's working as intended

Once we decide to build a feature, the success evaluation can begin. We move fast and build the feature, review that it matches what we envisioned, and ship it behind a feature flag. The flag rolls out to a single developer to start. This helps them to check if it has the smallest bit of success in solving the problem in production.

This is exactly what Yakko did with sampling. He picked one insight (lifecycle was easiest), updated the API, built a quick UI, and [shipped it](https://github.com/PostHog/posthog/pull/14283) behind a feature flag. Within hours, the feature was working in production with production data. 

![Lifecycle](../images/blog/measuring-feature-success/lifecycle.png)

A feature is successful at this stage if it solves the issue, isn’t broken, and can scale to millions of events and users. Since we use PostHog at PostHog, this often means using it ourselves (aka dogfooding). Feature flags let us roll out or roll back quickly if needed.

### 2. Beta test and get feedback

Once an MVP of a feature ships, it continues the process of evaluation by rolling out further. More members of our team try out the feature and provide feedback.

For sampling, Yakko added more insights that supported sampling and then started polishing. He asked the team to try out the feature, wrote [docs](/docs/product-analytics/sampling), and had a chat with our Head of Product Luke about what sampling should look and feel like. He also started to take Michael's UI feedback more seriously.

If a specific user requested the feature or has a problem potentially solved by it, we might roll it out to them with the expectation that it is recently built. Feature flags enable us to adjust the rollout and do this fast. We communicate with the user through this process and ideally receive feedback that helps us improve it.

Sampling got its first real users through the support hero tagging Yakko in places they felt sampling might help out. This helped improve the experience for customers without completing the feature. When these users were positive about their experience, he knew the feature was successful so far and continued the rollout. 

![Message](../images/blog/measuring-feature-success/message.png)

A feature is successful at this stage if users use it and the qualitative feedback we receive from them is positive. A common goal at this stage is "5 happy teams using it."

### 3. Launch and monitor usage

When we have positive feedback and usage in beta, and the feature reaches the point we are ready to release. The flag rolls out further, eventually to 100% of users.

Yakko continued to update the simple UI for sampling (it changed four times) to ultimately land on something he was happy with. He instrumented tracking for the feature’s usage and rolled it out to 25% of all organizations in PostHog.

![Sampling UI](../images/blog/measuring-feature-success/sampling.png)

At this stage, success is significant usage by the target user. What this portion is depends on the usage of similar features. At PostHog, this looks like:

- 10-12% of our daily active users use individual products (like product analytics or session recordings)
- 15-40% of daily active product users use a large features (like flag payloads or funnels) within those products.
- 4-12% of daily active product users use a small features (like sampling, replay network tab, or dashboard templates) within those products.

The feature should also be issue free and work as intended. Bug reports or confusion on how to use the feature are bad signs.

To evaluate success after launch, we watch session replays and track metrics that match specific criteria we care about. For example, we might look at the session recordings for high ICP, paid users in the 99th percentile of feature usage to see how power users are utilizing the product. We also might create a dashboard to show usage and the feature’s impact (such as average insight load time).

In Yakko’s case, he: 

- created a key metrics dashboard that he would dig into a few times a day.
- watched [session replays](/tutorials/explore-insights-session-recordings) of the feature to see if it was having the intended impact or causing any confusion (he fixed a few visual regressions as a result of this).
- used the [user interview app](/docs/apps/user-interview) to prompt users who tried sampling for a user interview.

![Dashboard](../images/blog/measuring-feature-success/dashboard.png)

After doing all these, he was confident the feature was trending towards success and continued the rolling out until he hit 100% of users.

### 4. Continued development post-launch

Success after launch looks like continued growth in usage metrics. It also looks like recommendations or public praise for that feature. If the feature has a large enough impact, it may even inspire a marketing push or case study. 

If a large feature is successful to warrant dedicated, sustained work, such as session recordings or group analytics, we might plan to [charge for it](/handbook/engineering/feature-pricing). If this is the case, then success becomes users paying for it. As an example, charging for our feature flags product is a goal for Q2 2023. Follow-on goals are likely growing the revenue of the product. 

The success of the feature post-launch determines future effort and investment in that feature or related features. If a feature gets a lot of usage and feedback, then we often develop plans to continue working on ideas related to it.

Sampling is a relatively self-contained feature. It likely won’t get charged for. Yakko continues to ask for feedback about sampling, but more work will go into improving query performance generally as it continues to be a challenge for some. The success of sampling led to more investment in improving query performance.

## Why we measure feature success like this

As a TL;DR of the above, we measure feature success by:

1. Making sure our MVP works in production
2. Getting positive qualitative feedback from team members and then beta users
3. Launching, seeing significant usage by our target user, and the feature working as intended
4. Continuing growth in usage metrics, recommendations, public praise, and potentially revenue

You may have noticed that this process was relatively fluid. We don’t enforce mandatory reports, guidelines, metrics, or processes. We let small teams, and the individuals in those teams, decide what feature success means to them.

This is because we bias for impact and believe that ownership is key to building successful features. Without people or teams owning features, there is little incentive to make them successful. No feature success process can make ownerless features successful.

We know that every team, inside and outside of PostHog, has different ways of evaluating success, it is a [key focus of ours](/handbook/strategy/overview#strategy) to build tools to help them do this. If you're curious exactly what that looks like, you can check out what the feature success team is up to on [their small team page](/handbook/small-teams/feature-success).

## Further reading

- [The 80/20 of early-stage startup analytics](/blog/early-stage-analytics)
- [Feature flag benefits, types and use cases, explained](/blog/feature-flag-benefits-use-cases)
- [Master Feature Flags: Best practice, tips and examples](/blog/feature-flag-best-practices)