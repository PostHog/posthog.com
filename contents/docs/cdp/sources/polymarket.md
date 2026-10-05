---
title: Linking Polymarket as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Polymarket
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Polymarket connector syncs events, markets, series, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

None. The Polymarket API is public, so no account or API key is needed.

## Adding a data source

<SourceSetupIntro />

Polymarket's Gamma API is public, so this source needs no API key.

It syncs events, markets, series, and tags. Order books, price history, and wallet positions come from separate APIs and are not supported yet.

## Sync modes

<SyncModes />

All Polymarket tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
