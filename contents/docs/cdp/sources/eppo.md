---
title: Linking Eppo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Eppo
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Eppo connector syncs your experimentation and feature flagging data – experiments, metrics, feature flags, bandits, holdouts, and more – from Eppo (Datadog) into PostHog's data warehouse.

## Prerequisites

You need an Eppo account with API access. Create an API key under **Admin > API Keys** in Eppo (this is distinct from SDK/client keys).

## Adding a data source

<SourceSetupIntro />

When linking Eppo, you'll need:

- **API key** – created under Admin > API Keys in your Eppo dashboard. This is a server-side API key, not an SDK or client key.

## Sync modes

<SyncModes />

Most Eppo tables are full refresh only since the API exposes no incremental sync filter. The Experiments table supports incremental sync via the `created_date` field.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 error**: Your Eppo API key is invalid. Create a new API key in your Eppo dashboard and reconnect.
- **403 error**: Your API key lacks the required permissions. Check that your key has the appropriate access rights in Eppo.

<TroubleshootingLink />
