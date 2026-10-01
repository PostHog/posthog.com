---
title: Linking LinearB as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Linearb
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The LinearB connector syncs teams, users, services, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your LinearB API key to pull your engineering intelligence and DORA metrics.

Generate an API token from **Settings → API Tokens** in your [LinearB account](https://app.linearb.io/). The token grants access to your organization's teams, users, services, deployments, and computed metrics.

The **Measurements** table is only available on LinearB Business and Enterprise plans and is off by default - enable it if your plan includes API metrics access.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All LinearB tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
