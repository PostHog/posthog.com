---
date: 2023-01-16
title: 'Array 1.43.0: Massive performance improvements!'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
tags:
  - Product updates
  - Release notes
featuredVideo: 'https://www.youtube-nocookie.com/embed/TCyCryTiTbQ'
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-array-blog.png
featuredImageType: full
---

Want to know more about what we're up to? [Subscribe to our new newsletter](https://newsletter.posthog.com/subscribe), which we send once every two weeks!

> **Need to update a self-hosted instance?** [Check the runbook docs for instructions](/docs/runbook/upgrading-posthog)!

## PostHog 1.43.0 release notes
### New: Performance improvements

Nobody likes waiting for results, so we've put a renewed focus into performance recently and shipped a huge number of improvements. Here are just some of the highlights: 

- Added ClickHouse 22.8 support and optimized expensive queries to be up to 30% faster
- Updated trends queries to reduce cross-shard traffic significantly and speed up queries
- Reworked dashboard cache refresh logic so dashboards are more up-to-date
- Reduced dashboard API response size and deprecated the `items` field
- Updated dashboard filters to use cached data instead of refreshing immediately
- We no longer load dashboard data from redis twice and tiles are loaded in visual order
- Improved query cancellation logic when navigating away from trends or dashboards
- Improved Celery housekeeping tasks to require less ClickHouse resources 
- Prevented home dashboards from loading twice 
- Sped up the property filters modal

> To unlock the full benefits of Celery updates on a self-hosted instance of PostHog, please [run async migration 0008](/docs/runbook/async-migrations).

Last but not least, we now also have a [ClickHouse manual](/handbook/engineering/clickhouse) where we gather information about the database powering PostHog.

### New: Feature flag variant overrides
![flag overrides](../images/blog/array/1-43-0-feature-override.gif)

Ever created a multivariate feature flag, and wanted to show the control variant to specific users? Or, maybe you found a new cohort you'd like to add to the test variant? Now you can!

1.43.0 adds the ability to manually override variants via the flag edit screen. It's great for ensuring users get the intended experience, but is also useful for testing as it enables you to deterministically choose a variant, and test across client-side and server-side feature flags.

### New: Export recordings to file
![export recordings](../images/blog/array/1-43-0-export.gif)

Sometimes a recording can be so insightful, so important, that you think - "I want to keep a record of this forever." Well, now you can export any recording to a file and load it back into PostHog for playback in the future. Whether it is to commemorate your first sale or for compliance reasons, the tools are now in your hands.

### New: Role-based access for feature flags
![ff-roles](../images/blog/array/1-43-0-ff-roles.gif)

You can now create roles and group team members together, along with customizing feature flags access for team members! Having access control helps reduce accidental changes and ensures confidence when shipping a new feature.

### New: Better insight searching
![insight searching](../images/blog/array/1-43-0-search.gif)

We don't want searching for insights to be just functional. We want it to be a world-class, joy-sparking event! So, we've updated search to include the description field and any tags which have been applied.

This sounds like a small change, but it makes a massive difference for teams that organize data well and generate a lot of insights!

### New: Show event/property counts in persons modal
![persons modal](../images/blog/array/1-43-0-modal.gif)

We've updated the persons modal that appears when you select a data point on a query to show event and property counts on that person. This is especially helpful for finding out who your power users are, as you can quickly scan to see which users have completed an event the most!

### Improved: More experiment variants and improved flow
A regular complaint used to be that, if you made a mistake while making an experiment, you couldn't go back to fix it. Well, we fixed that so you can now:

1. Restart a running experiment while keeping everything the same and using the same feature flag key.
2. Change the main metric on a running experiment.
3. Change the secondary metrics on a running experiment.

Finally, as a bonus, you can now have up to nine variants in an experiment, instead of the usual three!

### Improved: Browsing recordings and creating playlists
Following up on our new playlists feature, we've improve the recordings UX to make browsing and pinning recordings as quick and intuitive as possible. You can now scroll the list of recordings independently of the player and creating a playlists of pinned recordings is much faster too!

### Improved: Recording playback controls 
We've revamped the recording seekbar to make it easier to find user activity at a glance, to show where tracked events occur and display what time you're scrubbing to.

### Other improvements & fixes
You think that's it? Not by a long shot! Version 1.43 also adds hundreds of other improvements and fixes, including...

- **Improvement:** We made [a simpler, faster process for querying the recently viewed insights on your home page](https://github.com/PostHog/posthog/pull/13529)
- **Fix:** Webhooks for actions with null checks weren't firing correctly. [This is now fixed.](https://github.com/PostHog/posthog/issues/12893)
- **Fix:** Trends "Weekly active users" and "Monthly active users" aggregation options used to return "Total count" results for non-time-series chart types, such as pie chart or world map. [Now proper results – the actual count of weekly/monthly active users – are returned.](https://github.com/PostHog/posthog/issues/13131) The reference point for this calculation is the last day of the insight's time range (so for an insight with a range Aug 1-Sep 30, pie chart "Weekly active users" is the count of users between Sep 24 and 30, inclusive.)
- **Improvement:** [We've consolidated container build workflows and made changes to build and push multi-arch images](https://github.com/PostHog/posthog/pull/13543).
- **Improvement:** We've switched to use `pnpm` instead of `yarn` to [manage dependencies](https://github.com/PostHog/posthog/pull/13190).

View the full commit log in GitHub for a full history of changes: [`release-1.42.4...release-1.43.0`](https://github.com/PostHog/posthog/compare/release-1.42.0...release-1.43.0).

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Schedule a 30 minute call](https://calendly.com/posthog-feedback) with one of our teams to help us make PostHog even better!

## Contributions from the community
We always welcome contributions from our community and this time we want to thank the following people this month...

- @Ismaaa for [correcting some mistakes in our onboarding documentation](https://github.com/PostHog/posthog.com/pull/1840)
- @Johanholmerin for [fixing an issue when copying non-extensible objects](https://github.com/PostHog/posthog-js/pull/478)

Want to build with us? Check out our [contributing resources](/docs/contribute) to get started. We have a [list of Good First Issues](https://github.com/PostHog/posthog/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) for ideas on where you can contribute!

## Open roles at PostHog
We're currently hiring for remote candidates in the following role:

- [Full Stack Engineer - Experimentation Team](/careers/full-stack-engineer-experimentation)
- [Site Reliability Engineer](/careers/site-reliability-engineer)

Check out our [careers page](https://posthog.com/careers) for more info about our all-remote team and transparent culture. [You can also send a speculative application!](mailto:careers@posthog.com)

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog) for more PostHog goodness!_

<ArrayCTA />
