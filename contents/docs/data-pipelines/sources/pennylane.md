---
title: Linking Pennylane as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pennylane
---

> **Note:** This source is in **BETA**.

The Pennylane connector syncs your accounting data from [Pennylane](https://www.pennylane.com/) – a French accounting and invoicing platform – into PostHog. This includes customers, suppliers, invoices, quotes, transactions, ledger entries, and more.

## Prerequisites

- A Pennylane account on the Essential plan or higher
- Admin access to create API tokens
- A company API token with read-only access to the tables you want to sync

## Creating an API token

1. In Pennylane, go to **Settings** > **Connectivity** > **Developers**.
2. Create a new API token.
3. Select **Read only** access.
4. Select the scopes for each table you want to sync. See the [required scopes](#required-scopes) table below.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and then click **Link** next to Pennylane.
3. Paste your **API token**.
4. Click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs complete, you can start using Pennylane data in PostHog.

## Required scopes

Each table requires a specific read-only scope on your API token. Some tables share a scope.

| Table                   | Required scope                   |
| ----------------------- | -------------------------------- |
| `customers`             | `customers:readonly`             |
| `suppliers`             | `suppliers:readonly`             |
| `products`              | `products:readonly`              |
| `customer_invoices`     | `customer_invoices:readonly`     |
| `supplier_invoices`     | `supplier_invoices:readonly`     |
| `quotes`                | `quotes:readonly`                |
| `commercial_documents`  | `commercial_documents:readonly`  |
| `billing_subscriptions` | `billing_subscriptions:readonly` |
| `purchase_requests`     | `purchase_requests:readonly`     |
| `transactions`          | `transactions:readonly`          |
| `bank_accounts`         | `bank_accounts:readonly`         |
| `journals`              | `journals:readonly`              |
| `ledger_accounts`       | `ledger_accounts:readonly`       |
| `ledger_entries`        | `ledger_entries:readonly`        |
| `ledger_entry_lines`    | `ledger_entries:readonly`        |
| `fiscal_years`          | `fiscal_years:readonly`          |
| `categories`            | `categories:readonly`            |
| `category_groups`       | `categories:readonly`            |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync methods

### Incremental sync

Incremental sync is available for nine tables that have Pennylane changelogs: `customers`, `suppliers`, `products`, `customer_invoices`, `supplier_invoices`, `quotes`, `transactions`, `ledger_entries`, and `ledger_entry_lines`.

Instead of re-downloading the full table, incremental sync reads the Pennylane changelog to fetch only changed records since the last sync.

There are two limitations to be aware of:

- **4-week changelog retention** – Pennylane keeps changelog events for 4 weeks. If the last sync is older than 27 days, the next sync reads the full table instead of the changelog.

- **Deletions are not synced** – Incremental sync does not remove records that were deleted in Pennylane. Use a full refresh sync to remove deleted records.

### Full refresh sync

Full refresh re-downloads the entire table on each sync. This is available for all 18 tables and is the only sync method for the nine tables without changelogs.

Use full refresh when you need to capture deletions or when a table doesn't support incremental sync.

## Troubleshooting

### Sync failing with an access error

If your sync fails with an access or permission error, check that your API token has the required scopes for the tables you're syncing. You can find the required scope for each table in the [required scopes](#required-scopes) table above.

Generate a new token with the correct scopes in Pennylane under **Settings** > **Connectivity** > **Developers**, then reconnect the source.

### Sync failing with an authentication error

If your sync fails with an authentication error, your API token may be expired or deleted. Generate a new token in Pennylane and update your source configuration in PostHog.

For more help, see the [Data Warehouse troubleshooting guide](/docs/data-warehouse/troubleshooting).
