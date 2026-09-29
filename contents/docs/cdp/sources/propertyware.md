---
title: Linking Propertyware (RealPage) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Propertyware
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Propertyware (RealPage) connector syncs portfolios, buildings, units, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Propertyware API credentials to sync property, lease, and accounting data.

Find your **client ID**, **client secret**, and **organization ID** in Propertyware under **Administration Setup > API Keys** (you'll need an administrator role to access this page). The client secret is shown only once when the key is created, so store it somewhere safe before closing the dialog.

You'll be asked for:

- **Client ID**
- **Client secret**
- **Organization ID**

## Sync modes

<SyncModes />

All Propertyware (RealPage) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
