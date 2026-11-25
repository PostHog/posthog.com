---
title: Linking Loop Returns as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LoopReturns
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Loop Returns connector syncs returns, advanced shipping notices, destinations, and more into the PostHog Data Warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Loop API key to pull your returns data.

Create a key in Loop under **Settings** > **Developers**. Give it the scopes for the tables you want to sync:

| Tables                                 | Required scope        |
| -------------------------------------- | --------------------- |
| `returns`, `advanced_shipping_notices` | `Returns`             |
| `destinations`                         | `Destinations (Read)` |
| `orders`                               | `Order (Read)`        |
| `products`, `product_variants`         | `Product (Read)`      |
| `customers`                            | `Customers (Read)`    |
| `locations`                            | `Locations (Read)`    |
| `inventories`                          | `Inventory (Read)`    |

Start date is optional and sets how far back the first sync reaches. Without it, syncing starts two years ago. You can select a date up to five years ago.

You'll be asked for:

- **API key**

## API versions

New sources default to API version `2026-10`. PostHog also supports `2026-07` and the legacy `v1` alias for `2026-07`.

The `v1` alias sunsets on July 15, 2028. After the sunset, Loop serves the oldest supported version instead of rejecting requests. Update sources that use `v1` to an explicit supported version before then. See [Loop's API versioning guide](https://docs.loopreturns.com/api-reference/versioning).

## Sync modes

<SyncModes />

The `returns` table supports incremental sync on `created_at` or `updated_at`. The `advanced_shipping_notices` table supports incremental sync on `created_at`.

The remaining tables use full refresh. Each sync replaces their contents.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
