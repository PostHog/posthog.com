---
title: Linking Ramp as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ramp
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

The Ramp source is currently in alpha. It has been tested against Ramp's developer API documentation but not yet battle-tested with live production workloads. If you run into issues, please let us know.

</CalloutBox>

The Ramp connector syncs your corporate spend data into PostHog, including transactions, reimbursements, users, cards, and departments.

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Ramp by clicking the **Link** button.
3. Select your **Environment** from the dropdown:

| Label          | Connects to         |
| -------------- | ------------------- |
| Production     | `api.ramp.com`      |
| Sandbox (demo) | `demo-api.ramp.com` |

4. Enter your **Client ID** and **Client secret**. These come from a developer app you create in Ramp (see [Creating a developer app](#creating-a-developer-app) below).
5. Click **Next**.
6. Select the tables you want to import, set the sync method and frequency, then click **Import**.

The data warehouse then starts syncing your Ramp data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Creating a developer app

To connect Ramp to PostHog, you need to create a developer app with the correct read scopes:

1. In your Ramp dashboard, go to **Settings** > **Developer API**.
2. Create a new developer app.
3. Grant the following read scopes:

- `transactions:read`
- `reimbursements:read`
- `users:read`
- `cards:read`
- `departments:read`

<CalloutBox icon="IconWarning" title="Scopes are fixed at app creation" type="caution">

Ramp locks scopes when the developer app is created. You can't add scopes later – make sure all five read scopes are granted before creating the app.

</CalloutBox>

4. Enable **client credentials** authentication on the app.
5. Copy the **Client ID** (starts with `ramp_id_...`) and **Client secret** (starts with `ramp_sec_...`) – you'll need both when linking the source in PostHog.

## Configuration

<SourceParameters />

## Sync modes

The transactions table supports incremental syncing using the `user_transaction_time` field. All other tables use full refresh.

| Table            | Sync method  | Notes                                      |
| ---------------- | ------------ | ------------------------------------------ |
| `transactions`   | Incremental  | Uses `user_transaction_time` as the cursor |
| `reimbursements` | Full refresh |                                            |
| `users`          | Full refresh |                                            |
| `cards`          | Full refresh |                                            |
| `departments`    | Full refresh |                                            |

**Incremental** syncs only fetch records with a `user_transaction_time` at or after the last synced value. **Full refresh** syncs reload all data on each run.

<CalloutBox icon="IconInfo" title="Incremental syncs don't capture status changes" type="fyi">

Ramp's API doesn't support an `updated_after` filter on transactions. This means incremental syncs capture new transactions but miss late state changes on existing ones (e.g., a transaction moving from pending to cleared). If tracking transaction status changes matters to you, run an occasional full refresh sync on the transactions table.

</CalloutBox>

## Available tables

| Table            | Description                                   |
| ---------------- | --------------------------------------------- |
| `transactions`   | Corporate card transactions and spend data    |
| `reimbursements` | Employee reimbursement requests and payouts   |
| `users`          | Ramp users in your organization               |
| `cards`          | Corporate cards issued to employees           |
| `departments`    | Department structure within your organization |
