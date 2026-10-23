---
title: Linking Cloudbeds as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cloudbeds
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Cloudbeds connector syncs your properties, reservations, guests, rooms, room types, and transactions into PostHog, so you can analyze them alongside your product data.

## Prerequisites

You need a Cloudbeds account and an API key. Cloudbeds API keys expire after 30 days of inactivity, so a key that has not been used recently may need to be regenerated. If your account manages multiple properties, you also need the ID of the property you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Cloudbeds, you'll need:

- **API key** – create one under **Settings → API credentials** in [Cloudbeds](https://hotels.cloudbeds.com).
- **Property ID** – only required for multi-property accounts. Group-level credentials require it to scope reads to a single property.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API key stops working, note that Cloudbeds keys expire after 30 days of inactivity. Regenerate the key in **Settings → API credentials**, then reconnect.
- If a multi-property account returns no data or an error, set the Property ID to scope reads to a single property, then reconnect.

<TroubleshootingLink />
