---
title: Linking Square as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Square
---

The Square connector syncs payments, refunds, customers, locations, and catalog data from your Square account into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Square.

3. You need a Personal Access Token from Square. In the [Square Developer Dashboard](https://developer.squareup.com/apps), open your application (or create one) and navigate to **Credentials**. Copy your **Personal Access Token**.

   Grant the following read permissions for the data you want to sync:
   - `PAYMENTS_READ` – payments and refunds
   - `CUSTOMERS_READ` – customers
   - `MERCHANT_PROFILE_READ` – locations
   - `ITEMS_READ` – catalog

4. Back in PostHog, paste the access token into the **Access token** field and select your **Environment**:
   - **Production** – for live Square data (`connect.squareup.com`)
   - **Sandbox** – for test data (`connect.squareupsandbox.com`)

5. Click **Next**. Select the tables you want to sync and configure the sync method and frequency. Click **Import**.

Once the syncs are complete, you can start using Square data in PostHog.

## Configuration

<SourceParameters />

## Sync methods

The `payments` and `refunds` tables support incremental syncing using `created_at` as the replication key. This means only new records are fetched on each sync.

The `customers`, `locations`, and `catalog` tables sync via full table refresh only. Square's API doesn't expose a server-side time filter for these resources on their GET endpoints.

> **Note:** The `catalog` table includes items, categories, taxes, and other catalog objects from your Square account.
