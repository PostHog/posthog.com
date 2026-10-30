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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Alpha Vantage connector syncs stock market data, company fundamentals, and US macroeconomic indicators into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Alpha Vantage API key and the stock symbols you want to track. Stock and company tables sync data for your configured symbols, while US macroeconomic tables (GDP, CPI, treasury yields, and more) sync independently without requiring symbols.

You can claim a free API key on the [Alpha Vantage support page](https://www.alphavantage.co/support/#api-key).

Note: the free tier is limited to roughly 25 requests per day. Stock and company tables cost one request per symbol on every sync. Macroeconomic tables cost one request each, except `treasury_yield` which uses six (one per maturity). Most tables are disabled by default to help manage quota. Some datasets require a paid plan.

You'll be asked for:

- **API key**
- **Symbols (comma-separated)**: for example `IBM, AAPL, MSFT`.

## Sync modes

<SyncModes />

All Alpha Vantage tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
