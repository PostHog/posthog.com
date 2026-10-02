---
title: Linking Electricity Maps as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ElectricityMaps
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Electricity Maps connector syncs hourly carbon intensity and power breakdown data for the grid zones you choose into PostHog, so you can analyze the carbon footprint of your infrastructure alongside your product data.

## Prerequisites

You need an Electricity Maps API token, created in the [Electricity Maps portal](https://portal.electricitymaps.com/). Which zones you can query and how far back history goes depend on your Electricity Maps plan.

## Adding a data source

<SourceSetupIntro />

When linking Electricity Maps, you'll need:

- **API token**: create one in the [Electricity Maps portal](https://portal.electricitymaps.com/).
- **Zones**: a comma-separated list of zone identifiers to sync, like `DE, DK-DK1, US-CAL-CISO`. The `/v3/zones` endpoint of the Electricity Maps API lists every zone identifier.
- **Days of history to sync initially** (optional): how far back the first sync reaches. Defaults to 30 days. Set it to what your Electricity Maps plan allows.

Each synced row is one hour of data for one zone.

## Sync modes

<SyncModes />

Incremental syncs use the hourly `datetime` field, so each sync only requests hours after the last synced one. Note that Electricity Maps can revise recent data points after publishing them. Run a full refresh if you need those revisions on already-synced hours.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Zone access errors**: zone availability is gated by your Electricity Maps plan. If validation fails for a zone, check your plan in the Electricity Maps portal or remove the zone from the source settings.
- **History range errors**: if syncs fail with a permission error, lower the days of history to what your plan allows.

<TroubleshootingLink />
