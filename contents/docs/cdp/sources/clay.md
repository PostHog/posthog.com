---
title: Linking Clay as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clay
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Clay connector syncs your CRM data into the PostHog data warehouse, so you can analyze it alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync rows from your Clay tables. Reading tables through the Clay API needs a Clay Enterprise plan. Create an API key in Clay under **Settings > Account > API keys**, and turn on **Enable for API** in each table's settings (**Edit table settings > Integrations**). Clay's API can't list tables, so paste the ID or URL of each table you want to sync (the ID starts with `t_` and appears after `/tables/` in the table's URL).

You'll be asked for:

- **API key**
- **Table IDs or URLs**

## Sync modes

<SyncModes />

All Clay tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
