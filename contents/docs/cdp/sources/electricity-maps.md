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

The Electricity Maps connector syncs carbon intensity, power breakdown, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Electricity Maps API token, created in the [Electricity Maps portal](https://portal.electricitymaps.com/).

Zones is a comma-separated list of zone identifiers to sync, like `DE, DK-DK1, US-CAL-CISO`. Zone access and history depth depend on your Electricity Maps plan.

You'll be asked for:

- **API token**
- **Zones**: for example `DE, DK-DK1, US-CAL-CISO`.

## Sync modes

<SyncModes />

All Electricity Maps tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
