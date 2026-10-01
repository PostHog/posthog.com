---
title: Linking DataForSEO as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DataForSEO
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The DataForSEO connector syncs domain rank overview, historical rank overview, ranked keywords, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your DataForSEO API credentials and the domains you want to track to pull SEO metrics like Google rankings, keywords, competitors, and backlinks.

Find your API login and password on the [DataForSEO API access page](https://app.dataforseo.com/api-access).

Note: DataForSEO bills per API request, so every sync consumes account credits. The backlinks summary table also requires an active Backlinks API subscription.

You'll be asked for:

- **API login**: for example `you@example.com`.
- **API password**
- **Target domains (comma-separated)**: for example `example.com, posthog.com`.

## Sync modes

<SyncModes />

All DataForSEO tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API password is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
