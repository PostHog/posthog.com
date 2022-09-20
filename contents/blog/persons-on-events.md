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

In [a previous product update](/blog/the-posthog-array-1-39-0) we announced a beta for a substantial change to the way we handle persons and events on PostHog. Today, after gathering your feedback and seeing the improvements to query performance, we’re rolling this change out to all PostHog users. 

This change essentially combines [persons](/manual/persons) and [events](/manual/events) into a single ClickHouse table, adding person IDs and properties _onto_ events. This change also applies to groups, adding group properties and aggregation to the same table. 

You won’t see any UI changes — persons will still have their own Persons & Groups section on the sidebar, for example — and there’ll be no loss of functionality, but here are some changes you may see:

- **Faster results for queries involving person or group properties and events**. Putting persons, groups and events into a single ClickHouse table means we no longer have to join tables to get results on queries involving these data. As a result, query performance will improve by up to 400%.

- **Faster filtering of events with person or group properties**. Similarly, filtering events by person or group properties is much faster when a join is no longer necessary. Anywhere where you’re working with persons or groups, and events, PostHog will be faster. 

- **Users will no longer be merged retroactively in some situations**. Previously, when an identified user logged in from a different browser (thus becoming anonymous) we would end up with separate records for their unidentified and identified behavior. We would then [merge these into a single person](/docs/how-posthog-works/ingestion-pipeline#merging-two-persons), which could create conflicts and [performance issues](/docs/how-posthog-works/ingestion-pipeline#consequences-of-merging). Our new approach avoids this merge and is much more performant. However, this means the anonymous events are attributed to a different, now non-existent person.

- **You can create insights based on person properties at the time of an event.** This wasn’t previously feasible and was often requested. Now, with this change, it's possible!

- **Self-hosting users will see a storage increase**. This is due to extra information being stored in your self-hosted ClickHouse. We expect users to see their storage requirement increase by approximately XX. 

Self-hosting users will need to [update to the latest version of PostHog](/docs/runbook/upgrading-posthog), while the change will be automatically targeted for users on PostHog Cloud. 

While improving performance has been a major motivation for this change, this is also a crucial step in ensuring PostHog can continue to scale effectively. 

Since launching in 2020, PostHog has been adopted by over 15,000 companies and has tracked over 50 billion events. In order to ensure that current and future users have the best possible experience, we need our systems to work as efficiently as possible. Moving persons on to events is a key to this, along with supporting work such as [using materialized columns in ClickHouse](/blog/clickhouse-materialized-columns) to speed up queries even further.

This said, even though the change is now being fully deployed, we’re still eager to hear [your feedback](https://www.g2.com/g2gives/girls-who-code-pillar-2022/and/posthog) and understand how we can keep making PostHog better. If you’d like more information about any of the changes above then we’re happy to [answer your questions](/questions).
