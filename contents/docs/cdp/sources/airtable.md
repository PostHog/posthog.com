---
title: Linking Airtable as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Airtable
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Airtable connector pulls your Airtable data — bases, tables, and records — into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Airtable.
3. You need a personal access token from Airtable. Create one from [airtable.com/create/tokens](https://airtable.com/create/tokens). Grant the `data.records:read` and `schema.bases:read` scopes so all tables can sync, and grant access to the bases you want to sync. Copy the token value.
4. Back in PostHog, paste the token in the **Personal access token** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Airtable data in PostHog.

## Available tables

| Table     | Description                                              | Sync method  |
| --------- | -------------------------------------------------------- | ------------ |
| `bases`   | Metadata listing of Airtable bases your token can access | Full refresh |
| `tables`  | Schema information for tables within each base           | Full refresh |
| `records` | Data rows from all tables across all accessible bases    | Incremental  |

**Incremental** tables sync only new records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

- Incremental sync for records is append-only using the `createdTime` field. Updates to existing records are not detected — use a full refresh to catch those.
- Records expose no last-modified field, so there is no way to incrementally sync updates.
- Each record row carries `_base_id` and `_table_id` fields to identify its source base and table.
- Record IDs are only unique within a table, so records use the composite primary key (`_base_id`, `_table_id`, `id`).

## Configuration

<SourceParameters />
