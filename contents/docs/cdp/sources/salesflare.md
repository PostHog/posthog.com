---
title: Linking Salesflare as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Salesflare
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Salesflare connector syncs your CRM data into the PostHog Data warehouse, so you can analyze your sales pipeline alongside your product data. It imports contacts, accounts, opportunities, pipelines, tasks, tags, and workflows.

## Prerequisites

You need a Salesflare account with permission to create an API key.

## Adding a data source

<SourceSetupIntro />

When linking Salesflare, you'll need:

- **API key** – create one under **Settings → API keys** in [Salesflare](https://app.salesflare.com/#/settings/apikeys). The key grants read access to your contacts, accounts, opportunities, pipelines, tasks, tags, and workflows.

## Sync modes

<SyncModes />

This source is full-refresh only. Salesflare's list endpoints don't expose a reliably ordered server-side timestamp filter, so every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Generate a new key under **Settings → API keys** in Salesflare, then reconnect.
- If you see a permissions error, the key does not have access to this data. Check the key's permissions, then reconnect.

<TroubleshootingLink />
