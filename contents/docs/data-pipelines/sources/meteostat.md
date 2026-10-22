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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Meteostat connector syncs weather observations, station metadata, and climate normals into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync historical weather and climate data for weather stations from the Meteostat JSON API (hosted on RapidAPI). Get a free API key by subscribing to the [Meteostat API listing](https://rapidapi.com/meteostat/api/meteostat/) on RapidAPI - the free plan includes 500 requests per month.

Meteostat has no account-scoped list of stations, so list the [weather station IDs](https://meteostat.net) you want to sync. To sync point-based weather for any geographic coordinates, also add your locations.

You'll be asked for:

- **RapidAPI key**
- **Weather station IDs** - Comma-separated list of Meteostat station IDs. Up to 25 stations.
- **Locations** - Optional. Coordinates for point tables, separated by semicolons or new lines. Write each one as `latitude,longitude` with an optional elevation in meters (for example, `43.6667,-79.4,113`). Up to 25 locations.
- **Unit system** - Choose between Metric (°C, mm, km/h), Imperial (°F, in, mph) and Scientific (K, mm, m/s).

## Sync modes

<SyncModes />

The station and point time series tables (Hourly, Daily, Monthly, PointHourly, PointDaily, PointMonthly) support incremental sync. The metadata and normals tables (Stations, Normals, PointNormals) are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the rapidAPI key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- If a point table fails with "No locations configured", add at least one location in the source settings. Point tables require coordinates to sync.

<TroubleshootingLink />
