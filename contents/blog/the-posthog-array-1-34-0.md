---
date: 2022-03-24
title: Array 1.34.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Release notes", "Product updates"]
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
excerpt: ONE SENTENCE GOES HEREEEEE
---

PostHog 1.34.0 introduces...(Excerpt info here)

<blockquote class='warning-note'>
<b>IMPORTANT!</b> Before upgrading, make sure to run all async migrations on your instance. This version will not run until async migrations are completed. Please check out the <a href="/docs/self-host/configure/async-migrations/overview" target="_blank">async migrations</a> docs for details.
</blockquote>

## PostHog 1.34.0 release notes

> Wondering how to upgrade a self-hosted instance? Check out our [upgrade guide](/docs/self-host/configure/upgrading-posthog).

**Release highlights:**
- [Homepage](#new-homepage)
- [Data Management](#new-data-management)
- [Property Group Filtering](#new-property-group-filtering)
- [Smart Insight Naming](#improvement-smart-insight-naming)
- [Staff Users](#new-staff-users)

### New: Homepage

PostHog now directs you to a default project homepage where you can pin your favorite dashboard to and easily access those insights!

We also use the section below to flag premium features.

> 🎁 This is a premium feature and requires a PostHog Scale or Enterprise license. [Learn more](/pricing).

<br />

### New: Data Management

We also have a new data management system!

PostHog now offers a way to organize all of your PostHog data in-house with event definitions, definition tagging and many more features.

![PostHog - view definition context](../images/blog/data-management-feature/data_management_view.gif)

Check out our blog post [here](https://posthog.com/blog/data-management-feature) or dive into the [docs](https://posthog.com/docs/user-guides/data-management)!

> 🎁 Definition creation, tagging, and volume metrics are premium features that require a PostHog Scale or Enterprise license. [Learn more](/pricing).

<br />

### New: Property Group Filtering (or filters)

A much requested feature is now here with property group filtering. You can mix and match your favorite property filters with ORs and ANDs now. This is currently only available in the global filters for insights.

<br />

### Improvement: Smart Insight Naming

Previously insights had default random animal generated names that weren't very descriptive, we've now added smart insight naming! 


<br />

### New: Staff Users

Self hosted users can now manage staff users on their instance settings!


### Other improvements & fixes
This section needs updating with some one line fixes. 

- **Improved**: Dashboard "add insight" flow
- **Improved**: SSO login redirect
- **New:** Experiments secondary metrics
- **New**: PostHog storybook
- **New**: History logging
- Plus 290+ improvements & fixes!

### Deprecation & removal notices
- Add any deprecations here, if present. Delete if not. 

- Add any deprecations here, if present. 

## Give us your feedback
We’re always working on improving the product experience and would love to talk to you! Please join one of our Product, Engineering, or Marketing team members on a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback). As a thank you for your time, we'll be giving away awesome [PostHog merch](https://merch.posthog.com)!

## Contributions from the community

## Contributions from the community
Want to help improve PostHog? We always welcome contributions from our community! Check out our [contributing resources](/docs/contribute) to get started, or take a look at our Plugin bounties!

### Community shoutouts
This month we also want to say thank you to...Tag them here and link to their GitHub profiles. 

## Open roles at PostHog
Want to join us in helping make more products successful? We're currently hiring for remote candidates in any of the following roles:

- [Community Engineer](https://apply.workable.com/posthog/j/449572FD18/)
- [Site Reliability Engineer - Kubernetes](https://apply.workable.com/posthog/j/7A6F1142D0/)
- [Full Stack Engineer - Growth](https://apply.workable.com/posthog/j/2682B00B76/)
- [Tech Talent Partner](https://apply.workable.com/posthog/j/AB22DA7D5F/)
  
Curious about what it's like to work at PostHog? Check out our [careers page](https://posthog.com/careers) for more info about our all-remote team and transparent culture. We also welcome speculative applications for roles from exceptional candidates.

<hr/>

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog) for more PostHog news!_

<ArrayCTA />
