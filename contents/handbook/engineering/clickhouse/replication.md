---
title: Data replication and distributed queries
---

This document provides information on:
- How data replication and Distributed table engine works in ClickHouse
- How to monitor replication
- Distributed query execution
- Important gotchas

## Setting up replicated tables

A great guide on setting up replicated tables on a pre-existing cluster can be found in
[ClickHouse documentation](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replication/).

Some important highlights are:
- ClickHouse replication works on a table-by-table level, tables need to be created on all shards (preferably via using `ON CLUSTER`)
- Replication requires a running ZooKeeper setup. In the future, this might be replaced by `clickhouse-keeper`

<blockquote class='warning-note'>
<b>IMPORTANT GOTCHA: </b>

Always use unique ZooKeeper paths for table definitions as re-use can and will lead to data loss. This applies even
if the previous table has been dropped.
</blockquote>

### Sharding replicated tables

Sharding helps scale out a database fleet by having each machine only s

To decide whether to shard a table, consider how it's queried and what data it stores:
- Shard: tables that could become too large for a single server (e.g. events, logs, raw analytics data)
- Don't shard: table often JOINed in queries (e.g. persons, groups, cohorts) where the whole dataset is needed.

Sharding also requires care given in the schema - queries touching data should ideally only need to load data from a given shard.

When creating a replicated table, configuring whether a table is sharded or not is done via varying the parameters to a ReplicatedMergeTree engine:

- Example sharded engine: `ReplicatedMergeTree('/zk/some/path/{shard}/tablename', '{replica}')`
- Example not sharded table engine: `ReplicatedMergeTree('/zk/some/path/tablename', '{replica}-{shard}')`

## `Distributed` table engine

