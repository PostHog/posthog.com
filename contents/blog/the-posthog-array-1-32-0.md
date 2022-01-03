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
<b>IMPORTANT!</b> Do not upgrade to this version if you have deployed PostHog using Postgres. PostHog no longer supports Postgres as of v1.30.0 and you must <a href="/docs/self-host/migrate-from-postgres-to-clickhouse" target="_blank">upgrade to ClickHouse</a> first.
</blockquote>

## PostHog 1.32.0 release notes

> Don't see the new features on your self-hosted deployment? Remember to [update your PostHog instance](/docs/self-host/configure/upgrading-posthog).

**Release highlights:**
- [Feature one](#feature-one)

### Feature one

Description here.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/group-analytics-list.png" alt="Example screenshot: List of groups" />

> 🎁 X is a premium feature and requires a PostHog Scale or Enterprise license. [Learn more](/pricing).

<br />

### Feature two

Description here.

<br />

### Other improvements & fixes

- List here
- Plus x+ improvements & fixes.

### Deprecation & removal notices

1. Since the previous version (1.31.0), we no longer supports a Postgres-only deployment of PostHog. Read [our migration guide](/docs/self-host/migrate-from-postgres-to-clickhouse) for instructions on moving over to a ClickHouse version. ClickHouse provides faster queries and is optimized for very large volumes of data, and you will also get a new lot of features.
2. We're removing support for insights with "Minute" intervals. From user feedback, these insights were hard to parse and could lead to significant performance issues in self-hosted instances. Please [reach out](/support) if you have any feedback on this.
3. We're [removing the **Sessions** insight](/blog/sessions-removal) (distribution of session length). Please [reach out](/support) if you have any feedback on this.

### Talk to us about how we can improve

We’re always working on improving the product experience and would love to talk to you! Please join one of our Product, Engineering, or Marketing team members on a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback).

As a small thank you for your time, we're giving away awesome [PostHog merch](https://merch.posthog.com)!


## PostHog News

Welcome Andy Vandervell! Andy joined PostHog to .... Andy on pineapple on pizza (🍍 on 🍕).

> Weird fact here.

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

- Open role list here

Learn more about these roles on our [Careers page](https://posthog.com/careers).

Don't see a role for you? We're always looking for exceptional people, so reach out to us via the link above.

<hr/>

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog), and subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._

<ArrayCTA />
