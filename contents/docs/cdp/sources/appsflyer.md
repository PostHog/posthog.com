---
title: Linking AppsFlyer as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AppsFlyer
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your AppsFlyer credentials to pull aggregate mobile attribution reports into the PostHog data warehouse. Each source connects to a single AppsFlyer app.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to AppsFlyer.
3. In AppsFlyer, go to your **account menu** > **Security center** > **AppsFlyer API tokens** and copy your **API token (V2)**. Your account must have an active Pull API subscription.
4. Find your **App ID** in the AppsFlyer dashboard — for example, `id123456789` for iOS or the Android package name.
5. Back in PostHog, enter the **App ID** and **API token (V2)**, then click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using AppsFlyer data in PostHog.

## Available tables

| Table             | Description                              | Sync method |
| ----------------- | ---------------------------------------- | ----------- |
| `daily_report`    | Daily aggregate performance data         | Incremental |
| `geo_report`      | Geographic breakdown of performance data | Incremental |
| `partners_report` | Partner attribution data                 | Incremental |

All tables sync incrementally on the `date` field.

## Sync behavior

- **Incremental sync with lookback** - AppsFlyer doesn't finalize data until approximately 48 hours after the UTC day. Each incremental sync re-fetches the trailing two days to capture late-arriving data. Duplicates are merged on the dimension key.
- **Initial sync** - The first sync can pull up to approximately 1,000 days of historical data, the maximum window supported by the AppsFlyer aggregate Pull API.
- **One app per source** - Each source connects to a single AppsFlyer app. To import data from multiple apps, create a separate source for each one.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
