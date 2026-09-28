---
title: Linking Sage HR as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SageHR
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Sage HR connector syncs employees, terminated employees, termination reasons, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Sage HR company subdomain and API key to pull your HR data.

An admin must first enable API access under **Settings → Integrations → API** in Sage HR, which generates the API key. Requests go to your own subdomain - for `https://yourcompany.sage.hr` the subdomain is `yourcompany`.

You'll be asked for:

- **Company subdomain**: for example `yourcompany`.
- **API key**

## Sync modes

<SyncModes />

All Sage HR tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
