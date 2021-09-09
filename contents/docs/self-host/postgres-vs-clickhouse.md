---
title: Postgres vs ClickHouse
sidebar: Docs
showTitle: true
---

We believe that PostHog will have to run on [Clickhouse](https://clickhouse.tech) instead of Postgres as the main database in the long term in order to handle larger volumes of events and provide more robust analytics capabilities.

> We **strongly recommend ClickHouse** as the most futureproof deployment option. In future, we may remove support for Postgres.

## I'm new to PostHog, what do I need to know?

All the [deployment instructions](/docs/self-host/deploy/overview) have already been upgraded to use the ClickHouse backed version of PostHog, so just head over there to get started.


## I have an existing PostHog (Postgres) instance, what does this mean for me?

We currently support both Postgres and ClickHouse backed instances, however, some new features are only available on ClickHouse.

We're [working on creating an easy migration process](https://github.com/PostHog/posthog.com/issues/1892), but it's not ready yet. If you're ok with starting from scratch or are experiencing scaling problems we encourage you to move over now. See the [deployment instructions](/docs/self-host/deploy/overview) for spinning up a new instance backed by ClickHouse.

Meanwhile, if you're looking for the original Postgres backed instructions for upgrades etc. they can be found in [GitHub history](https://github.com/PostHog/posthog.com/tree/ee01390744dffdb32f2f78b49572c606becb03b9/contents/docs/self-host/deploy).

## Why are we moving from Postgres to ClickHouse?

TLDR: Because ClickHouse is a lot better at doing analytical queries on larger datasets and building/supporting two platforms isn't cost effective.

An instance of PostHog using PostgreSQL can be efficient for small scale deploys. However, once you have more data, you might start having issues while running queries. The issue is that Postgres isn't very good at doing analytical queries on larger datasets. This is where ClickHouse comes in.

[ClickHouse](https://clickhouse.tech) is an open-source, Apache 2.0 licensed OLAP database. It is very fast at doing analytical queries on large volumes of data. It also stores this data much more efficiently than Postgres does, and we've seen a 70% reduction in the amount of disk space needed to store the same data.
