---
date: 2021-08-20
title: We just made PostHog Open Source 1000x more scalable via ClickHouse
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - mo-shehu
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/clickhouse-announcement.png
featuredImageType: full
category: PostHog news
tags:
  - Product updates
  - ClickHouse
---
We're excited to announce a major under-the-hood upgrade for PostHog Open Source! Over the past few weeks, our team have been hard at work moving over from Postgres to ClickHouse, the same database that powers PostHog Cloud.

This means you can now use PostHog Open Source for free without being limited to 10k monthly active users. Read on to find about more about the benefits and how we did this!

## Why ClickHouse?

ClickHouse is a database designed to enable fast, efficient analytics computations across multiple machines. We are moving [PostHog Open Source](https://github.com/PostHog/posthog) from PostgreSQL because it doesn't support some features we need and struggles to scale beyond 10k monthly active users. ClickHouse, on the other hand, offers all the functionality we need and offers a much better experience with large volumes of data.

There are several benefits to using ClickHouse over PostgreSQL, such as:

* Speed: ClickHouse is orders of magnitude faster than most other databases, mainly because of how tightly it couples storage and computing power, resulting in significantly quicker query response times.

* Cost: With more efficient use of processing power, memory, and storage (plus horizontal scaling), you can use cheaper commodity boxes versus having to scale up using specialized (read: costlier) software.

* Migrations: Moving over from another database? ClickHouse enables you to create materialized versions of your data thanks to its advanced engine, resulting in exponentially faster migrations between deployments. In the future, we'll also enable you to more easily migrate between PostHog Cloud and PostHog Self Hosted as both are backed by ClickHouse now.

* Scalability: Clickhouse features a [columnnar database structure](https://clickhouse.tech/docs/en/faq/general/columnar-database/). Because of this, scaling and maintaining a ClickHouse cluster is pretty easy as long as you’re sharding, replicating, and distributing your tables correctly.

* Deployment: Other database systems depend on a storage layer, a compute layer, and a resource scheduler (like YARN) to be deployed properly. ClickHouse is just one binary. As such, deployment is a breeze.

* Documentation - [ClickHouse’s documentation](https://clickhouse.tech/docs/en/) has come a long way in the last few years, and Altinity, a company that supports the ecosystem, has excellent [documentation](https://docs.altinity.com/) available as well.

* Fault tolerance - ClickHouse supports native replication, which we use heavily. You can basically have N number of replicas for any given table - all you have to do is name the replica and point it to the metadata location in ZooKeeper.

## Why we'll continue using PostgreSQL alongside ClickHouse

PostgreSQL is great for managing frequently updated data like users, but for telemetry and event data we’ll default to ClickHouse. And while our app updates ClickHouse with data changes, the source of truth remains PostgreSQL. At the same time, we’ll work hard with existing users and early enthusiasts to migrate over to ClickHouse.

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />
