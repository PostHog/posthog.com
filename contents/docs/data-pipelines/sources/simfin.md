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

The SimFin connector syncs standardized financial statements, derived ratios, daily share prices, shares outstanding, company metadata, filing metadata, and SimFin database changes into the PostHog Data Warehouse, so you can analyze market and fundamentals data alongside your product data.

## Prerequisites

You need a SimFin account with a confirmed e-mail address and an API key. A free account works, but historical depth, dataset access, and request rate limits depend on your SimFin plan.

## Adding a data source

<SourceSetupIntro />

When linking SimFin, you'll need:

- **API key** – find it in the [SimFin app](https://app.simfin.com/data-api). Make sure you've confirmed your account e-mail first, or the API rejects every request.
- **Tickers** – a comma-separated list of the stock tickers to sync (e.g. `AAPL, MSFT, GOOG`), up to 100.

## Sync modes

<SyncModes />

Every SimFin table syncs as a full refresh. The `filings`, `data_change_log`, and `changed_companies` tables are off by default, so select them when you configure the source.

Most tables, including `filings`, make one API request per configured ticker on every sync. The `companies`, `data_change_log`, and `changed_companies` tables cover all companies and ignore the ticker setting. The `data_change_log` table makes one request per page.

SimFin rate limits requests per second by plan tier. Prefer a modest ticker list and a daily sync schedule.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or your SimFin account e-mail isn't confirmed yet. Confirm the e-mail, check the key in the SimFin app, then reconnect.
- If you see a permissions error on a specific table, your SimFin plan doesn't include that dataset. Upgrade your plan or deselect the table.
- If a ticker returns no rows, it isn't in SimFin's database under that symbol. Look the company up in the `companies` table to find the ticker SimFin uses.

<TroubleshootingLink />
