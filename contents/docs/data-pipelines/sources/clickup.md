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

The ClickUp connector pulls your ClickUp data – workspaces, spaces, folders, lists, tasks, goals, custom task types, tags, members, and task comments – into the PostHog Data Warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to ClickUp.
3. You need a personal API token and your workspace ID from ClickUp. Generate a personal token (it starts with `pk_`) under **Settings → Apps** in ClickUp. For the **Workspace ID**, you can paste the full URL from your browser (e.g. `https://app.clickup.com/12345678/home`) or enter just the numeric ID.
4. Back in PostHog, enter the `API token` and `Workspace ID`, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using ClickUp data in PostHog.

## Available tables

| Table        | Description                                       | Sync method  |
| ------------ | ------------------------------------------------- | ------------ |
| `workspaces` | Workspaces your token can access                  | Full refresh |
| `spaces`     | Spaces within the workspace                       | Full refresh |
| `folders`    | Folders within each space                         | Full refresh |
| `lists`      | Lists (folderless lists and lists within folders) | Full refresh |
| `tasks`      | Tasks within the workspace                        | Incremental  |
| `goals`      | Goals within the workspace                        | Full refresh |
| `custom_task_types` | A custom task type available in the workspace, resolving the `custom_item_id` carried on tasks | Full refresh |
| `space_tags` | A task tag available in a Space, resolving the tags attached to tasks | Full refresh |
| `list_members` | A workspace member with explicit access to a List. Access inherited from a team, folder, or space is not included | Full refresh |
| `task_members` | A workspace member with explicit access to a task. Access inherited from a team, list, folder, or space is not included | Full refresh |
| `task_comments` | A top-level comment on a task. Threaded replies are not included | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The `tasks` table supports incremental sync using `date_updated` as the cursor. The other tables listed above use full refresh.

The `list_members`, `task_members`, and `task_comments` tables are off by default because each sync makes requests for every list or task. Enable them when you need this data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
