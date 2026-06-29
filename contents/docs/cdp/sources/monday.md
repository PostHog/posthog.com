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

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Monday.com connector pulls your monday.com data – boards, items, users, and workspaces – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Monday.com.
3. You need an API token from monday.com. Go to your monday.com account, click your profile picture, select **Developers** > **My access tokens**, and create a new token. Copy the token value.
4. Back in PostHog, paste the token in the **API token** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using monday.com data in PostHog.

## Available tables

| Table        | Description                                                      | Sync method  |
| ------------ | ---------------------------------------------------------------- | ------------ |
| `boards`     | Boards accessible to your token                                  | Full refresh |
| `items`      | Items across all boards (includes `_board_id` for board linkage) | Full refresh |
| `users`      | Users in your monday.com account                                 | Full refresh |
| `workspaces` | Workspaces your token can access                                 | Full refresh |

**Full refresh** tables reload all data on each sync.

## Sync limitations

All monday.com tables are full refresh only. monday.com's GraphQL API doesn't expose timestamp-based filtering for list queries, so each sync reloads the full collection.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
