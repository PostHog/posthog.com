---
title: ClickHouse
sidebar: Docs
showTitle: true
---

ClickHouse® is an open-source, high performance columnar OLAP database management system for real-time analytics using SQL.

We internally use it to store information like:
- event
- person
- person distinct id / session

and to power all our analytics queries.

## Scaling up
Check out the [configuration](/docs/self-host/deploy/configuration#scaling-up) section of our self-deploy docs!

## Dictionary
* sharding: is a method for horizontally partitioning a dataset
* shard: holds a partition of the dataset
* replica: is a node part of a shard
* distributed table: is a table distributed across multiple shards

## Useful links
- [Official documentation](https://clickhouse.tech/docs/en/)
