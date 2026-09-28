---
title: Linking Honeycomb as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Honeycomb
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Honeycomb connector syncs datasets, columns, derived columns, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter a Honeycomb configuration API key to pull your Honeycomb observability configuration - datasets, SLOs, burn alerts, triggers, markers, boards, and more - .

You can create a configuration key under **Environment settings → API keys** in your [Honeycomb account](https://ui.honeycomb.io/). Grant read access for the resources you want to sync: Manage Queries and Columns, Manage SLOs, Manage Triggers, Manage Markers, Manage Boards, and Manage Recipients.

Keys are region-specific - pick the region that matches your Honeycomb account.

You'll be asked for:

- **Configuration API key**: for example `Configuration key`.
- **Region**: choose between US (api.honeycomb.io) and EU (api.eu1.honeycomb.io).

## Sync modes

<SyncModes />

All Honeycomb tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the configuration API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
