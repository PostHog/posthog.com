---
date: 2022-01-31
title: Array 1.32.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-array-blog.png
featuredImageType: full
excerpt: >-
  PostHog 1.32.0 makes it easier to find what you want in the Persons & Groups
  page, introduces vertical funnels and sets the stage for the launch of
  Experimentation!
category: PostHog news
tags:
  - Product updates
  - Release notes
---

<blockquote class='warning-note'>
<b>IMPORTANT!</b> Do not upgrade to this version if you have deployed PostHog using Postgres. PostHog no longer supports a Postgres-based installation (last version supported is <code>1.30.0</code>) and now requires Clickhouse. To use this version, you must <a href="/docs/migrate/migrate-between-posthog-instances" target="_blank">upgrade to ClickHouse</a> first.
</blockquote>

## PostHog 1.32.0 release notes

> Don't see the new features on your self-hosted deployment? Remember to [update your PostHog instance](/docs/runbook/upgrading-posthog).

**Release highlights:**

-   [Redesigned Persons & Groups pages](#redesigned-persons--groups-pages)
-   [Short insight link sharing](#short-insight-link-sharing)
-   [Improved insight experience](#improved-insight-experience)
-   [Funnels vertical breakdown](#funnels-vertical-breakdown)

### Redesigned Persons & Groups pages

We've redesigned how the Persons & Groups pages look to make it easier to find what you're looking for. You'll now be able to easily see which groups (if any) the user belongs to, and better manage the user's properties.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_32_0-new-person-page.gif" alt="Example screenshot: New Person page" />

<br />

### Short insight link sharing

When sharing saved insights, you will now get a short and sweet URL to share with your teammates. This means something like this: `https://app.posthog.com/insights/y3tskB1B`, instead of well.... a very, very long URL you would see before. Further, this now makes it possible to create very complex insights with multiple series and filters (which could be limited by the maximum URL length supported).

### Improved insight experience

Searching for the right event or property when building an insight could be hard. That's why we implemented some key improvements to make it easier:

1. You will now see a "Stale" label next to any event we haven't seen for a while, so you know not to use it.
2. When filtering events by properties, we will now clearly show you properties that are relevant for the event (as opposed to all your properties).
3. When filtering events by properties, we will now give you better suggestions about potential values to filter on.

In addition to the above, we've improved how tooltips are displayed so they contain clearer and more useful information, and implemented a frequently asked for "Legend" feature. You can now share screenshots with all the required information to understand them.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_32_0-new-tooltips.png" alt="Example screenshot: New tooltips" />

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_32_0-legends.png" alt="Example screenshot: Legends" />

### Funnels vertical breakdown

Funnels with breakdowns just got a lot better. This new view enables you to quickly understand how your users convert through a funnel. The colors can help you quickly identify patterns based on the breakdown applied.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_32_0-funnel-vertical-breakdown.png" alt="Example screenshot: Funnels with a vertical breakdown" />

<br />

### Other improvements & fixes

-   Set friendly names to your groups (from [Group Analytics](/docs/user-guides/group-analytics)). Now instead of seeing `org` (as you may call it in your code), you can rename it to see "Organization" in PostHog's UI. Further, you can now set the plural version as well to improve readability. [PR](https://github.com/PostHog/posthog/pull/7974).
-   Simplified dashboard grid that makes it more responsive and consistent across multiple screen sizes.
-   Toolbar launch page. When navigating to toolbar on the sidebar you'll now see a simplified experience to launch it. Plus, we've improved how authorized domains are managed.
-   Significant performance improvements to the Actions page. When viewing an action, we'll now show you the most recent events (~6 months ago) without constant polling. This should make it easy and faster to debug actions.
-   Lifecycle query just got faster! We've also clarified how each of the groups (new, returning, resurrecting and dormant) in lifecycle are defined. [Read more](https://github.com/PostHog/posthog/pull/8021) on this.
-   When your users are in multiple tabs, we'll now properly separate recordings so you can see what users were doing on each tab. Previously this could lead with a botched experience when playing back recordings.
-   To improve query performance, the "All time" filter will now only consider events from 2015 onwards. We realized some instances had events with incorrect timestamps (frequently UNIX epoch [Jan 1, 1970]), which would lead to performance issues and hard to parse graphs.
-   [Multivariate Feature Flags](https://posthog.com/docs/user-guides/feature-flags#multivariate-feature-flags) are now out of Beta and generally available. This is a premium feature.
-   Fixed a bug when if a user joined an organization with private projects, they would get a broken experience (from being assigned to a project to which they don't have access).
-   Improved performance and increase execution size for complex retention queries.
-   Newly design Preflight page to update with our latest brand.
-   Fixed a bug in which a lot of failing requests would be made when opening a shared dashboard unauthenticated.
-   Fixed a bug in which filtering insights by "Yesterday" and "Daily" would lead to two data points instead of one.
-   Plus 330+ improvements & fixes.

### Deprecation & removal notices

1. Since the previous version (1.31.0), we no longer support a Postgres-only deployment of PostHog. Read [our migration guide](/docs/migrate/migrate-between-posthog-instances) for instructions on moving over to a ClickHouse version. ClickHouse provides faster queries and is optimized for very large volumes of data, and you will also get a new lot of features.
2. We're removing support for insights with "Minute" intervals. From user feedback, these insights were hard to parse and could lead to significant performance issues in self-hosted instances. Please [reach out](/support) if you have any feedback on this. More details on the [PR](https://github.com/PostHog/posthog/pull/7847).

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


### Experimentation launch 🚀

We've been working hard on a brand new Experimentation feature which will let you quickly and confidently run experiments to test product improvements. This feature is currently available on Beta on PostHog Cloud, but if you'd like to be a beta tester or get a demo, please [reach out](https://app.posthog.com/home#supportModal) or schedule a [demo call](https://calendly.com/posthog-feedback) with the Engineering Team that created it.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_32_0-experiments-sneak-peek.png" alt="Example screenshot: Experiments sneak peek" />

## PostHog News

We want to welcome our new team members!

[Andy](/community/profiles/62) joined PostHog as our first Content Marketer. Andy is a definite 👎 on pineapple on pizza (🍍 on 🍕).

> I am the only person called Andrew Vandervell in the universe.

[Simon](/community/profiles/49) joined us in Customer Success to help our Enterprise customers get the most value out of PostHog. Simon's stance on pineapple on pizza (🍍 on 🍕) is: On the fence. I'd never actively order a pizza with pineapple on it, but as a pizza lover and pineapple was the only option - I’d still eat it. Same response for Marmite.

> I’m (loosely) related to an actor who’s starred in 6 Star Wars movies.

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!

## Open roles

Join us in helping make more products successful! We're currently hiring for the following roles:

-   Software Engineer - Kubernetes
-   Full Stack Engineer - Growth
-   Tech Lead Manager/Engineering Manager
-   Community Engineer, more details here
-   Ex-Founders\*

Learn more about these roles on our [Careers page](https://posthog.com/careers).

Don't see a role for you? We're always looking for exceptional people, so reach out to us via the link above.

<hr/>

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_

<ArrayCTA />
