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

The Granola connector pulls your meeting notes into the PostHog data warehouse. Only notes that already have a generated AI summary and transcript are returned by the API.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Granola.
3. You need a Granola API key, which requires a **Business** plan or higher. In the Granola desktop app, create one of these keys:
   - **Personal API key:** Go to **Settings → Connectors → API keys** and create a key (it is prefixed with `grn_`). When creating the key, grant the access scopes for the data you want to sync — **Personal notes**, **Public notes**, or both.
   - **Workspace API key** (admins only): Go to **Settings → Connectors → Workspace API keys** and create a key. Workspace keys belong to the workspace and don't expire, so the sync keeps working if the person who created the key leaves. They can read public notes and notes in spaces with Granola API access turned on, but not private notes.
4. Back in PostHog, enter the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Granola data in PostHog.

## Available tables

| Table         | Description                                                                                | Sync method  |
| ------------- | ------------------------------------------------------------------------------------------ | ------------ |
| `notes`       | Meeting notes with a generated AI summary and transcript                                   | Incremental  |
| `folders`     | Folders used to organize notes                                                             | Full refresh |
| `spaces`      | Spaces that group folders and notes, limited to the spaces the API key can access          | Full refresh |
| `transcripts` | Transcript segments for meeting notes, with speaker, text, and timestamps for each segment | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only notes that already have a generated AI summary and transcript are returned by the Granola API.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
