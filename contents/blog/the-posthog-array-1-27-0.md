---
date: 2021-07-26
title: Array 1.27.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: release-notes
featuredImage: ../images/blog/array/1-27-0.png
excerpt: PostHog 1.27.0 is here! Excerpt goes here
---

PostHog 1.27.0 is here! 

A completely redesigned funnels experience will help you dive deeper to understand why your users aren't converting. Faster and smoother experience to create and filter insights and get more useful results from your graphs. Plus 400+ improvements & fixes across the entire app.

### Community MVP 🏆

Thanks to all our community members for helping move PostHog forward! This release cycle's Community MVP goes to... [DimitrisMazarakis](https://github.com/DimitrisMazarakis)!

Dimitris added an option to automatically refresh dashboards every couple of minutes. You can now have your PostHog dashboards in separate monitors or your conference room TV always in sync! Thanks for driving this forward, Dimitris!

> _If you haven't seen it yet, we have a [new page](https://posthog.com/contributors) dedicated to our contributors. Every contributor gets their own digital card, and we provide a leaderboard with stats on each person's contributions. We also have a bot that sends a gift card for [PostHog merch](https://merch.posthog.com) to contributors for every PR merged, and we welcome all types of contributions!_

### Help Us Improve PostHog

We’re working hard to improve the PostHog experience and would love to talk to you! Please join one of our Product, Engineering or Marketing team members in a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback).

As a small thank you for your time, we're giving away some awesome [PostHog merch](https://merch.posthog.com)!

<ArrayCTA />

## PostHog 1.27.0 Release Notes

> If you're self-hosting and want to upgrade for a better experience and new features, remember to [update your PostHog instance](/docs/self-host/configure/upgrading-posthog).

**In this release:**

- [Brand-new funnels experience](#new-funnels-experience).
- [Significant revamp on the legend table & tooltips on insights](#revamp-of-legend-table--insight-tooltips).
- [New action, event, cohorts & properties selector](#new-filter-experience).
- [Clickhouse is now open-source and free to use](#clickhouse-is-now-open-source).
### New Funnels Experience

Pending

### Revamp of legend table & insight tooltips

Pending

### New filter experience

Pending

### Clickhouse is now open source!

Pending

### Improvements & Fixes

- Domain whitelist to allow self-serve signup with social providers (#5111).
- Better errors & empty states when generating insights.
- Plugins UI revamp (#5137, #4871).
- You can now pass a Personal API key to API requests to work with different projects (#5044).
- Your instance can now be multi-org (premium feature) by setting `MULTI_ORG_ENABLED` environment variable (#5108)/
- Performance improvements around insight requests and caching to optimize resource usage.
- Support spaces and brackets when creating actions (#5070).
- Improvements around internal metrics to better track your instance performance.
- Fixes around navigation throughout the app.
- API endpoint to get feature flags for a user, /api/feature_flags/user_status?distinct_id=ID.
- See specific list of matched events when searching sessions.
- Export or create cohorts from list of persons in insights.
- Auto-refresh dashboards every 2 minutes so you can always have them up-to-date in your office screens.
- 400+ other improvements & bug fixes.

In addition to the highlights listed above, we also merged a bunch of PRs to improve PostHog's experience, performance and reliability. Plus we fixed a ton of bugs. Check out all our main repos for details:

- [`PostHog/posthog`](https://github.com/PostHog/posthog/commits/master)
- [`PostHog/plugin-server`](https://github.com/PostHog/plugin-server/commits/master)
- [`PostHog/posthog-python`](https://github.com/PostHog/posthog-python/commits/master)
- [`PostHog/posthog-cloud`](https://github.com/PostHog/posthog-cloud/commits/master)
- [`PostHog/posthog-js`](https://github.com/PostHog/posthog-js/commits/master)
- [`PostHog/plugin-repository`](https://github.com/PostHog/plugin-repository/commits/master)


### Deprecation Notice

⚠️ The `/api/user` endpoint has [been deprecated](/docs/api/user#user--deprecated) for a while and will be removed on the next version (1.28.0).

## PostHog News

Welcome [Chris Clark](https://posthog.com/handbook/company/team#chris-clark-product-designer)! Chris joined our Core Experience Team to help us level up our product experience! You can already see a ton of his work in our new funnels feature. Chris is pro-pinneaple on pizza (🍍 on 🍕) "but generally accepting of all pizza views and requirements". 

> I once impulse-purchased a baby goose.

## Community Shoutouts

We want to thank each and every community member that contributed to this release of PostHog!

- [DimitrisMazarakis](https://github.com/DimitrisMazarakis) 🏆
- [alx-a](https://github.com/alx-a)
- [jacobherrington](https://github.com/jacobherrington)
- [Patil2099](https://github.com/Patil2099)
- [tirkarthi](https://github.com/tirkarthi)
- [lharress](https://github.com/lharress)
- [imhmdb](https://github.com/imhmdb)
- [RayBB](https://github.com/RayBB)
- [chidexebere](https://github.com/chidexebere)
- [marcopchen](https://github.com/marcopchen)
- [smallbrownbike](https://github.com/smallbrownbike)
- [pietrodevpiccini](https://github.com/pietrodevpiccini)
- [taobojlen](https://github.com/taobojlen)
- [dbinetti](https://github.com/dbinetti)

## Open Roles

Join us in helping make more products successful! We're currently hiring for the following roles:

- Senior Software Engineer
- Senior Software Engineer (Backend focus)
- Staff Software Engineer

Don't see a role for you? We're always looking for exceptional people, reach out! Check out our [Careers page](https://posthog.com/careers) for more info.

<hr/>

_Follow us on [Twitter](https://twitter.com/posthoghq) or [LinkedIn](https://linkedin.com/company/posthog), and subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._
