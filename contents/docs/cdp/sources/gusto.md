---
title: Linking Gusto as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gusto
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Gusto connector syncs companies, locations, employees, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Pull your Gusto payroll and people data.

Company data is only readable through an authorization-code OAuth grant, so you bring your own Gusto developer app: register it in the [Gusto Developer Portal](https://dev.gusto.com), authorize it against your company as a payroll admin, then enter the app's client ID and secret along with the resulting refresh token.

Gusto rotates refresh tokens, so the token you paste here is exchanged on every sync. If syncs start failing with an authorization error, generate a fresh refresh token and update this connection.

You'll be asked for:

- **Environment**: choose between Production and Demo.
- **Client ID**
- **Client secret**
- **Refresh token**

## Sync modes

<SyncModes />

All Gusto tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
