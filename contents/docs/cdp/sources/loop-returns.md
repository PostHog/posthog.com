---
title: Linking Loop Returns as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LoopReturns
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Loop Returns connector syncs returns, advanced shipping notices, destinations, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Loop API key to pull your returns data.

Create a key in Loop under **Settings** > **Developers**. The key needs the `Returns` scope for the returns and advanced shipping notice tables, and `Destinations (Read)` for the destinations table.

Start date is optional and sets how far back the first sync reaches. Without it, syncing starts two years ago.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All Loop Returns tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
