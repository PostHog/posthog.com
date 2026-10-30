---
title: Linking Pexels as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pexels
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Pexels connector syncs Pexels stock photo and video catalog data – curated photos, popular videos, and collections – into PostHog.

## Prerequisites

You need a Pexels account with an API key. Attribution to Pexels and to the photographer or videographer is required when you use Pexels content – see the [Pexels API guidelines](https://www.pexels.com/api/documentation/#guidelines).

## Adding a data source

<SourceSetupIntro />

When linking Pexels, you'll need:

- **API key** – generate one from your [Pexels API dashboard](https://www.pexels.com/api/).
- **Search query (optional)** – when set, the `search_photos` and `search_videos` tables become available and sync content matching this query.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
