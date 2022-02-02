---
title: Query performance optimization
sidebar: Handbook
showTitle: true
---

Making sure PostHog operates fast at scale is key to our success.

This document outlines some best practices to archive good query performance at scale, as well as describing tools and procedures to discover and fix performance issues.

PostHog uses two different datastores:

- **PostgreSQL**: row-oriented OLTP database, mainly used to store and query datasets using predictable clausole(s). It is likely your best choice if:
    - the query pattern to access your dataset is predictable
    - the dataset will likely not grow overtime above (<= 1 TB)
    - the dataset needs to mutate often (`DELETE`/`UPDATE`)
    - the query pattern requires joins across multiple tables

- **ClickHouse**: column-oriented OLAP database, used to store large datasets and run on them analytical queries. It is likely your best choice if:
    - the query pattern to access your dataset is unpredictable
    - the dataset will likely grow overtime (> 1 TB)
    - the dataset doesn't need to mutate often (`DELETE`/`UPDATE`)
    - the query pattern doesn't requires joins across multiple tables

## PostgreSQL

#### Coding best practices

1. only ask for the field(s) you need: `SELECT name, surname` is better than `SELECT *` (the latter is only helpful in few edge cases)

1. only ask for the row(s) you need: use a `LIMIT` condition at the end of your query

1. (if possible) avoid explicit transactions: if you can't, keep them small since transactions lock the processing tables data and may result in deadlocks (super discouraged to use them in application hot paths)

1. (if possible) avoid `JOIN`

1. **always avoid** foreign keys: they are in your way to shard your database, your app is accustomed to rely on them to maintain data integrity instead of doing it on its own, they have performance impact (they add an additional lookup for each insert/delete), they lead to unpredictable performance, ...

1. avoid the use of subqueries: a subquery is a `SELECT` statement that is embedded in a clause of another SQL statement. It's easier to write, but `JOIN`s are usually better-optimized for the database engines.

1. use appropriate [data type(s)](https://www.postgresql.org/docs/10/datatype.html): not all the types occupy the same, and when we use a concrete data type, we can also limit its size according to what we store. For example, `VARCHAR(4000)` is not the same as `VARCHAR(40)`. We always have to adjust to what we will store in our fields not to occupy unnecessary space in our database (and we should enforce this limit in the application code to avoid query errors).

1. use the `LIKE` operator only if necessary: if you know what you are looking for use the `=` operator

#### Indexing

If you are programmatically ordering, sorting, or grouping by a column, you should probably have an index on it. The caveat is that indexing slows down writes to the table and takes disk space (please drop unused indexes).

Composite indices are useful when you want to optimize querying on multiple non-conditional columns. For more info on indices and multi-column indices see the [official docs](https://www.postgresql.org/docs/).

### How-to find slow queries

To find and debug slow queries in production we currently have a single option available: pull real time logs from Heroku by executing `heroku logs --app posthog --ps postgres`

### How-to fix slow queries
Fixing a slow query is usually a 3 steps process:

1. identify which part of the codebase is generating it (adding the stacktrace as query comments is usually helpful to map query <-> code).

1. re-run the query with `EXPLAIN (ANALYZE, COSTS, VERBOSE, BUFFERS, FORMAT JSON)` as prefix to get the query plan. Query plans aren't the easiest thing to read. They're packed with information and it's closer to being machine parsable than human readable. Postgres Explain Viewer 2 (aka [pev2](https://explain.dalibo.com/), see GitHub [repository](https://github.com/dalibo/pev2)) is a tool to simplify reading query plans. It provides a horizontal tree with each node representing a node in the query plan. It includes timing information, the error amount in the planned versus actual times, and badges for interesting nodes like "costliest" or "bad estimate".

1. fix the query that should now generate a less costly `EXPLAIN` plan.


## ClickHouse

#### How-to find slow queries

To find and debug slow queries in production you have several options available

##### Grafana

The [Clickhouse queries - by endpoint](https://metrics.posthog.com/d/vo7oCVZ7z/clickhouse-queries-by-endpoint) dashboard gives a breakdown of how things are looking reliability and performance-wise.
Highly used and slow/unreliable endpoints often indicate issues with queries.

##### PostHog `instance/status` dashboard

Under https://app.posthog.com/instance/status/internal_metrics you will find various metrics and query logs.
Note: if you are a staff user you can also analyze queries by clicking on them (or copying your own queries).

This analysis will output:
- Query runtime
- Number of rows read / Bytes read
- Memory used
- Flamegraphs for CPU, time and memory

These can be useful for figuring out _why_ certain queries are performing slow.

##### Metabase
Need more granular access to queries than these dashboards provide? Take a look at [this Metabase query](https://metabase.posthog.net/question/97). The ClickHouse `system` tables (e.g. `system.query_log`) provide a lot of useful information for identifying and diagnosing slow queries.

### How-to fix slow queries

TODO

If you have a fix, you need to make sure it works and doesn't regress.
Under the main repo, you can find a query performance benchmark suite at `ee/benchmarks`. These are run nightly on master. You can refresh this manually by running the [Benchmark workflow](https://github.com/PostHog/posthog/actions/workflows/benchmark.yml), which might be handy for chained PRs.

After fixing an issue:
1. Make sure there's an appropriate benchmark for the fix
2. Add `performance` label to your PR to get information about the performance changes

Only changes > 20% are reported. ClickHouse queries are run on a private ClickHouse installation with pre-populated data.
