---
title: Linking Financial Modeling Prep as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: FinancialModelling
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Financial Modeling Prep connector syncs market and company financial data – company profiles, financial statements, and historical prices – into PostHog, so you can analyze financial data alongside your product data.

## Prerequisites

You need a Financial Modeling Prep account with an API key. Free-tier keys are heavily rate-limited, so keep your list of symbols focused.

## Adding a data source

<SourceSetupIntro />

When linking Financial Modeling Prep, you'll need:

- **API key** – find it in your [Financial Modeling Prep dashboard](https://site.financialmodelingprep.com/developer/docs/dashboard).
- **Symbols** – a comma-separated list of tickers to sync, for example `AAPL, MSFT, GOOGL`. The symbol-keyed tables are fetched once per ticker you list, so keep the list focused.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API key is invalid or has been revoked, generate a new key in your Financial Modeling Prep dashboard, then reconnect.
- If your plan does not grant access to a table, upgrade your plan or deselect the affected tables, then reconnect.

<TroubleshootingLink />
