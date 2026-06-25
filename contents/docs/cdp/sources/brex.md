---
title: Linking Brex as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Brex
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Brex connector syncs your spend data – card and cash transactions, expenses, users, departments, locations, vendors, and budgets – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Brex.
3. Next, you need an API user token from Brex. In your [Brex dashboard](https://dashboard.brex.com/settings/developer) under **Settings** > **Developer**, create a new token. Grant read access to the scopes for the data you want to sync: Transactions and Accounts, Expenses, Team, Payments, and Budgets.
4. Back in PostHog, enter your token in the **API user token** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Brex data in PostHog.

<CalloutBox icon="IconWarning" title="Token expiration" type="caution">

Brex API user tokens expire after 90 days without API activity. If your syncs start failing with authentication errors, generate a new token in your Brex dashboard and reconnect the source.

</CalloutBox>

## Available tables

| Table               | Description                                    | Sync method  |
| ------------------- | ---------------------------------------------- | ------------ |
| `card_transactions` | Card transactions on your primary card account | Incremental  |
| `cash_transactions` | Cash transactions across all cash accounts     | Incremental  |
| `expenses`          | Expenses submitted in Brex                     | Incremental  |
| `users`             | Users in your Brex account                     | Full refresh |
| `departments`       | Departments in your organization               | Full refresh |
| `locations`         | Locations in your organization                 | Full refresh |
| `vendors`           | Vendors in your Brex account                   | Full refresh |
| `budgets`           | Budgets configured in Brex                     | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
