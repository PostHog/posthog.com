---
title: Linking Etsy as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Etsy
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Etsy connector syncs shop, shop sections, listings, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync your Etsy shop's orders, listings, reviews and payment ledger.

Register a personal app in the [Etsy developer portal](https://www.etsy.com/developers/your-apps) to get a keystring and its shared secret, then run Etsy's OAuth flow to grant your shop and keep the refresh token it returns. The token needs the `transactions_r`, `listings_r` and `shops_r` scopes - add `billing_r` if you want the payment ledger. Leave the shop ID blank and we'll use the shop the token belongs to.

You'll be asked for:

- **API keystring**: for example `Your app's keystring`.
- **Shared secret**: for example `Your app's shared secret`.
- **Refresh token**

## Sync modes

<SyncModes />

All Etsy tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API keystring is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
