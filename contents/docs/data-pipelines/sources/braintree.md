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

The Braintree connector syncs your payment data into PostHog, including transactions, refunds, disputes, customers, subscriptions, and merchant accounts.

## Supported tables

| Table                               | Description                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **transactions**                    | Payment transactions including amount, status, currency, order ID, merchant account, and payment method type |
| **refunds**                         | Refund records including amount, status, the refunded transaction reference, and order ID                    |
| **disputes**                        | Dispute records including amount disputed, status, type, case number, and received date                      |
| **customers**                       | Customer records including name, company, email, phone number, and website                                   |
| **recurring_billing_subscriptions** | Subscription records including status, plan ID, price, balance, billing cycle, and billing dates             |
| **merchant_accounts**               | Merchant accounts including currency, business name, status, and whether the account is the default          |

All tables except **merchant_accounts** support incremental syncs on the `createdAt` field. The **merchant_accounts** table uses full refresh syncs.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.

2. Click **+ New source** and then click **Link** next to Braintree.

3. Select your **Environment** – either **Production** or **Sandbox**. Make sure the keys you provide in the next steps match the selected environment.

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

- **Incremental sync** – For **transactions**, **refunds**, **customers**, and **recurring_billing_subscriptions**, PostHog filters server-side using a `greaterThanOrEqualTo` search filter on `createdAt`, so each run gets only new records. Braintree cannot filter disputes by `createdAt`, so each **disputes** sync reads all disputes and PostHog removes duplicates by primary key.
- **Partitioning** – Data is partitioned by month on the `createdAt` field. The **merchant_accounts** table is not partitioned.
- **Pagination** – Uses Relay-style cursor pagination. If a sync is interrupted, it resumes from the last successfully synced page.
