---
title: Linking Gong as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gong
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Gong API credentials to pull your Gong data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Gong.
3. In Gong, go to **Company Settings → Ecosystem → API** and create an **Access Key** and **Access Key Secret**. Grant the following read scopes so the connected endpoints can sync: `api:calls:read:basic`, `api:users:read`, `api:settings:scorecards:read`, and `api:workspaces:read`.
4. Back in PostHog, enter the `Access key` and `Access key secret`, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Gong data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `calls` | Call records | Incremental |
| `users` | Gong users | Full refresh |
| `scorecards` | Scorecard settings | Full refresh |
| `workspaces` | Gong workspaces | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The `calls` table only syncs the last 365 days of data on the initial sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
