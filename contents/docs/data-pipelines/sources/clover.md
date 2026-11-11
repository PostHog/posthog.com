---
title: Linking Clover as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clover
---

The Clover connector syncs your [Clover (Fiserv)](https://www.clover.com/) point-of-sale and payment data into PostHog, including orders, payments, customers, inventory items, employees, and more.

> **Note:** This source uses full refresh syncing only and has not yet been verified against a live Clover account.

## Prerequisites

- A Clover merchant account
- A merchant API token (generated in your Clover developer dashboard)
- Your alphanumeric **Merchant ID** from the Clover dashboard
- Your merchant's **region**: North America, Europe, Latin America, or Sandbox

Each source imports data from **one merchant**. To import data from multiple merchants, create a separate source for each.

## Sync modes

All Clover tables use **full refresh** syncing. Each sync re-downloads every row for the selected tables. Incremental and webhook sync modes are not supported.

Full refresh ensures that updates to existing records (such as a modified order or updated customer) are always captured, since Clover's API does not expose verified incremental filters.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/pipeline/sources) and click the **Sources** tab.
2. Click **+ New source** and select **Clover** by clicking **Link**.
3. Select your **Region**: North America, Europe, Latin America, or Sandbox.
4. Enter your **Merchant ID** (the alphanumeric identifier from your Clover dashboard).
5. Enter your **API token** (a merchant API token with the required permissions — see below).
6. _Optional:_ Add a prefix to your table names.
7. Click **Next**.

The data warehouse then starts syncing your Clover data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/pipeline/sources).

## Required permissions

Your API token must have the correct permissions for the tables you want to sync. Grant these in the Clover developer dashboard:

| Tables                                                                          | Required permission |
| ------------------------------------------------------------------------------- | ------------------- |
| `orders`, `line_items`                                                          | Read orders         |
| `payments`, `refunds`, `credit_refunds`                                         | Read payments       |
| `items`, `categories`, `modifier_groups`, `modifiers`, `discounts`, `tax_rates` | Read inventory      |
| `customers`                                                                     | Read customers      |
| `employees`, `shifts`                                                           | Read employees      |
| `tenders`                                                                       | Read merchant       |

If your token is missing a permission, PostHog shows an error when you try to sync that table. Grant the permission in the Clover dashboard and try again.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The Clover source supports 15 tables:

- **Commerce:** `orders`, `line_items`, `payments`, `refunds`, `credit_refunds`
- **Inventory:** `items`, `categories`, `modifier_groups`, `modifiers`
- **People:** `customers`, `employees`, `shifts`
- **Settings:** `tenders`, `discounts`, `tax_rates`

A few things to note:

- All Clover timestamps are **epoch milliseconds**. Tables with a creation timestamp also include a `created_at` column converted to UTC.
- Money amounts are integers in the merchant's **smallest currency unit** (for example, cents for USD).
- `line_items` are fetched per order. The `order_id` and `order_created_time` columns link each line item back to its parent order.

## Troubleshooting

### "Clover rejected your credentials"

Your API token is invalid or expired. Generate a new merchant API token in the Clover developer dashboard and update the source in PostHog.

### 403 Forbidden error

Your API token is missing the required permission for the table you're trying to sync. Check the [required permissions](#required-permissions) table above, grant the missing permission in the Clover dashboard, and sync again.

### "Clover could not find this merchant"

The merchant ID or region is incorrect. Double-check both values in your Clover dashboard and update the source configuration.

### "Clover supports full refresh only"

You've set a table to incremental sync mode. Clover only supports full refresh. Change the sync mode to **full refresh** in the table settings.

For more help, see the [Data Warehouse troubleshooting guide](/docs/data-warehouse/troubleshooting).
