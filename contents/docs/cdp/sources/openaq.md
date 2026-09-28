---
title: Linking OpenAQ as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OpenAQ
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The OpenAQ connector syncs locations, parameters, countries, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your OpenAQ API key to pull global air-quality data.

You can create a free API key from your [OpenAQ Explorer account](https://explore.openaq.org/account).

The free tier is limited to 60 requests per minute. The measurement tables fetch data per sensor, so syncing them against a broad set of locations makes many requests - they're off by default; enable only the sensors you need.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All OpenAQ tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
