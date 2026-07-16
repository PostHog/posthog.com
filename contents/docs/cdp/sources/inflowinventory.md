---
title: Linking inFlow Inventory as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Inflowinventory
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your inFlow Inventory credentials to pull your inventory, customer, vendor, and order data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to inFlow Inventory.
3. Next, gather your inFlow Inventory credentials:
   - **Company ID** – found on the **Integrations** page in [inFlow](https://www.inflowinventory.com/).
   - **API key** – create one on the same **Integrations** page. API access requires a paid plan with the API add-on. The key is only shown once — copy it before leaving the page.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using inFlow Inventory data in PostHog.

## Available tables

| Table             | Description                   | Sync method  |
| ----------------- | ----------------------------- | ------------ |
| `products`        | Product inventory data        | Full refresh |
| `customers`       | Customer records              | Full refresh |
| `vendors`         | Vendor (supplier) information | Full refresh |
| `sales_orders`    | Sales order data              | Full refresh |
| `purchase_orders` | Purchase order data           | Full refresh |

**Full refresh** tables reload all data on each sync.

## Sync limitations

All inFlow Inventory tables are full refresh only. The inFlow API doesn't support server-side timestamp filtering, so incremental sync isn't available.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
