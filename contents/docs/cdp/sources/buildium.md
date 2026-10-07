---
title: Linking Buildium as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Buildium
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Buildium (RealPage) connector syncs your property management data – rental properties, units, leases, tenants, owners, vendors, bills, general ledger accounts, work orders, and applicants – into PostHog, so you can analyze your property operations alongside your product data.

## Prerequisites

- A **Buildium Premium subscription** (required for API access).
- **Open API** enabled in your Buildium account.
- An API key created under **Settings > Developer Tools** in Buildium.
- **View** access granted for the data you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Buildium, you'll need:

- **Client ID** – the client ID from your Buildium API key.
- **Client secret** – the client secret from your Buildium API key.

You can create API keys in Buildium under **Settings > Developer Tools**. See the [Buildium API documentation](https://developer.buildium.com/) for more details.

## Sync modes

<SyncModes />

Only the **leases** and **applicants** tables support incremental syncing (using the `LastUpdatedDateTime` field). All other tables use full refresh because the Buildium API does not return update timestamps for those resources.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your client ID or client secret is invalid. Create a new API key in Buildium under **Settings > Developer Tools**, then reconnect.
- If you see a permissions error, your API key does not have the required access. Make sure Open API is enabled and your key has **View** access for the tables you want to sync.

<TroubleshootingLink />
