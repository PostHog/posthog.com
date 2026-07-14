---
title: Linking Luma as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Luma
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Luma connector syncs your events, guests, and people into PostHog, so you can analyze them alongside your product data.

## Prerequisites

You need a Luma account with a Luma Plus subscription, which is required for API access. Calendar API keys are scoped to a single calendar; use an organization API key to import across calendars.

## Adding a data source

<SourceSetupIntro />

When linking Luma, you'll need:

- **API key** – create one under **Settings → Developer** in [Luma](https://luma.com). API access requires a Luma Plus subscription. Calendar API keys are scoped to a single calendar; use an organization API key to import across calendars.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
