---
title: Linking Finage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Finage
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Finage connector pulls US stock market data, such as quotes, trades, and historical OHLCV bars, into the PostHog Data warehouse, so you can analyze it alongside your product data.

## Prerequisites

You need a Finage account with a paid plan that includes access to the **US stocks** endpoints so you can create an API key.

## Adding a data source

<SourceSetupIntro />

When linking Finage, you'll need:

- **API key** – find your key in the [Finage dashboard](https://finage.co.uk/dashboard) after subscribing to a plan. The key needs access to the US stocks endpoints.
- **Symbols** – a comma-separated list of US stock symbols to sync, for example `AAPL,MSFT,TSLA`.
- **Backfill start date** – optional. The earliest date (`YYYY-MM-DD`) to pull historical aggregate bars from. Defaults to the connector's built-in start date.

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Finage API key may be invalid or revoked. Generate a new key in your Finage dashboard, then reconnect.
- If you see a permission error, your Finage plan does not include access to this data. Upgrade your Finage subscription or remove the affected tables, then reconnect.

<TroubleshootingLink />
