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

The Invoice Ninja connector syncs your invoicing data into PostHog, so you can analyze your billing alongside your product data.

## Prerequisites

You need an Invoice Ninja account with an API token. Self-hosted users also need the URL of their own Invoice Ninja host.

## Adding a data source

<SourceSetupIntro />

When linking Invoice Ninja, you'll need:

- **API token** – create one in Invoice Ninja under **Settings > Account Management > Integrations > API tokens**.
- **API URL (self-hosted only)** – set this to your own Invoice Ninja host (for example `https://invoices.example.com`). Leave it blank to use the hosted Invoice Ninja (`https://invoicing.co`).

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
