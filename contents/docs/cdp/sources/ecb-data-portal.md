---
title: Linking European Central Bank (ECB Data Portal) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: EcbDataPortal
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The European Central Bank (ECB Data Portal) connector syncs eur exchange rates, key interest rates, hicp inflation, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

None. The European Central Bank (ECB Data Portal) API is public, so no account or API key is needed.

## Adding a data source

<SourceSetupIntro />

Import euro-area statistics from the ECB Data Portal's free, keyless public API: reference exchange rates, key interest rates, and HICP inflation. No API key or account is required.

## Sync modes

<SyncModes />

All European Central Bank (ECB Data Portal) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
