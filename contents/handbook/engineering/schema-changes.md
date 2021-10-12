---
title: Guide to safe schema changes
sidebar: Handbook
showTitle: true
---

PostHog's database schema evolves constantly along with the app.
Each schema change safely requires delibration though, as a badly designed migration can cause pain for users,
and require extra effort from the engineering team.

Below are some important considerations to keep in mind regarding schema changes:

## Avoid deleting Django model fields

Deleting columns, even completely unused ones, is discouraged.

The reason is that the Django ORM **always** specifies columns to fetch in its `SELECT` queries – so when a migration deletes a column, in between the migration having ran and the new server having deployed completely, there's a period where the old server is still live and tries to `SELECT` that column. The only thing it gets from the database though is an error, as the column isn't there anymore! This situation results in a period of short-lived but very significant pain for users.

To avoid this pain, in most cases **we currently don't delete fields that aren't used anymore** – we just clearly mark them with `DEPRECATED` in code.

Note that this is not the case for `ManyToManyField`s – they are only fetched when explicitly used, as they are in fact tables of their own (called associative tables). There may still be a problem if going from from "M2M field existing and in use" to "M2M field deleted" in one deployment, but if you have an "M2M field existing but unused" stage in the middle, there should be no place for Django to trip up.

## Design for PostHog Cloud scale

With any migration, make sure that it can run smoothly not only in local development, but also on self-hosted instances, and on PostHog Cloud.

Generally this means avoiding migrations that need to process each row individually on _large_ tables (events, but also persons, person distinct IDs, or logs), as then the migration may take forever, or may even obtain a persisting lock on the entire table, causing severe issues for the app.

Examples of operations dangerous at scale are:
- Adding new fields **with a non-null default** (null is fine, as it avoids a lock).
- Iterating over all rows individually.

> For a quick overview of what Cloud scale _looks like_, see [Vanity Metrics in Metabase](https://metabase.posthog.net/dashboard/1).

## Tread carefully with ClickHouse schema changes

ClickHouse is at the core of PostHog's scalable analytics capabilities. The ClickHouse schema can be changed just like the Postgres one – with migrations – but there are two important bits of complexity added:

1. ClickHouse has no indexes like traditional databases. Instead, each table has a sorting key, defined in the `ORDER BY` clause of the table. This determines how data is laid out on disk, and ClickHouse reads data in the order it's laid out, so it's important that the sorting key is optimal for the table's use cases.
2. Tables that store events are _sharded_ + _distributed_ in PostHog Cloud. This improves performance in multi-tenant architecture, but means that updating these is not straightforward like with most tables, and may require manual write access to the cluster.

To make sure that your new ClickHouse migration is A-OK – both above points having been addressed – make sure you loop in someone with extensive experience operating ClickHouse for review. Specifically, Karl and James G. can be of help.
