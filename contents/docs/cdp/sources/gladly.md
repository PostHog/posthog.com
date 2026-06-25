---
title: Linking Gladly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gladly
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Gladly connector pulls your customer service data – customers, conversation items, agents, and topics – into the PostHog data warehouse.

Data comes from Gladly's scheduled export jobs rather than a traditional REST API. Gladly produces JSONL files on an hourly or daily schedule, and PostHog processes them oldest-first to keep your warehouse in sync.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Gladly.
3. In Gladly, go to **Settings** > **API Tokens** and create an API token for an agent with the **API User** permission. Note the agent's email address and the generated token.
4. Back in PostHog, enter your **Organization** subdomain (the first part of your Gladly URL – for `myorg.gladly.com` enter `myorg`), the **Agent email**, and the **API token**, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Gladly data in PostHog.

## Available tables

| Table                | Description                                                   | Sync method |
| -------------------- | ------------------------------------------------------------- | ----------- |
| `customers`          | Customer profiles from your Gladly instance                   | Incremental |
| `conversation_items` | Individual items within conversations (messages, notes, etc.) | Incremental |
| `agents`             | Support agents in your organization                           | Incremental |
| `topics`             | Topics used to categorize conversations                       | Incremental |

**Incremental** tables sync only new or updated records on each run. Each row includes injected `_job_id` and `_job_updated_at` fields from the export job that produced it. The `_job_updated_at` field is used as the incremental cursor.

## Sync limitations

Gladly retains export job files for **14 days**. The initial sync imports all available data within that window. History older than 14 days isn't accessible unless you ask Gladly support to regenerate past exports.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
