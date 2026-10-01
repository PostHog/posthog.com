---
title: Linking Similarweb as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Similarweb
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Similarweb connector syncs visits, page views, pages per visit, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync estimated traffic, engagement and audience data for any set of domains. Generate an API key under **API management** in your Similarweb account settings. The API is a paid add-on, and your plan decides which countries, metrics and history are available.

You'll be asked for:

- **API key**
- **Domains**: comma-separated list of domains to sync. Similarweb has no way to list the domains on your account, so every table is built from this list. At most 50.
- **Granularity**: daily and weekly data need a plan that includes them.

## Sync modes

<SyncModes />

All Similarweb tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
