---
title: Linking Omnisend as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Omnisend
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Omnisend connector syncs your Omnisend eCommerce email and SMS marketing data – contacts, campaigns, carts, orders, products, and categories – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Omnisend.
3. Next, you need an API key from Omnisend. In your [Omnisend account settings](https://app.omnisend.com/settings/integrations/api-keys), create a new API key and copy its value.
4. Back in PostHog, paste the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Omnisend data in PostHog.

## Available tables

| Table        | Description                       | Sync method  |
| ------------ | --------------------------------- | ------------ |
| `contacts`   | Contacts in your Omnisend account | Full refresh |
| `campaigns`  | Email and SMS campaigns           | Full refresh |
| `carts`      | Abandoned cart data               | Full refresh |
| `orders`     | Order data                        | Full refresh |
| `products`   | Product catalog data              | Full refresh |
| `categories` | Product categories                | Full refresh |

All tables use **full refresh**, which reloads all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
