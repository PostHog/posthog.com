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

The Twelve Data connector syncs stocks, etfs, indices, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Import market data from Twelve Data: instrument catalogs, historical prices, quotes, company profiles, fundamentals, market capitalization, ownership, dividends, splits, earnings, and event calendars.

You'll be asked for:

- **API key**
- **Symbols**: comma-separated list of up to 100 symbols to sync in the per-symbol tables (time series, quotes, profiles, statistics, balance sheets, cash flows, income statements, market cap, holders, dividends, splits, and earnings). Each Twelve Data request is charged per symbol, so a longer list uses more of your plan's API credits.
- **Time series interval**: choose between 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 1day, 1week and 1month.

## Sync modes

<SyncModes />

The time series and market cap tables support incremental sync. All other Twelve Data tables are full refresh. Each full refresh sync replaces the contents of the table.

The earnings, dividends, splits, and IPO calendar tables are market-wide and do not use your symbols list. Each sync gets the events from 7 days before the sync date to 30 days after it.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
