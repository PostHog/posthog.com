---
title: Linking Nebius AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: NebiusAI
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Nebius AI connector syncs metadata from your Nebius AI Studio (Token Factory) account into the PostHog data warehouse: available models, uploaded files, batch inference jobs, and fine-tuning jobs. Use it to join your inference and fine-tuning activity against product and revenue data.

## Prerequisites

You need a Nebius AI Studio (Token Factory) account and an API key with read access.

## Adding a data source

<SourceSetupIntro />

When linking Nebius AI, you'll need:

- **API key** – create one in the [Nebius AI Studio console](https://studio.nebius.com/settings/api-keys) under API keys. A key with read access is enough to sync every supported table.

## Sync modes

<SyncModes />

All Nebius AI tables sync by full refresh. The API exposes no server-side timestamp filter, so incremental sync isn't offered. The tables are small metadata catalogs, so a full refresh each run is cheap.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error (401), your Nebius AI API key is invalid or has expired. Create a new key in the Nebius AI Studio console, then reconnect.
- If you get a permission error (403), your API key does not have the permissions needed to sync this data. Grant read access to the key, then reconnect.

<TroubleshootingLink />
