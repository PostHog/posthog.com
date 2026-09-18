---
title: Linking Dovetail as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Dovetail
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Dovetail connector can link projects, data, docs, highlights, tags, contacts, users, and doc comments from your [Dovetail](https://dovetail.com/) user research repository to PostHog.

To link Dovetail:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Dovetail.

3. You need a personal API key from Dovetail. In the Dovetail app, go to **Settings** > **Account** > **Personal API keys** and generate a new key.

4. Back in PostHog, paste the API key and click **Next**.

5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Dovetail data in PostHog.

## Available tables

| Table         | Description                 | Sync mode    |
| ------------- | --------------------------- | ------------ |
| `Projects`    | Dovetail projects           | Full refresh |
| `Data`        | Research data entries       | Incremental  |
| `Docs`        | Research documents          | Incremental  |
| `Highlights`  | Highlights from research    | Incremental  |
| `Tags`        | Tags for organizing content | Full refresh |
| `Contacts`    | Research contacts           | Full refresh |
| `Users`       | Dovetail users              | Full refresh |
| `DocComments` | Comments on documents       | Full refresh |

**Incremental** tables sync only new records since the last sync using the `created_at` field. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
