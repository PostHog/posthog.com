---
title: Linking Exchange Rates API as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ExchangeRatesApi
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Exchange Rates API connector syncs foreign-exchange reference rates into PostHog, so you can analyze currency data alongside your product data.

## Prerequisites

You need an exchangeratesapi.io account with an access key. The free plan is restricted to the `EUR` base currency, and the `timeseries` table may not be available on every plan – a custom base currency requires a paid plan.

## Adding a data source

<SourceSetupIntro />

When linking Exchange Rates API, you'll need:

- **Access key** – create one in your [exchangeratesapi.io dashboard](https://exchangeratesapi.io/dashboard).
- **Base currency** – optional. Defaults to `EUR`. A custom base currency requires a paid plan.
- **Start date** – optional. The start date for the `timeseries` backfill, in `YYYY-MM-DD` format. The `timeseries` table is capped at a 365-day range per request and backfills are chunked automatically.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your access key may be invalid or revoked. Create a new key in your exchangeratesapi.io dashboard, then reconnect.
- If you see a permission error, your plan may not allow the request (for example a non-EUR base currency or the timeseries endpoint on the free plan). Upgrade your plan or adjust the source settings, then reconnect.

<TroubleshootingLink />
