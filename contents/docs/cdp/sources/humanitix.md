---
title: Linking Humanitix as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Humanitix
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Humanitix connector syncs your event ticketing data into the PostHog Data warehouse, so you can analyze your events and tags alongside your product data.

## Prerequisites

You need a Humanitix account with access to your API key. You can generate one under **Account → Advanced → Public API key** in the Humanitix dashboard.

## Adding a data source

<SourceSetupIntro />

When linking Humanitix, you'll need:

- **API key** – find or generate it under **Account → Advanced → Public API key** in the Humanitix dashboard. This single key grants read access to your events and tags.

## Sync modes

<SyncModes />

This source is full-refresh only. Humanitix's API exposes no server-side timestamp filters, so every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Generate a new key under **Account → Advanced → Public API key**, then reconnect.
- If you see a permissions error, the key isn't authorized for this data. Check the key's permissions, then reconnect.

<TroubleshootingLink />
