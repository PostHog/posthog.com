---
title: Linking Monday.com as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Monday
---

The Monday.com connector pulls your monday.com data – boards, items, users, workspaces, folders, and more – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Monday.com.
3. You need an API token from monday.com. Go to your monday.com account, click your profile picture, select **Developers** > **My access tokens**, and create a new token. Copy the token value.
4. Back in PostHog, paste the token in the **API token** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using monday.com data in PostHog.

## Available tables

| Table                 | Description                                                                                                            | Sync method  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------ |
| `boards`              | Boards accessible to your token (includes `board_folder_id` for folder linkage)                                        | Full refresh |
| `board_activity_logs` | Board change history (status changes, moves, assignments)                                                              | Incremental  |
| `board_columns`       | Column definitions (id, title, type, settings) for each board. Use this to resolve column IDs in `items.column_values` | Full refresh |
| `board_groups`        | Groups within boards, including groups with no items                                                                   | Full refresh |
| `folders`             | Folders that organize boards within workspaces                                                                         | Full refresh |
| `items`               | Items across all boards (includes `_board_id` for board linkage)                                                       | Full refresh |
| `users`               | Users in your monday.com account                                                                                       | Full refresh |
| `workspaces`          | Workspaces your token can access                                                                                       | Full refresh |

**Full refresh** tables reload all data on each sync. **Incremental** tables only sync new data since the last sync.

## Sync limitations

Most monday.com tables are full refresh only because monday.com's GraphQL API doesn't expose timestamp-based filtering for most list queries. The `board_activity_logs` table supports incremental sync using the `created_at` timestamp.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
