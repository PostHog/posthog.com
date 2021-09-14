---
date: 2021-09-15
title: Array 1.28.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: release-notes
featuredImage: ../images/blog/array/1-28-0.png
excerpt: PostHog 1.28.0 has launched! Excerpt here
---

PostHog 1.28.0 has launched! 

Summary here

### Community MVP 🏆

Thanks to all our community members for helping move PostHog forward! This release cycle's Community MVP goes to... [manish001in](https://github.com/manish001in)!

Manish helped us pushed a PR that ensures tab titles are properly set when navigating between dashboards (PR [#5822](https://github.com/PostHog/posthog/pull/5822)) and is also pushing a PR to make it easy to copy properties from the person page (PR [#5884](https://github.com/PostHog/posthog/pull/5884)).

### Help us improve PostHog

We’re working hard to improve the PostHog experience and would love to talk to you! Please join one of our Product, Engineering or Marketing team members on a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback).

As a small thank you for your time, we're giving away some awesome [PostHog merch](https://merch.posthog.com)!

<ArrayCTA />

## PostHog 1.28.0 Release Notes

> If you're self-hosting and want to upgrade for a better experience and new features, remember to [update your PostHog instance](/docs/self-host/configure/upgrading-posthog).

**In this release:**

- [Significantly revamped performance](#significantly-revamped-performance).

### Significantly revamped performance

When running on OSS Clickhouse, we now automatically create during weekends columns for event and person properties to speed up queries. This can speed up your slower queries 2-25x.

### Advanced engagement cohorts

Description here (Create automatic user cohorts based on actions performed by users in the last N days (e.g. to identify power users).

### SAML support
Description here (Users with an Enterprise license can now enable SAML authentication and user provisioning)


### Advanced funnel building
Description here (More features to build more detailed funnel views, such as custom step ordering, event exclusions, among others)

### Improvements & fixes

- Significant improvements to plugins development experience
- Improved session recording list, particularly when there's multiple recordings for a session.
- Fixed broken links when sharing dashboards publicly
- Multiple fixes on tooltips
- Fixed bugs around cohort calculation
- Fixed issues around loading and refreshing dashboards
- Multiple UI improvements following our new website brand launch
- Improvements to plugins UI
- Preference to disable automatic emails when a new member joins
- Fixes to pie chart that caused some numbers to display confusingly
- Plus more than 300+ improvements/fixes

In addition to the highlights listed above, we also merged a bunch of PRs to improve PostHog's experience, performance and reliability. Plus we fixed a ton of bugs. Check out all our main repos for details:

- [`PostHog/posthog`](https://github.com/PostHog/posthog/commits/master)
- [`PostHog/plugin-server`](https://github.com/PostHog/plugin-server/commits/master)
- [`PostHog/posthog-python`](https://github.com/PostHog/posthog-python/commits/master)
- [`PostHog/posthog-js`](https://github.com/PostHog/posthog-js/commits/master)
- [`PostHog/plugin-repository`](https://github.com/PostHog/plugin-repository/commits/master)

### Breaking changes

⚠️ The previously deprecated `/api/user` endpoint has been removed since this version (1.28.0). Head over to the [User API](https://posthog.com/docs/api/user) docs for details on how to upgrade.


⚠️ We've dropped support for Python 3.7. You'll now need to use Python 3.8, but we **recommend you use Python 3.9**
## PostHog News

Welcome all new team members who will help us take PostHog to the next level!

| Name  |        Role         | 🍍 on 🍕 |   Interesting Fact           |
| :---: | :-----------------: | :-------: | :-------------------------: |
| [Eli Kinsey](/handbook/company/team#eli-kinsey-front-end-developer) | Frontend Developer |  Pineapple gang represent  |   _"I.... have never had a bloody nose?"_
| Rick Marron | Full Stack Engineer |  👎  |   _"I'm part of the ~1% who can lick their elbow. (Although the ability is slowly going away with age)"_
| Paul D'Ambra | Full Stack Engineer |   Tasty but forbidden (like drinking in church)  |   _"I was nearly arrested at a pagan wedding"_
| Guido Laquinti | Site Reliability Engineer |   Can't say it's acceptable without having my passport revoked 🇮🇹  |   _"When I was a kid, my parents asked me to find a name for our new kitten. We called him “Password” 🔐🐕‍🦺"_

## Community shoutouts

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

Don't see a role for you? We're always looking for exceptional people, reach out! Check out our [Careers page](https://posthog.com/careers) for more info.

<hr/>

_Follow us on [Twitter](https://twitter.com/posthoghq) or [LinkedIn](https://linkedin.com/company/posthog), and subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._
