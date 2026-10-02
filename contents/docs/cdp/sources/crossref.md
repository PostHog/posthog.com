---
title: Linking Crossref as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Crossref
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Crossref connector syncs works, members, funders, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

None. The Crossref API is public, so no account or API key is needed.

## Adding a data source

<SourceSetupIntro />

Crossref's API is free and public - no API key needed. Add a contact email to get routed to Crossref's faster "polite pool".

The Works table covers Crossref's full DOI registry (160 million+ records), so set a member ID, funder ID, or journal ISSN below to scope which works sync. The Members, Funders, Types, and Licenses tables always sync in full.

## Sync modes

<SyncModes />

All Crossref tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
