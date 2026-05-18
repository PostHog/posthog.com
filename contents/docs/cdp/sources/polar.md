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

The Polar connector syncs billing data from your Polar.sh account into PostHog, including customers, products, orders, subscriptions, refunds, checkouts, benefits, and organizations.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Polar.

3. Create an Organization Access Token in Polar. In your Polar dashboard, go to **Settings** > **Developers** > **Organization Access Tokens** and create a new token. Grant the token **Read** access to these scopes:

   - `customers:read`
   - `products:read`
   - `orders:read`
   - `subscriptions:read`
   - `refunds:read`
   - `checkouts:read`
   - `benefits:read`
   - `organizations:read`

   Granting only read scopes ensures the token can't modify your Polar data.

4. Back in PostHog, paste the API key into the **API Key** field and click **Next**.

5. Select the tables you want to sync and modify the method and frequency as needed. Click **Import**.

Once syncing completes, you can start using Polar data in PostHog.

## Configuration

<SourceParameters />

## Sync methods

All Polar tables support incremental syncing. The subscriptions table uses `started_at` as the replication key, while all other tables use `created_at`.

**Limitation:** Polar's API doesn't support filtering by `updated_at`, so incremental syncs only capture newly created rows. Changes to existing rows – like a subscription being cancelled or a customer's details being updated – aren't picked up until the next full refresh sync. If you need to track updates to existing records, use full table refresh instead of incremental sync.
