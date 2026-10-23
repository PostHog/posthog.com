---
title: Linking Mono as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mono
---

The Mono connector syncs your open banking data into PostHog, including customers, linked bank accounts, transactions, payment collections, and direct debit mandates.

[Mono](https://mono.co) is an African open banking platform that lets businesses access financial data from their customers' bank accounts.

## Prerequisites

Before connecting Mono to PostHog:

1. You need a **secret API key** from your Mono app. Copy it from the [Mono dashboard](https://app.mono.co).
2. Your customers must **link their bank accounts** through Mono before you can import transactions.

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Mono by clicking the **Link** button.
3. Enter your **Secret API key** from the [Mono dashboard](https://app.mono.co).
4. Enter a **Transaction start date** in `YYYY-MM-DD` format. This is the earliest date from which transactions are imported. It must be before today.
5. Click **Next**.
6. Select the tables you want to import, set the sync method and frequency, then click **Import**.

The data warehouse then starts syncing your Mono data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync modes

The `transactions`, `payments`, and `mandate_debits` tables support incremental syncing. All other tables use full refresh.

| Table            | Sync method                 | Notes                                                 |
| ---------------- | --------------------------- | ----------------------------------------------------- |
| `customers`      | Full refresh                |                                                       |
| `accounts`       | Full refresh                |                                                       |
| `transactions`   | Incremental or full refresh | Uses `date` as the cursor for incremental syncs       |
| `institutions`   | Full refresh                |                                                       |
| `payments`       | Incremental or full refresh | Uses `created_at` as the cursor for incremental syncs |
| `mandates`       | Full refresh                |                                                       |
| `mandate_debits` | Incremental or full refresh | Uses `date` as the cursor for incremental syncs       |

**Incremental** syncs fetch rows with a date at or after the last synced value, with a one-day overlap to capture late-arriving data. **Full refresh** syncs reload all data.

<CalloutBox icon="IconInfo" title="When to use full refresh" type="fyi">

Incremental syncs only pick up new rows going forward. They don't capture updates to previously synced records, such as payment refunds or status changes, outside the one-day overlap window. Use full refresh if you need the latest state of all records.

</CalloutBox>

## Available tables

| Table            | Description                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `customers`      | Customers registered with the Mono business                                                     |
| `accounts`       | Bank accounts linked to the Mono business                                                       |
| `transactions`   | Transactions from linked bank accounts within the selected date range                           |
| `institutions`   | Financial institutions that Mono supports, with their authentication methods and product scopes |
| `payments`       | One-time and recurring payments collected through Mono DirectPay and Direct Debit               |
| `mandates`       | Direct debit mandates that customers authorized for the business                                |
| `mandate_debits` | Debits made against direct debit mandates                                                       |