[`Distributed` table engine](https://clickhouse.com/docs/en/engines/table-engines/special/distributed/) tables
are used to query and write to sharded tables. Note that Distributed engine tables do not store any data on its own
but rather always fan out to `ReplicatedMergeTree` tables on the cluster.

TODO: Limitations of distributed tables. No aliases, materialized columns, etc.

## How queries against `Distributed` tables work

When querying Distributed table, you can send the query to any node in the ClickHouse cluster. That node becomes the `coordinator`, which
1. Figures out what queries individual shards need to execute and queues these queries
2. Once results are in, aggregates the results together and returns an answer

Given local execution is faster than reading data over the network, ClickHouse will usually perform the nodes shards query locally instead of sending it to another replica in the shard. This behavior is controlled by [`prefer-localhost-replica` setting](https://clickhouse.com/docs/en/operations/settings/settings/#settings-prefer-localhost-replica)

Note that the sub-queries executed on other shards might return already aggregated data or it might stream entire datasets across the network depending on the query.

### Example query - distributed sums

Consider the following tables:

```sql
CREATE TABLE sharded_sensor_values ON CLUSTER 'my_cluster' (
    timestamp DateTime,
    site_id UInt32,
    event VARCHAR,
    uuid UUID,
    metric_value Int32
)
ENGINE = ReplicatedMergeTree('/clickhouse/tables/{shard}/sharded_sensor_values', '{replica}')
ORDER BY (site_id, toStartOfDay(timestamp), event, uuid)
SETTINGS index_granularity = 8192

CREATE TABLE distributed_sensor_values ON CLUSTER 'my_cluster' (
    timestamp DateTime,
    site_id UInt32,
    event VARCHAR,
    uuid UUID,
    metric_value Int32
)
ENGINE = Distributed('my_cluster', 'default', 'sharded_sensor_values', intHash64(site_id))
```

Writes and queries should be made against table `distributed_sensor_values` in this schema. It then distributes the data according to `site_id`.

<details><summary>See query to populate data</summary>

```sql
INSERT INTO distributed_sensor_values
SELECT *
FROM generateRandom('timestamp DateTime, site_id UInt8, event VARCHAR, uuid UUID, metric_value Int32', NULL, 10)
LIMIT 100000000
```
</details>

Consider this simple aggregation query executed against `clickhouse01`:

```sql
SELECT hostName(), sum(metric_value) FROM distributed_sensor_values GROUP BY hostName()

-- Results:
-- ┏━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┓
-- ┃ hostname()   ┃ sum(metric_value) ┃
-- ┡━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━┩
-- │ clickhouse01 │    -9035836479117 │
-- ├──────────────┼───────────────────┤
-- │ clickhouse03 │    10003905228283 │
-- └──────────────┴───────────────────┘
```

[`hostname` is a clickhouse helper function](https://clickhouse.com/docs/en/sql-reference/functions/other-functions/#hostname) which
returns the hostname query is executed on.

In this case `clickhouse01` was the coordinator node. It:
- sent out a query to `clickhouse03` on other shard to execute. The query was ```SELECT hostname(), sum(`metric_value`) FROM `default`.`sharded_sensor_values` GROUP BY hostname()```
- Ran the query locally, getting getting aggregated results.
- Combined both the local and remote results

In this case minimal network traffic happened since the results of a query could be combined independently.

<details><summary>Click to see full `EXPLAIN` plan</summary>
```
Expression ((Projection + Before ORDER BY))
Header: hostname() String
        sum(metric_value) Int64
  MergingAggregated
  Header: hostname() String
          sum(metric_value) Int64
    SettingQuotaAndLimits (Set limits and quota after reading from storage)
    Header: hostname() String
            sum(metric_value) AggregateFunction(sum, Int32)
      Union
      Header: hostname() String
              sum(metric_value) AggregateFunction(sum, Int32)
        Aggregating
        Header: hostname() String
                sum(metric_value) AggregateFunction(sum, Int32)
          Expression (Before GROUP BY)
          Header: metric_value Int32
                  hostname() String
            SettingQuotaAndLimits (Set limits and quota after reading from storage)
            Header: metric_value Int32
              ReadFromMergeTree
              Header: metric_value Int32
              Indexes:
                PrimaryKey
                  Condition: true
                  Parts: 6/6
                  Granules: 5723/5723
        ReadFromRemote (Read from remote replica)
        Header: hostname() String
                sum(metric_value) AggregateFunction(sum, Int32)
```
</details>

### Example query: LIMIT, filter and aggregate

Consider this query:

```sql
SELECT
    toYear(timestamp),
    uniq(site_id)
FROM distributed_sensor_values
GROUP BY toYear(timestamp)
ORDER BY uniq(site_id) DESC
LIMIT 20
```

In this case the query sent to other shards cannot do all the work on its own. Instead, the query being sent to the other shard
would look something like the following:

```sql
SELECT
    toStartOfDay(timestamp),
    avgState(metric_value)
FROM sharded_sensor_values
WHERE timestamp > '2010-01-01' and timestamp < '2023-01-01'
GROUP BY toStartOfDay(timestamp)
```

In `EXPLAIN` output this would be expressed as:

```
ReadFromRemote (Read from remote replica)
Header: toStartOfDay(timestamp) DateTime
        avg(metric_value) AggregateFunction(avg, Int32)
```

This is a lot of data that needs to be streamed over the network and

`avgState` is a [aggregate function combinator](https://clickhouse.com/docs/en/sql-reference/aggregate-functions/combinators/#-state). It's useful since than needing to send over all the unique metric_values, the coordinator can send back values that the coordinator can combine
with its own results.

One important aggregate function combinator is `uniqState` which calculate number of unique instances of

<details><summary>Click to see full `EXPLAIN` plan</summary>

```
Expression (Projection)
Header: toStartOfDay(timestamp) DateTime
        metric_value Float64
  Limit (preliminary LIMIT (without OFFSET))
  Header: toStartOfDay(timestamp) DateTime
          avg(metric_value) Float64
    Sorting (Sorting for ORDER BY)
    Header: toStartOfDay(timestamp) DateTime
            avg(metric_value) Float64
      Expression (Before ORDER BY)
      Header: toStartOfDay(timestamp) DateTime
              avg(metric_value) Float64
        MergingAggregated
        Header: toStartOfDay(timestamp) DateTime
                avg(metric_value) Float64
          SettingQuotaAndLimits (Set limits and quota after reading from storage)
          Header: toStartOfDay(timestamp) DateTime
                  avg(metric_value) AggregateFunction(avg, Int32)
            Union
            Header: toStartOfDay(timestamp) DateTime
                    avg(metric_value) AggregateFunction(avg, Int32)
              Aggregating
              Header: toStartOfDay(timestamp) DateTime
                      avg(metric_value) AggregateFunction(avg, Int32)
                Expression (Before GROUP BY)
                Header: metric_value Int32
                        toStartOfDay(timestamp) DateTime
                  SettingQuotaAndLimits (Set limits and quota after reading from storage)
                  Header: timestamp DateTime
                          metric_value Int32
                    ReadFromMergeTree
                    Header: timestamp DateTime
                            metric_value Int32
                    Indexes:
                      PrimaryKey
                        Keys:
                          toStartOfDay(timestamp)
                        Condition: and((toStartOfDay(timestamp) in (-Inf, 1672531200]), (toStartOfDay(timestamp) in [1262304000, +Inf)))
                        Parts: 6/6
                        Granules: 1628/5723
              ReadFromRemote (Read from remote replica)
              Header: toStartOfDay(timestamp) DateTime
                      avg(metric_value) AggregateFunction(avg, Int32)
```

</details>



### Query settings

Some noteworthy [query settings](https://clickhouse.com/docs/en/operations/settings/settings/) which affect the behavior of distributed queries are:

- https://clickhouse.com/docs/en/operations/settings/settings/#distributed-group-by-no-merge
- https://clickhouse.com/docs/en/operations/settings/settings/#distributed-push-down-limit
- https://clickhouse.com/docs/en/operations/settings/settings/#optimize-distributed-group-by-sharding-key
- https://clickhouse.com/docs/en/operations/settings/settings/#settings-prefer-localhost-replica

Many of these unlock potential optimizations by streaming less data over the network, but require data to be sharded correctly to work.

## Choosing sharding_key


### Further reading

- https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replication/
- https://altinity.com/presentations/strength-in-numbers-introduction-to-clickhouse-cluster-performance

TODO: cluster and clusterAllReplicas functions
TODO: https://clickhouse.com/docs/en/operations/settings/settings/#distributed-group-by-no-merge and sharding_key and optimize_distributed_group_by_sharding_key


```
EXPLAIN indexes=1, header=1 SELECT
    toStartOfDay(timestamp),
    event,
    sum(metric_value) as total_metric_value
FROM distributed_sensor_values
WHERE site_id = 233 AND timestamp > '2010-01-01' and timestamp < '2023-01-01'
GROUP BY toStartOfDay(timestamp), event
ORDER BY total_metric_value DESC
LIMIT 20
FORMAT LineAsString
```


```
EXPLAIN indexes=1, header=1 SELECT
    toYear(timestamp),
    uniq(site_id)
FROM distributed_sensor_values
GROUP BY toYear(timestamp)
ORDER BY uniq(site_id) DESC
LIMIT 20
FORMAT LineAsString
```


EXPLAIN indexes=1, header=1 SELECT
    toStartOfDay(timestamp),
    avg(metric_value) as metric_value
FROM distributed_sensor_values
WHERE timestamp > '2010-01-01' and timestamp < '2023-01-01'
GROUP BY toStartOfDay(timestamp)
ORDER BY metric_value DESC
LIMIT 20
FORMAT LineAsString
