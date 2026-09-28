---
title: Linking Papersign as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Papersign
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Papersign connector syncs documents, folders, spaces, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Paperform API key to sync your Papersign documents, folders, and spaces.

Create an API key on your [Paperform account page](https://paperform.co/account/developer/api-keys). The key has full account access - Paperform does not offer per-resource scopes.

The Papersign API requires a paid Paperform plan (Standard or Business tier).

You'll be asked for:

- **API key**: for example `Paperform API key`.

## Sync modes

<SyncModes />

All Papersign tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
