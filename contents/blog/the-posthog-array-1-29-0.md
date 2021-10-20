---
date: 2021-10-21
title: Array 1.29.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories:
    - Release notes
featuredImage: ../images/blog/generic-release-notes.png
excerpt: Excerpt pending
---

PostHog 1.29.0 includes a fully revamped Paths experience to help you explore better what actions your users are taking. Multivariate support in feature flags, private projects and DAU/WAU/MAU graphs are only a few of the new features.

## PostHog 1.29.0 release notes

> For a better experience and new features, remember to [update your PostHog instance](/docs/self-host/configure/upgrading-posthog).

**Release highlights:**

- [Explore and deep dive with Paths](#feature-one).
- Multivariate support in feature flags
- Private projects
- Trailing DAU/WAU/MAU graphs

### Explore and deep dive with Paths

Description pending.

### Multivariate support in feature flags

Description pending.

### Private projects

Description pending.


### Trailing DAU/WAU/MAU graphs

Description pending.

### Other improvements & fixes
- Renaming filters. You will now be able to set custom names for your graph series. Your teammates will now be able to better understand your graphs.
- UI improvements. We're introducing significant UI improvements across the board to better match our [new branding](blog/../postmortem-rebrand). 
- Column configurator. You will now be able to select the columns you want to see in your events table.
    <img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_29_0-column-configurator.png" alt="" />
- Password reset revamp. We've shipped a lot of improvements to the password reset experience, including a new UI, API processing, and even new email designs 🎨. If you run with SAML-only login, password reset is now disabled.
- Fixes to dashboard load. Previously loading huge dashboards could be quite slow and in some scenarios even cause some backend strain, this is now fixed.
- Improved navigation in Insights. A lot of under-the-hood improvements which will make navigation in Insights significantly smoother. Clicking back in your browser will now work as expected.
- Automatically load new events in the events table.
- Fixed colors in insight table. We've fixed a pesky bug in which graph series were being displayed with different colors on the graph versus on the table below.
- Fixes to tooltips and person deep dive. We've improved the way we display information on tooltips and the person deep dive modal.
- Plus 350+ more improvements & fixes.

### Deprecation notices

⚠️ Text on `@current` deprecation goes here.

### Help us improve PostHog

We’re working hard to improve the PostHog experience and would love to talk to you! Please join one of our Product, Engineering, or Marketing team members on a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback).

As a small thank you for your time, we're giving away awesome [PostHog merch](https://merch.posthog.com)!

## PostHog News

Welcome Harry Waye! Harry is joining us as a Full Stack Engineer on the [Core Analytics Team](/handbook/people/team-structure/core-analytics). 🍍 on 🍕 ??. Interesting Fact.

## Community
### Community MVP 🏆

Thanks to all our community members for helping move PostHog forward! This release cycle's Community MVP goes to [jyuvaraj03](https://github.com/jyuvaraj03)!

Yuvaraj implemented the highly requested feature to let you duplicate dashboards! This way, you will now be able to use a dashboard as a template for other dashboards. The feature will be fully available on the next release (1.30.0).

### Community shoutouts
We want to thank each and every community member that contributed to this release of PostHog!

- [jyuvaraj03](https://github.com/jyuvaraj03) 🏆
- [tirkarthi](https://github.com/tirkarthi)
- [geary](https://github.com/geary)
- [dakshshah96](https://github.com/dakshshah96)
- [terrymunro](https://github.com/terrymunro)
- [stefnnn](https://github.com/stefnnn)
- [csykes](https://github.com/csykes)
- [skabbes](https://github.com/skabbes)
- [banagale](https://github.com/banagale)
- [leoMehlig](https://github.com/leoMehlig)
- [asherf](https://github.com/asherf)
- [steveyackey](https://github.com/steveyackey)

## Open roles

Join us in helping make more products successful! We're currently hiring for the following roles:

- Developer Educator
- Software Engineer
- Technical Content Marketer
- Technical Customer Success Manager

Don't see a role for you? We're always looking for exceptional people, so reach out to us via our [Careers page](https://posthog.com/careers) for more info.

<hr/>

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog), and subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._

<ArrayCTA />
