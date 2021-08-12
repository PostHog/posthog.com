---
date: 2021-08-13
title: Why we’re moving you to ClickHouse - Benefits and tradeoffs
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: mo-shehu
featuredImage: ../images/blog/filename.png
featuredImageType: full
---
We're pleased to introduce ClickHouse as the underlying database for our event analytics. 

[insert any other context here]

## Why ClickHouse?

ClickHouse is a database designed to enable fast, efficient analytics computations across multiple machines. We are moving [PostHog Open Source]() from PostgreSQL to ClickHouse because ClickHouse is a better overall experience on every level. Postgres runs out of capacity quickly and doesn’t support the advanced analytics we need for our product, and there is no way to scale PostgreSQL beyond a certain point.
There are several benefits to using ClickHouse over PostgreSQL, such as:
* Speed: ClickHouse is orders of magnitude faster than most other databases, mainly because of how tightly it couples storage and computing power, resulting in significantly quicker query response times.
* Cost: With more efficient use of processing power, memory, and storage (plus horizontal scaling), you can use cheaper commodity boxes versus having to scale up using specialized (read: costlier) software.
* Migrations: Moving over from another database? ClickHouse lets you create materialized versions of your data thanks to its advanced engine, resulting in exponentially faster migrations between deployments.
* Scalability: Clickhouse features a column-based database structure, meaning that [insert more context here that explains the concept simply]. Because of this, scaling and maintaining a ClickHouse cluster is pretty easy as long as you’re sharding, replicating, and distributing your tables correctly.
* Deployment: Other database systems depend on a storage layer, a compute layer, and a resource scheduler (like YARN) to be deployed properly. ClickHouse is just one binary - meaning that [insert more context]. As such, deployment is a breeze.
* Documentation - [ClickHouse’s documentation](https://clickhouse.tech/docs/en/) has come a long way in the last few years, and Altinity, a company that supports the ecosystem, has excellent [documentation](https://docs.altinity.com/ available as well.
* Fault tolerance - ClickHouse supports native replication, which we use heavily. You basically can have N number of replicas for any given table - all you have to do is name the replica and point it to the metadata location in ZooKeeper.

# Why we’ll continue using PostgreSQL alongside ClickHouse

PostgreSQL is great for managing frequently updated data like users and [insert other examples], but for telemetry and event data we’ll default to ClickHouse. And while our app updates ClickHouse with data changes, the source of truth remains PostgreSQL. At the same time, we’ll work hard with existing users and early enthusiasts to migrate over to ClickHouse. 
Check out [PostHog](https://posthog.com/docs/self-host) Free today.
