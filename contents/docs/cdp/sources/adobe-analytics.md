---
title: Linking Adobe Analytics as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AdobeAnalytics
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Adobe Analytics connector syncs report suites, segments, calculated metrics, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Pull Adobe Analytics report data and metadata.

Create an **OAuth Server-to-Server** credential in the [Adobe Developer Console](https://developer.adobe.com/console), add the Adobe Analytics API to the project, and assign a product profile that can read the report suite you want. Then enter the credential's client ID and secret.

The report table runs one query per day, so pick the dimension and metrics to break it down by. Adobe allows one dimension per report.

You'll be asked for:

- **Client ID**
- **Client secret**: for example `p8e-...`.
- **Report suite ID**: for example `examplersid`.

## Sync modes

<SyncModes />

All Adobe Analytics tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
