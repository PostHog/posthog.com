---
title: Linking Kandji (Iru Endpoint Management) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kandji
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Kandji (Iru Endpoint Management) connector syncs devices, blueprints, device details, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect Kandji with a tenant-level **API token**, created in Kandji under **Settings → Access**. Your API URL is shown there too - enter its **subdomain** and pick the matching **region** (US or EU). The token needs read access to the devices, blueprints, and device-detail endpoints for the tables you want to sync.

You'll be asked for:

- **API token**
- **Subdomain**: for example `accuhive`.
- **Region**: choose between US (api.kandji.io) and EU (api.eu.kandji.io).

## Sync modes

<SyncModes />

All Kandji (Iru Endpoint Management) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
