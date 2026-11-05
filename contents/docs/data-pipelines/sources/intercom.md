---
title: Linking Intercom as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Intercom
---

The Intercom connector syncs your Intercom workspace data into PostHog, including contacts, conversations, companies, tickets, activity logs, and more.

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the **Sources** tab in PostHog.
2. Click **+ New source** and select Intercom.
3. Select the Intercom workspace you want to link and click **Connect**.
4. _Optional:_ Add a prefix to your table names.
5. Select the tables you want to import.
6. Click **Import**.

The data warehouse then starts syncing your Intercom data. You can see details, progress, and rows synced in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

| Table              | Sync mode                             | Description                              |
| ------------------ | ------------------------------------- | ---------------------------------------- |
| admins             | Full refresh                          | Workspace admins                         |
| teams              | Full refresh                          | Teams                                    |
| tags               | Full refresh                          | Tags                                     |
| segments           | Full refresh                          | Customer segments                        |
| companies          | Full refresh                          | Companies                                |
| company_segments   | Full refresh                          | Segments associated with each company    |
| articles           | Full refresh                          | Help center articles                     |
| company_attributes | Full refresh                          | Custom company-level data attributes     |
| contact_attributes | Full refresh                          | Custom contact-level data attributes     |
| contacts           | Incremental (`updated_at`)            | Contacts and leads                       |
| conversations      | Incremental (`updated_at`)            | Customer conversations                   |
| tickets            | Incremental (`updated_at`)            | Support tickets                          |
| activity_logs      | Incremental (`created_at`)            | Admin activity logs                      |
| conversation_parts | Incremental (`updated_at` via parent) | Individual messages within conversations |

## Sync modes

Intercom tables support both full refresh and incremental syncing depending on the table:

- **Full refresh** – Re-imports all records from Intercom on every sync. Used for tables where Intercom's API doesn't support server-side filtering by timestamp (admins, teams, tags, segments, companies, company_segments, articles, company_attributes, contact_attributes).

- **Incremental** – Only imports records modified since the last sync. Available for contacts, conversations, tickets, activity_logs, and conversation_parts. These tables use a server-side `updated_at` or `created_at` filter, so only changed data is fetched.

When you enable incremental sync for a supported table:

1. The first sync performs a full import to establish a baseline.
2. Subsequent syncs only fetch records modified since the last sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
