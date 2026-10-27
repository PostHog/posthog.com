---
title: Linking StockData.org as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: StockData
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The StockData.org connector syncs news, quote, eod, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your StockData.org API token to pull market news with sentiment plus quote, end-of-day, intraday, dividend, and split price data.

You can find your API token in your [StockData.org dashboard](https://www.stockdata.org/dashboard).

Add one or more comma-separated **symbols** (e.g. `AAPL,MSFT,TSLA`) to sync the price tables (quote, EOD, intraday, dividends, splits) and `entity_search` — those endpoints require at least one symbol. The news and news stats tables work without symbols and are filtered to your symbols when they are set.

Note: StockData.org plans are limited by daily request quotas (100 requests/day on the free plan), and some tables (dividends, splits, news_stats_intraday, news_stats_aggregation) require a Standard or higher plan.

You'll be asked for:

- **API token**

## Sync modes

<SyncModes />

Some tables (news, eod, intraday, news_stats_intraday) sync incrementally. The rest use full refresh, replacing the table contents on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
