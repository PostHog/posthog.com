---
title: Linking Turso as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Turso
---

The Turso connector syncs your database metadata, usage, members, billing, and operational data from [Turso](https://turso.tech) into the PostHog data warehouse. Turso is an edge database platform built on libSQL, an open-source fork of SQLite.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Turso.
3. You need an API token from Turso. Go to your Turso dashboard, navigate to **Settings** > **Tokens**, and create a new token.
4. Back in PostHog, enter the token in the **API token** field, enter your Turso organization name, and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Turso data in PostHog.

## Available tables

| Table                | Description                                                                      | Sync method  |
| -------------------- | -------------------------------------------------------------------------------- | ------------ |
| `databases`          | Database metadata, placement, and access settings                                | Full refresh |
| `groups`             | Database groups and their primary locations                                      | Full refresh |
| `members`            | Organization members and their roles                                             | Full refresh |
| `invites`            | Pending invitations to join the organization                                     | Full refresh |
| `invoices`           | Issued organization invoices and their payment status                            | Full refresh |
| `audit_logs`         | Actions performed within the organization (off by default)                       | Full refresh |
| `database_usage`     | Current calendar month usage totals and instance metrics for each database       | Full refresh |
| `database_instances` | Primary and replica instances of each database, with their regions and hostnames | Full refresh |
| `database_stats`     | Top queries of each database, with the rows they read and wrote                  | Full refresh |
| `organization_usage` | Current billing cycle usage totals for the organization and each database        | Full refresh |
| `locations`          | Location codes where databases can be created or replicated, with their names    | Full refresh |

> **Note:** The `audit_logs` table requires the Turso Scaler plan or higher. It's disabled by default – enable it in the table selection to start syncing.

**Full refresh** tables reload all data on each sync.

## Sync limitations

All tables use **full refresh** only. The Turso API doesn't support pagination or server-side timestamp filters, so incremental syncing isn't available.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
