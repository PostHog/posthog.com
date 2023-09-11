---
title: Why you should decouple deployment from release (and how) 
date: 2023-09-07
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/green-blog-image.jpg
featuredImageType: full
category: Engineering
tags:
 - Guides
 - Explainers
---

You build software for others to use. This means you need a process for getting that software to those people. This is easier than ever thanks to the internet, hosting services, code management platforms, integration pipelines, and more innovations.

What remains a challenge is delivering code to people **safely**. A best practice for doing this is decoupling deployment and release, but what does this even mean? This post goes over the differences between the two, why you should decouple them, examples, and how to get started.

## What are the differences between deployment and release?

The process of delivering code starts with writing and testing code locally. After completing a piece of code, it often goes through reviews and more tests before integrating with existing code. 

Once integrated, the new code deploys. Deployment means getting code from a local machine or repository into production. Your application or build containing the new code becomes accessible on production infrastructure.

After deploying successfully, the code releases for users to start using it. The application exposes in production and the functionality becomes available. A release comes after a deployment, and by default, couples to it. This means it happens immediately after a deployment succeeds.

![Delivery process](../images/blog/decouple-deployment-from-release/delivery.png)

This whole process is the software delivery process. Deployment and release are two separate, but critical parts of it.

## Why should you decouple deployment and release?

By default, deployed code is released code. This coupling of deployment and release can cause two main issues:

1. Problems isolated to the new code due to deployment. For example, a value saving locally but not in production due to an unexpected interaction with the production database.

2. Problems with the entire release due to new code. This is a broken release. For example, values created by new features corrupt other data unexpectedly in the production database.

Decoupling deployment from release lowers the risk of these issues. This is because it enables testing code in production before releasing it. You can identify issues arising from production infrastructure and integration with the final, real release. 

On top of lowering the risk of issues, decoupling can increase developer productivity and app reliability. The specific benefits include:

- Since developers don’t need to wait for a release to deploy, they can ship, [test in production](/blog/testing-in-production), and get feedback faster.

- By helping developers worry less about breaking the release, decoupling creates psychological safety. It makes developers more productive knowing they can roll back a change easily without impacting users.

- Developers can pass off releases to product managers and marketers once they deploy. They can continue to code instead of needing to coordinate with stakeholders.

- Building the infrastructure for rollbacks (like [feature flags](/feature-flags)) makes rollbacks easier and decreases user impact. Creates less downtime when there is an issue.

- Promote trunk-based development by merging to `main` more often instead of changes waiting on branches. Reduces merge conflicts.


## How we decouple deployment from release at PostHog

As an example of decoupling deployment from release, we can look at what we do at PostHog. We deploy many changes behind feature flags and release them after testing and improving them in production. At any time, there are [30+ flags](https://github.com/PostHog/posthog/blob/03eb1dcaec3cf5064a1ace4433f2f77d6676b634/frontend/src/lib/constants.tsx#L118C1-L118C1) in use in PostHog. They are created and updated daily.

![PostHog's flags](../images/blog/decouple-deployment-from-release/flags.png)

These flags help us test new features in production, roll out changes to specific users, do incremental rollouts, and more. For example, in the flags above, we deployed without releasing:

- Loading person data from ClickHouse to improve performance.
- Product-specific onboarding.
- A frontend for the new batch export system.
- Additional person and group options on dashboards for our customer success team.

We also dark launch features such as our upgraded batch exports system and data warehouse. This might mean they are only accessible through the API, don’t have navigation links, or only have limited options in the released code.

Each of these changes runs through an extensive testing suite locally and on pull requests. This includes unit, integration, end-to-end, and visual tests. This enables us to be confident when deploying in the first place.

Decoupling deployment from release enables us to ship and get features into the hands of users faster at PostHog. 

## How top companies decouple deployment from release

As mentioned, decoupling deployment from release is a best practice. To prove this, here are more examples of how top companies decouple deployment from release and what that specifically looks like:

- [Netflix](https://netflixtechblog.com/automated-canary-analysis-at-netflix-with-kayenta-3260bc7acc69) A/B tests [every change](https://netflixtechblog.com/its-all-a-bout-testing-the-netflix-experimentation-platform-4e1ca458c15) before release, and does [phased rollouts](https://netflixtechblog.com/safe-updates-of-client-applications-at-netflix-1d01c71a930c) for every release. They use a [canary](/tutorials/canary-release), where they direct a small number of users to the new version, while a majority stay on the old one. Netflix then uses automated canary analysis to compare key metrics, score each variant, and report to developers. This system reduces risk while increasing developer productivity.

- [Etsy](https://www.etsy.com/codeascraft/how-does-etsy-manage-development-and-operations/) practices continuous deployment. They rely heavily on feature flags to make small, frequent changes. They often leave features deployed but unreleased for weeks and let product managers do releases.

- [Airbnb](https://medium.com/airbnb-engineering/how-airbnb-safeguards-changes-in-production-9fc9024f3446) developed a system for safeguarding production changes. They do automated canary analysis during deployment to compare versions for performance, error rate, and other key metrics. They also do experiments across many platforms to test channels and end-to-end business metrics. The combination of these enabled them to be more confident in the released code.

- [Lyft](https://eng.lyft.com/continuous-deployment-at-lyft-9b457314771a) follows continuous deployment for its microservices architecture. Each deployment goes through a pipeline of staging, canary, and single zone before production. They automate jobs, monitoring, and testing for this pipeline, and they use "gates" at each step to block deployments if broken. They also wait for deploys to "bake" in production environments to check for issues before releasing.

- [Grab](https://engineering.grab.com/our-journey-to-continuous-delivery-at-grab) deploys to a staging environment then schedules deployments to a canary environment then production. They make deployment and monitoring as easy as possible and only notify developers about issues when they must make a decision.

## How you can decouple deployment from release

Now that you understand the merits of decoupling deployments from release, but how do you make this happen? Two of the easiest ways to get started are:

1. **Feature flags.** Deploy features behind [feature flags](/docs/feature-flags). Use conditional and percentage rollouts to roll out features to the internal team, beta users, and canary release.
2. **Dark launch.** Launch new routes and features, but hide them from users (don’t link or notify them). For example, create a new feature page, don’t link to it anywhere, and access it directly with a link.

Both of these are great ways to start because they are simple. You can apply them to non-breaking changes, get comfortable with the process, and then decouple breaking changes with bigger impacts. Doing this provides an understanding of what code you should test in production and what is good to ship after testing locally.

As you scale further, you can take inspiration from the examples we provided and try:

- **Staging environment.** Create an environment mimicking production and test changes in it before releasing them to users. Run smoke tests in staging.

- **Canary release.** Before doing a full release, release changes to a small percentage of users. Monitor or A/B test key metrics to ensure the changes don’t have negative effects before rolling out further.

- **Automate testing, monitoring, and alerts.** Track performance, error rate, and other key metrics for newly deployed code. Roll back or alert developers automatically when there is a problem, instead of having them monitor themselves.

Decoupling deployment from release is not static. The requirements change as your team and application change. Aspiring to decouple lowers the risk of released issues, improves developer productivity, and creates a more reliable app. 

## Further reading

- [Feature flag best practices and tips (with examples)](/blog/feature-flag-best-practices)
- [What you can learn from how GitHub and GitLab use feature flags](/blog/github-gitlab-feature-flags)
- [Why use feature flags? Benefits, types and use cases, explained](/blog/feature-flag-benefits-use-cases)