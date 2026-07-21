---
title: Linking Polar as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Polar
---

Connect your Polar.sh account to sync customers, products, orders, subscriptions, and more into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Polar.
3. Next, you need an [Organization Access Token](https://docs.polar.sh/integrate/oat) from Polar. Create one in your Polar account and grant it the following read scopes: `benefits:read`, `checkouts:read`, `customers:read`, `orders:read`, `organizations:read`, `products:read`, `refunds:read`, and `subscriptions:read`. Copy the token value (it starts with `polar_oat_`).
4. Back in PostHog, enter the token in the `Organization Access Token` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Polar data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `customers` | Customers in your Polar organization | Full refresh |
| `products` | Products you sell on Polar | Full refresh |
| `orders` | Orders placed through Polar | Full refresh |
| `subscriptions` | Active and past subscriptions | Full refresh |
| `refunds` | Refunds issued | Full refresh |
| `checkouts` | Checkout sessions | Full refresh |
| `benefits` | Benefits attached to your products | Full refresh |
| `organizations` | Your Polar organizations | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
