---
title: Linking Moxie as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Moxie
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Moxie connector syncs clients, contacts, projects, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Moxie workspace base URL and API key to pull your clients, projects, invoices, and more.

Go to **Workspace settings > Connected Apps > Integrations** in Moxie and click **Enable Custom Integration** to see your workspace's base URL and API key.

You'll be asked for:

- **Workspace base URL**: for example `https://pod00.withmoxie.dev/api/public`.
- **API key**

## Sync modes

<SyncModes />

All Moxie tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
