---
date: 2021-11-17
title: Array 1.30.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/array/1-30-0.png
featuredImageType: full
excerpt: >-
  Brand new and faster user interface, automatic conversion signal detection
  with Correlation analysis, saving insights for future use and a fully revamped
  recordings playback experience and more than 350 improvements/fixes more.
category: PostHog news
tags:
  - Product updates
  - Release notes
---

PostHog 1.30.0 is a milestone release! We've introduced a brand new, faster user interface, automatic conversion signal detection with correlation analysis, the ability to save insights for future use and a fully revamped recordings playback experience. And that's just for starters!

<blockquote class='warning-note'>
<b>Postgres-based deployments are now deprecated</b> in favor of ClickHouse-backed installations. It's important to migrate your installation to keep getting the latest updates and features. <a href="#deprecation--removal-notices">Read more</a> about this below.
</blockquote>

## PostHog 1.30.0 release notes

> Don't see the new features on your self-hosted deployment? Remember to [update your PostHog instance](/docs/runbook/upgrading-posthog).

**Release highlights:**

- [PostHog 1.30.0 release notes](#posthog-1300-release-notes)
  - [Fresh new look-and-feel](#fresh-new-look-and-feel)
  - [Correlation analysis](#correlation-analysis)
  - [Saved insights](#saved-insights)
  - [Fully revamped recordings](#fully-revamped-recordings)
  - [Other improvements \& fixes](#other-improvements--fixes)
  - [Deprecation \& removal notices](#deprecation--removal-notices)
  - [Help us improve PostHog](#help-us-improve-posthog)
- [Community](#community)
  - [Community MVP 🏆](#community-mvp-)
  - [Community shoutouts](#community-shoutouts)
- [Open roles](#open-roles)

### Fresh new look-and-feel

We reworked PostHog's UI philosophy from the ground up, all to offer you the most intuitive and sleek user experience possible. With 1.30.0 we're introducing our redesigned navigation experience – codenamed Lemonade for its freshness. An evolution of the interface you know, it's simply much nicer packaging for the existing features, along with a new helpful addition: breadcrumbs for hierarchical navigation. We hope you'll find this a joy to use. And if you have any feedback regarding the redesign, we'd love to hear your thoughts!

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-lemonade.png" alt="Screenshot of new user interface" />

In addition to the new coat of paint, we've been working on performance improvements – codenamed Turbo Mode. Although not visible at first glance, recent under-the-hood changes make switching between pages feel smoother and snappier.

<br />

### Correlation analysis

Want to understand why users convert or churn? Presenting: Correlation analysis. This nifty new insight automatically matches funnels to any relevant conversion signals, giving you effortless correlation information such as "Users in Canada are 5x more likely to convert" or "Users in Chrome are 3x less likely to convert". This is a very powerful feature which enables you to take funnel optimization to the next level.

Read more on the [Correlation analysis docs](/docs/user-guides/correlation).

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-correlation.png" alt="Screenshot of correlation analysis" />

> 🎁 Correlation analysis is a premium feature and requires a PostHog Scale or Enterprise license. [Learn more](/pricing).

<br />

### Saved insights

Tired of creating the same insights multiple times? You can now save insights on PostHog without adding them to a dashboard. Further, you're able to see, search and filter a list of insights created by other team members - which makes it a lot easier to collaborate with PostHog.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-saved-insights.png" alt="Screenshot of saved insights" />

<br />

### Fully revamped recordings

The recordings experience just got a lot better. We added a new recordings tab that enables you to filter and search across multiple days (replacing the [old sessions tab](/blog/sessions-removal)). Once you've found the recording you want to watch, there's a brand new player experience that loads much faster and overlays events on the seekbar. Find the right spot in a recording quickly and understand better what your users are doing.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-recordings.png" alt="Screenshot of new recordings playback experience" />

<br />

### Other improvements & fixes

-   **Turbo mode**. You'll notice a significant speed improvement when using PostHog. App navigation will now happen almost instantly. In particular, you'll notice navigation between dashboards and insights happens without any delay.
-   **Duplicate dashboards**. Thanks to community member [Yuvaraj J](https://github.com/PostHog/posthog/pull/6476), you can now easily duplicate dashboards instead of manually recreating them. Thanks, Yuvaraj!
-   **Security on Docker builds.** We've moved to a different base image for Docker (`alpine`) and this new image build solves a lot of security vulnerabilities on upstream dependencies.
-   **Improved query performance**. We improved how person properties are handled which results in up to 2x faster queries.
-   Have a large number of dashboards? You'll now be able to **easily search the dashboard list.**
-   Fixed a bug that caused the app to believe there was a new version available when it wasn't ready to be shipped.
-   Fixed bugs with person counts not matching between an insight graph and the person list.
-   Significantly faster frontend builds as we transitioned from `webpack` to `esbuild`.
-   Fixed a bug that prevented creating cohorts from trends.
-   Success and error toast alerts will now show at the bottom of the screen so it no longer covers critical elements in the page.
-   Plus **350+ more** improvements & fixes.

### Deprecation & removal notices

1. This version (`1.30.0`) will be the last version where we support a Postgres-only deployment of PostHog. See [our migration guide](/docs/migrate/migrate-to-cloud) for instructions on moving over to a ClickHouse version. ClickHouse provides faster queries and is optimized for very large volumes of data, and you will also get a new lot of features.
2. We're now fully removing the legacy Sessions list page. Read more about it, [in this blog post](/blog/sessions-removal).

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## Community

### Community MVP 🏆

Thanks to all our community members for helping move PostHog forward! This release cycle's Community MVP goes to [asherf](https://github.com/asherf)!

Asher pushed several PRs to improve the Python code quality in the main PostHog app.

### Community shoutouts

We want to thank each and every community member that contributed to this release of PostHog!

-   [asherf](https://github.com/asherf) 🏆
-   [banagale](https://github.com/banagale)
-   [pixlwave](https://github.com/pixlwave)
-   [romj](https://github.com/romj)
-   [Nishant-Sagar](https://github.com/Nishant-Sagar)
-   [xrendan](https://github.com/xrendan)
-   [inbreaks](https://github.com/inbreaks)
-   [Jaspreet-singh-1032](https://github.com/Jaspreet-singh-1032)
-   [mether](https://github.com/mether)
-   [jyuvaraj03](https://github.com/jyuvaraj03)

Looking to contribute? We've recently improved our CI process and tests will now run smoothly if you create a PR from a fork.

## Open roles

Join us in helping make more products successful! We're currently hiring for the following roles:

-   Developer Educator
-   Operations Manager
-   Sales Engineer
-   Technical Customer Success Manager
-   Software Engineer

Learn more about these roles on our [Careers page](https://posthog.com/careers).

Don't see a role for you? We're always looking for exceptional people, so reach out to us via the link above.

<hr/>

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_

<ArrayCTA />
