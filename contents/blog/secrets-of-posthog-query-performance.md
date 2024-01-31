---
date: '2022-03-22'
title: The secrets of PostHog query performance
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/lw-queries.png
featuredImageType: full
author:
  - karl-aksel-puulmann
category: Engineering
tags:
  - Product updates
  - Launch week
---

We want PostHog to become the first choice for product analytics at any scale. To do that, users should have a smooth experience exploring their product data - including not waiting minutes for queries to load.

In this post, I’m going to break down the why’s and how’s of several major performance improvements we've made in the last few months to achieve that goal.

> This article is part of our [A Universe of New Features launch week](/blog/launch-week-universe-of-new-features) series

## How does querying work within PostHog?

The free-form querying experience in PostHog allows you to ask questions about your Trends, Funnels, Retention, and Cohorts with complicated filtering to top it off.

These queries are processed by [ClickHouse](https://clickhouse.com/), where event, user, and group data is stored in a raw format without any preaggregation. ClickHouse excels at analyzing billions of events in seconds even with complex filtering.

However, as awesome as ClickHouse is, nothing is without sharp edges and trade-offs.

## Speeding up property filtering by 25x

PostHog allows users to send and analyze an arbitrary number of event and user properties with their data. We store these properties as JSON-encoded string columns in our tables.

One of the first issues we saw after moving to ClickHouse was that, for our largest users, filtering by properties was slow.

[Benchmarking these queries using flamegraphs](https://github.com/Slach/clickhouse-flamegraph) showed that the slowness came from two things: reading JSON properties from disk and (to a lesser extent) parsing it during query-time.

We ended up [materializing the most used properties into new columns](/blog/clickhouse-materialized-columns), leveraging the strength of a columnar database without running into column number limits.

Specifically, the new materialized columns are fast to read from disk as they compress really well and ClickHouse can skip parsing JSON entirely during queries.

On our PostHog Cloud setup, we saw this feature improve query performance by 55% on average, with the p99 improvement being 25x.

## Making JOINs 10x faster for large users

Over time, for larger PostHog users with over 10 million visitors, some simple queries like a count of unique users started timing out or running into memory errors.

We narrowed this down to one particular JOIN in our system:

```sql
JOIN (
    SELECT distinct_id, argMax(person_id, _timestamp) as person_id
    FROM (
        SELECT distinct_id, person_id, max(_timestamp) as _timestamp
        FROM person_distinct_id
        WHERE project_id = 123
        GROUP BY person_id, distinct_id, team_id
        HAVING max(is_deleted) = 0
    )
    GROUP BY distinct_id
) AS pdi

-- Table schema
CREATE TABLE person_distinct_id
(
    distinct_id VARCHAR,
    person_id UUID,
    project_id Int64,
    _sign Nullable(Int8),
    is_deleted Nullable(Int8),
    _timestamp DateTime
) ENGINE = CollapsingMergeTree(_sign)
```

This JOIN is as complicated as it is due to a restriction from ClickHouse: updating data is expensive. In ClickHouse, updates require rewriting whole parts of the table instead of individual rows.

Instead, the recommended approach is to use a [ReplacingMergeTree](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replacingmergetree/) or [CollapsingMergeTree](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/collapsingmergetree/) table engine and handle updating logic at query-time.

During data ingestion, when a given `distinct_id` had its `person_id` changed, PostHog emits a row with `is_deleted=1` for the old `person_id` and a new row with `is_deleted=0`. The above query would then resolve the `distinct_id` => `person_id` mapping at query time.

However, in practice, this query was slow and used up too much memory, due to needing a subquery to aggregate data correctly. It also had subtle issues with using timestamps for versioning, which was problematic when ClickHouse encountered equal timestamps.

After noticing the problem, we realized we didn't need to actually emit rows with `is_deleted=0` to behave correctly, and could move to an alternative schema, which can be queried as follows:

```sql
JOIN (
    SELECT distinct_id, argMax(person_id, version) as person_id
    FROM person_distinct_id2
    WHERE project_id = 123
    GROUP BY distinct_id
    HAVING argMax(is_deleted, version) = 0
) AS pdi

-- Table schema
CREATE TABLE person_distinct_id2
(
    distinct_id VARCHAR,
    person_id UUID,
    project_id Int64,
    is_deleted Int8,
    version Int64 DEFAULT 1,
    _timestamp DateTime
) ENGINE = CollapsingMergeTree(version)
```

For PostHog users with over 10 million visitors, this sped up queries previously bottlenecked on this JOIN by up to 10x.

### Sorting events for a 23% win

While debugging other performance issues, one question we kept asking is whether our data is laid out optimally for performance.

PostHog uses a [ClickHouse MergeTree](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree/) table engine to store event data on disk. MergeTree tables can have an `ORDER BY` clause, which is then used by ClickHouse to store the data in a sorted format on disk and to create a sparse index of the data. The sparse index can then be used to skip reading data during queries.

Our `ORDER BY` clause originally looked something like this:

```sql
ORDER BY (
    project_id,
    toDate(timestamp),
    cityHash64(distinct_id),
    cityHash64(uuid)
)
```

With that in mind, let’s consider this simplified query counting the number of users who had pageviews within a given time range:

```sql
SELECT count(DISTINCT person_id)
FROM events
WHERE project_id = 2
    AND event = '$pageview'
    AND timestamp >= '2022-03-01'
    AND timestamp < '2022-04-01'
```

When executing this query, ClickHouse can leverage data being sorted and the sparse index to skip reading most of data from disk. In this case, events from other projects and organizations and events from months other than March.

However, almost all of our most time-sensitive queries in PostHog also filter by event type. After measuring and confirming this, we updated the `ORDER BY` clause to the following one:

```sql
ORDER BY (
    project_id,
    toDate(timestamp),
    event,
    cityHash64(distinct_id),
    cityHash64(uuid)
)
```

This resulted in a roughly 23% query speed up on average. The best trick for performance optimizations is to skip doing unnecessary work.

### Migrating data

Changing how data is sorted on disk is not cheap when you have billions on billions of events. For example, on PostHog Cloud, this took five separate attempts and multiple weeks in total to finish. In addition, PostHog has a lot of self-hosted users at various degrees of scale and technical skill who would need to repeat this process.

To tackle this problem, we ended up building a new [async migrations](/blog/async-migrations) system, which safely runs these long-running operations at scale with the press of a button, while handling common edge cases and keeping the platform up and usable.

## Self-hosted performance

As mentioned, PostHog can be self-hosted by our users. However, getting it working smoothly across a wide range of deployments at scale [keeps our infrastructure team hard at work](/blog/improving-posthog-deployments).

Some features coming in PostHog 1.34.0 (releasing on Thursday) which affect performance for self-hosted users are:

-   Ability to use an [external ClickHouse provider](/docs/self-host/configure/using-altinity-cloud). We’ve [partnered with Altinity to help support larger installations](/marketplace/altinity).
-   Support for ClickHouse sharding and replication [in our helm chart](/docs/runbook/services/clickhouse/sharding-and-replication). This allows leveraging more machines for faster queries.
-   (Expected in 1.35.0) Upgrading to ClickHouse 21.11: ClickHouse is changing rapidly and each new release is bringing in new performance improvements.

## What’s next?

Performance work is never complete and PostHog has a lot of work ahead of us to make answering questions about your product fast, no matter your scale.

Some projects currently in the pipeline are:

-   **Removing JOINs for persons (and groups)** - ClickHouse is not designed for doing large-scale joins. We’re currently in the middle of refactoring our entire data model for events, persons, and groups to remove the need for JOINs, bypassing the biggest bottleneck most queries share. More information about our plans can be found [in this PR](https://github.com/PostHog/meta/pull/39/files#diff-4ba257e4b25986d35b3f05a142677c187a7b082284dfb66d5fd74d759c52d618).
-   **Smart caching time-series queries** - PostHog dashboards continually refresh data to show up-to-date graphs. However this results in a lot of repeated work, slowing down queries. By changing semantics around user properties and identifying users, we will be able to start smartly re-using past results when re-calculating queries.
-   **Better JSON support in ClickHouse** - [This feature](https://github.com/ClickHouse/ClickHouse/issues/23516) has been experimentally released in ClickHouse 22.3 and will unlock the benefits of materialized columns with much less complexity.

> Interested in chatting about ClickHouse performance or working on similar problems? Send me an email: [karl+perf@posthog.com](mailto:karl+perf@posthog.com) or join our [community](/questions).

<ArrayCTA />
