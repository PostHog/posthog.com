---
title: Scaling PostHog
sidebar: Docs
showTitle: true
---

A standard instance of PostHog using PostgreSQL is pretty efficient for storing large volumes of data. We've built Posthog so that ingesting a high volume of events should not be a problem even with lower tier Postgres instances.

However, once you have more data, you might start having issues while running queries. The issue is that Postgres isn't very good at doing analytical queries on larger datasets. This is where ClickHouse comes in.

There are quite a few factors than can contribute to whether your Postgres instance is enough for running PostHog, for example:
- Recurring event ingestion volume (details on that below).
- Resources (RAM & CPU usage) allocated directly to your Postgres instance.
- Disk read/write speed. One thing that can really help here is using solid-state disks. Provisioned IOPS (supported with some infrastructure providers, can also help a lot).
- Number of dashboards (and items on those dashboards that you have). These get recomputed periodically. See [Environment variables](/docs/configuring-posthog/environment-variables) for details on how to adjust these.
- Number of actions & cohorts that you have defined (these too get recomputed periodically). See [Environment variables](/docs/configuring-posthog/environment-variables) for details on how to adjust these.


Event ingestion volume can be one of the largest contributing factors to your database load. This is because the more events you have, the more data that needs to be scanned & analyzed when doing any sort of querying. We're still testing this out and there are other factors to consider, but based on our experience here's a rule of thumb on what event volume runs well on a Postgres backend.
- At 2M (two million) events per month, Postgres starts to struggle and queries will start taking noticeably longer than expected.
- 5M events per month seems to be a hard limit on what Postgres can performantly manage. If your volume is higher than this, we recommend you switch to PostHog Cloud or our ClickHouse backend.

## ClickHouse

[ClickHouse](https://clickhouse.tech) is an open-source, Apache 2.0 licensed OLAP database. It is very fast at doing analytical queries on large volumes of data. It also stores this data much more efficiently than Postgres does, and we've seen a 70% reduction in the amount of disk space needed to store the same data.

The downside of ClickHouse is that it takes more work to set up and configure correctly when compared to Postgres. This is why we currently only offer ClickHouse as part of PostHog Cloud, on select VPC deployments or with a license from us. If you want to self-host PostHog and use ClickHouse, we do offer a free license (with certain restrictions) so you can handle large volumes. Please note that this will require more technical expertise on ClickHouse and infrastructure management in general (not only setup but maintenance too).

If you have large event volumes and would like to use a more scalable and efficient version of PostHog, please email us at _[sales@posthog.com](mailto:sales@posthog.com)_ to discuss details. Reach out too if you want to get a free Clickhouse license.

