---
title: Linking Cortex as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cortex
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Cortex connector pulls your service catalog data into the PostHog Data warehouse, so you can analyze your entities, scorecards, teams, and relationships alongside your product data.

[Cortex](https://www.getcortexapp.com/) is an internal developer portal and service catalog. It helps engineering teams track services, resources, and domains, measure them against scorecards, and manage team ownership and entity relationships.

## Prerequisites

You need a Cortex account with access to create API keys. The key needs read access to the catalog, scorecards, and teams you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Cortex, you'll need:

- **API key** – create an API key in your Cortex workspace under **Settings** > **API Keys**. The key needs read access to the catalog, scorecards, and teams you want to sync.

## Sync modes

<SyncModes />

This source is full refresh only. The Cortex API doesn't expose incremental sync filters, so all tables are fully replaced on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Cortex API key may be invalid or revoked. Generate a new key in your Cortex workspace under **Settings** > **API Keys**, then reconnect.
- If you see a permission error, your API key doesn't have the required read permissions. Check the key's permissions in your Cortex workspace under **Settings**, then try again.

<TroubleshootingLink />
