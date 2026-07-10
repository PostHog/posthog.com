---
title: Linking Height as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Height
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Height API key to pull your project management data — users, lists, and field templates — into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Height.
3. You need an API key from Height. Create one on the **Settings → API** page in [Height](https://height.app/). The key grants read access to your workspace's users, lists, and field templates.
4. Back in PostHog, paste the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Height data in PostHog.

## Available tables

| Table             | Description                               | Sync method  |
| ----------------- | ----------------------------------------- | ------------ |
| `users`           | Members of your Height workspace          | Full refresh |
| `lists`           | Lists or smart lists that group tasks     | Full refresh |
| `field_templates` | Custom field definitions applied to tasks | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All Height tables are full refresh only. Height's list endpoints do not expose a usable server-side timestamp filter, so each sync reloads the full collection.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
