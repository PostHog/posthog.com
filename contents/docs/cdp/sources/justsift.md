---
title: Linking JustSift as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: JustSift
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The JustSift connector syncs your organization's people directory and field definitions into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to JustSift.
3. In JustSift, create a token in the [Sift admin dashboard](https://admin.justsift.com) under **API Access → New Application**. Grant the token access to **full people data** (not photos-only).
4. Back in PostHog, paste the token into the `API token` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using JustSift data in PostHog.

## Available tables

| Table    | Description                                                           | Sync method  |
| -------- | --------------------------------------------------------------------- | ------------ |
| `people` | Employee profiles with built-in and organization-specific fields      | Full refresh |
| `fields` | Field definitions describing searchable properties on person profiles | Full refresh |

**Full refresh** tables reload all data on each sync.

## Sync limitations

All JustSift tables are full refresh only – JustSift's list endpoints don't expose a server-side timestamp filter, so there's no incremental cursor to advance. Each sync reloads all data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
