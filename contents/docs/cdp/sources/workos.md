---
title: Linking WorkOS as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: WorkOS
---

Enter your WorkOS API key to sync your WorkOS data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to WorkOS.
3. Find your API key in the [WorkOS Dashboard](https://dashboard.workos.com/) under **API Keys**. The key starts with `sk_`.
4. Back in PostHog, paste the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using WorkOS data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `organizations` | Organizations in your WorkOS account | Full refresh |
| `users` | Users managed via WorkOS User Management | Full refresh |
| `connections` | SSO connections | Full refresh |
| `directories` | Directory Sync directories | Full refresh |
| `directory_users` | Users synced from connected directories | Full refresh |
| `directory_groups` | Groups synced from connected directories | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
