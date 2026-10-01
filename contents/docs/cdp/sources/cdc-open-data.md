---
title: Linking CDC Open Data (data.cdc.gov) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CdcOpenData
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The CDC Open Data (data.cdc.gov) connector syncs your analytics data into the PostHog data warehouse, so you can analyze it alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync one or more datasets from [data.cdc.gov](https://data.cdc.gov).

Find a dataset's ID in its data.cdc.gov URL - for example `9bhg-hcku` in `https://data.cdc.gov/d/9bhg-hcku`. Browse the full catalog at [data.cdc.gov](https://data.cdc.gov).

No account is required. Optionally, register a free [Socrata app token](https://support.socrata.com/hc/en-us/articles/210138558-Generating-an-App-Token) to avoid the shared public rate limit.

You'll be asked for:

- **Dataset IDs**: separate multiple dataset IDs with commas or new lines. Each dataset becomes its own table.

## Sync modes

<SyncModes />

Some CDC Open Data (data.cdc.gov) tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the app token (optional) is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
