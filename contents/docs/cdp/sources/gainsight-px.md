---
title: Linking Gainsight PX as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GainsightPx
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Gainsight PX connector syncs accounts, users, features, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect Gainsight PX with your project's **API key**. Generate a key with **Read** access under **Administration → REST API** in Gainsight PX, then pick the region your subscription is hosted in.

All tables are synced as full refresh - Gainsight PX's list endpoints don't expose an "updated since" filter.

You'll be asked for:

- **API key**
- **Region**: choose between US (api.aptrinsic.com), EU (api-eu.aptrinsic.com) and US2 (api-us2.aptrinsic.com).

## Sync modes

<SyncModes />

All Gainsight PX tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
