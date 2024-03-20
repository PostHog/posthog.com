---
title: How to do a canary release with feature flags in PostHog
sidebar: Docs
showTitle: true
author:
  - ian-vanagas
date: 2023-09-12
tags:
  - feature flags
  - persons
---

Few things are worse than shipping a new feature, having it unexpectedly break, and then scrambling to fix it. To mitigate problems like this, teams often roll out changes to a subset of users before releasing them to everyone. This is known as a canary release or deployment.

This tutorial explains what a canary release is, and how to set one up and monitor it in PostHog.

## What is a canary release?

A canary release or canary deployment is the process of rolling out a new feature to a subset of users before releasing it to a larger group. Developers check the new feature is working without issues on the limited group. They watch for issues and analyze usage metrics to confirm. Once satisfied with tests and analysis, the feature rolls out to a larger group (or everyone).

![Canary release](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/canary-release/canary.png)

The name comes from the phrase “canary in a coal mine” which alludes to miners bringing a canary into mines with them. If there were toxic gases, the canary would die and stop chirping, giving an early warning to the miners to get out before they do the same. Testing on a small group of users acts as a canary for issues with the feature, preventing those issues from affecting a larger group.

## Prerequisites for canary releases

To set up a canary release in PostHog, we use feature flags. To get those working, we need to set up user identification.

Feature flags check the distinct ID of the user to decide if they should return `true` or `false`. This means users need a distinct ID unless the feature flag rolls out to everyone. Our snippet and JavaScript Web SDK automatically create anonymous ones, but [identifying users](/docs/integrate/identifying-users) with a value you set (like email) is a better option.

Beyond a distinct ID, users also need properties or groups if you want to use them to target a release. For example, to canary release to a specific organization, you need to call [`group()` or set a group property on an event](/manual/group-analytics).

## Setting up feature flags

Once you set up PostHog and user identification, you can create the feature flags for the canary release. Go to the [feature flags tab](https://app.posthog.com/feature_flags) in your PostHog instance, add a key, a release condition (like only yourself), and any other details you want.

![Feature flags](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/canary-release/feature-flag.mp4)

Add this flag to your code around the feature you want to canary release. Test that it works for you, and that turning it off works as well. Once this goes well, you can expand the release to your users.

## The steps to a canary release

Beyond testing the flag yourself, here is a recommended step-by-step release with conditions for each:

1. **Just yourself:** set email to equal to your own, like `email equals ian@posthog.com`. Test it yourself to make sure the feature flag works and the feature works as expected.

2. **Internal team:** set email to contain your domain, like `email contains posthog.com` or `email equals <insert multiple team member emails>`. This enables [testing in production](/product-engineers/testing-in-production). Make sure to communicate with your team about what is being released so they know to test and look out for issues.

3. **Beta users, organizations:** [use early access management](/docs/feature-flags/early-access-feature-management), set email to contain a company domain, or set the group name to equal theirs, like `email contains twitter.com` or `organization_name equals twitter`. To ensure you are aware of issues, communicate with them and monitor a related usage dashboard.

4. **Expanded beta:** set release to a percentage of users or to match a popular property. Monitor insights and sessions related to the feature compared to those without. The overall metrics are more important here.

5. **Full release:** set release to 100% of users, check metrics again, delete the flag, and announce the feature. 

At PostHog, we do all of these. Our feature flag page contains features at different stages of rollout. For example, when users have specific issues, we might canary release a fix to them before releasing it to others.

![PostHog's feature flags](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/canary-release/posthog-flags.png)

## Monitoring a canary release

The key to a canary release is hearing from the “canary.” Getting feedback and hearing issues is critical to the process whether it is from your team, a limited group of external users, or everyone. Without communication channels, issues go unreported and cause more problems than needed.

> **Tip:** Combine a canary release with an [in-app survey](/docs/surveys) to get qualitative feedback about your change.

On top of hearing about issues from users, you can monitor issues in PostHog. This may look like key metrics or events decreasing, or the number of errors increasing.

You can filter your insights or dashboards by a feature flag to see how the release is progressing. For example, if you are releasing a change to the signup page, it is useful to know if it improves conversion. You can set up a funnel for the conversion, then breakdown by the feature flag name.

![Funnel](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/canary-release/funnel.png)

You can also get session recordings related to feature flags. On the session recording list, filter for sessions including your feature flag. This enables you to get a better idea of the details of how users are interacting with your new feature.

> **Tip:** You can go from funnels to session recordings by clicking the completed or dropped off value in the visualization. This will give you a list of users with session recordings related to that funnel and release.

Canary releases ensure higher quality features get shipped and fewer issues impact users. A release process and monitoring are critical for them to work properly. PostHog’s feature flags, analytics, and session recordings provide all the tools to help this happen.

## Further reading

- [Targeting feature flags on groups, pages, machines, and more](/tutorials/group-page-machine-flags)
- [How to bootstrap feature flags in React and Express](/tutorials/bootstrap-feature-flags-react)
- [How to evaluate and update feature flags with the PostHog API](/tutorials/api-feature-flags)
