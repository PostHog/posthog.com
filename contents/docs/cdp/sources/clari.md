---
title: Linking Clari as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clari
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Connect your Clari account to sync revenue forecast and audit event data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Clari.
3. In Clari, generate an **API key** under your account's API settings.
4. Find your **Forecast ID** in the URL when viewing a forecast tab in Clari (for example `net_bookings` from `app.clari.com/forecast/net_bookings`).
5. Back in PostHog, enter your **API key** and **Forecast ID**, then click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Clari data in PostHog.

## Available tables

| Table          | Description                                                    | Sync method  |
| -------------- | -------------------------------------------------------------- | ------------ |
| `audit_events` | Audit log events from Clari (limited to ~30 days of retention) | Incremental  |
| `forecast`     | Forecast data exported from Clari's async export pipeline      | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

- **Audit event retention** – Clari retains audit events for approximately 30 days, so the initial sync can only reach back that far.
- **Forecast export quota** – Clari caps forecast exports at roughly 1,000 per rolling 30 days with a maximum of three concurrent export jobs. Avoid very frequent syncs of the forecast table to stay within this limit.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
