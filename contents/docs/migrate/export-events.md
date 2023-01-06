---
title: Export events
sidebar: Docs
showTitle: true
---

At PostHog we believe in your right to own your data - this means being able to export the raw events whenever you want.

There are several ways to export your events depending on your use case:

Method | When? | Limitations
--- | --- | ---
PostHog UI - click "Export" on the events table | You need to export a small number of events | 3,500 events
Events API | Great for one-off smaller exports | 1 day date range and 3,500 events
[Data export app](/apps?filter=type&value=data-out) | You need to export a large number of events | No limits

If you're looking to migrate to a new PostHog instance follow the [migrating between PostHog instances guide](/docs/migrate/migrate-between-cloud-and-self-hosted).

## Not sure which export method to use?

Here's a decision tree you might find useful:

```mermaid
graph TD
    A[Do you need to export a large number of events? Above 3,500] --> |Yes| B[Use a data export app]
    A --> |No| C[Do you need to run regular exports e.g. once a day or once a week?]
    C --> |Yes| B
    C --> |No| E[Use the PostHog UI or the Events API]
```

## Using Data Export Apps

Popular apps for data export include the [S3](/apps/s3-export), [Google Cloud Storage](/apps/google-cloud-export), [BigQuery](/apps/bigquery-export), [PostgreSQL](/apps/postgres-export), [Redshift](/apps/redshift-export), [Snowflake](/apps/snowflake-export). See the [full list of data export apps](/apps?filter=type&value=data-out), or find out [how to build your own app](/docs/apps/build/tutorial).

To export your historical data you'll want to connect the app and then run a historical export.

Additionally, these apps stream all the new events to the destination. This keeps your destination up to date with new events as they come in.

## Why are there limitations on the PostHog UI export and the events API?

The PostHog UI and the events API are designed to quickly respond with a small number of events. To prevent your queries running slower when another user is trying to export large numbers of events we've built a separate system for managing the exporting of large number of events using apps.
