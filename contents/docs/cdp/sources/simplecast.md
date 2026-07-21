---
title: Linking Simplecast as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SimpleCast
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Sync your Simplecast podcast data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Simplecast.
3. Create an API token on the **Private Apps** page in [Simplecast](https://dashboard.simplecast.com). The token grants read access to the podcasts your account can see.
4. Back in PostHog, enter your API token, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Simplecast data in PostHog.

## Available tables

| Table      | Description                                                      | Sync method  |
| ---------- | ---------------------------------------------------------------- | ------------ |
| `podcasts` | Podcasts (shows) hosted on Simplecast that your token can access | Full refresh |

**Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
