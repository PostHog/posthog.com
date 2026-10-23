---
title: Linking Marketstack as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Marketstack
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Marketstack connector syncs end-of-day, intraday, splits, and dividends data plus market reference tables – tickers, exchanges, currencies, and timezones – into PostHog, so you can analyze market data alongside your product data.

## Prerequisites

You need a Marketstack account with an access key. Marketstack pricing is a monthly request quota tied to your plan, and some tables (such as intraday) require a paid plan.

## Adding a data source

<SourceSetupIntro />

When linking Marketstack, you'll need:

- **Access key** – find it in your [Marketstack dashboard](https://marketstack.com/dashboard).
- **Symbols** – add one or more comma-separated symbols (e.g. `AAPL,MSFT,TSLA`) to sync the EOD, intraday, splits, and dividends tables, since those endpoints require at least one symbol. The reference tables don't need symbols.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your plan does not grant access to a table, upgrade your Marketstack plan or deselect the restricted tables, then reconnect.
- If you hit your monthly request quota, upgrade your plan or wait for the quota to reset, then resync.

<TroubleshootingLink />
