---
title: Linking Deno Deploy as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DenoDeploy
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Deno Deploy connector syncs apps, revisions, domains, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter a Deno Deploy organization access token to sync your apps, revisions, domains, analytics, and runtime logs.

Create an organization access token in your [Deno Deploy dashboard](https://app.deno.com) under **Settings > Access Tokens**. The token is scoped to a single organization, so one connection syncs one Deno Deploy organization.

You'll be asked for:

- **Access token**: for example `ddo_...`.

## Sync modes

<SyncModes />

All Deno Deploy tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
