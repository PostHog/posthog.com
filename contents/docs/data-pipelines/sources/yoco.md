---
title: Linking Yoco as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Yoco
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Yoco connector syncs payments, orders, refunds, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Import payments, orders, refunds, payouts, catalogue, staff, and Capital financing from your Yoco business.

Create an API key in the [Yoco Developer Console](https://developer.yoco.com/ui). Give the key the scopes for the tables you want to sync: `business/orders:read` for payments, orders, refunds, and payment links, `business/payouts:read` for payouts and payout entries, `business/catalogue:read` for items, categories, brands, modifier groups, and taxes, `business/locations:read` for locations, `business/staff:read` for staff, `business/devices:read` for card machines, `business/capital_advances:read` for active Capital advances, and `business/capital_offers:read` for active Capital offers.

You'll be asked for:

- **API key**: create a key in the [Yoco Developer Console](https://developer.yoco.com/ui).

## Sync modes

<SyncModes />

All Yoco tables are full refresh. Each sync replaces the contents of the table.

The Capital tables list only active advances and offers. When an advance is repaid or an offer expires, the next sync removes it from the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
