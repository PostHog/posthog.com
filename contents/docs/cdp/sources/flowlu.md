---
title: Linking Flowlu as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Flowlu
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Flowlu connector syncs accounts, leads, pipelines, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Flowlu API key and account subdomain to pull your CRM, project, task, and finance data.

You can create an API key under **Portal Settings → API Settings** in Flowlu. Your subdomain is the first part of your portal URL - for `acme.flowlu.com` the subdomain is `acme`.

You'll be asked for:

- **API key**
- **Account subdomain**: for example `acme`.

## Sync modes

<SyncModes />

All Flowlu tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
