---
date: 2022-08-29
title: 'How we’re improving performance by combining persons and events’'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ['Release notes', 'Product updates']
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
---

In [our last product update](/blog/the-posthog-array-1-39-0) we announced a beta for a substantial change to the way we handle persons and events on PostHog. Today, after gathering your feedback and seeing the improvements to query performance, we’re rolling this change out to all PostHog users. 

This change essentially combines [persons](/manual/persons) and [events](/manual/events) into a single ClickHouse table, moving person IDs and properties _onto_ events. You won’t see any UI changes — persons will still have their own Persons & Groups section on the sidebar, for example — and there’ll be no loss of functionality, but here are some changes you may see:

- **Faster results for queries involving person properties and events**. Putting persons and events into a single ClickHouse table means we no longer have to join tables to get results on queries involving these data. As a result, query performance will improve by up to 400%.

- **Faster filtering of events with person properties**. Similarly, filtering events by person properties is much faster when a join is no longer necessary. Anywhere where you’re working with persons and events, PostHog will be faster. 

- **Anonymous and identified users will no longer be merged**. Previously, when a user was identified through an event, such as logging in to a service, we would end up with separate records for unidentified and identified behavior. We would then [merge these into a single person](//docs/how-posthog-works/ingestion-pipeline#merging-two-persons). This could sometimes create conflicts and [other performance issues](/docs/how-posthog-works/ingestion-pipeline#consequences-of-merging). Avoiding this merge means some users may be double-counted, but is much more performant and mostly [mitigated by the event buffer](/docs/how-posthog-works/ingestion-pipeline/#1-event-buffer).

- **You can create queries based on person properties at the time of an event.** This wasn’t previously possible and was often requested. Now, with this change, 
- **Self-hosting users will see a storage increase**. This is due to extra information being stored in your self-hosted ClickHouse. We expect users to see their storage requirement increase by approximately XX. 

Self-hosting users also need to manually upgrade deployment to take advantage of this change, while the change will be automatically targeted for users on PostHog Cloud. If you’re self-hosting PostHog, you need to run [async migration](/docs/runbook/async-migrations) number 0006. Afterwards, change your `PERSON_ON_EVENTS_ENABLED` [instance setting](/docs/self-host/configure/instance-settings) to `true`. You'll need to be [a Staff user](/docs/self-host/configure/instance-settings#staff-users) to make changes.

While improving performance has been a major motivation for this change, this is also a crucial step in ensuring PostHog can continue to scale effectively. 

Since launching in 2020, PostHog has been adopted by over 15,000 companies and has tracked over 50 billion events. In order to ensure that current and future users have the best possible experience, we need our systems to work as efficiently as possible. Moving persons on to events is a key to this, along with supporting work such as [using materialized columns in ClickHouse](/blog/clickhouse-materialized-columns) to speed up queries even further.

This said, even though the change is now being fully deployed, we’re still eager to hear [your feedback](https://www.g2.com/g2gives/girls-who-code-pillar-2022/and/posthog) and understand how we can keep making PostHog better. If you’d like more information about any of the changes above then we’re happy to [answer your questions](/questions).

<NewsletterForm compact/>