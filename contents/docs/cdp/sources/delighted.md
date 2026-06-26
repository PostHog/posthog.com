---
title: Linking Delighted as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Delighted
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Delighted connector syncs your survey feedback data – responses, people, unsubscribes, bounces, and NPS metrics – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Delighted.
3. Next, you need an API key from Delighted. In your Delighted account, go to **Settings → API** and copy your API key. Each Delighted project has its own API key with read access to that project's data.
4. Back in PostHog, enter the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Delighted data in PostHog.

## Available tables

| Table              | Description                                                   | Sync method  |
| ------------------ | ------------------------------------------------------------- | ------------ |
| `survey_responses` | Survey responses with customer feedback, scores, and comments | Incremental  |
| `people`           | People who have received surveys                              | Incremental  |
| `unsubscribes`     | People who have unsubscribed from surveys                     | Incremental  |
| `bounces`          | Email addresses that have bounced                             | Incremental  |
| `metrics`          | Account-level NPS metrics snapshot (single row)               | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
