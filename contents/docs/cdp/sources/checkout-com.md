---
title: Linking Checkout.com as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CheckoutCom
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Checkout.com connector syncs your disputes data into the PostHog data warehouse. Checkout.com has no list-all-payments endpoint — bulk payment data only exists via report files — so this source currently syncs disputes.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Checkout.com.
3. Create an access key in the [Checkout.com dashboard](https://dashboard.checkout.com/) under **Settings > Access keys** with the `disputes` scope. Note whether your key is for the production or sandbox environment.
4. Back in PostHog, select the **Environment** that matches your access key (Production or Sandbox).
5. Enter your **Access key ID** and **Access key secret**, then click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Checkout.com data in PostHog.

## Available tables

| Table      | Description                      | Sync method |
| ---------- | -------------------------------- | ----------- |
| `disputes` | Payment disputes and chargebacks | Incremental |

**Incremental** tables sync only new or updated records on each run using the `last_update` cursor field.

## Sync limitations

Only the disputes endpoint is available. Bulk payment data (charges, payouts, etc.) is delivered by Checkout.com as generated report files, which aren't supported by this source yet.

Incremental syncs use the `last_update` field as a cursor. Disputes are fetched newest-first, so the watermark is committed at the end of each sync run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
