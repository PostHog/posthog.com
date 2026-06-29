---
title: Linking Plain as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Plain
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Plain connector automatically pulls your Plain customer support data – customers, threads, and timeline entries – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Plain.
3. Next, you need an API key from Plain. In your [Plain workspace settings](https://app.plain.com/settings/api-keys), create an API key. Make sure to grant the following read permissions: `customer:read`, `thread:read`, and `timeline:read`. Copy the key value (it starts with `plainApiKey_`).
4. Back in PostHog, enter the API key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Plain data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `customers` | Customers in your Plain workspace | Incremental |
| `threads` | Support threads (conversations) | Incremental |
| `timeline_entries` | Timeline entries (chats, emails, notes, and custom entries) for each thread | Incremental |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
