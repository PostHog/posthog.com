---
title: Linking Recharge as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Recharge
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Recharge connector automatically pulls your Recharge subscription data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Recharge.
3. You need a Recharge API token. In your [Recharge admin](https://docs.getrecharge.com/docs/recharge-api-and-developer-tools), go to **Apps & integrations > API tokens** and create a token. Grant **read** access to the resources you want to sync, e.g. Customers, Subscriptions, Orders, Charges, Addresses, Discounts, and Products. Some resources (such as Payment methods) are only available on Recharge Pro or Custom plans.
4. Back in PostHog, enter the token in the `API token` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Recharge data in PostHog.

## Available tables

| Table             | Description                                                  | Sync method  |
| ----------------- | ------------------------------------------------------------ | ------------ |
| `customers`       | Customers in your account                                    | Incremental  |
| `subscriptions`   | Subscriptions                                                | Incremental  |
| `orders`          | Orders                                                       | Incremental  |
| `charges`         | Charges                                                      | Incremental  |
| `addresses`       | Customer addresses                                           | Incremental  |
| `discounts`       | Discounts                                                    | Incremental  |
| `onetimes`        | One-time purchases                                           | Incremental  |
| `products`        | Products                                                     | Full refresh |
| `payment_methods` | Customer payment methods (Recharge Pro or Custom plans only) | Incremental  |
| `collections`     | Product collections                                          | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
