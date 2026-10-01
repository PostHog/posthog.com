---
title: Linking Tenjin as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Tenjin
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Tenjin connector syncs app report, campaign report, ad revenue report, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Tenjin API access token to pull daily user-acquisition spend, ad revenue, and SKAdNetwork reports.

Generate a token in the Tenjin dashboard under Automate > API Access Tokens. The token must have the Reporting Metrics API permission.

Tenjin's Reporting Metrics API returns metrics aggregated per day, so these tables are daily time series rather than user-level events.

You'll be asked for:

- **API access token**

## Sync modes

<SyncModes />

All Tenjin tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
