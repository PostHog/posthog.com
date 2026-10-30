---
title: Linking Lingo.dev as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LingoDev
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Lingo.dev connector automatically syncs your Lingo.dev localization job data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Lingo.dev account and an API key. API keys are scoped to an organization and are only shown once at creation.

## Adding a data source

<SourceSetupIntro />

When linking Lingo.dev, you'll need:

- **API key** – create one in your [Lingo.dev dashboard](https://lingo.dev/app). The key is scoped to an organization and is only shown once at creation.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
