---
title: Linking Wise as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Wise
---

The Wise connector syncs profiles, balances, transfers, recipients, and activities from your Wise business account into PostHog.

> **Note:** This source is currently in **beta**. Personal API tokens are only available for Wise business accounts.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Wise.

3. You need a personal API token from Wise. In your Wise business account, go to **Settings** > **Accounting integrations** > **Developer tools** > **API tokens** and create a new token.

4. Back in PostHog, paste the token into the **Personal API token** field and click **Next**.

5. Select the tables you want to sync and configure the sync method and frequency as needed. Once done, click **Import**.

Wise limits what some tokens can read depending on your region and account type (e.g. businesses in the EU and UK). The table list marks each table your token can't read.

Once the syncs are complete, you can start using Wise data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync methods

The `transfers` and `activities` tables support incremental syncing with a 7-day lookback window. The lookback window re-reads the last 7 days of data on each sync to capture status changes that occur after a transfer or activity is created.

- `transfers` uses `created` as its replication key.
- `activities` uses `createdOn` as its replication key.

All other tables (`profiles`, `balances`, and `recipients`) are synced via full table refresh.
