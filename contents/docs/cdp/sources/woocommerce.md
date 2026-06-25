---
title: Linking WooCommerce as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: WooCommerce
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The WooCommerce connector pulls your store data – products, orders, customers, coupons, and more – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to WooCommerce.
3. Next, you need your store URL and a REST API consumer key and secret. In your WordPress admin, go to **WooCommerce** → **Settings** → **Advanced** → **REST API** and click **Add key**. Give the key at least **Read** permission and generate it – WooCommerce shows the consumer key (starts with `ck_`) and consumer secret (starts with `cs_`) once. Your store URL is the base address of your store (for example, `https://example.com`); the REST API requires HTTPS.
4. Back in PostHog, enter your store URL in the `Store URL` field, the consumer key in the `Consumer key` field, and the consumer secret in the `Consumer secret` field, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using WooCommerce data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `products` | Store products | Incremental |
| `orders` | Customer orders | Incremental |
| `coupons` | Discount coupons | Incremental |
| `customers` | Customers | Full refresh |
| `product_categories` | Product categories | Full refresh |
| `product_tags` | Product tags | Full refresh |
| `product_reviews` | Product reviews | Full refresh |
| `product_attributes` | Product attributes | Full refresh |
| `tax_rates` | Tax rates | Full refresh |
| `shipping_zones` | Shipping zones | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only `products`, `orders`, and `coupons` support incremental sync, using the WooCommerce `modified_after` filter (available in WooCommerce 5.8.0 and later). All other tables are synced as a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
