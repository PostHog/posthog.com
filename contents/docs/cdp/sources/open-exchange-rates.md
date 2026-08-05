---
title: Linking Open Exchange Rates as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OpenExchangeRates
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Open Exchange Rates connector syncs foreign-exchange reference rates – latest and historical rates, the currency list, and your API usage – into PostHog.

## Prerequisites

You need an Open Exchange Rates account with an App ID. The free plan is restricted to the `USD` base currency; a custom base currency requires a paid plan. The `historical` table walks one request per day from the start date, so a large backfill can use a lot of your monthly request quota.

## Adding a data source

<SourceSetupIntro />

When linking Open Exchange Rates, you'll need:

- **App ID** – find it in your [Open Exchange Rates dashboard](https://openexchangerates.org/account/app-ids).
- **Base currency (optional)** – defaults to `USD`. The free plan only supports `USD`; a custom base currency requires a paid plan.
- **Start date (optional)** – the date the `historical` backfill begins from, in `YYYY-MM-DD` format.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If setting a custom base currency fails, confirm your plan supports it – the free plan is limited to `USD`.
- If a large historical backfill exhausts your quota, narrow the start date or upgrade your plan, then resync.

<TroubleshootingLink />
