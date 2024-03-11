---
date: 2021-10-26
title: How to speed up ClickHouse queries using materialized columns
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - karl-aksel-puulmann
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
tags:
  - Guides
  - ClickHouse
---

ClickHouse supports speeding up queries using materialized columns to create new columns on the fly from existing data. In this post, I’ll walk through a query optimization example that's well-suited to this rarely-used feature.

Consider the following schema:

```sql
CREATE TABLE events (
    uuid UUID,
    event VARCHAR,
    timestamp DateTime64(6, 'UTC'),
    properties_json VARCHAR,
)
ENGINE = MergeTree()
ORDER BY (toDate(timestamp), event, uuid)
PARTITION BY toYYYYMM(timestamp)
```

Each event has an ID, event type, timestamp, and a JSON representation of event properties. The properties can include the current URL and any other user-defined properties that describe the event (e.g. NPS survey results, person properties, timing data, etc.).

This table can be used to store a lot of analytics data and is similar to what we use at PostHog.

If we wanted to query login page pageviews in August, the query would look like this:

```sql
SELECT count(*)
FROM events
WHERE event = '$pageview'
  AND JSONExtractString(properties_json, '$current_url') = 'https://app.posthog.com/login'
  AND timestamp >= '2021-08-01'
  AND timestamp < '2021-09-01'
```

This query takes a while complete on a large test dataset, but without the URL filter the query is almost instant. Adding even more filters just slows down the query. Let's dig in to understand why.

## Looking at flamegraphs

ClickHouse has great tools for introspecting queries. Looking at `system.query_log` we can see that the query:

- Took 3,433 ms
- Read 79.17 GiB from disk

To dig even deeper, we can use [`clickhouse-flamegraph`](https://github.com/Slach/clickhouse-flamegraph) to peek into what the CPU did during query execution.

<div
  class="relative mt-2 mb-4"
>
  <object
    data={'/images/flamegraph.svg'}
    type="image/svg+xml"
  />
</div>

From this we can see that the ClickHouse server CPU is spending most of its time parsing JSON.

The typical solution would be to extract `$current_url` to a separate column. This would get rid of the JSON parsing and reduce the amount of data read from disk.

However, in this particular case it wouldn’t work because:

1. The data is passed from users - meaning we’d end up with millions (!) of unique columns
2. This would complicate live data ingestion a lot, introducing new and exciting race conditions

## Enter materialized columns

Turns out, those are exactly the problems materialized columns can help solve.

```sql
ALTER TABLE events
ADD COLUMN mat_$current_url
VARCHAR MATERIALIZED JSONExtractString(properties_json, '$current_url')
```

The above query creates a new column that is automatically filled for incoming data, creating a new file on disk. The data is automatically filled during `INSERT` statements, so data ingestion doesn't need to change.

The trade-off is more data being stored on disk. In practice, ClickHouse compresses data well, making this a worthwhile trade-off. On our test dataset, `mat_$current_url` is only 1.5% the size of `properties_json` on disk with a 10x compression ratio. Other properties which have lower cardinality can achieve even better compression (we’ve seen up to 100x)!

Just creating the column is not enough though, since old data queries would still resort to using a `JSONExtract`. For this reason, you want to backfill data. The easiest way currently is to run the [OPTIMIZE](https://clickhouse.tech/docs/en/sql-reference/statements/optimize/) command:

```sql
OPTIMIZE TABLE events FINAL
```

After backfilling, running the updated query speeds things up significantly:

```sql
SELECT count(*)
FROM events
WHERE event = '$pageview'
  AND mat_$current_url = 'https://app.posthog.com/login'
  AND timestamp >= '2021-08-01'
  AND timestamp < '2021-09-01'
```

Looking at `system.query_log`, the new query:

- Took 980ms (**71%/3.4x improvement**)
- Read 14.36 GiB from disk (**81%/5x improvement**)

The wins are even more magnified if more than one property filter is used at a time.

## Backfilling efficiently

Using `OPTIMIZE TABLE` after adding columns is often not a good idea, since it will involve a lot of I/O as the whole table gets rewritten.

As of writing, there's a feature request on [Github](https://github.com/ClickHouse/ClickHouse/issues/27730) for adding specific commands for materializing specific columns on ClickHouse data parts.

Here's how you can use `DEFAULT` type columns to backfill more efficiently:

```sql
ALTER TABLE events
ALTER COLUMN mat_$current_url
VARCHAR DEFAULT JSONExtractString(properties_json, '$current_url');

ALTER TABLE events UPDATE mat_$current_url = mat_$current_url WHERE timestamp >= '2021-08-01';

-- Wait for mutations to finish before running this
ALTER TABLE events
ALTER COLUMN mat_$current_url
VARCHAR MATERIALIZED JSONExtractString(properties_json, '$current_url');
```

This will compute and store only the `mat_$current_url` in our time range and is much more efficient than `OPTIMIZE TABLE`.

Be aware though that this will:
1. Break your `INSERT` statements if you don't specify column names explicitly
2. Alter the behavior of `SELECT *` queries

## Usage at PostHog

PostHog as an analytics tool allows users to slice and dice their data in many ways across huge time ranges and datasets. This also means that performance is key when investigating things - but also that we currently do nearly no preaggregation.

Rather than materialize all columns, we built a solution that looks at recent slow queries using `system.query_log`, determines which properties need materializing from there, and backfills the data on a weekend. This works well because not every query needs optimizing and a relatively small subset of properties make up most of what’s being filtered on by our users.

You can find the code for this [here](https://github.com/PostHog/posthog/blob/c23704b3909ae8ebb827e6a43453e32b3d3487bd/ee/clickhouse/materialized_columns/analyze.py#L42-L119) and [here](https://github.com/PostHog/posthog/blob/c23704b3909ae8ebb827e6a43453e32b3d3487bd/ee/clickhouse/materialized_columns/columns.py#L37-L130).

After materializing our top 100 properties and updating our queries, we analyzed slow queries (>3 seconds long). **The average improvement in our query times was 55%, with 99th percentile improvement being 25x.**

As a product, we're only scratching the surface of what ClickHouse can do to power product analytics. If you're interested in helping us with these kinds of problems, [we're hiring](https://posthog.com/careers)!

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />

