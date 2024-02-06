---
title: What you can learn from how GitHub and GitLab use feature flags
date: 2023-08-22
author: ["ian-vanagas"]
featuredImage: ../images/blog/gitlab-github-flags.jpeg
featuredImageType: full
tags:
 - Feature flags
 - Product engineers
 - Feature management
crosspost:
  - Blog 
---

In their simplest form, feature flags enable you to turn on or off features or code paths for certain users. But you can do so much more if you apply some careful planning and implementation.

This guide covers how two huge engineering-led companies, GitHub and GitLab, use feature flags at scale, and the lessons you can apply to your own projects.

## Why do GitHub and GitLab use feature flags?

Both GitHub and GitLab are massive software companies. They are both at the forefront of software development and DevOps, so maintaining [feature flag best practices](/blog/feature-flag-best-practices) is important. Broadly, this means making the deployment of code safer and more consistent.

**GitHub** frames this as "[lowering deployment risk](https://github.blog/2021-04-27-ship-code-faster-safer-feature-flags/#reducing-deployment-risk)." They want deployments to be risk-free. Putting new changes behind a flag lowers the risk of failing deployments. If there is an issue with a feature, you disable the flag rather than needing to roll back the entire deployment.

**GitLab** has a "[progressive delivery mindset](https://about.gitlab.com/blog/2019/08/06/feature-flags-continuous-delivery/)." They find feature flags are a great tool for incremental, continuous delivery, allowing them to separate deployment and rollout. This is especially valuable to them because GitLab is self-hostable, leading to inconsistent deployments. Feature flags increase the speed of shipping changes and provide psychological safety for developers.

## When do they use feature flags?

Because GitHub and GitLab share similar reasons for using feature flags, they also share similar scenarios when they use feature flags.

- **High risk:** High traffic areas or queries and significant UI, database, or storage changes.

- **Restrictions and externalities:** Security, permission restrictions, and third-party dependencies.

- **Working incrementally on new features:** Developers collaborate with flags instead of branches. This keeps changes small, makes reviewers easier, and prevents merge conflicts.

This means areas **that might not use flags** include brand-new features or APIs, low-traffic areas, and non-invasive frontend changes.

## What does their process for implementing feature flags look like?

Both GitHub and GitLab have fairly standard use cases and implementations of the feature flags themselves. They call a service with a feature flag value and an "actor," which then returns a value stating whether the flag is active or not.

> **What is an "actor"?** Both GitLab and GitHub don’t exclusively target users with feature flags. They target "actors." These are users, organizations, teams, enterprises, repositories, projects, or apps. They use actors to create consistent experiences for a related group of users. For example, an organization should have a consistent experience for all its members.

