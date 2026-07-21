---
title: Linking CoinMarketCap as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CoinMarketCap
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The CoinMarketCap connector syncs cryptocurrency and market data into PostHog, so you can analyze crypto and market data alongside your product data.

## Prerequisites

You need a CoinMarketCap account with a Pro API key. Some endpoints, such as exchanges, require a higher plan tier.

## Adding a data source

<SourceSetupIntro />

When linking CoinMarketCap, you'll need:

- **API key** – create one from your [CoinMarketCap developer dashboard](https://pro.coinmarketcap.com/account). The key grants read access to every endpoint.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API key is invalid or has been revoked, create a new key in your CoinMarketCap developer dashboard, then reconnect.

<TroubleshootingLink />
