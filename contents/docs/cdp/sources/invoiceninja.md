---
title: Linking Invoice Ninja as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Invoiceninja
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Invoice Ninja connector syncs clients, credits, expense categories, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Invoice Ninja API token to pull your invoicing data.

You can create an API token in Invoice Ninja under **Settings > Account Management > Integrations > API tokens**.

Self-hosted users should set the API URL to their own Invoice Ninja host (for example `https://invoices.example.com`). Leave it blank to use the hosted Invoice Ninja (`https://invoicing.co`).

You'll be asked for:

- **API token**

## Sync modes

<SyncModes />

All Invoice Ninja tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
