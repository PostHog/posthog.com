---
title: Linking Alguna as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Alguna
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Alguna connector syncs your billing data – customers, subscriptions, plans, products, invoices, payments, refunds, and billable metrics – into the PostHog Data warehouse, so you can analyze revenue and usage alongside your product data.

## Prerequisites

You need an Alguna account with access to an API key. The key grants read access to your billing data.

## Adding a data source

<SourceSetupIntro />

When linking Alguna, you'll need:

- **API key** – create one in your Alguna dashboard under **Settings → Credentials**.

## Sync modes

<SyncModes />

All Alguna tables are full refresh only, so each sync re-fetches the full dataset.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in the Alguna dashboard, then reconnect.

<TroubleshootingLink />
