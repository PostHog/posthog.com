---
title: Linking Autumn as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Autumn
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Autumn connector syncs customers, events, features, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync customers, usage events, features, plans, entities, invoices, and rewards from Autumn. Create a secret key (`am_sk_...`) in the Autumn dashboard under Developer settings. Sandbox and production have separate keys, so use the key for the environment you want to sync.

You'll be asked for:

- **Secret API key**: for example `am_sk_...`.

## Sync modes

<SyncModes />

All Autumn tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the secret API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
