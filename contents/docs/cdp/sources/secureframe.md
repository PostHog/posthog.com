---
title: Linking Secureframe as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Secureframe
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Secureframe connector syncs controls, tests, users, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Secureframe API credentials to pull your compliance data (controls, tests, personnel, devices, vendors, and more).

You can create an API key and secret in the Secureframe Console under **Your Profile → Company settings → API keys**. The key's role-based permissions govern which tables you can sync.

You'll be asked for:

- **Region**: choose between US (api.secureframe.com) and UK (api-uk.secureframe.com).
- **API key**
- **API secret**

## Sync modes

<SyncModes />

All Secureframe tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
