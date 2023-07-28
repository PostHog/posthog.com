---
title: Batch Exports (beta)
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

PostHog Batch Exports gives you a platform to schedule data exports to supported destinations. PostHog Batch Exports is built on [Temporal](https://www.temporal.io/) to enable reliable data exports, ensuring your data reaches your destination.

> PostHog Batch Exports is currently in **public beta**. This means that we offer data exports to a subset of all the planned destinations, some features will be missing, and you will encounter UI elements still in development. You can follow and comment on the progress [here](https://github.com/PostHog/posthog/issues/15997).

## Destinations

Every Batch Export exports data to a destination using the configuration parameters provided when creating a Batch Export. Examples of destinations include an S3 bucket, or a table in a Snowflake database.

Supported destinatinations are:
* [S3](/docs/batch-exports/s3).
* [Snowflake](/docs/batch-exports/snowflake).

Support for new destinations will be added based on demand. You can follow development of new destinations [here](https://github.com/PostHog/posthog/issues/15997).

## Batch runs

A Batch Export is executed in Batch runs depending on the configured frequency: For example, an hourly Batch Export will start a Batch run on every hour mark (XX:00:00). The data processed by every Batch Run has an **upper bound** given by the time in which Batch run is scheduled to start, and a **lower bound** that results from subtracting the frequency to the Batch run's scheduled start time.

As an example, creating a Batch Export of events with daily frequency today will schedule the first Batch run to start right as tomorrow begins. Thus, the data exported will be events that PostHog received from 00:00:00 until 23:59:59 of today.

> **Note:** When deciding which data falls within the bounds of a specific Batch run, we look at the time when the data landed in PostHog's ClickHouse database. This means that network and processing delays can make an event that was sent within the bounds of a Batch run fall in a future Batch run.
3
