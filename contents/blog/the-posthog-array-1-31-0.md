---
date: 2021-12-16
title: Array 1.31.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-array-blog.png
featuredImageType: full
excerpt: >-
  PostHog 1.31.0 introduces Group Analytics, improved Correlation Analysis, a
  revamped overall user experience on Insights and 350+ more improvements and
  fixes.
category: PostHog news
tags:
  - Product updates
  - Release notes
---

Happy holidays from PostHog! PostHog 1.31.0 is our last release of the year, introducing Group Analytics, improved Correlation Analysis, a revamped user experience on Insights and 350+ more improvements and fixes. Please note that Postgres-based installations are no longer supported for PostHog 1.31.0.

<blockquote class='warning-note'>
<b>IMPORTANT!</b> Do not upgrade to this version if you have deployed PostHog using Postgres. PostHog no longer supports Postgres as of v1.30.0 and you must upgrade to ClickHouse first.
</blockquote>

## PostHog 1.31.0 release notes

> Don't see the new features on your self-hosted deployment? Remember to [update your PostHog instance](/docs/runbook/upgrading-posthog).

**Release highlights:**

-   [Group Analytics](#group-analytics)
-   [Improved Correlation Analysis](#improved-correlation-analysis)
-   [Improved user experience](#improved-user-experience)

### New: Group Analytics

Introducing Group Analytics! Group Analytics enable you to analyze groups, which aggregate events within PostHog. You can have multiple groups and they can even change dynamically.

Group Analytics is especially useful if you have a B2B product, as you will now be able to create a Company group type which tracks all unique users within a company, then create insights such as retention by company and events performed by unique companies.

Visit our [Group Analytics documentation](/docs/user-guides/group-analytics) to find out what else is possible with Group Analytics.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/group-analytics-list.png" alt="Example screenshot: List of groups" />

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/group-analytics-insight.png" alt="Example screenshot: Using groups in an insight" />

> 🎁 Group Analytics is a premium feature and requires a PostHog Scale or Enterprise license. [Learn more](/pricing).

<br />

### Improved: Correlation Analysis

Correlation Analysis just got better! In addition to significantly improving the UI & UX, we've also introduced a details option for advanced users looking for deeper understanding of how events and properties contribute to conversion or drop-offs. This new detail view shows a complete confusion matrix which shows true positives, true negatives, false negatives and false positives. We've also added a correlation score from `-1.0` to `1.0` to signal how strongly an event or property correlates with conversion or drop-off.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/correlation-matrix.png" alt="Example screenshot: correlation matrix" />

<br />

### Polished: Experience of insights

Insights and dashboards are the core of PostHog's analytics capabilities, which is why we're putting extra focus on making using them _spark joy_. This release brings various improvements to the experience:

-   You can now easily link to saved insights like so: https://app.posthog.com/insights/vMA1IlmP. While unwieldy query parameters were previously required, now all PostHog wants for Christmas is the ID of the insight. Merry sharing!
-   Visualization of funnels has been reworked for improved readability of results, particularly when using breakdown. This makes comparing conversion based on properties easier than ever.
-   Searching events & properties is now significantly faster. We've changed the way these properties are shown and now list them by popularity within the project. Create those insights faster!
-   The funnel query builder has been streamlined – essential settings are better exposed, while advanced options can be expanded when you need them.
-   The dashboard grid has been simplified to avoid annoying situations where your carefully crafted layout becomes misaligned on a different screen resolutions. Instead of four complicated layouts, there are now two: single-column for mobile devices, and multi-column for larger screens.

Expect further major improvements to this area in 1.32.

<br />

### Enhanced: App design and performance

Following up on the [overhaul of navigation in 1.30](/blog/the-posthog-array-1-30-0#fresh-new-lookandfeel), we've made major UI improvements to the app's most used pages. These top-level views have been overhauled for uniformity, clarity, and snappiness.

Breadcrumbs are now fully dynamic and adjust to the current page in all situations.

The sidebar has been made more graceful: it adjusts to the screen size in a smarter way, and will remember your preferences in the browser.

![Pages](https://user-images.githubusercontent.com/4550621/146378918-1738e262-3f5c-4b6b-adfb-b69767995b99.png)

<br />

### Other improvements & fixes

-   Recordings now load up to a few times faster.
-   Fixed bug in feature flags when in certain cases a 0% release was considered as a 100% release.
-   Fixed bug where private project names were shown to members who shouldn't have access.
-   Plus 350+ improvements & fixes.

### Deprecation & removal notices

1. This version (1.31.0) no longer supports a Postgres-only deployment of PostHog. Read [our migration guide](/docs/migrate/migrate-to-cloud) for instructions on moving over to a ClickHouse version. ClickHouse provides faster queries and is optimized for very large volumes of data, and you will also get a new lot of features.
2. We're [deprecating the **Sessions** insight](/blog/sessions-removal) (distribution of session length). Please [reach out](/support) if you have any feedback on this.

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## PostHog News

Welcome Cameron DeLeone! Cameron joined PostHog to help us level up our Customer Success experience. Cameron is a definite no for pineapple on pizza (🍍 on 🍕).

> I've always been a food lover, and started talking about food at 7 months old (my first word was "broc" for broccoli). I haven't shut up about it since.

## Community

Want to help improve PostHog? We always welcome contributions from our community! Check out our [contributing resources](/docs/contribute) to get started.

### Community shoutouts

We want to thank each and every community member that contributed to this release of PostHog!

-   [abtinmo](https://github.com/abtinmo)
-   [k4kuz0](https://github.com/k4kuz0)
-   [vicampuzano](https://github.com/vicampuzano)
-   [jyuvaraj03](https://github.com/jyuvaraj03)
-   [ajsharp](https://github.com/ajsharp)
-   [maxmue](https://github.com/maxmue)
-   [hjweddie](https://github.com/hjweddie)
-   [asherf](https://github.com/asherf)
-   [chasovskiy](https://github.com/chasovskiy)
-   [joesaunderson](https://github.com/joesaunderson)
-   [Jaspreet-singh-1032](https://github.com/Jaspreet-singh-1032)

## Open roles

Join us in helping make more products successful! We're currently hiring for the following roles:

-   Full Stack Engineering - Growth
-   Operations Manager
-   Software Engineer

Learn more about these roles on our [Careers page](https://posthog.com/careers).

Don't see a role for you? We're always looking for exceptional people, so reach out to us via the link above.

<hr/>

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_

<ArrayCTA />
