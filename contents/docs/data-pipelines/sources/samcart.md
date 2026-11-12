---
title: Linking SamCart as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SamCart
---

The SamCart connector syncs orders, charges, subscriptions, and refunds from your SamCart account into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to SamCart.

3. Next, you need an API key from SamCart. In your SamCart dashboard, go to **Settings** > **API Keys** and create a new key. A **Read only** key is enough. Your SamCart plan must include API access.

4. Back in PostHog, paste your API key into the **API key** field and click **Next**.

5. Select the tables you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using SamCart data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync methods

All four tables support incremental syncing using `created_at` as the replication key.

**Incremental syncs only pick up new records.** They do not capture changes to existing records – for example, a refund that changes the status of an order, charge, or subscription. To pick up these changes, run a full refresh sync.

## Orders and UTM attribution

The `Orders` table includes the full `cart_items` line items, addresses, custom fields, and checkout attribution from the single-order detail endpoint.

It also includes flat UTM columns for easy querying:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `lead_source`

These values come from SamCart's enhanced attribution when available, falling back to legacy attribution when the enhanced value is empty.
