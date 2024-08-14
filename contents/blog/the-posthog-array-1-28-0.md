---
date: 2021-09-15
title: Array 1.28.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/array/1-28-0.png
featuredImageType: full
excerpt: >-
  Understand your conversion rates better, PostHog 1.28.0 has launched!
  Significantly revamped performance for slower queries, advanced engagement
  cohorts, SAML support, and many more improvements and fixes.
category: PostHog news
tags:
  - Product updates
  - Release notes
---

> 💡 This version contains a patch release (1.28.1), [read about it](#posthog-1281-patch) below.


PostHog 1.28.0 has launched to help you understand your conversion rates better! Enjoy significantly revamped performance for slower queries, advanced engagement cohorts, SAML support, and many more improvements and fixes.

## PostHog 1.28.1 patch

This version includes a subsequent patch release (1.28.1) launched on **September 22, 2021**. This patch addresses the following fixes and improvements:

-   Bug fix. Fixes a bug where refreshing dashboards could cause a server overload (#5865).
-   Bug fix. Fixes a bug where SAML wouldn't work correctly on Dockerized installations (#5965).
-   Bug fix. Adds more safeguards to prevent incorrect person merges, leading to incorrect user counts (#6023). In addition, we now report an aggregate number to signal if any incorrect data is detected (#6024).
-   Improvement. Updates event reporting to enable usaged-based billing for Scale customers.


## PostHog 1.28.0 release notes

> If you're self-hosting and want to upgrade for a better experience and new features, remember to [update your PostHog instance](/docs/runbook/upgrading-posthog).

**Release highlights:**

- [Significantly revamped performance](#significantly-revamped-performance).
- [Advanced engagement cohorts](#advanced-engagement-cohorts).
- [SAML support](#saml-support).
- [Advanced funnel building](#advanced-funnel-building).

### Significantly revamped performance

When running on OSS ClickHouse, we now automatically create (during the weekends) columns for event and person properties which pre-process some of the heaviest operations when running queries. This can speed up your slower queries 2-25x.

### Advanced engagement cohorts

You can now better analyze engagement among your users by understanding casual and power users in more detail. Create automatic user cohorts based on actions performed by users in the last N days. You can select users who have performed more than, exactly, or less than any given number of actions/events, and customize the time range you care about.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_28_0-engagement-chorts.png" alt="" />

### SAML support

Users with a PostHog Scale license can now enable SAML authentication and automatic user provisioning in their instance. If your company uses a centralized identity provider (IdP), this is a great way to reduce IT overhead and improve compliance. Head over to our [SAML docs](/docs/user-guides/sso#saml) for details on how to enable this.

### Advanced funnel building

In our [last release](https://posthog.com/blog/the-posthog-array-1-27-0) we shipped significant improvements to our funnels experience. We are still on a mission to enable anyone to get a deep understanding of their user conversion rates. In this release, we're including even more features to build advanced funnel visualizations to enable deeper diving. Such features include custom step ordering, event exclusions, conversion time range window, and more.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_28_0-advanced-funnels.png" alt="" />

### Other improvements & fixes
- Significant improvements to apps development experience
- Improved session recording list, particularly when there's multiple recordings for a session
- Fixed broken links when sharing dashboards publicly
- Multiple fixes on tooltips
- Fixed bugs around cohort calculation
- Fixed issues around loading and refreshing dashboards
- Multiple UI improvements following our new website brand launch
- Improvements to apps UI
- Preference to disable automatic emails when a new member joins
- Fixes to pie chart that caused some numbers to display confusingly
- 300+ other improvements/fixes

### Breaking changes

⚠️ The previously deprecated `/api/user` endpoint has been removed since this version (1.28.0). Head over to the [User API](https://posthog.com/docs/api/user) docs if you still need to update this endpoint.

⚠️ We've dropped support for Python 3.7. You'll now need to use Python 3.8 or 3.9. **We recommend using Python 3.9.**

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!

## PostHog News

Welcome all our new team members!

| Name  |        Role         | 🍍 on 🍕 |   Interesting Fact           |
| :---: | :-----------------: | :-------: | :-------------------------: |
| [Eli Kinsey](/community/profiles/3) | Frontend Developer |  👍 Pineapple gang represent  |   _"I.... have never had a bloody nose"_
| Rick Marron | Full Stack Engineer |  👎  |   _"I'm part of the ~1% who can lick their elbow. (Although the ability is slowly going away with age)"_
| [Paul D'Ambra](/community/profiles/69) | Full Stack Engineer |  👎 Tasty but forbidden (like drinking in church)  |   _"I was nearly arrested at a pagan wedding"_
| Guido Laquinti | Site Reliability Engineer |   👎 Can't say it's acceptable without having my passport revoked 🇮🇹  |   _"When I was a kid, my parents asked me to find a name for our new kitten. We called him 'Password' 🔐🐕‍🦺"_

## Community
### Community MVP 🏆

Thanks to all our community members for helping move PostHog forward! This release cycle's Community MVP goes to [manish001in](https://github.com/manish001in)!

Manish helped us pushed a PR that ensures tab titles are properly set when navigating between dashboards (PR [#5822](https://github.com/PostHog/posthog/pull/5822)) and is also pushing a PR to make it easy to copy properties from the person page (PR [#5884](https://github.com/PostHog/posthog/pull/5884)).

### Community shoutouts
We want to thank each and every community member that contributed to this release of PostHog!

- [manish001in](https://github.com/manish001in) 🏆
- [edhgoose](https://github.com/edhgoose)
- [mjashanks](https://github.com/mjashanks)
- [jmellicker](https://github.com/jmellicker)
- [xahhy](https://github.com/xahhy)
- [julianharty](https://github.com/julianharty)
- [benbz](https://github.com/benbz)
- [bryanyi](https://github.com/bryanyi)
- [juanvasquezreyes](https://github.com/juanvasquezreyes)
- [7MIMIRA](https://github.com/7MIMIRA)
- [purcell3a](https://github.com/purcell3a)
- [Patil2099](https://github.com/Patil2099)
- [jredl-va](https://github.com/jredl-va)

## Open roles

Join us in helping make more products successful! We're currently hiring for the following roles:

- Technical Content Marketer
- Developer Educator
- Senior Software Engineer
- Staff Software Engineer
- Senior C++/Clickhouse Engineer

Don't see a role for you? We're always looking for exceptional people, so reach out to us via our [Careers page](https://posthog.com/careers) for more info.

<hr/>

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_

<AcademyCTA />
