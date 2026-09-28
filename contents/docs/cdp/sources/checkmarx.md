---
title: Linking Checkmarx (Checkmarx One) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Checkmarx
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Checkmarx (Checkmarx One) connector syncs projects, applications, scans, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Checkmarx One credentials to automatically pull your application security data.

You can generate an API key in Checkmarx One under **Settings** → **Identity and Access Management** → **API Keys**. The tenant name and region are shown in your Checkmarx One URL (for example, a tenant on `https://eu.ast.checkmarx.net` is in the EU region).

You'll be asked for:

- **Tenant name**: for example `your-tenant`.
- **Region**: choose between US (ast.checkmarx.net), US2 (us.ast.checkmarx.net), EU (eu.ast.checkmarx.net), EU2 (eu-2.ast.checkmarx.net), Germany (deu.ast.checkmarx.net), ANZ (anz.ast.checkmarx.net), India (ind.ast.checkmarx.net), Singapore (sng.ast.checkmarx.net) and UAE (mea.ast.checkmarx.net).
- **API key**

## Sync modes

<SyncModes />

All Checkmarx (Checkmarx One) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
