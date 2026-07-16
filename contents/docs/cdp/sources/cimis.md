---
title: Linking CIMIS as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cimis
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The CIMIS connector pulls California weather and reference evapotranspiration (ETo) data from the [California Irrigation Management Information System (CIMIS)](https://cimis.water.ca.gov/) into the PostHog Data warehouse, so you can analyze weather data alongside your product data.

## Prerequisites

CIMIS is a free service. You need a CIMIS account so you can create a web-services appKey.

## Adding a data source

<SourceSetupIntro />

When linking CIMIS, you'll need:

- **App key** – register for a free account and create a web-services appKey in your [CIMIS account](https://et.water.ca.gov/Account/Login).
- **Targets (station numbers)** – optional. To sync the daily and hourly weather tables, set this to a comma-separated list of CIMIS station numbers (e.g. `2,8,127`). You can look up station numbers in the `stations` table or on the [CIMIS station map](https://cimis.water.ca.gov/Stations.aspx). The station and zip-code metadata tables sync without targets.
- **Unit of measure** – optional. Choose English (°F, inches) or Metric (°C, mm). Defaults to English.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your CIMIS appKey is invalid or has expired. Create a new appKey in your CIMIS account, then reconnect.
- If your appKey is rejected, it may not have been activated yet. Check the key in your CIMIS account, then reconnect.

<TroubleshootingLink />
