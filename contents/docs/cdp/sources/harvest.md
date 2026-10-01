---
title: Linking Harvest as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Harvest
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Harvest connector syncs clients, contacts, estimate item categories, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Harvest account ID and a personal access token to sync your time tracking and invoicing data.

Create a token at [id.getharvest.com/developers](https://id.getharvest.com/developers), which shows the account ID alongside it. The token inherits the permissions of the user who created it, so connect a user who can see the data you want to sync. Listing users and roles needs an administrator.

You'll be asked for:

- **Account ID**: for example `1234567`.
- **Personal access token**

## Sync modes

<SyncModes />

All Harvest tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the personal access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
