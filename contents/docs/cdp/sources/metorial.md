---
title: Linking Metorial as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Metorial
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Metorial connector syncs sessions, session messages, session errors, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Metorial secret API key to pull your Metorial MCP data.

Create a secret API key (`metorial_sk_...`) in your [Metorial dashboard](https://metorial.com). Keys are project-scoped, so connect one source per project you want to sync. A publishable key (`metorial_pk_...`) only exposes public data and will not work here.

You'll be asked for:

- **Secret API key**: for example `metorial_sk_...`.

## Sync modes

<SyncModes />

All Metorial tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the secret API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
