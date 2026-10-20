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
| `conversation_followers` | Teammates who follow each conversation (one row per conversation and follower) | Full refresh |
| `teammate_groups` | Teammate groups | Full refresh |
| `teammate_group_teammates` | Teammates in each teammate group (one row per group and teammate) | Full refresh |
| `teammate_group_teams` | Teams in each teammate group (one row per group and team) | Full refresh |
| `teammate_group_inboxes` | Inboxes that each teammate group can access through its teams (one row per group and inbox) | Full refresh |
| `contact_lists` | Contact lists | Full refresh |
| `contact_list_contacts` | Contacts in each contact list (one row per list and contact) | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The `events` table only syncs the last 365 days on its initial sync to avoid an unbounded backfill.

The `conversation_followers`, `teammate_group_*`, and `contact_list_contacts` tables send one API request for each parent conversation, teammate group, or contact list. These tables can take longer to sync in large workspaces.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
