---
title: Linking Appstack as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Appstack
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Appstack connector syncs your attributed mobile events into the PostHog Data warehouse, so you can analyze installs, in-app events, and revenue from your ad campaigns alongside your product data.

## Prerequisites

You need an Appstack account with access to the API key for the app you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Appstack, you'll need:

- **API key** – find it in your [Appstack dashboard](https://appstack.tech/) settings. API keys are scoped to a single app, so add one source per app you want to sync.

## Sync modes

<SyncModes />

We recommend incremental sync for the events table: each sync only exports events newer than the last one seen, with a one day overlap to pick up late-arriving attribution events.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or was regenerated. Copy the current API key for the app from your Appstack dashboard settings, then reconnect.
- If a different app's events show up, check which app the API key belongs to. Each key exports a single app, so use one source per app.

<TroubleshootingLink />
