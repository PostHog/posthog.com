---
title: Linking Finnworlds as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Finnworlds
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Finnworlds connector pulls financial market data into the PostHog Data warehouse, so you can analyze fundamentals, prices, dividends, ratings, and more alongside your product data.

## Prerequisites

You need a Finnworlds account with API access so you can obtain an API key.

## Adding a data source

<SourceSetupIntro />

When linking Finnworlds, you'll need:

- **API key** – find it in your [Finnworlds dashboard](https://finnworlds.com/dashboard/).
- **Tickers** – the stock tickers you want to sync (e.g. `AAPL, MSFT, GOOGL`). Most datasets (fundamentals, prices, dividends, ratings) return data for one company per request, so the connector fetches each dataset for every ticker. Bond yields are global and ignore the ticker list.

## Sync modes

<SyncModes />

All Finnworlds tables are full refresh only, since the API exposes no incremental sync filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails, your Finnworlds API key is invalid or expired, or it lacks access to this dataset. Generate a new key and reconnect.

<TroubleshootingLink />
