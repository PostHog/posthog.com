---
title: Linking Alpha Vantage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AlphaVantage
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Alpha Vantage connector syncs market data and company fundamentals for the stock symbols you choose into PostHog, so you can analyze financial data alongside your product data.

## Prerequisites

You need an Alpha Vantage API key, which you can claim for free on the [Alpha Vantage support page](https://www.alphavantage.co/support/#api-key). Note that the free tier is limited to roughly 25 requests per day, and each selected table costs one request per symbol on every sync. Some datasets require a paid plan.

## Adding a data source

<SourceSetupIntro />

When linking Alpha Vantage, you'll need:

- **API key** – claim a free key on the [Alpha Vantage support page](https://www.alphavantage.co/support/#api-key).
- **Symbols (comma-separated)** – the stock symbols you want to track, for example `IBM, AAPL, MSFT`.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you hit your daily request limit, wait for the quota to reset or upgrade your Alpha Vantage plan, then resync. Remember that each selected table costs one request per symbol on every sync.
- If a table fails or returns no data, it may require a paid plan. Upgrade your Alpha Vantage plan or deselect the restricted tables, then reconnect.

<TroubleshootingLink />
