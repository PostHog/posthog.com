---
title: Linking Dodo Payments as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DodoPayments
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Dodo Payments connector syncs payments, subscriptions, customers, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync payments, subscriptions, customers, refunds, disputes, payouts, invoices, blocklisted customers, and your product catalog from Dodo Payments. Create an API key in your Dodo Payments dashboard under [Developer > API keys](https://app.dodopayments.com/developer/api-keys). Read access is enough.

You'll be asked for:

- **API key**: create a key under [Developer > API keys](https://app.dodopayments.com/developer/api-keys). A read-only key is enough to sync.
- **Mode**: dodo Payments keeps test and live data on separate hosts with separate keys. Pick the mode your key was issued for.

## Sync modes

<SyncModes />

Dodo Payments tables use different sync modes depending on the data type:

- **Incremental with lookback** – Core billing tables like payments, subscriptions, customers, invoices, and blocklisted customers sync incrementally but re-read a trailing 30-day window. This is because Dodo's API only filters on `created_at` (there is no `updated_at` filter), so changes to fields like `status` or `refund_status` would otherwise be missed. You can adjust the lookback window per table in the schema settings.

- **Incremental** – Immutable event tables like events and balance ledger entries sync incrementally without a lookback window since their data doesn't change after creation.

- **Full refresh** – Catalog resources (products, discounts, addons, etc.) and child tables (invoice events, subscription credit usage, subscription usage history, etc.) use full refresh. Catalog tables have no date filters, and child tables receive new data long after their parent is created.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
