---
title: Linking SimFin as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SimFin
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The SimFin connector syncs standardized financial statements, derived ratios, daily share prices, shares outstanding, and company metadata for the stock tickers you choose into the PostHog Data warehouse, so you can analyze market and fundamentals data alongside your product data.

## Prerequisites

You need a SimFin account with a confirmed e-mail address and an API key. A free account works, but historical depth, dataset access, and request rate limits depend on your SimFin plan.

## Adding a data source

<SourceSetupIntro />

When linking SimFin, you'll need:

- **API key** – find it in the [SimFin app](https://app.simfin.com/data-api). Make sure you've confirmed your account e-mail first, or the API rejects every request.
- **Tickers** – a comma-separated list of the stock tickers to sync (e.g. `AAPL, MSFT, GOOG`), up to 100.

## Sync modes

<SyncModes />

SimFin has no change cursor, so every table syncs as a full refresh. Each selected table costs one API request per configured ticker on every sync, and SimFin rate limits requests per second by plan tier, so prefer a modest ticker list and a daily sync schedule.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or your SimFin account e-mail isn't confirmed yet. Confirm the e-mail, check the key in the SimFin app, then reconnect.
- If you see a permissions error on a specific table, your SimFin plan doesn't include that dataset. Upgrade your plan or deselect the table.
- If a ticker returns no rows, it isn't in SimFin's database under that symbol. Look the company up in the `companies` table to find the ticker SimFin uses.

<TroubleshootingLink />
