---
title: Linking Twelve Data as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TwelveData
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Twelve Data connector syncs stocks, etfs, indices, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Import market data from Twelve Data: instrument catalogs, historical prices, quotes, dividends, splits, and earnings.

You'll be asked for:

- **API key**
- **Symbols**: comma-separated list of up to 100 symbols to sync in the time series, quotes, dividends, splits, and earnings tables. Each Twelve Data request is charged per symbol, so a longer list uses more of your plan's API credits.
- **Time series interval**: choose between 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 1day, 1week and 1month.

## Sync modes

<SyncModes />

All Twelve Data tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
