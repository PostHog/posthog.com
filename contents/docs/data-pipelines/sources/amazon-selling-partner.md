---
title: Linking Amazon Selling Partner as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AmazonSellingPartner
---

The Amazon Selling Partner connector syncs your Amazon seller and vendor data into the PostHog Data Warehouse – orders, financial transactions, payouts, FBA inventory, fulfillment orders, vendor purchase orders, analytics reports, daily order metrics, invoices, and Subscribe and Save offers.

You need a Login with Amazon (LWA) application with Selling Partner API access. PostHog uses your LWA credentials to authenticate with Amazon's SP-API and sync data from the endpoints your app is authorized for.

## Prerequisites

Create a Selling Partner API application in the [Amazon Developer Console](https://developer.amazon.com/sp/overview.html) and authorize it for the seller or vendor account you want to sync.

Your app needs different SP-API roles depending on which tables you sync:

- **Inventory and Order Tracking** – required for `orders`, `order_items`, `inventory_summaries`, `inbound_plans`, `fulfillment_orders`, `vendor_purchase_orders`, `order_metrics`, and `replenishment_offers`
- **Finance and Accounting** – required for `transactions` and `payouts`
- **Amazon Fulfillment** – required for `fulfillment_orders`
- **Brand Analytics** – required for vendor report tables (`vendor_sales`, `vendor_inventory`, `vendor_net_pure_product_margin`, `vendor_forecasts`, `vendor_real_time_sales`)

Vendor accounts also need marketplace IDs for vendor reports, `order_metrics`, `invoices`, and `replenishment_offers`. Sellers can leave marketplace IDs blank to discover their marketplaces.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Amazon Selling Partner.
3. Select the **Region** that matches your Amazon account:
   - **North America** – US, Canada, Mexico, Brazil
   - **Europe** – UK, Germany, France, Italy, Spain, and others
   - **Far East** – Japan, Australia, Singapore
4. Enter your Login with Amazon credentials:
   - **LWA client ID** – your application's client ID (starts with `amzn1.application-oa2-client...`)
   - **LWA client secret** – your application's client secret
   - **Refresh token** – an authorized refresh token from your LWA app (starts with `Atzr|...`)
5. _(Optional)_ Enter **Marketplace IDs** as a comma-separated list. Required for vendor report tables and for vendors syncing `order_metrics`, `invoices`, or `replenishment_offers`. For sellers, this filters orders, order items, inventory, `order_metrics`, `invoices`, and `replenishment_offers` to specific marketplaces – leave it blank to sync every marketplace you sell in. Transactions always cover every marketplace regardless of this setting.
6. Click **Next**.
7. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

PostHog validates your credentials at connect time. If the refresh token or LWA credentials are invalid, the connection fails immediately.

## Available tables

The `order_metrics`, `invoices`, and `replenishment_offers` tables support both seller and vendor accounts, so they appear in both lists below.

### Seller tables

| Table                 | Description                                                                                       | Sync method                       |
| --------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------- |
| `orders`              | A customer order placed with the seller, with its items nested in orderItems.                     | Incremental on `lastUpdatedTime`  |
| `order_items`         | One row per item in an order, with the order's id, creation time and last update time.            | Incremental on `lastUpdatedTime`  |
| `transactions`        | A financial transaction on the seller account, such as an order payment, refund or fee.           | Incremental on `postedDate`       |
| `inventory_summaries` | FBA inventory levels per seller SKU and marketplace.                                              | Full refresh                      |
| `payouts`             | A disbursement from Amazon to the seller's bank account or other payment instrument.              | Incremental on `creationDate`     |
| `inbound_plans`       | A Fulfillment by Amazon inbound plan, used to send inventory to Amazon fulfillment centers.       | Full refresh                      |
| `fulfillment_orders`  | A multi-channel fulfillment order that Amazon ships from FBA inventory for a sale outside Amazon. | Incremental on `statusUpdateTime` |
| `order_metrics`                  | Amazon-computed order totals for one marketplace and one UTC day, for all buyer types and fulfillment networks. | Incremental on `startTime`         |
| `invoices`                       | Header of an invoice between Amazon and the selling partner, such as fees billed to a seller or a vendor invoice to Amazon. | Incremental on `lastUpdatedDate`   |
| `replenishment_offers`           | An offer enrolled in the Subscribe and Save replenishment program, with its program settings.               | Full refresh                       |

> **Note:** `orders` and `order_items` read the same Amazon endpoint, so syncing both takes roughly twice as long.

> **Note:** The `fulfillment_orders` table removes recipient personal data (name, street address, contact details and delivery notes) for privacy.

### Vendor tables

| Table                            | Description                                                                                                | Sync method                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `vendor_purchase_orders`         | A purchase order Amazon Retail placed with the vendor, with its line items. Amazon keeps 6 months of data. | Incremental on `purchaseOrderDate` |
| `vendor_sales`                   | Daily retail sales per ASIN (manufacturing view, retail program).                                          | Incremental on `startDate`         |
| `vendor_inventory`               | Daily inventory and operational health per ASIN.                                                           | Incremental on `startDate`         |
| `vendor_net_pure_product_margin` | Daily net pure product margin per ASIN.                                                                    | Incremental on `startDate`         |
| `vendor_forecasts`               | The latest weekly customer demand forecast per ASIN (retail program).                                      | Full refresh                       |
| `vendor_real_time_sales`         | Hourly ordered units and revenue per ASIN.                                                                 | Incremental on `startTime`         |
| `order_metrics`                  | Amazon-computed order totals for one marketplace and one UTC day, for all buyer types and fulfillment networks. | Incremental on `startTime`         |
| `invoices`                       | Header of an invoice between Amazon and the selling partner, such as fees billed to a seller or a vendor invoice to Amazon. | Incremental on `lastUpdatedDate`   |
| `replenishment_offers`           | An offer enrolled in the Subscribe and Save replenishment program, with its program settings.               | Full refresh                       |

Vendor report tables require the **Brand Analytics** SP-API role and marketplace IDs in the source configuration.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
