---
title: Linking Smartsheet as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Smartsheet
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Smartsheet API access token to pull your Smartsheet data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Smartsheet.
3. Generate a personal access token under **Personal Settings → API Access** in your [Smartsheet account](https://app.smartsheet.com). The token inherits your account's read access; the `users` table additionally requires a system administrator account.
4. Back in PostHog, paste the token in the `Access token` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Smartsheet data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `sheets` | Sheets in your account | Full refresh |
| `reports` | Reports in your account | Full refresh |
| `workspaces` | Workspaces in your account | Full refresh |
| `users` | Users in your account (requires a system administrator account) | Full refresh |
| `contacts` | Contacts in your account | Full refresh |
| `templates` | Templates in your account | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
