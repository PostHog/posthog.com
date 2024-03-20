---
date: 2021-07-26
title: Array 1.27.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/array/1-27-0.png
excerpt: >-
  PostHog 1.27.0 is here! Completely redesigned funnels experience will help you
  dive deeper to understand why your users aren't converting. Plus 400+
  improvements & fixes.
category: PostHog news
tags:
  - Product updates
  - Release notes
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

> If you're self-hosting and want to upgrade for a better experience and new features, remember to [update your PostHog instance](/docs/runbook/upgrading-posthog).

**In this release:**

- [Brand-new funnels experience](#new-funnels-experience).
- [Significant revamp on the legend table & tooltips on insights](#revamp-of-legend-table--insight-tooltips).
- [New action, event, cohorts & properties selector](#new-filter-experience).
- [ClickHouse is now free to use](#clickhouse-is-now-free-to-use).
### New Funnels Experience

Funnels have a new bar-chart visualization and show more comprehensive metrics. You can now choose whether to display conversion rates for the full funnel or from each step to the next.

![Funnel steps](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/funnel-steps.png)

Breakdowns are now supported on funnels! This allows you to identify how user and event properties (for instance, browser or referral source) affect your conversions.

![Funnel breakdowns](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/funnel-breakdowns.png)

Clicking on a funnel step will reveal a list of persons who have continued or dropped off at that step. From there, you can easily view their sessions (provided you have Session Recording enabled) to find unknown problems or opportunities that would otherwise be hidden in the data.

![Persons modal](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/person-modal-original.png)

Going beyond averages, the new **Time to Convert** view shows a distribution of time spent between steps or for the whole funnel.

![Funnel time conversion](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/funnel-steps.png)

### Revamp of legend table & insight tooltips

The legend table for Insights has received a major styling revamp, including nicer formatting for dates and numbers and clearer identification of breakdown values.

![Funnel time conversion](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/insights-table.png)

New tooltips allow you to scan and compare multiple values at a glance.

![Funnel time conversion](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/tooltips.png)

### New filter experience

It's now easier than ever to find the event, user, or cohort definitions you're looking for when adding a filter to a query. This change also causes Insights to load significantly faster.

![Funnel time conversion](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/unified-search.png)

### ClickHouse is now free to use!

A few months after PostHog we started hitting limitations on some operations running on Postgres. We then decided to develop full support for a <a rel="noreferrer noopener" target="_blank" href="https://clickhouse.tech/">ClickHouse</a> backend. ClickHouse is a very powerful OLAP database that works specially well at computing analytics for huge volumes of data. At first this ClickHouse backend was launched as a premium feature requiring an Enterprise license. Some weeks ago we decided to offer a free version with a restriction of 3 team members to serve as trial for the feature.

Since then, we have ironed out all the details and have now decided to make this feature **fully free** now, no longer requiring a license nor having any additional restrictions. This comes from our commitment to supporting teams and companies of any size, so you can continue using PostHog for free even if your event volume increases significantly.

ClickHouse is deployed a bit differently than our [traditional deployment options](/docs/self-host/overview#deploy), you can find full deployment instructions here: <a rel="noreferrer noopener" target="_blank" href="https://github.com/PostHog/charts-clickhouse/">https://github.com/PostHog/charts-clickhouse/</a>


### Improvements & Fixes

- Domain whitelist to allow self-serve signup with social providers (#5111).
- Better errors & empty states when generating insights.
- Apps UI revamp (#5137, #4871).
- You can now pass a Personal API key to API requests to work with different projects (#5044).
- Your instance can now be multi-org (premium feature) by setting `MULTI_ORG_ENABLED` environment variable (#5108).
- Performance improvements around insight requests and caching to optimize resource usage.
- Support spaces and brackets when creating actions (#5070).
- Improvements around internal metrics to better track your instance performance.
- Fixes around navigation throughout the app.
- API endpoint to get feature flags for a user, `/api/feature_flags/user_status?distinct_id=ID`.
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

Welcome Chris Clark! Chris joined our Core Experience Team to help us level up our product experience! You can already see a ton of his work in our new funnels feature. Chris is pro-pinneaple on pizza (🍍 on 🍕) "but generally accepting of all pizza views and requirements". 

> I once impulse-purchased a baby goose.

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!

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

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_

<ArrayCTA />
