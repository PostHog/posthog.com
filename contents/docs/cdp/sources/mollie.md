---
title: Linking Mollie as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mollie
---

The Mollie connector syncs your Mollie payments data into PostHog. The following tables are supported:

| Table         | Description          |
| ------------- | -------------------- |
| payments      | Payment transactions |
| refunds       | Refund records       |
| chargebacks   | Chargeback records   |
| customers     | Customer records     |
| subscriptions | Subscription records |
| settlements   | Settlement records   |
| payment_links | Payment link records |

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the **Sources** tab in PostHog.
2. Click **+ New source** and select Mollie.
3. Enter your Mollie API key. You can find this in the [Mollie dashboard](https://my.mollie.com/dashboard/developers/api-keys) under **Developers** > **API keys**. Use a live key (`live_...`) for production data — test keys only return test-mode data.
4. Select the tables you want to sync.
5. _Optional:_ Add a prefix to your table names.
6. Click **Next**.

The data warehouse then starts syncing your Mollie data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Sync mode

Mollie only supports **full refresh** syncs. Incremental syncs aren't available because the Mollie v2 API doesn't support filtering by created or updated date, and mutable objects like payments, refunds, and chargebacks continue to change status after creation. A full refresh ensures you always have accurate, up-to-date data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
