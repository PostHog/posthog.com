---
title: Linking TMDb as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TMDb
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The TMDb connector syncs movie, TV, and people catalog data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a TMDB account so you can create a free API key. Commercial use requires a separate license from TMDB.

## Adding a data source

<SourceSetupIntro />

When linking TMDb, you'll need:

- **API key** – create a free API key (v3 auth) in your [TMDB account settings](https://www.themoviedb.org/settings/api).

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an invalid or revoked key error, create a new key in your TMDB account settings, then reconnect.

<TroubleshootingLink />
