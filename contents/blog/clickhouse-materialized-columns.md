---
date: 2021-09-09
title: Speeding up ClickHouse with Materialized Columns
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: engineering
author: karl-aksel-puulmann
featuredImage: ../images/blog/automating-software-company-github-actions.png
featuredImageType: full
---

One quite obscure feature of ClickHouse is Materialized Columns, which allows dynamically creating columns using an expression. In this post, I’ll walk through an example query optimization in which materialized columns work well.

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

Each event has an ID,  event type, timestamp, and a JSON representation of event properties. The properties can include the current URL and any other user-defined properties that describe the event (e.g. NPS survey results, person properties, timing data, etc).

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

On a large test dataset this query takes a while complete, while without the url filter the query is almost instant. Adding even more filters just makes the query slower and slower. Let’s dig in why!

## Looking at flamegraphs

ClickHouse has great tools for introspecting queries. Looking at `system.query_log`  we can see that the query:

- Took 3433ms
- Read 79.17 GiB from disk

To dig even deeper, we can use clickhouse-flamegraph to peek into what the CPU is doing during query execution.

[![Flamegraph](../images/blog/clickhouse-materialized-columns/query-json-extract-CPU.svg)](../images/blog/clickhouse-materialized-columns/query-json-extract-CPU.svg)

From this we can see that the clickhouse node CPU is spending most of its time parsing JSON.

The typical solution would be to extract $current_url to a separate column. This would get rid of the JSON parsing and reduce the amount of data read from disk.

However, in this particular case it wouldn’t work because:

1. The data is passed from users - meaning we’d end up with millions (!) of unique columns
2. This would complicate live data ingestion a lot, introducing new and exciting race conditions


## Enter materialized columns

A less known feature of ClickHouse is the concept of materialized columns. You can add one as follows:

```sql
ALTER TABLE events
ADD COLUMN mat_$current_url
VARCHAR MATERIALIZED JSONExtractString(properties_json, '$current_url')
```

This will create a new column that will be automatically filled for incoming data. Under the hood ClickHouse stores the

Running the query again would immediately not yet speed up the query since historical data is unaffected. The way around this is running an [OPTIMIZE](https://clickhouse.tech/docs/en/sql-reference/statements/optimize/) command [1] :

```sql
OPTIMIZE TABLE events FINAL
```

Running the updated query speeds things up significantly:

```sql
SELECT count(*)
FROM events
WHERE event = '$pageview'
  AND mat_$current_url = 'https://app.posthog.com/login'
  AND timestamp >= '2021-08-01'
  AND timestamp < '2021-09-01'
```

Looking at `system.query_log`, the new query:

- took 980ms (**71% improvement**)
- read 14.36 GiB from disk (**81% improvement**) [2]

The wins are even more magnified if more than one property filter is used at a time.


## Usage at PostHog

PostHog as an analytics tool allows users to slice and dice their data in many ways across huge time ranges and datasets. This also means that performance when investigating things is of key importance but also that we currently do nearly no preaggregation.

Rather than materialize all columns, built a solution which looks at recent slow queries using `system.query_log`, determines which properties need materializing from there and backfills the data on a weekend. [3] [4]

After implementing and materializing our top 100 columns we took a look at queries we consider slow (> 3 seconds long) and found on average a 55% improvement in query times with materialized columns, with the p99 being 25x improvement.


Interested on working on problems like this? We’re hiring!

[1]: This is really expensive and there’s a feature request on [Github](https://github.com/ClickHouse/ClickHouse/issues/27730) for adding specific commands for this. As a work-around you can temporarily set the column to use `DEFAULT` instead and backfill part of the data using `ALTER TABLE events UPDATE mat_$current_url = mat_$current_url WHERE timestamp >= '2021-08-01'`

[2]: Inspecting `system.column_parts`, mat_$current_url is only 1.5% the size of `properties_json` on disk with a 10x compression ratio. Other properties which have lower cardinality can achieve even better compression (we’ve seen up to 100x)!

[3]: This works well because not every query needs optimizing and a small subset of properties make up most of what’s being queried.

[4]: We also needed to rebuild parts of our query builder to query the right columns and avoid querying `properties`  if it wasn’t actually used.


_Loved this? Let us know on [Twitter](https://twitter.com/posthoghq) or [LinkedIn](https://linkedin.com/company/posthog), and subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._

