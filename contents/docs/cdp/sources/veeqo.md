---
title: Linking Veeqo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Veeqo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Veeqo connector syncs orders, products, customers, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Veeqo API key to automatically pull your Veeqo inventory, order and shipping data.

You can find your API key in your Veeqo account under **Settings > Users**, on your user's profile. Veeqo support must enable API access for your account before the key appears there - contact them if you don't see it.

The API key gives full account access, so store it securely.

You'll be asked for:

- **API key**: for example `Enter your Veeqo API key`.

## Sync modes

<SyncModes />

All Veeqo tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
