---
title: Linking CoinGecko as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CoinGecko
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The CoinGecko connector pulls cryptocurrency market data into the PostHog Data warehouse, so you can analyze it alongside your product data.

## Prerequisites

You need a CoinGecko account so you can create an API key, either a free Demo key or a paid Pro key.

## Adding a data source

<SourceSetupIntro />

When linking CoinGecko, you'll need:

- **Plan** – choose the plan that matches your key. Demo (free) keys use the `x-cg-demo-api-key` header and Pro (paid) keys use the `x-cg-pro-api-key` header, and they use different hosts.
- **API key** – create a key in your [CoinGecko developer dashboard](https://www.coingecko.com/en/developers/dashboard).

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your CoinGecko API key may be invalid or revoked. Create a new key of the matching plan in your CoinGecko dashboard, then reconnect.
- CoinGecko enforces tight per-minute rate limits and monthly credit caps, especially on the Demo plan, so large tables may take a while to sync.

<TroubleshootingLink />
