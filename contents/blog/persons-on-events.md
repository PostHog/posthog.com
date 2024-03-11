---
date: 2022-11-02
title: How we’re improving performance by combining persons and events
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
tags:
  - Product updates
---

In [a previous product update](/blog/the-posthog-array-1-39-0) we announced a beta for a substantial change to the way we handle persons and events on PostHog. Today, after gathering your feedback and seeing the improvements to query performance, we’re rolling this change out as part of the 1.41.0 update. It is available now for self-hosted users and PostHog Cloud users can expect to see the benefits soon as we roll it out.

> **Need to upgrade a self-hosted instance?** We've explained how to upgrade to 1.41.0 and run the necessary async migrations in [our 1.41.0 release highlights](/blog/the-posthog-array-1-41-0). 

This change combines [persons](/manual/persons) and [events](/manual/events) into a single [ClickHouse table](/blog/clickhouse-vs-postgres#olap-vs-oltp-aka-columns-vs-rows), adding person IDs and properties _onto_ events.

You won’t see any UI changes — persons will still have their own Persons & Groups section on the sidebar, for example — and there’ll be no loss of functionality, but here are some changes you may see:

- **Faster results for queries involving person properties and events**. Putting persons and events into a single ClickHouse table means we no longer have to join tables to get results on queries involving these data. As a result, query performance will improve by up to 400%.

- **Faster filtering of events with person properties**. Similarly, filtering events by person properties is much faster when joining the tables is no longer necessary. Anywhere where you’re working with persons and events, PostHog will be faster. 

- **Users will no longer be merged retroactively in some situations**. When an identified user logs in from a different browser (thus becoming anonymous) we end up with separate records for their unidentified and identified behavior. We used to do database joins at query time, so that all events were tied to the same person. Now, we simply look at the events which have the data from the event processing time - meaning that in some situations anonymous events are shown as separate, unique persons in insights. Further [information is available in the docs](https://posthog.com/docs/how-posthog-works/ingestion-pipeline#merging-two-persons) 

- **You can create insights based on person properties at the time of an event.** This wasn’t previously feasible and was often requested. Now, with this change, it's possible!

- **Self-hosting users will see a storage increase**. This is due to extra information being stored in your self-hosted ClickHouse. It's difficult to give an estimate on this as the impact will vary a lot depending on configuration and usage per organization. 

While improving performance has been a major motivation for this change, this is also a crucial step in ensuring PostHog can continue to scale effectively. 

Since launching in 2020, PostHog has been adopted by over 15,000 companies and has tracked over 50 billion events. In order to ensure that current and future users have the best possible experience, we need our systems to work as efficiently as possible. Adding persons on to events is an important part of this, along with supporting work such as [using materialized columns in ClickHouse](/blog/clickhouse-materialized-columns) to speed up queries even further.

This said, even though the change is now being fully deployed, we’re still eager to hear [your feedback](https://app.posthog.com/home#supportModal) and understand how we can keep making PostHog better. If you’d like more information about any of the changes above then we’re happy to [answer your questions](/questions).

<ArrayCTA />
