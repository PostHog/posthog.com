---
title: Linking Meteostat as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Meteostat
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Meteostat connector syncs hourly, daily, monthly, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync historical weather and climate data for weather stations from the Meteostat JSON API (hosted on RapidAPI). Get a free API key by subscribing to the [Meteostat API listing](https://rapidapi.com/meteostat/api/meteostat/) on RapidAPI - the free plan includes 500 requests per month.

Meteostat has no account-scoped list of stations, so list the [weather station IDs](https://meteostat.net) you want to sync.

You'll be asked for:

- **RapidAPI key**
- **Weather station IDs**: comma-separated list of Meteostat station IDs. Up to 25 stations.
- **Unit system**: choose between Metric (°C, mm, km/h), Imperial (°F, in, mph) and Scientific (K, mm, m/s).

## Sync modes

<SyncModes />

All Meteostat tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the rapidAPI key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
