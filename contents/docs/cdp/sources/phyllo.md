---
title: Linking Phyllo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Phyllo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Phyllo connector syncs work platforms, users, accounts, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Phyllo API credentials to pull creator accounts, profiles, content, and income data.

You can find your client ID and secret in the [Phyllo developer dashboard](https://dashboard.getphyllo.com) under **API credentials**. Credentials are environment-specific - sandbox credentials only authenticate against the sandbox environment.

You'll be asked for:

- **Client ID**
- **Client secret**
- **Environment**: choose between Production and Sandbox.

## Sync modes

<SyncModes />

All Phyllo tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
