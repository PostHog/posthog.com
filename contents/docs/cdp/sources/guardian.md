---
title: Linking The Guardian as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Guardian
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Guardian connector syncs Guardian news content into PostHog, so you can analyze news content alongside your product data.

## Prerequisites

You need a Guardian Open Platform API key. Free keys are rate-limited (~12 requests/second, ~5,000 requests/day), so an initial backfill of the full content archive can take a while.

## Adding a data source

<SourceSetupIntro />

When linking The Guardian, you'll need:

- **API key** – request a free developer key from the [Guardian Open Platform](https://open-platform.theguardian.com/access/).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
