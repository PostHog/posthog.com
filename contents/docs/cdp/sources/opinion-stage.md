---
title: Linking Opinion Stage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OpinionStage
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Opinion Stage connector pulls your interactive content data — quizzes, surveys, and forms — into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Opinion Stage.
3. You need a personal API key from Opinion Stage. Find it on your account settings page at [opinionstage.com](https://www.opinionstage.com/). This key grants read access to your items via the Public Result API.
4. Back in PostHog, paste the key in the **API key** field and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the sync completes, you can query your Opinion Stage data in PostHog.

## Available tables

| Table   | Description                                                     | Sync method  |
| ------- | --------------------------------------------------------------- | ------------ |
| `items` | Interactive content widgets such as quizzes, surveys, and forms | Full refresh |

**Full refresh** tables reload all data on each sync.

> **Note:** Per-item responses and questions are not included in this version of the connector. Only account-level item data is synced.

## Sync limitations

All Opinion Stage tables are full refresh only. The API's date-range filter parameters are not defined in the OpenAPI spec, so there is no incremental cursor available.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
