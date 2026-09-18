---
title: Linking Braze as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Braze
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Braze connector syncs your Braze data — campaigns, canvases, segments, events, and templates — into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Braze.
3. You need a REST API key and your REST endpoint URL from Braze. In your Braze dashboard, go to **Settings → API Keys** and create a REST API key. Grant the following endpoint permissions for the data you want to sync: `campaigns.list`, `canvas.list`, `segments.list`, `events.list`, `templates.email.list`, and `content_blocks.list`. Your REST endpoint URL (for example `https://rest.iad-01.braze.com`) must match your Braze dashboard's region — see [Braze's API overview](https://www.braze.com/docs/api/basics/#endpoints) for the full list of endpoints.
4. Back in PostHog, enter your `REST API key` and `REST endpoint URL`, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Braze data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `campaigns` | Campaigns in your Braze account | Full refresh |
| `canvases` | Canvases in your Braze account | Full refresh |
| `segments` | Segments in your Braze account | Full refresh |
| `events` | Custom event names tracked in Braze | Full refresh |
| `email_templates` | Email templates | Incremental |
| `content_blocks` | Content blocks | Incremental |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only the email templates and content blocks tables support incremental sync, using Braze's server-side `modified_after` filter. The remaining tables are full refresh only, as Braze does not provide a reliable server-side timestamp filter for them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
