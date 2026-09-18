---
title: Linking Iterable as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Iterable
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Iterable API key to pull your Iterable data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Iterable.
3. Create a **server-side** API key with read permissions in your [Iterable integrations settings](https://app.iterable.com/settings/apiKeys). Client-side (Mobile/Browser/JWT) keys are not supported. Note the data center that issued the key (US or EU).
4. Back in PostHog, paste the key into the `API key` field, select the matching `Data center` (US at `api.iterable.com` or EU at `api.eu.iterable.com`), and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Iterable data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `campaigns` | Iterable campaigns | Full refresh |
| `channels` | Messaging channels | Full refresh |
| `lists` | Subscriber lists | Full refresh |
| `message_types` | Message types | Full refresh |
| `templates` | Message templates | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
