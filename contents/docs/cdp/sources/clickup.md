---
title: Linking ClickUp as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ClickUp
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The ClickUp connector pulls your ClickUp data — workspaces, spaces, folders, lists, tasks, and goals — into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to ClickUp.
3. You need a personal API token and your workspace ID from ClickUp. Generate a personal token (it starts with `pk_`) under **Settings → Apps** in ClickUp. Your **Workspace ID** is the numeric ID in your ClickUp URL: `https://app.clickup.com/{workspace_id}/...`.
4. Back in PostHog, enter the `API token` and `Workspace ID`, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using ClickUp data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `workspaces` | Workspaces your token can access | Full refresh |
| `spaces` | Spaces within the workspace | Full refresh |
| `folders` | Folders within each space | Full refresh |
| `lists` | Lists (folderless lists and lists within folders) | Full refresh |
| `tasks` | Tasks within the workspace | Incremental |
| `goals` | Goals within the workspace | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only the tasks table supports incremental sync, using `date_updated` as the cursor. The other tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
