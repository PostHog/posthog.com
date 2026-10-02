---
title: Linking Formbricks as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Formbricks
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Formbricks connector syncs surveys, responses, contacts, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync surveys, responses, contacts, and more from Formbricks.

Create an API key under **Organization settings → API keys** in Formbricks. API keys are scoped to a single environment, so the connector imports that environment's data.
For self-hosted Formbricks, set your instance URL (for example `https://formbricks.example.com`); leave it empty for Formbricks Cloud.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All Formbricks tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
