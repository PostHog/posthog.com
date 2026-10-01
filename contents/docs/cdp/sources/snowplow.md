---
title: Linking Snowplow Analytics as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Snowplow
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Snowplow Analytics connector syncs pipelines, users, data models, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Snowplow BDP Console API credentials to pull your pipeline health and data modeling job data.

Find your **Organization ID** on the Console's *Manage organization* page, then create an API key (a key ID + key secret pair) under **Console settings → API keys**. Note that all Snowplow Console API keys carry admin privileges, so store them carefully.

This connector talks to the standard BDP Console host (`console.snowplowanalytics.com`); privately-hosted Console deployments are not supported yet.

You'll be asked for:

- **Organization ID**: for example `9e884a10-51c9-4632-9c05-01ba4c2b521a`.
- **API key ID**: for example `a1b2c3d4-0000-0000-0000-000000000000`.
- **API key**

## Sync modes

<SyncModes />

All Snowplow Analytics tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key ID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
