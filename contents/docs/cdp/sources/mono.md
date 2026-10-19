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

The Mono connector syncs your open banking data into PostHog, including customers, linked bank accounts, and transactions.

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

The transactions table supports incremental syncing using the `date` field. All other tables use full refresh.

| Table          | Sync method                 | Notes                                           |
| -------------- | --------------------------- | ----------------------------------------------- |
| `customers`    | Full refresh                |                                                 |
| `accounts`     | Full refresh                |                                                 |
| `transactions` | Incremental or full refresh | Uses `date` as the cursor for incremental syncs |

**Incremental** syncs fetch transactions with a `date` at or after the last synced value, with a one-day overlap to capture late-arriving data. **Full refresh** syncs reload all data from the configured start date.

<CalloutBox icon="IconInfo" title="When to use full refresh for transactions" type="fyi">

Incremental syncs only pick up new transactions going forward. If a customer links a new bank account, you need to run a full refresh to import that account's historical transactions. The same applies if you need to capture changes outside the one-day overlap window.

</CalloutBox>

## Available tables

| Table          | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| `customers`    | Customers registered with the Mono business                           |
| `accounts`     | Bank accounts linked to the Mono business                             |
| `transactions` | Transactions from linked bank accounts within the selected date range |
