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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Similarweb connector syncs visits, page views, pages per visit, keyword data, conversion metrics, audience data, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync estimated traffic, engagement and audience data for any set of domains. Generate an API key under **API management** in your Similarweb account settings. The API is a paid add-on, and your plan decides which countries, metrics and history are available.

You'll be asked for:

- **API key**
- **Domains**: comma-separated list of domains to sync. Similarweb has no way to list the domains on your account, so every table is built from this list. At most 50.
- **Granularity**: daily and weekly data need a plan that includes them.
- **Country code** (optional): two-letter country code (like `us`) for conversion analysis. If left blank, conversion analysis tables won't sync.

## Sync modes

<SyncModes />

Most Similarweb tables use full refresh, replacing the table contents on each sync. The following tables support incremental sync with a monthly cursor:

- `website_keywords`
- `conversion_analysis`
- `deduplicated_audience`

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- If conversion analysis tables sync no rows, make sure you have set a two-letter country code (like `us`). Worldwide data is not supported for this table.
- Keyword and audience tables require access to the corresponding Similarweb plan features. If a table fails, check that your Similarweb subscription includes that data.

<TroubleshootingLink />
