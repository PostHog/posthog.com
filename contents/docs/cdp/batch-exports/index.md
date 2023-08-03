---
title: Batch exports (beta)
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

Batch exports give you a platform to schedule data exports to supported destinations. Batch exports are built on [Temporal](https://www.temporal.io/) to enable reliable data exports, ensuring your data reaches your destination.

The key features offered by this platform are:
* Resiliency: Retry capabilities (both automated and manual) when the destination is temporarily unavailable.
* Efficient data transfers: Processing data in batches reduces the number of data transfers required (less `INSERT` queries or file uploads).

> Batch exports are currently in **public beta**. This means that we offer data exports to a subset of all the planned destinations, some features will be missing, and you will encounter UI elements still in development. You can follow and comment on the progress [here](https://github.com/PostHog/posthog/issues/15997).

## Destinations

Every batch export exports data to a destination using the configuration parameters provided when creating a batch export. The following destinations are currently supported:

* [S3](/docs/cdp/batch-exports/s3)
* [Snowflake](/docs/cdp/batch-exports/snowflake)

Support for new destinations will be added based on demand. You can follow development of new destinations [here](https://github.com/PostHog/posthog/issues/15997).

## Batch runs

A batch export is executed in batch runs depending on the configured frequency. For example, an hourly batch export starts a run on every hour. The data processed by every run has an **upper bound** given by the time in which the run is scheduled to start, and a **lower bound** that results from subtracting the frequency to the batch run's scheduled start time.

As an example, creating a batch export of events with daily frequency today will schedule the first batch run to start right as tomorrow begins. Thus, the data exported are events that PostHog received from 00:00:00 until 23:59:59 of today.

Batch runs are configured on the [exports page](https://app.posthog.com/exports) in your PostHog instance.

> **Note:** When deciding which data falls within the bounds of a specific batch run, we look at the time when the data landed in PostHog's ClickHouse database. This means that network and processing delays can make an event that was sent within the bounds of a batch run fall in a future run.

## How does this differ from the old export system?

- The schema is different. The data is the same, but old export apps would flatten some nested properties into fields, new exports do not.

- The data is exported in hourly batches.