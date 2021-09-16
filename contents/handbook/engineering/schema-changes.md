---
title: Schema changes
sidebar: Handbook
showTitle: true
---

PostHog's database schema evolves constantly along with the app.
Each schema change safely requires delibration though, as a badly designed migration can cause pain for users,
as well as require extra effort from the PostHog engineering team.

Below are some important considerations to keep in mind regarding schema changes:

## Deleting Django model fields is risky

Deleting columns, even completely unused ones, is discouraged.

The reason is that the Django ORM **always** specifies columns to fetch in its `SELECT` queries – so when a migration deletes a column, in between the migration having ran and the new server having deployed completely, there's a period where the old server is still live and tries to `SELECT` that column. The only thing it gets from the database though is an error, as the column isn't there anymore! This situation results in a period of short-lived but very significant pain for users.

To avoid this pain, in most cases **we don't delete fields that aren't used anymore** – we just clearly mark them with `DEPRECATED` in code.

Note that this is not the case for `ManyToManyField`s – they are only fetched when explicitly used, as they are in fact tables of their own (called associative tables). There may still be a problem if going from from "M2M field existing and in use" to "M2M field deleted" in one deployment, but if you have an "M2M field existing but unused" stage in the middle, there should be no place for Django to trip up.

## ClickHouse?

- What are important considerations for designing a ClickHouse schema or migration?
- What's the difference between self-hosted and Cloud ClickHouse migrations?
- Do Django `infi.clickhouse_orm` migrations apply to Cloud?

@macobo
@fuziontech
