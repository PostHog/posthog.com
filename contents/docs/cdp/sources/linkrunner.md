---
title: Linking Linkrunner as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Linkrunner
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Linkrunner connector syncs campaigns, attributed users, reporting campaigns, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Linkrunner API key to pull your mobile attribution data.

You can find your API key in your [Linkrunner dashboard](https://www.linkrunner.io/) under settings.

Note: the `reporting_campaigns` table is served by Linkrunner's Reporting API, which is rate limited to **1 request per minute**, so syncing it can take a while for accounts with many campaigns.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All Linkrunner tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
