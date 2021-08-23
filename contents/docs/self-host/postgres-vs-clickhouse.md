---
title: Postgres vs ClickHouse
sidebar: Docs
showTitle: true
---

## ClickHouse

> We **strongly recommend ClickHouse** as the most futureproof deployment option. In future, we may remove support for Postgres

[ClickHouse](https://clickhouse.tech) is an open-source, Apache 2.0 licensed OLAP database. It is very fast at doing analytical queries on large volumes of data. It also stores this data much more efficiently than Postgres does, and we've seen a 70% reduction in the amount of disk space needed to store the same data.

## Postgres

A standard instance of PostHog using PostgreSQL is pretty efficient for storing large volumes of data. We've built Posthog so that ingesting a high volume of events should not be a problem even with lower tier Postgres instances.

However, once you have more data, you might start having issues while running queries. The issue is that Postgres isn't very good at doing analytical queries on larger datasets. This is where ClickHouse comes in.

There are quite a few factors than can contribute to whether your Postgres instance is enough for running PostHog, for example:
- Recurring event ingestion volume (details on that below).
- Resources (RAM & CPU usage) allocated directly to your Postgres instance. Basic rule of thumb here is the **Postgres instance should have enough memory to store the entire events table in memory**. So if you have a 32GB events table, you'll want at least 32GB of memory on Postgres (you can find your events table size in the instance status page). Based on some recent estimates, you will need around 300MB of RAM and disk space for every 1M events stored (keep in mind this may vary depending on how big your events actually are when sending to PostHog).
- Disk read/write speed. One thing that can really help here is using solid-state disks. Provisioned IOPS (supported with some infrastructure providers, can also help a lot).
- Number of dashboards (and items on those dashboards that you have). These get recomputed periodically. See [Environment variables](/docs/self-host/configure/environment-variables) for details on how to adjust these.
- Number of actions & cohorts that you have defined (these too get recomputed periodically). See [Environment variables](/docs/self-host/configure/environment-variables) for details on how to adjust these.


Event ingestion volume can be one of the largest contributing factors to your database load. This is because the more events you have, the more data that needs to be scanned & analyzed when doing any sort of querying. We're still testing this out and there are other factors to consider, but based on our experience here's a rule of thumb on what event volume runs well on a Postgres backend.
- At 2M (two million) events per month, Postgres starts to struggle and queries will start taking noticeably longer than expected.
- 5M events per month seems to be a hard limit on what Postgres can performantly manage. If your volume is higher than this, we recommend you switch to PostHog Cloud or our ClickHouse backend.

