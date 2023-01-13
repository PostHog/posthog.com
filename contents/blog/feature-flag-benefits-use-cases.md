---
date: 2023-01-12
title: Feature flag benefits, types and use cases, explained
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["ian-vanagas"]
featuredImage: ../images/blog/posthog-marketing/marketing-hog.jpg
featuredImageType: full
categories: Using PostHog
tags:
  - Feature flags
---

## What is a feature flag?

Feature flags (aka feature toggles) are a powerful tool to help improve your product. They enable engineering teams to conditionally run code, display components, and control access based on release conditions. These conditions check user data, group data, and percentages to decide whether to activate or not.

In this post, we explore four benefits of feature flags along with use cases and types for each. The four biggest benefits and uses of feature flags are:
1. [shipping faster](#1-ship-faster-and-maintain-momentum)
2. [mitigating risk](#2-mitigate-risk)
3. [testing changes](#3-test-changes-in-production)
4. [managing access](#4-manage-access)

## Feature flag benefits and use cases

### 1. Ship faster and maintain momentum

Feature flags disconnect deployment from release, enabling developers to ship code faster. Instead of releasing code for use by everyone once deployed, it lives behind a feature flag and releases separately. This frees developers from worrying as much about releases.

Using feature flags improves the deployment and integration process. Feature flags help developers merge and integrate their changes more often. Because developers aren’t waiting to deploy, metrics like deployment frequency and time improve. You avoid stale branches and code because it isn’t sitting dormant. All of these benefit DevOps teams especially. 

Engineers can also use feature flags to hand off the release to other members of their team, such as product managers and marketers. This can be especially useful for features requiring slow rollouts, communication, and usage analysis. Instead of a developer babysitting the release, a non-technical team member can do the release, and any related work, themselves.

Feature flags also prevent the loss of momentum from issues with new features. If a rollback needs to happen, it can happen quickly and the team can maintain its momentum. Multiple team members aren’t needed to roll back a feature, it just requires turning off the flag.

#### Use cases

- You identify a major bug with a new feature. The developer who shipped the feature turns off the feature flag. They then complete a quick fix and ship it behind a bug-fix-type feature flag. They then continue to improve and clean up the bug fix and roll it out further once ready.

- The team is planning the release of a big feature. It requires testing, a tiered rollout, customer communication, and marketing. The developer completes the feature, and puts it behind a release-type feature flag. They hand off the release to the product manager who owns the feature. The developer can get back to work while the PM coordinates with QA, customer success, and marketing on a rollout.

### 2. Mitigate risk

All changes and new releases have risks, and feature flags help mitigate those risks. Just because a team is shipping fast doesn’t mean they release recklessly. Feature flags are critical for ensuring releases go smoothly, and that they can roll back quickly if not. They enable slower rollouts and faster rollbacks, both of which help mitigate risk. To borrow a phrase from the U.S. Navy Seals, “slow is smooth, smooth is fast.”

By doing percentage, conditional, or tiered deployments, the rollout slows down. Feature flags can limit a rollout to specific infrastructure, regions, users, or groups instead of everyone, everywhere, all at once. Teams can focus on monitoring the rollout and its impact on specific areas and analytics. As a rollout progresses, risk decreases and the team can be more confident the feature won’t cause issues for users. 

Slower rollouts provide time for problems to arise before everyone accesses a feature. Using conditions (like specific users or groups) allows for discussion about changes and any issues they are seeing. This is also a way to get feedback about the feature (which can limit 
”business risk”). This ensures confidence in a feature by the time it rolls out to everyone.

If there are problems with a feature, feature flags can act as kill switches. There is no need to frantically make changes to remove the feature and then deploy those changes (which can lead to more problems). Just turn the feature flag off, preventing further issues, and you get time to analyze what went wrong.

#### Use cases

- Reports come in about a problem with a feature. Luckily, it is behind a release-type feature flag. This enables you to quickly roll back the feature, identify the issue, make a fix, and ship it. This is much faster than reverting the change and deploying an update.

- You’re in a situation where every change to your app needs a review to release (such as iOS App Store or Chrome Web Store). Instead of having to wait for a review to make a change, using a feature flag enables faster rollbacks. Fixes to issues aren’t delayed by review, mitigating their impact when they arise.

### 3. Test changes (in production)

Feature flags enable better testing of changes by testing them closer to reality. When a change ships into production behind a feature flag and people who need access can get access. Instead of needing specific testing environments, you can test in production.

Testing in production means the usage, data, infrastructure, integration, and environment are closer to what users actually use. The gap between development and production closes. Other team members can test your code and features in production as well. All of this provides validation to engineers that their code works.

Testing changes in production also means you can run experiments. You can test variations against each other to see which provides better results. Product and marketing teams can be involved in the experimentation process. They can design experiments and analyze real results, rather than guessing what the outcomes are.

> PostHog has a built-in [experimentation suite](/product/experimentation-suite) that connects to all your product data and feature flags.

#### Use cases

- To test multiple variations of a pricing table with different information, you set up an experiment with multiple flag variants and track conversion on that page. At the end of the experiment, roll out the winning variant and roll back the losing ones.

- Have a feature but you aren’t sure how it integrates in production. Ship it behind a test-type feature flag, and set distribution to yourself. If a teammate wants to test it too, you can add them to the release conditions as well.

### 4. Manage access

Feature flags can act as permissions, granting or denying certain users access to features. They act as a gate anywhere in the code, that you can turn on or off quickly, without changes to the code.

Replacing in-app toggles with feature flags eliminates the need for custom user fields, admin panel modifications, and additional checks, granting teams quick, easy and flexible permissions.

Complex permission logic isn’t needed, engineering teams can just use a feature flag. This simplifies and distributes permission and access management. This means that a sales, support, or customer success team can then add permissions to their workflows and responsibilities. This takes work off the plate of developers. 

Feature flags also enable you to run alphas and betas of new features easily. Each feature doesn’t need a bespoke change to the code, other than the feature itself. The type of release or access pattern can change easily. For example, it can go from an alpha to a specific group release to a percentage rollout without needing to change any code.

#### Use cases

- Put premium features behind a permission-type feature flag. Once users sign up, get the sales or customer success team to add them to the feature flag distribution. If they churn, remove them from the feature flag release conditions.

- A user has been abusing your app. They have been sending too many requests or using the feature inappropriately. You can use a permission-type feature flag to prevent or throttle access to key parts of your app from them.

## Further reading

- [Master Feature Flags: Best practice, tips and examples](/blog/feature-flag-best-practices)
- [How to do a canary release with feature flags](/tutorials/canary-release)
- [Running experiments on new users](/tutorials/new-user-experiments)