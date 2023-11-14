---
title: "Why we test in production (and you should too)"
date: 2023-07-03
author: ["ian-vanagas"]
featuredImage: ../images/blog/open-source-testing-tools/testinghog.png
featuredImageType: full
tags:
 - Product engineers
 - Engineering
 - Feature management
--- 

At PostHog, we test in production. There are many misconceptions about doing this. It **does not** mean:

- we commit to master every time we make a change.
- we randomly click around once code releases to make sure it works.
- we ship code into production without testing it.

Testing in production *successfully* is a multi-step process, and this post goes over what it is, why we do it, and how to do it well.

## What is testing in production?

Testing in production checks that new code works in the production environment, rather than the development or staging one. It uses real infrastructure and data, rather than local machines or a staging environment filled with synthetic data.

Testing in production brings to light problems with code not surfaced by local testing. This enables us to find issues and "fail small" before problems impact the user experience or become outages.

### Types of production testing

Testing in production includes techniques like:

- **Usage tracking:** Understanding how users are using a product with analytics, session replays, A/B testing.

- **Feedback and [surveys](/docs/surveys/manual):** Understanding how users are experiencing a product through qualitative feedback.

- **[Real user monitoring](/blog/real-user-monitoring):** Tracking app, query and site performance, error rate, and logs.

- **Load, spike, soak testing:** Checking code for issues and performance when under a high volume or stressful load.

- **Shadowing, mirroring, dark launch:** Evaluating new code with mock production data, rather than synthetic data.

- **Integration testing:** Checking services, features, and infrastructure work together.

- **Alerts:** Notifying relevant team members when issues and errors occur.

### When should you _not_ test in production?

Testing in production comes with risks. Tests fail and failures in production can cause issues for real users if you aren’t careful. Because of this, testing in production’s practicality depends on:

- the size of the business.
- the potential negative impact of the change.
- the speed to identify and resolve issues.

For example, testing a UI change to a small web consumer web app with feature flags is likely safe to do in production. The impact is small and any issues get mitigated quickly. Testing an algorithm update on a massive, automated financial trading product with slow deployments is better to do away from production.

## Why do we test in production?

At PostHog, we test in production. Understanding the reasons why provides you more insight into why you might way to test in production as well.

### Production is the real world

The first reason we test in production is that production is reality. Ultimately, we want the code we write and the features we build to work in reality. We try to make the development environment as close to production as possible, but it can never fully match reality.

Some checks aren’t even possible outside of production. For example, we handle massive amounts of data and use big machines to process and query it. Replicating this elsewhere is expensive and unsustainable.

In production, we learn how new code and features interact with production data and infrastructure. There are often bugs or issues missed locally that get solved by doing this. As the code release widens, we also get feedback and real usage data from teammates and [beta users](/tutorials/beta-feedback).

### Dogfooding and collaboration

We are our own best customers at PostHog. Many of the features we develop are the ones most useful to us. Testing in production enables us to use the features we develop before releasing them, also known as dogfooding.

For example, we used the [early access management feature](/docs/feature-flags/early-access-feature-management) to manage the beta of early access management. This enabled us to both test the feature and have the structure in place to roll it out to users. We find many more potential issues by doing this, enabling us to release a more polished feature to users when ready.

This dogfooding also enables our team to collaborate in production. Instead of managing and bouncing between in-progress branches, they ship to production and work off that. When someone wants feedback on a new feature, they simply add them to the feature flag and their production instance updates. The feature flag can also transition to controlling the release when ready.

### No need to maintain a staging environment

A staging environment is a replica of the production environment where code and features get tested before going into production. By testing in production, we skip this and drop its maintenance need.

The maintenance needed for a staging environment is surprisingly high. It requires the creation of synthetic data, smaller but similar infrastructure setups and configurations, and unique tracking. All these cost time and money. 

As an example, we once had a demo environment, but shut it down. Although it was a place where we could test outside of production (like a staging environment), a lot of maintenance went into it. It broke and had bugs that were different from production. Solving them was an effort better used elsewhere. We shifted efforts to improving onboarding, making it faster to get started on a new project.

At best, testing in a staging environment is a bit like confirmation bias. It works and breaks in all the ways you expect it to, but what you care about is actually what’s unexpected. Reality is much different.

## How we test in production

The key to testing in production is doing it safely. Testing in production is detrimental if it leads to more issues than it solves. To test in production safely, you need ways to rollout, monitor, and rollback tests effectively. For us at PostHog, once code is beyond the local environment, this happens largely in two stages: deployment and release.

> **The importance of local tests:** Good local tests makes testing in production much safer. We run frontend unit tests, visual regression tests, backend tests, and end-to-end tests. All of these run locally and on new pull requests. They ensure merged code isn’t breaking in ways we expect it to break. This lowers the risk of testing in production.

### Deployment

Once code is written and passed all our checks, it gets deployed in production. This doesn’t mean all users are using it, we incrementally release.

To do this, we rely heavily on [feature flags](/docs/feature-flags). They enable us to ship features for testing and control their rollout. Often feature flags only roll out to the developer responsible for the change, and expand from there. This enables dogfooding.

For example, our team writes a new improvement to query performance. We can then use our production data and machines to load test it with real queries. We do this in either [our production app or through Grafana](/handbook/engineering/databases/query-performance-optimization). We also keep an eye on error monitoring to ensure the new code hasn’t caused any exceptions.

For others, this is where spike, soak, shadowing, mirroring, and integration testing happens.

### Release

Once the production tests related to deployment pass, we expand the release. This usually means rolling out the feature flag further and getting more users to try it.

This is where you use the rest of the production testing techniques. They include usage analytics, session replays, monitoring, feedback, and surveys. This goes along with error tracking and bug reports. These often uncover unexpected issues that are difficult to find without testing in production.

After solving the issues, we can be confident in further rollout, continue to monitor the feature, and eventually, move on to a new one. This showcases a major benefit of testing in production: it is faster than relying on staging environments or elaborate pre-production testing. For teams wanting to get to the heart of the issue faster and ship more, testing in production might be right for you.

## Further reading

- [What is real user monitoring (and how to set it up)](/blog/real-user-monitoring)
- [How to do a canary release with feature flags in PostHog](/tutorials/canary-release)
- [How we build features users love (really fast)](/blog/measuring-feature-success)
