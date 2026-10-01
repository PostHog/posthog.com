---
title: Linking Upstash as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Upstash
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Upstash connector syncs redis databases, redis stats, teams, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Upstash account email and a management API key to pull your Upstash Redis databases, usage stats, teams, and vector indexes.

Create a management API key in the [Upstash console](https://console.upstash.com/account/api) under **Account > Management API**. The Developer API is only available to native Upstash accounts (not Vercel or Fly.io marketplace accounts).

You'll be asked for:

- **Account email**: for example `you@example.com`.
- **Management API key**

## Sync modes

<SyncModes />

All Upstash tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the management API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
