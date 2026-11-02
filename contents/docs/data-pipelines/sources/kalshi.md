---
title: Linking Kalshi as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kalshi
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Kalshi connector syncs markets, events, series, and more into the PostHog data warehouse, so you can analyze them alongside your product data. You can also sync your own portfolio data – fills, orders, positions, and settlements – by adding an API key.

## Prerequisites

Kalshi's public market tables (markets, events, series, trades, milestones) need no credentials.

To sync portfolio tables (fills, orders, positions, settlements), you need a Kalshi API key ID and private key. Create one in your [Kalshi account settings](https://kalshi.com/account/profile). The key only needs read access.

## Adding a data source

<SourceSetupIntro />

Kalshi's market data endpoints are public, so the source works without an API key. To also sync portfolio tables, enter your **API key ID** and **Private key** when creating the source. Both fields are optional – leave them blank to sync only public market data.

## Sync modes

<SyncModes />

Some Kalshi tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

| Sync method  | Tables                                                             |
| ------------ | ------------------------------------------------------------------ |
| Incremental  | `fills`, `historical_fills`, `settlements`                         |
| Full refresh | `orders`, `historical_orders`, `positions`, `historical_positions` |

Public market tables follow their own sync modes as listed in the table below.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one in your [Kalshi account settings](https://kalshi.com/account/profile), then reconnect the source.
- If a portfolio table fails with a missing credentials error, add your API key ID and private key to the source.
- If the private key is rejected, make sure you're pasting the full contents of the PEM file, including the `BEGIN` and `END` lines. The key must be an unencrypted RSA or Ed25519 key.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
