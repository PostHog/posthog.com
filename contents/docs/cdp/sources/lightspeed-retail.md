---
title: Linking Lightspeed Retail as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LightspeedRetail
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Sync your Lightspeed Retail (X-Series) point-of-sale data – sales, customers, products, inventory, and more – into the PostHog data warehouse.

## Prerequisites

- A Lightspeed Retail (X-Series) account on the **Plus plan** or above.
- Admin access to create a personal token in Lightspeed under **Setup** > **Personal Tokens**.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Lightspeed Retail.
3. Enter your Lightspeed Retail credentials:
   - **Domain prefix** – the subdomain of your store URL. For example, if your store is at `mystore.retail.lightspeed.app`, enter `mystore`. You can also paste the full URL and PostHog normalizes it automatically.
   - **Personal token** – create one in Lightspeed under **Setup** > **Personal Tokens**. This requires admin access and a Plus plan or above.
4. Click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Lightspeed Retail data in PostHog.

## Available tables

| Table       | Description            | Sync method |
| ----------- | ---------------------- | ----------- |
| `sales`     | Sales transactions     | Incremental |
| `customers` | Customer records       | Incremental |
| `products`  | Product catalog        | Incremental |
| `inventory` | Inventory records      | Incremental |
| `outlets`   | Store outlet locations | Incremental |
| `registers` | Register devices       | Incremental |
| `users`     | Staff user accounts    | Incremental |
| `taxes`     | Tax configurations     | Incremental |

**Incremental** tables sync only new or updated records on each run.

## Sync mode

All tables support incremental sync using the `version` field. Every record in the Lightspeed X-Series API carries a monotonically increasing integer `version`. PostHog uses this as a cursor to fetch only records that changed since the last sync, so subsequent syncs are fast and efficient.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
