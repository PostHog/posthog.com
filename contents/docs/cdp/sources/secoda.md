---
title: Linking Secoda as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Secoda
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Secoda connector pulls your data catalog metadata — tables, columns, collections, users, groups, and tags — into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Secoda.
3. You need an API key from Secoda. Create one from [Settings > API](https://app.secoda.co/settings/api) in your Secoda workspace. Copy the key value.
4. Back in PostHog, paste the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Secoda data in PostHog.

## Available tables

| Table         | Description                                                  | Sync method  |
| ------------- | ------------------------------------------------------------ | ------------ |
| `tables`      | Tables catalogued in Secoda from connected data integrations | Full refresh |
| `columns`     | Columns belonging to catalogued tables in Secoda             | Full refresh |
| `collections` | Collections used to group and organise resources in Secoda   | Full refresh |
| `users`       | Users in the Secoda workspace                                | Full refresh |
| `groups`      | User groups (teams) in the Secoda workspace                  | Full refresh |
| `tags`        | Tags used to label and categorise resources in Secoda        | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All Secoda tables are full refresh only. Secoda's list endpoints do not support server-side timestamp filtering (only exact, contains, and in operators), so there is no cursor to advance an incremental sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
