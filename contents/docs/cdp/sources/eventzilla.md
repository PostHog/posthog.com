---
title: Linking Eventzilla as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Eventzilla
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Eventzilla connector syncs your event, attendee, ticket, and transaction data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need an Eventzilla account with an API key, which you can generate under **Settings > App Management**.

## Adding a data source

<SourceSetupIntro />

When linking Eventzilla, you'll need:

- **API key** – generate one in your Eventzilla account under **Settings > App Management**.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
