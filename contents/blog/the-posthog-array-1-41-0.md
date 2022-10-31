---
date: 2022-11-02
title: "Array 1.41.0: Improving performance by up to 400%"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ['Release notes', 'Product updates']
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
---

Want to know more about what we're up to? [Subscribe to HogMail, our newsletter](/newsletter), which we send every two weeks!

## 1.41.0 update guide for self-hosted users
Due to changes in this update, it is important check `alias` usage before [upgrading PostHog](/docs/runbook/upgrading-posthog) to 1.41.0 on a self-hosted instance. For example, assuming `email` is used as the identified user id, then: 

```
identify(email)                                   # in the frontend
alias(backend_unique_id, email)      # in the backend - THIS WILL NOT WORK
alias(email, backend_unique_id2)    # in the backend - the right order
```
> **If you haven't run async migrations 0005, 0006 and/or 0007 before:** Before updating to 1.41.0, check [ingestion warnings](#new-ingestion-warnings) and solve any outstanding issues. Run async migrations 0005, 0006 and/or 0007 at `<your-posthog-site>/instance/async_migrations`. 

> **If you have completed async migration 0007 before:** If you have changed anything regarding `alias` or based on ingestion warnings, you must re-run async migration 0007 by [connecting to Postgres](/docs/self-host/deploy/troubleshooting#how-do-i-connect-to-postgres), running `UPDATE posthog_asyncmigration SET status = 0 WHERE name = '0007_persons_and_groups_on_events_backfill' AND status = 2;` and re-running 0007 at `<your-posthog-site>/instance/async_migrations`.

## PostHog 1.41.0 release notes

**Release highlights:**

- New: Persons on events on by default
- New: Count of events per user
- New: Text cards on dashboards
- New: Ingestion warnings
- New: App metrics
- New: View recordings from anywhere
- New: Change your email yourself
- New: Hedgehog mode
- Improved: Recordings interface
- One more thing: Site apps 

### New: Persons on events on by default

We used to store events in one table and persons in another table. That meant that, once you reached billion event scale, any query which touched person properties would time out. But, no longer! After running [an extensive beta since update 1.39.0](/blog/the-posthog-array-1-39-0#beta-improving-query-performance-by-combining-persons-and-events), we've now added person data onto the events themselves. This change also applies to groups, adding group properties and aggregation to the same table. 

You won’t see any UI changes as a result of this change — persons will still have their own Persons & Groups section on the sidebar, for example — but you will notice results are a lot (up to 400%!) faster for any queries involving persons, groups or events. This is a massive change, so be sure to [read the full announcement for more info](/blog/persons-on-events).

> **Note:** As a result of putting persons on events we now have to be strict about identified and unidentified users. Now, only anonymous users can be aliased into other users - meaning that once you call `identify` on a user, you can no longer alias the user into another identified user. Because of that, we recommend double checking your `identify` and `alias` calls, and following advice above [how to upgrade a self-hosted instance to 1.41.0](/blog/the-posthog-array-1-41-0). 

### New: Count of events per user

![count events per user](../images/blog/array/1-41-0-count-events-per-user.png)

Have you ever asked yourself '*What's the average average number of purchases per user?*' or '*What's the maximum number of forms submitted per user?'* 

Questions like these used to be hard to answer with PostHog, but no more! We've added a new series option for insights, enabling you to see the count of events per user - including sub-options for seeing the averages, minimum and maximum count of events per user. 

**Bonus update:** While working on this feature, we also took the opportunity to improve our math selector UI.

### New: Text cards on dashboards

![text cards on dashboards](../images/blog/array/1-41-0-text-card-on-dashboard.png)

Previously there was no easy way to add context or links to a dashboard, meaning you may have to send long explanations when sharing a dashboard with teammates. That's why we've added the option for users on paid plans to add text cards where they can add any information they want, including metadata, images or gifs!

### New: Ingestion warnings

![ingestion warnings](../images/blog/array/1-41-0-ingestion.png)

We've added a new page to the Data Management section which lists warnings related to data ingestion from the past 30 days. If you still try to merge identified users into others, the Ingestion Warning page is where we'll remind you that the merge got blocked.

> **Note:** Self-hosted users managing kafka separately should create a new topic `clickhouse_ingestion_warnings` manually.


### New: App metrics

![app metrics](../images/blog/array/1-41-0-app-metrics-insight.png)

Curious how well your apps are doing? Previously, you may have had to pour over the AWS logs, but now you can head to the new app metrics page to find out how many events an app has processed, how many retries were attempted and what errors may have occured. Very handy. 

App metrics are only available for users on Scale or Enterprise plans. 

Want to take a look? Head to the apps page in your instance and click the chart symbol for any installed app.  

> **Note:** Self-hosted users managing kafka separately should create a new topic `clickhouse_app_metrics` manually.

### New: View recordings from anywhere

![view recordings from anywhere1](../images/blog/array/1-41-0-view-recordings-anywhere1.png)

![view recordings from anywhere2](../images/blog/array/1-41-0-view-recordings-anywhere2.png)

You can now view session recordings from different places within PostHog.

Curious about how a specific person is interacting with your app? Navigate to a person detail page and check out their recordings. Want to see recordings for a specific event or action you've created? Check out the new view recordings button you can find in the event's detail page or from the events table.

### New: Change your email yourself

![change your password](../images/blog/array/1-41-0-password.png)

Finally, we can release one of our most requested features: the ability to change the email address attached to your account, without contacting support. All you have to do is select your profile picture in the top right and access your account settings. 

### New: Hedgehog mode

![hedgehog mode](../images/blog/array/1-41-0-hedgehog-mode.png)

For a while now, we've been having a hard time explaining to our families what we do for a living. This makes it even harder.

### Improved: Recordings interface

![recordings interface](../images/blog/array/1-41-0-recordings-interface.png)

We've heard feedback recently that session recording was incredibly useful, but didn't spark much joy for those who used it. So, we've overhauled the entire interface for session recordings to make it easier to use and to help you find relevant recordings faster. 

We think session recording feels like an entirely new experience now, so check it out. Now's the perfect time to explore [the console log too](/manual/recordings#console-logs-recording-beta)!

### One more thing: Site apps 

![site-apps](../images/blog/array/1-41-0-site-apps.gif)

We're testing a new big (beta) thing: site apps. You need to **manually opt in** to enable this feature by configuring your `posthog-js` initialization to include `opt_in_site_apps: true`. Once you do, PostHog will be able to inject code onto your website through `posthog-js`. We've put together [a tutorial that explains how to make a site app](/tutorials/build-site-app) if you're interested. 

Site apps can be useful for a number of potential tasks, such as displaying feedback forms, posting service update banners, or making it rain pineapples. No, we're not really sure why we made the last one either. 

### Other improvements & fixes

You think that's it? Not by a long shot! Version 1.41 also adds hundreds of other improvements and fixes, including...

- **Improvement:**  You can now [send analytics events from GitHub actions, to PostHog](https://github.com/PostHog/posthog-github-action)
- **Improvement:**  We have revamped our timezone system! We've squashed various bugs and improved the interval grouping to be more in line with expectations when filtering on dates.
- **Improvement:** 
- **Fix**: Experiment results will appear immediately after the first exposure to a user
- **Fix**: The experiments table is now sortable

View the commit log in GitHub for a full history of changes: [`release-1.40.0...release-1.41.0`](https://github.com/PostHog/posthog/compare/release-1.40.0...release-1.41.0).

## Give us your feedback
We’re always working on improving PostHog and would love to talk to you! Please [schedule a 30 minute call](https://calendly.com/posthog-feedback) with one of our Product, Engineering, or Marketing team members to help us understand how to improve. As a thank you for your time, we'll be giving away awesome [PostHog merch](https://merch.posthog.com)!

## Contributions from the community
We always welcome contributions from our community and this time we want to thank the following people...

- [@ShaneMaglangit](https://github.com/ShaneMaglangit) for fixing [a bug when buttons could be disabled on some insights](https://github.com/PostHog/posthog/pull/12332)
- [@RCMarron](https://github.com/rcmarron), a former team member who still helped [meter some rate limits](https://github.com/PostHog/posthog/pull/12006). We miss you, Rick!
- [@Zacklean](https://github.com/zackelan), a new team member who got started early who changed [the way we compile regex](https://github.com/PostHog/posthog/pull/12180)
- [@Codepitbull](https://github.com/codepitbull) who helped us with [shading transitive dependencies](https://github.com/PostHog/posthog-java/pull/23)
- [@GMA](https://github.com/gma) for clarifying that [`brotli` is required on all architectures](https://github.com/PostHog/posthog.com/pull/3925)
- [@ByteMerger](https://github.com/bytemerger) for [updating an app logo](https://github.com/PostHog/posthog-engage-so-plugin/pull/3) for [our Engage connector](/apps/engage-connector)
- [@Balajivenkatesh](https://github.com/balajivenkatesh) for [improving the way we send data to a webhook](https://github.com/PostHog/posthog-patterns-app/pull/1) in [our Patterns connector](/apps/patterns-connector)
- [@msmans](https://github.com/msmans) for [adding ClickHouse pod distribution](https://github.com/PostHog/charts-clickhouse/pull/582) 
- [@krzd](https://github.com/krzd) for [updating some Debian-specific documentation](https://github.com/PostHog/posthog.com/pull/4307)

Do you want to get involved in making PostHog better? Check out our [contributing resources](/docs/contribute) to get started, or head to [our Slack group](/slack). We also have a [list of Good First Issues](https://github.com/PostHog/posthog/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) for ideas on where you can contribute!

## Open roles at PostHog
Want to join us in helping make more products successful? We're currently hiring for remote candidates in any of the following roles:

- [Full Stack Engineer - Experimentation Team](/careers/full-stack-engineer-experimentation)
- [Full Stack Engineer - Analytics Team](/careers/full-stack-engineer-product-analytics)

Curious about what it's like to work at PostHog? Check out our [careers page](https://posthog.com/careers) for more info about our all-remote team and transparent culture. Don’t see a specific role listed? That doesn't mean we won't have a spot for you. [Send us a speculative application!](mailto:careers@posthog.com)

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog) for more PostHog goodness!_

<ArrayCTA />
