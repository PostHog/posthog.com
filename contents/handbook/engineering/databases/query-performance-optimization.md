---
title: How to optimize queries
sidebar: Handbook
showTitle: true
---

Making sure PostHog operates fast at scale is key to our success.

This document outlines some best practices to archive good query performance at scale, as well as describing tools and procedures to discover and fix performance issues.

PostHog uses two different datastores:

- **PostgreSQL**: row-oriented OLTP database, mainly used to store and query datasets using predictable clause(s). It is likely your best choice if:
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

1. avoid the use of subqueries: a subquery is a `SELECT` statement that is embedded in a clause of another SQL statement. It's easier to write, but `JOIN`s are usually better-optimized for the database engines.

1. use appropriate [data type(s)](https://www.postgresql.org/docs/10/datatype.html): not all the types occupy the same, and when we use a concrete data type, we can also limit its size according to what we store. For example, `VARCHAR(4000)` is not the same as `VARCHAR(40)`. We always have to adjust to what we will store in our fields not to occupy unnecessary space in our database (and we should enforce this limit in the application code to avoid query errors).

1. use the `LIKE` operator only if necessary: if you know what you are looking for use the `=` operator

Note: for the Django app we currently rely on the Django-ORM as interface between our data and the relational database. While we don't directly write SQL queries in this case, the following best practices should be considered anyway.

If you want to print executed queries (while running with `DEBUG`) you can run:

```
from django.db import connection
print(connection.queries)
```

while for an individual query you can run:

```
print(Model.objects.filter(name='test').query)
```

#### Indexing

If you are programmatically ordering, sorting, or grouping by a column, you should probably have an index on it. The caveat is that indexing slows down writes to the table and takes disk space (please drop unused indexes).

Composite indices are useful when you want to optimize querying on multiple non-conditional columns. For more info on indices and multi-column indices see the [official docs](https://www.postgresql.org/docs/).

### How-to find slow queries

To find and debug slow queries in production you have a few options available:
- Browse to the [Diagnose](https://data.heroku.com/datastores/56166304-6297-4dce-af64-a1536ea2197c#diagnose) tab in Heroku Data's dashboard. You can break queries down by:
  - Most time consuming
  - Most frequently invoked
  - Slowest execution time
  - Slowest I/O
- You can also use Heroku's [Diagnose](https://blog.heroku.com/pg-diagnose) feature by running `heroku pg:diagnose` to get a breakdown of long running queries, long transactions, among other diagnostics.
- For a more raw approach you can access real time logs from Heroku by executing `heroku logs --app posthog --ps postgres`
- With any logs pulled from PostgreSQL you can use [pgbadger](https://github.com/darold/pgbadger) to find exactly the queries that are consuming the most time and resources.


### How-to fix slow queries
Fixing a slow query is usually a 3 steps process:

1. identify which part of the codebase is generating it (adding the stacktrace as query comments is usually helpful to map query <-> code).

1. re-run the query with `EXPLAIN (ANALYZE, COSTS, VERBOSE, BUFFERS, FORMAT JSON)` as prefix to get the query plan. Query plans aren't the easiest thing to read. They're packed with information and it's closer to being machine parsable than human readable. Postgres Explain Viewer 2 (aka [pev2](https://explain.dalibo.com/), see GitHub [repository](https://github.com/dalibo/pev2)) is a tool to simplify reading query plans. It provides a horizontal tree with each node representing a node in the query plan. It includes timing information, the error amount in the planned versus actual times, and badges for interesting nodes like "costliest" or "bad estimate".

1. fix the query that should now generate a less costly `EXPLAIN` plan.

### How-to reduce IO

Some operations we perform can cause a large amount of IO. For writes
specifically this can be from writing table data but also from writing to
indices. We're using the Django ORM to generate table schemas, which is
convenient but also tends to add indices where we perhaps either don't need
them, or where a single composite index would better serve our querying
patterns.

TODO: fill in other sources and mitigations to high IO

#### Removing unused indices on foreign key fields

When we add a `ForeignKey` to a model, django will add a couple of things that
we may or may not need, an index and a constraint. Sometimes these are
superfluous and we'd do better to not have these. For example, consider this
changes in [this PR](https://github.com/PostHog/posthog/pull/8579).

Here we had a table with two `ForeignKey`s, `team` and `person`. The query
pattern for this table always filters by `team` and the `distinct_id` `CharField`
column (it's essentially a lookup table from (`team_id`, `distinct_id`) ->
`person_id`). As a result we have an index on (`team_id`, `distinct_id`). The
`team_id` index that django is adding for the `ForeignKey` is not used at all,
as observed by running:

```
SELECT s.schemaname,
       s.relname AS tablename,
       s.indexrelname AS indexname,
       pg_relation_size(s.indexrelid) AS index_size
FROM pg_catalog.pg_stat_user_indexes s
   JOIN pg_catalog.pg_index i ON s.indexrelid = i.indexrelid
WHERE s.idx_scan = 0      -- has never been scanned
ORDER BY pg_relation_size(s.indexrelid) DESC;
```

To remove this index, we perform the following:

 1. add `db_index=False` to the `team` `ForeignKey`. This updates Djangos
    understanding of the state of the database schema.
 2. run `./manage.py makemigrations posthog` to generate a new database
    migration. One issue with the generated migration is that it does not `DROP`
    the index `CONCURRENTLY`. See the [postgresql
    docs](https://www.postgresql.org/docs/9.3/sql-dropindex.html) for more
    details here, but essentially it means that while the generated migration is
    running, the table will be locked, and we do not know how long for. Queries
    on this table will pile up and could cause an outage. To get around this we:
 3. manually update this generated migration to drop the index `CONCURRENTLY`.
    This updated command will return instantly, the table will not be locked,
    and dropping the index will happen in the background. Note that we need to
    use
    [`SeparateDatabaseAndState`](https://docs.djangoproject.com/en/3.2/ref/migration-operations/#separatedatabaseandstate)
    such that we can ensure that django will not create new migrations on
    subsequent runs.
    
Then once we've run this migration, we should see the index disappear from the
above index SQL results.

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
