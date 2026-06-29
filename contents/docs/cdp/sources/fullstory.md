---
title: Linking Fullstory as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: FullStory
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Fullstory connector syncs your Fullstory user data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Fullstory.
3. You need an API key from Fullstory. Create one in Fullstory under **Settings** > **Integrations & API Keys** > **API Keys**. A key with at least **Viewer** permission level is sufficient for syncing.
4. Back in PostHog, paste the API key and click **Next**.
5. _Optional:_ Add a prefix to your table names.
6. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the sync is complete, you can start using Fullstory data in PostHog.

## Available tables

| Table   | Description                          | Sync method  |
| ------- | ------------------------------------ | ------------ |
| `users` | Users from Fullstory's Server API v2 | Full refresh |

## Sync limitations

The Fullstory users table is full refresh only. Fullstory's users listing API doesn't expose an "updated since" filter, so each sync reloads all data.

Session and event data in Fullstory is only available through async Data Export jobs, which aren't supported yet. Additional tables may be added in future updates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
