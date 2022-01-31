---
date: 2022-01-26
title: Array 1.32.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Release notes"]
featuredImage: ../images/blog/posthog-array-blog.png
excerpt: Excerpt coming soon.
---

<blockquote class='warning-note'>
<b>IMPORTANT!</b> Do not upgrade to this version if you have deployed PostHog using Postgres. PostHog no longer supports Postgres as of <code>v1.31.0</code> (last version supported is <code>1.30.0</code>) and you must <a href="/docs/self-host/migrate-from-postgres-to-clickhouse" target="_blank">upgrade to ClickHouse</a> first.
</blockquote>

## PostHog 1.32.0 release notes

> Don't see the new features on your self-hosted deployment? Remember to [update your PostHog instance](/docs/self-host/configure/upgrading-posthog).

**Release highlights:**
- [Feature one](#feature-one)

### Redesigned Persons & Groups pages

We've redesigned how the Persons & Groups pages look to make it easier to find what you're looking for. You'll now be able to easily see which groups (if any) the user belongs to, and better manage the user's properties.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_32_0-new-person-page.gif" alt="Example screenshot: New Person page" />

<br />

### Feature two

Description here.

<br />

### Other improvements & fixes

- Set friendly names to your groups (from [Group Analytics](/docs/user-guides/group-analytics)). Now instead of seeing `org` (as you may call it in your code), you can rename it to see "Organization" in PostHog's UI. Further, you can now set the plurar version as well to improve readability. [PR](https://github.com/PostHog/posthog/pull/7974).
- Significant performance improvements to the Actions page. When viewing an action, we'll now show you the most recent events (~6 months ago) without constant polling. This should make it easy and faster to debug actions.
- Lifecycle query just got faster! We've also clarified how each of the groups (new, returning, resurrecting and dormant) in lifecycle are defined. [Read more](https://github.com/PostHog/posthog/pull/8021) on this.
- To improve query performance, the "All time" filter will now only consider events from 2015 onwards. We realized some instances had events with incorrect timestamps (frequently UNIX epoch [Jan 1, 1970]), which would lead to performance issues and hard to parse graphs.
- Plus 330+ improvements & fixes.

### Deprecation & removal notices

1. Since the previous version (1.31.0), we no longer supports a Postgres-only deployment of PostHog. Read [our migration guide](/docs/self-host/migrate-from-postgres-to-clickhouse) for instructions on moving over to a ClickHouse version. ClickHouse provides faster queries and is optimized for very large volumes of data, and you will also get a new lot of features.
2. We're removing support for insights with "Minute" intervals. From user feedback, these insights were hard to parse and could lead to significant performance issues in self-hosted instances. Please [reach out](/support) if you have any feedback on this. More details on the [PR](https://github.com/PostHog/posthog/pull/7847).

### Talk to us about how we can improve

We’re always working on improving the product experience and would love to talk to you! Please join one of our Product, Engineering, or Marketing team members on a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback).

As a small thank you for your time, we're giving away awesome [PostHog merch](https://merch.posthog.com)!


### Experimentation launch 🚀

We've been working hard on a brand new Experimentation feature which will let you quickly and confidently run experiments to test product improvements. This feature is currently available on Beta on PostHog Cloud, but if you'd like to be a beta tester or get a demo, please [reach out](https://posthog.com/slack) or schedule a [demo call](https://calendly.com/posthog-feedback) with the Engineering Team that created it.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_32_0-experiments-sneak-peek.png" alt="Example screenshot: Experiments sneak peek" />

## PostHog News

Welcome to our new team members!


[Andy](https://posthog.com/handbook/company/team#andy-vandervell-content-marketer) joined PostHog as our first Content Marketer. Andy is a definite 👎 on pineapple on pizza (🍍 on 🍕).

> I am the only person called Andrew Vandervell in the universe.

[Simon](https://posthog.com/handbook/company/team#simon-fisher-customer-success) joined us in Customer Success to help our Enterprise customers get the most value out of PostHog. Simon's stance on pineapple on pizza (🍍 on 🍕) is: .

> Fact goes here.


## Community

Want to help improve PostHog? We always welcome contributions from our community! Check out our [contributing resources](/docs/contribute) to get started.
### Community MVP 🏆

Thanks to all our community members for helping move PostHog forward! This release cycle's Community MVP goes to [timgl](https://github.com/timgl)!

Description of what Tim did.

### Community shoutouts
We want to thank each and every community member that contributed to this release of PostHog!

- [timgl](https://github.com/timgl) 🏆

## Open roles

Join us in helping make more products successful! We're currently hiring for the following roles:

- Software Engineer
- Full Stack Engineer
- Tech Lead Manager/Engineering Manager
- Community Engineer, more details here
- Full Stack Engineer
- Ex-Founders*

Learn more about these roles on our [Careers page](https://posthog.com/careers).

Don't see a role for you? We're always looking for exceptional people, so reach out to us via the link above.

<hr/>

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog), and subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._

<ArrayCTA />
