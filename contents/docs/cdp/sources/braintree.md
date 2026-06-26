---
title: Linking Braintree as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Braintree
---

The Braintree connector syncs your payment data into PostHog, including transactions, refunds, and disputes.

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

The Braintree source is currently in alpha. Customer, plan, and subscription data isn't available yet — these live in Braintree's legacy SDK API and are planned as a follow-up.

</CalloutBox>

## Supported tables

| Table            | Description                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| **transactions** | Payment transactions including amount, status, currency, order ID, merchant account, and payment method type |
| **refunds**      | Refund records including amount, status, the refunded transaction reference, and order ID                    |
| **disputes**     | Dispute records including amount disputed, status, type, case number, and received date                      |

All three tables support incremental syncs on the `createdAt` field.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.

2. Click **+ New source** and then click **Link** next to Braintree.

3. Select your **Environment** — either **Production** or **Sandbox**. Make sure the keys you provide in the next steps match the selected environment.

4. To find your API keys, go to the [Braintree Control Panel](https://www.braintreegateway.com/) and navigate to **Settings** > **API Keys**. If you don't have a key pair yet, generate one. Copy the **Public key** and **Private key**.

5. Paste your **Public key** and **Private key** into the corresponding fields in PostHog.

6. Click **Next**.

7. On the next page, select the tables you want to sync and configure the sync method and frequency. Click **Import**.

Once the sync completes, you can start querying your Braintree data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync details

- **Incremental sync** - All tables support incremental syncs using the `createdAt` field. PostHog filters server-side using a `greaterThanOrEqualTo` search filter, so only new records are fetched on each run.
- **Partitioning** - Data is partitioned by month on the `createdAt` field.
- **Pagination** - Uses Relay-style cursor pagination. If a sync is interrupted, it resumes from the last successfully synced page.
