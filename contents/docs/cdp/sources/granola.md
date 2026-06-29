---
title: Linking Granola as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Granola
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Granola connector pulls your meeting notes into the PostHog data warehouse. Only notes that already have a generated AI summary and transcript are returned by the API.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Granola.
3. You need a Granola API key, which requires a **Business** plan or higher. In the Granola desktop app, go to **Settings → Connectors → API keys** and create a key (it is prefixed with `grn_`). When creating the key, grant the access scopes for the data you want to sync — **Personal notes** and **Public notes**.
4. Back in PostHog, enter the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Granola data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `notes` | Meeting notes with a generated AI summary and transcript | Incremental |
| `folders` | Folders used to organize notes | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only notes that already have a generated AI summary and transcript are returned by the Granola API.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
