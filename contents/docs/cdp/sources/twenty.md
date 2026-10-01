---
title: Linking Twenty as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Twenty
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Twenty connector syncs companies, people, opportunities, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Twenty API key to pull your CRM data.

Generate an API key in Twenty under **Settings > API & Webhooks > + Create key**. Copy it immediately, it's only shown once.

Self-hosted users should set the instance URL to their own Twenty host (for example `https://twenty.example.com`). Leave it blank to use Twenty Cloud (`https://api.twenty.com`).

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All Twenty tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
