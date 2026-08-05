---
title: Linking Decagon as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Decagon
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Decagon connector syncs your Decagon conversations into PostHog, so you can analyze them alongside your product data.

## Prerequisites

You need a Decagon account and an API key.

## Adding a data source

<SourceSetupIntro />

When linking Decagon, you'll need:

- **API key** – found on the **Developer** page of the [Decagon dashboard](https://decagon.ai/).

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
