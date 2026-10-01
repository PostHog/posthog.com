---
title: Linking GLEIF (Global Legal Entity Identifier Foundation) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gleif
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The GLEIF (Global Legal Entity Identifier Foundation) connector syncs lei records, lei issuers, entity legal forms, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

None. The GLEIF (Global Legal Entity Identifier Foundation) API is public, so no account or API key is needed.

## Adding a data source

<SourceSetupIntro />

Import Legal Entity Identifier (LEI) reference data from GLEIF's free, public registry. No API key or account is required.

## Sync modes

<SyncModes />

All GLEIF (Global Legal Entity Identifier Foundation) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
