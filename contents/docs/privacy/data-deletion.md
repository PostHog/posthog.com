---
title: Data deletion
sidebarTitle: Data deletion
sidebar: Docs
showTitle: true
---

## How to delete data from posthog

One can remove unwanted data from posthog by:
1. Deleting teams/organizations
2. Deleting persons

This can be done either under settings pages (1) or under persons & groups pages (2).

When deleting individual persons, you can choose to also delete all their events. When deleting teams, all data under the team
(including events) are automatically removed.

## Asynchronous data deletion

While most data in PostHog is deleted instantly, event data is not. Instead data is cleared asynchronously during non-peak usage times (weekends on PostHog Cloud).

This is done because data deletion in ClickHouse is expensive and it can impact performance for other users.

On self-hosted, asynchronous deletions happen according to the `CLEAR_CLICKHOUSE_REMOVED_DATA_SCHEDULE_CRON` environment variable (defaults to Sunday 5AM UTC). Read more on environment variables [here](/docs/self-host/configure/environment-variables)
