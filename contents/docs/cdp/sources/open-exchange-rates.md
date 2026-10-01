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

The Open Exchange Rates connector syncs currencies, latest, historical, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Open Exchange Rates App ID to pull foreign-exchange reference rates.

Find your App ID in your [Open Exchange Rates dashboard](https://openexchangerates.org/account/app-ids).

The free plan is restricted to the `USD` base currency - a custom base currency requires a paid plan. The `historical` table walks one request per day from the start date, so a large backfill can use a lot of your monthly request quota.

You'll be asked for:

- **App ID**

## Sync modes

<SyncModes />

Some Open Exchange Rates tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the app ID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