A specific example of how GitHub uses feature flags is in the rollout of their [new GitHub API rate limiter](https://github.blog/2021-04-05-how-we-scaled-github-api-sharded-replicated-rate-limiter-redis/). This involved writing a completely new backend with Redis. They gated their new backend with a feature flag and rolled it out slowly. Once done, they removed the flag and old backend and integrated the new Redis backend further. Ironically, once they removed the flag, bug reports started rolling in causing them to have to rapidly fix a bunch of bugs (which is preventable with a feature flag). 

### GitLab’s feature flag rollout process

Although GitHub only details parts of its feature flag usage, GitLab details its entire process from idea to rollout to removal. 

The process starts before writing any code. An engineer creates a rollout plan for the feature and flag. They [detail this in an issue](https://gitlab.com/gitlab-org/gitlab/-/blob/master/.gitlab/issue_templates/Feature%20Flag%20Roll%20Out.md). This issue contains owners, stakeholders, expectations, rollout steps for different environments (non-production, production, global), and rollback steps. They refine the rollout plan with engineers and product managers.

After the plan is created, developers write code and wrap with GitLab’s [feature flag service](/blog/feature-flags-as-a-service). Once done, it rolls out following the steps detailed in the issue. 

As an example, the first rollout steps ensure the feature deploys to non-production environments and the flag is enabled in those environments. They do this through their Slack-based "chatops" service with the commands below:

```
/chatops run auto_deploy status <merge-commit-of-your-feature>
/chatops run feature set <feature-flag-name> true --dev --staging --staging-ref
```

In the rollout process, GitLab puts a lot of emphasis on documentation. This includes:

- [Documenting features](https://docs.gitlab.com/ee/development/documentation/feature_flags.html) even if disabled.
- Setting milestones for enabling and removing the feature flag.
- Going through a [change management process](https://about.gitlab.com/handbook/engineering/infrastructure/change-management/#feature-flags-and-the-change-management-process) if the flag enables new services, impacts service level availability, or relates to previously rolled-backed changes.
- Detailing availability, as sometimes it is different for their cloud and self-managed instances.

This might seem like a lot, but for a massive, large-enterprise-focused company like GitLab, it is what large organizations must do to ensure the rollout goes smoothly.

> **How often are feature flags used at GitLab?** There are [439 flags available in the GitLab community and enterprise editions](https://docs.gitlab.com/ee/user/feature_flags.html). Version 16.0 added 41 feature flags, 6 enabled and 35 disabled. The most recent version, 16.3, added 20 with only 1 enabled and 19 disabled.

## The costs of feature flags

Because both of these companies are so large, they must take into account the cost of feature flags. Feature flags have two main costs:

1. **Runtime costs**: Apps must load, store, and evaluate flag data. Doing this at GitLab and GitHub’s scale has a legitimate, but manageable impact on performance. Caching is critical.

2. **Technical debt:** Flags can often leave behind dead code they need to remove before it gets forgotten and stale.

Technical debt is the cost both focus the most on, and they built processes for limiting this including:

- Adding tests for the enabled and disabled state of flags. GitHub has two builds in CI one with all flags enabled, and another with all disabled. GitLab writes tests for individual features and the states of each flag.

- Scripts to check for and remove flags. [GitLab](https://docs.gitlab.com/ee/development/feature_flags/controls.html/#cleanup-chatops) has a "chatops" removal command (`/chatops run feature delete some_feature`). [GitHub](https://github.blog/2021-04-27-ship-code-faster-safer-feature-flags/#the-cost-of-a-feature-flag) has a script that uses regular expressions and `git grep` to find flags and modify the code using `rubocop-ast`.

- GitLab scans to find old flags (6 months or older) and initiate processes for making them permanent or removing them.

[GitLab](https://about.gitlab.com/handbook/product-development-flow/feature-flag-lifecycle/#the-cost-of-feature-flags) specifically finds the cost of not having feature flags is higher than having them. When an issue happens with non-feature flagged code, they must revert the release, clean up the related code, and ship a fix to unblock future releases. Feature flags are a larger upfront cost, but are "cheaper" to rollback, saving time and energy. 

## Takeaways from GitHub and GitLab's usage of feature flags

1. Ensuring safe deployment and delivery of code is critical at scale. Feature flags support this by limiting the downside of issues in deployed code. This is done by disconnecting deployment from rollout and enabling simple rollbacks. 

2. Feature flags have costs, but those costs are worth it when changes are high risk, in high traffic areas, introduce external services, or add new usage restrictions.

3. Feature flags work better for collaboration than branches in large organizations. They enable smaller changes which are less likely to break in deployment, have merge conflicts, and are easier to review.

4. Users aren't the only possible "target" for feature flags. Organizations, teams, repositories, projects, and apps can all be targets too. Consider the different ways you could target feature flags for your product.

5. Rolling out a new feature with flags requires coordination and planning. Creating a process to help each stage of rollout lowers the risk of issues. This process might include documentation, change management, and notifying stakeholders.

6. Having commands and scripts for adding, enabling, disabling, and removing feature flags creates consistency and limits technical debt.

## Further reading

- [Why we test in production (and you should to)](/product-engineers/testing-in-production)
- [How we build features users love (really fast)](/blog/measuring-feature-success)
- [How to do a canary release with feature flags in PostHog](/tutorials/canary-release)
