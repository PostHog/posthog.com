---
title: Why and how we moved exports to Temporal
date: 2023-08-04
author: ["tomas-farias", "ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
---

Letting users maintain ownership of their data is a key value of PostHog. Although we aspire to become the single source of truth for all your data needs, we realize we don’t fulfill everything everyone wants to do (yet). Also, we know that even if we were the single source of truth, users  still want to use their data on other platforms.

Our export system provides the ability to maintain ownership of all of your data in PostHog and move it where you like. Unfortunately, it didn’t scale as well as we wanted. Luckily for you, we recently launched our [newly upgraded exports system](/docs/cdp/batch-exports), built using Temporal. This post covers why and how we made the change to Temporal.

## The trouble with exports

Although exports worked well most of the time, they were causing trouble for some customers. They were failing, erroring, and dropping data. Fixing these issues was taking up a significant amount of the pipeline team’s time. 

Although stateless plugins (like GeoIP) worked well with our [plugin service structure](/blog/how-we-built-an-app-server), **stateful** plugins (like exports) didn’t. This is because they depended on external resources that can degrade or fail. Dealing with this required timeout and retry logic that was difficult  to build into the existing structure.

Our old export system scaled as far as possible. It worked well for smaller users, but as the export requirements grew, it started to show issues. Chiefly among them included:

### Unreliable (not retrying)

The biggest issue was not handling errors gracefully, which made the entire system unreliable. This is largely due to the statefulness of exports. A failure meant they lost their state which was unrecoverable.

For example, there are transient errors fixed by retrying exports (such as temporary network disconnects), but this wasn’t built into the structure of exports. They needed to be manually retried which was unsustainable. Other exports allowed resets, but they didn’t make progress once reset. This clogged the bucket and pipeline causing resets to do more harm than good.

Another big issue was needing to run entire batches again if they failed. It wasn’t possible to restart from where we left off. Exports couldn’t pause or run simultaneously either. This put a lot of stress on the batch systems. 

Altogether, this created an inconsistent, unreliable export system.

### Opaque

On top of unreliability, we didn’t have a clear picture of what was happening in the export system. Throughout our codebase, we had multiple different work queues like Celery, Kafka, and Graphile each running separately in different contexts.

We didn’t have logs or reports. For example, we didn’t know how much data was being exported or when duplicate runs were happening. When issues happened, we relied on users to tell us. This led to a lot of firefighting and often manual restarts of exports.

### Expensive

The final nail was that exports were expensive. This wasn’t because we were charging a lot for exports, we weren’t charging anything. It was because they were expensive on the destination side. 

The unreliability led to larger amounts of data processing on the destination side, all of which come with costs. For example, if your export failed 75% through and you needed to reset, you end up paying ingestion fees of 175%. We were also paying for more processing than needed because exports were failing repeatedly.

On top of extra processing time, exports were taking up large amounts of our team’s time. Reliability needed fixing before we worked on performance, and firefighting always focused on reliability. More importantly, our team was spending large amounts of time firefighting and "babysitting" exports. They had to be reactive, rather than proactive.

Simply, we outgrew the export system we put in place, and needed a more reliable, transparent, and cost-effective system if we wanted to scale further.

## Temporal to the rescue

Early in 2023, James opened an [RFC recommending using Temporal at PostHog](https://github.com/PostHog/meta/pull/99). Temporal is a workflow engine abstracting away the details of failure modes, retry logic, and timeouts. This enables developers to build and deploy rock-solid business logic. It is used by big companies with large amounts of data flows like Uber, Coinbase, Doordash, and Hashicorp.

In Q2, Tomas’ goal was "rock solid-batch processing" and [we chose Temporal](https://github.com/PostHog/meta/pull/99) to build it because it helped solve issues like:

- Retry, resume, cancel, and timeout logic per activity and workflow
- Provides assurances about running exactly-once
- Visibility into the status of workflows, including errors and logging.

Instead of building all this functionality ourselves, Temporal takes care of it for us. After some debate, we felt building a workflow engine would not be a competitive advantage for us. Nothing about what we build on Temporal is novel enough to justify an investment into a competing runtime (as satisfying as it would be to write).

## How we built our new export system with Temporal

We didn’t completely rebuild our export system; many of the pieces still worked, we just needed to modify them to work with Temporal’s scheduling and execution capabilities. This meant building a batch export abstraction layer on top of Temporal. Specifically, the abstraction layer is four models:

- `BatchExportDestination`: How users configure where to export data their data.
- `BatchExportSchedule`: Maps to a [Temporal Schedule](https://keithtenzer.com/temporal/temporal_schedules/). It stores Schedule configurations to pass to Temporal.
- `BatchExport`: The union of a `BatchExportSchedule` with a `BatchExportDestination`. Defines a destination for exported data, and a schedule to run said exports.
- `BatchExportRun`: A `BatchExport` for each triggered workflow. Users aren’t meant to create these, only Temporal. They mostly serve to report on individual workflow executions.

Users create a `BatchExport` that includes a schedule (which validates against the `BatchExportSchedule`) and a destination (stored as a `BatchExportDestination`). Data then gets read from PostHog and processed to write to the destination.

With this structure in place, we began working on improving reliability, transparency, and performance.

### Improving reliability and adding retries

We prioritized improving reliability. As mentioned, Temporal has support for retry and timeout logic per activity and workflow which made a big difference. What we needed to do was tune this to our system and destinations. We needed to tune four main pieces:

1. **ClickHouse** - [spaced out retries](https://github.com/PostHog/posthog/pull/15558) when reconnecting to prevent failures if in use by another query, retry [connection errors](https://github.com/PostHog/posthog/pull/16574) which are likely network failures rather than outages, use [offline ClickHouse cluster](https://github.com/PostHog/posthog/pull/16470) to improve performance and allowable query length, and sacrificed some performance to [de-duplicate batches](https://github.com/PostHog/posthog/pull/16354) by adding `DISTINCT ON` clause (because it handles queries asynchronously so de-duplication isn’t guaranteed).
2. **Postgres** - [health checks](https://github.com/PostHog/posthog/pull/16079) to ensure it is healthy before running workflows and [retry forever](https://github.com/PostHog/posthog/pull/16703) because we control everything related to those activities so failures are transient (other than bugs).
3. **Destinations** - define which destination errors are [retriable and which aren’t](https://github.com/PostHog/posthog/pull/16814), [reset the iterator when a `JSONDecodeError` happens](https://github.com/PostHog/posthog/pull/16473) to keep the workflow going, and handle [query output](https://github.com/PostHog/posthog/pull/16247) errors from Snowflake.
4. **Temporal** -  add [max retries and errors](https://github.com/PostHog/posthog/pull/15399) so it doesn’t retry forever, add [heartbeat API to track activity](https://github.com/PostHog/posthog/pull/16494) because we lose state on deployment causing exports to reset, and create an [endpoint](https://github.com/PostHog/posthog/pull/16181) for resetting a `BatchExportRun`.

### Making exports transparent (internally and externally)

The second part of the move to Temporal was making processes  transparent both internally and externally.

As mentioned in the last section, Temporal creates transparency into the errors workflows encounter. We can now also track types and records exported. Both these enable us to improve the export system further and faster than the old system.

For users, the old system hides runs. Exports now [have their own page](https://app.posthog.com/exports). On this page, users can configure, start, [pause, unpause](https://github.com/PostHog/posthog/pull/16050), reset, [edit](https://github.com/PostHog/posthog/pull/16869), and [delete](https://github.com/PostHog/posthog/pull/16066) exports. They also can set up backfills using [date range](https://github.com/PostHog/posthog/pull/16286), [start, and end selectors](https://github.com/PostHog/posthog/pull/16330) for export runs.

The work to make exports transparent required us to improve encryption too. This included adding an [encryption codec](https://github.com/PostHog/posthog/pull/15566) because Temporal imports aren’t encrypted by default and our inputs can contain credentials. We also changed `BatchExportDestinations` to an `EncryptedJSONField` to ensure no encrypted credentials in the database and no credentials (neither encrypted nor unencrypted) in the logs.

### Improving performance

Finally, with improved reliability, we can put effort into improving performance. Based on our work so far, we’re confident there are many potential gains here. We know this because we repeatedly bumped up the timeout time or number of retries during development. We learned some exports took longer than initially expected ([over 30 minutes](https://github.com/PostHog/posthog/pull/16507)).

A big performance gain was [implementing our own ClickHouse async client](https://github.com/PostHog/posthog/pull/16583), then streaming results in Apache Arrow format. This helped us move away from the inefficient `JSONEachRow` form which takes ClickHouse 25-30 minutes to stream 800k rows (total of 5GB). The same 800k rows stream in 300MB and less than a minute with Apache Arrow.

Other improvements also include running `BatchExportRuns` [simultaneously](https://github.com/PostHog/posthog/pull/16678) by scheduling them together and buffering backfills to prevent larger ones from starving all other workflows.

## Our new export system

We needed this work for exports to be a "first-class" feature in PostHog. With this structure in place:

1. More work can go into improving the performance of exports. 
2. Less time spent on firefighting. 
3. We have better visibility into how workflows are failing and can target solutions to these problems. 

Having a reliable, transparent, and performant export system enables us to further improve our customer data platform and warehouse functionality which is key for us to succeed in the long term.

## Further reading

- [How PostHog built an app server (from MVP to billions of events)](/blog/how-we-built-an-app-server)
- [The modern data stack sucks](/blog/modern-data-stack-sucks)
- [In-depth: ClickHouse vs Snowflake](/blog/clickhouse-vs-snowflake)