---
title: Linking Conekta as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Conekta
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Conekta connector syncs charges, checkouts, customers, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync orders, charges, customers, and payouts from Conekta. Use the private key from [Developers > API keys](https://panel.conekta.com/developers/api-keys) in your Conekta panel. Production and test keys return different data, so pick the environment you want to sync.

You'll be asked for:

- **Private key**: the private key from [Developers > API keys](https://panel.conekta.com/developers/api-keys). The public key is only used for frontend tokenization and will not work here.

## Sync modes

<SyncModes />

All Conekta tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the private key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
