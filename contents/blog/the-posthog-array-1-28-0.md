---
date: 2021-09-15
title: Array 1.28.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: release-notes
featuredImage: ../images/blog/array/1-28-0.png
excerpt: PostHog 1.28.0 has launched! New: Significantly revamped performance for slower queries, advanced engagement cohorts, SAML support, advanced funnels and many more improvements and fixes.
---

PostHog 1.28.0 has launched! 

Enjoy significantly revamped performance for slower queries, advanced engagement cohorts, SAML support, advanced funnels, and many more improvements and fixes.

## PostHog 1.28.0 Release Notes

> If you're self-hosting and want to upgrade for a better experience and new features, remember to [update your PostHog instance](/docs/self-host/configure/upgrading-posthog).

**In this release:**

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

### Improvements & fixes
- Significant improvements to plugins development experience
- Improved session recording list, particularly when there's multiple recordings for a session
- Fixed broken links when sharing dashboards publicly
- Multiple fixes on tooltips
- Fixed bugs around cohort calculation
- Fixed issues around loading and refreshing dashboards
- Multiple UI improvements following our new website brand launch
- Improvements to plugins UI
- Preference to disable automatic emails when a new member joins
- Fixes to pie chart that caused some numbers to display confusingly
- 300+ other improvements/fixes

### Breaking changes

⚠️ The previously deprecated `/api/user` endpoint has been removed since this version (1.28.0). Head over to the [User API](https://posthog.com/docs/api/user) docs if you still need to update this endpoint.

⚠️ We've dropped support for Python 3.7. You'll now need to use Python 3.8 or 3.9. **We recommend using Python 3.9.**

### Help us improve PostHog

We’re working hard to improve the PostHog experience and would love to talk to you! Please join one of our Product, Engineering, or Marketing team members on a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback).

As a small thank you for your time, we're giving away awesome [PostHog merch](https://merch.posthog.com)!

## PostHog News

Welcome all our new team members!

| Name  |        Role         | 🍍 on 🍕 |   Interesting Fact           |
| :---: | :-----------------: | :-------: | :-------------------------: |
| [Eli Kinsey](/handbook/company/team#eli-kinsey-front-end-developer) | Frontend Developer |  👍 Pineapple gang represent  |   _"I.... have never had a bloody nose"_
| Rick Marron | Full Stack Engineer |  👎  |   _"I'm part of the ~1% who can lick their elbow. (Although the ability is slowly going away with age)"_
| Paul D'Ambra | Full Stack Engineer |  👎 Tasty but forbidden (like drinking in church)  |   _"I was nearly arrested at a pagan wedding"_
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

_Follow us on [Twitter](https://twitter.com/posthoghq) or [LinkedIn](https://linkedin.com/company/posthog), and subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._

<ArrayCTA />
