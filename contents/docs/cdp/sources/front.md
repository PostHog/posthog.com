---
title: Linking Front as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Front
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Front API token to sync your Front data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Front.
3. Create an API token in your [Front settings](https://app.frontapp.com/settings/tools/api) under **Developers > API tokens**. Grant read scopes for the resources you want to sync (for example `shared_resources:read`, `contacts:read`, `tags:read`).
4. Back in PostHog, paste the token in the **API token** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Front data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `events` | Front events (only syncs the last 365 days on initial sync) | Incremental |
| `contacts` | Contacts | Full refresh |
| `conversations` | Conversations | Full refresh |
| `accounts` | Accounts | Full refresh |
| `tags` | Tags | Full refresh |
| `teammates` | Teammates | Full refresh |
| `inboxes` | Inboxes | Full refresh |
| `channels` | Channels | Full refresh |
| `teams` | Teams | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The `events` table only syncs the last 365 days on its initial sync to avoid an unbounded backfill.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
