---
title: Linking Google Webfonts as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GoogleWebfonts
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Google Webfonts connector syncs webfonts and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter a Google API key to pull the Google Fonts catalog.

Create an API key in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and enable the **Web Fonts Developer API** for the project. No OAuth or scopes are required - the API is a public, read-only metadata catalog.

You'll be asked for:

- **API key**: for example `AIza...`.

## Sync modes

<SyncModes />

All Google Webfonts tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
