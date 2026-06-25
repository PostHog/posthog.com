---
title: Linking Coda as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Coda
---

<CalloutBox icon="IconWarning" title="Alpha release" type="caution">

The Coda source is currently in alpha. It has been tested against Coda's API documentation but not yet validated with live credentials. If you run into issues, please let us know.

</CalloutBox>

The Coda connector syncs your Coda docs, tables, and rows into PostHog. Once linked, you can query your Coda data alongside your product analytics data using SQL.

## Linking Coda

1. In Coda, go to your [account settings](https://coda.io/account) and generate an API token. The token only has access to docs its creator can access.
2. In PostHog, go to the [Data pipeline sources page](https://app.posthog.com/data-management/sources), click **+ New source**, and then click **Link** next to Coda.
3. Paste your **API token**.
4. Click **Next**, choose the tables you want to sync, and then click **Import**.

Once the sync completes, you can start querying your Coda data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Available tables

Coda's data model is hierarchical: docs contain tables, and tables contain rows. PostHog injects parent linkage fields (`_doc_id`, `_table_id`) to form composite primary keys, since table and row IDs are only unique within their parent.

| Table    | Description                                                                    | Primary keys                 |
| -------- | ------------------------------------------------------------------------------ | ---------------------------- |
| `docs`   | All documents in your workspace                                                | `id`                         |
| `tables` | Tables within each document                                                    | `_doc_id`, `id`              |
| `rows`   | Rows from every table of every document, with cell values keyed by column name | `_doc_id`, `_table_id`, `id` |

The `rows` table is a two-level fan-out endpoint — PostHog fetches all your docs, then all tables within each doc, then all rows within each table.

## Sync limitations

- **Full refresh only** – Coda's list endpoints don't support updated-since filters, so every sync re-downloads all data. Incremental and append-only syncing aren't available.
- **Rate limits** – Coda caps doc listing at 4 requests per 6 seconds, which means large workspaces with many docs sync slowly. PostHog automatically spaces requests to stay within these limits.
