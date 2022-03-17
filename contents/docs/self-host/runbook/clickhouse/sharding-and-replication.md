---
title: Sharding and replication
sidebar: Docs
showTitle: true
---


Sharding is a horizontal cluster scaling strategy that puts parts of one ClickHouse database on different shards. This can help you to:

- Improve fault tolerance.

    Sharding lets you isolate individual host or replica set malfunctions. If you don't use sharding, then when one host or a set of replicas fails, the entire data they contain may become inaccessible. But if 1 shard out of 5 fails, for example, then 80% of the table data is still available.

- Improve the query performance.

    Requests compete with each other for the computing resources of cluster hosts, which can reduce the rate of request processing. This drop in the rate usually becomes obvious as the number of read operations or CPU time per query grows. In a sharded cluster where queries to the same table can be executed in parallel, competition for shared resources is eliminated and query processing time is reduced.

## How to set up sharding and replication

Sharding PostHog ClickHouse is a new experimental feature only supported from PostHog 1.34.0.

To use sharding, first upgrade to version >= 1.34.0 and run the `0004_replicated_schema` async migration

### Using PostHog Helm charts

Update `values.yaml` with the appropriate sharding settings.

Example:

```yaml
clickhouse:
  layout:
    shardsCount: 3
    replicasCount: 2
```


PostHog helm charts implement sharding by leveraging clickhouse-operator configuration. Full documentation for this can be found in [clickhouse-operator documentation](https://github.com/Altinity/clickhouse-operator/blob/master/docs/custom_resource_explained.md#clusters-and-layouts)

### With external ClickHouse

If you're using an external ClickHouse provider like [Altinity.Cloud](/docs/self-host/configure/using-altinity-cloud), you can change
sharding and replication settings within that platform.

Note that to propagate all the schemas to the new ClickHouse nodes, you should also do an `helm upgrade` which creates the right schema
on the new nodes.
