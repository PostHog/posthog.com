---
title: Linking Triple Whale as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TripleWhale
---

Import your Triple Whale e-commerce attribution and performance data into the PostHog data warehouse. This source syncs order journey data with marketing attribution and daily summary metrics.

> **Note:** This source is currently in alpha.

## Prerequisites

- A Triple Whale account
- A Triple Whale API key with the appropriate read scopes
- Your shop domain from Triple Whale **Settings > Store**

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Triple Whale.
3. Create an API key in your Triple Whale dashboard at **Data > APIs**. Grant the key **Pixel Attribution** and **Summary Page** read scopes depending on which tables you want to sync. Note your **shop domain** from **Settings > Store**.
4. Back in PostHog, enter your credentials:
   - **API key** – your Triple Whale API key
   - **Shop domain** – your shop domain (e.g., `example.myshopify.com`)
   - **Import start date** – the date to start importing data from in `YYYY-MM-DD` format
5. Click **Next**, select the tables you want to sync, then click **Import**.

Once the sync completes, you can start querying your Triple Whale data in PostHog.

## Available tables

| Table                  | Description                                                                                                  | Sync method  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | ------------ |
| `orders_with_journeys` | Orders with customer journeys and Triple Pixel attribution, including marketing sources and campaign details | Full refresh |
| `summary_page`         | Daily Summary Page metrics for sales and marketing performance                                               | Full refresh |

**Full refresh** means all data from your import start date is reloaded on each sync. This ensures changes to historical attribution and metrics are captured.

## Sync considerations

- Both tables use full refresh to capture retroactive changes to historical attribution and metrics.
- Each sync reads all data from your configured import start date, so longer date ranges require more API requests and take longer to complete.
- The `orders_with_journeys` table requires the **Pixel Attribution** read scope on your API key.
- The `summary_page` table requires the **Summary Page** read scope on your API key.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
