---
title: Linking SendOwl as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SendOwl
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Connect your [SendOwl](https://www.sendowl.com) account to sync products, orders, subscriptions, and discount codes into the PostHog data warehouse. SendOwl is an e-commerce platform for selling digital products like ebooks, courses, and software.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to SendOwl.
3. In your [SendOwl dashboard](https://dashboard.sendowl.com), go to **Settings** > **API** to find your API key and API secret. Copy both values.
4. Back in PostHog, enter your API key and API secret, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using SendOwl data in PostHog.

## Available tables

| Table            | Description                                                               | Sync method  |
| ---------------- | ------------------------------------------------------------------------- | ------------ |
| `products`       | Digital items, bundles, subscriptions, or drip content available for sale | Full refresh |
| `orders`         | Completed purchases including buyer, line items, and payment details      | Full refresh |
| `subscriptions`  | Recurring purchases of subscription products by customers                 | Full refresh |
| `discount_codes` | Coupons that apply discounts at checkout                                  | Full refresh |

**Full refresh** tables reload all data on each sync.

## Sync limitations

SendOwl's API doesn't provide server-side timestamp filtering, so all tables are full refresh only and reload all records on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
