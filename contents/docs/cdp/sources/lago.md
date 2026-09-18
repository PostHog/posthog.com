---
title: Linking Lago as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lago
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Lago connector syncs your billing data into PostHog, so you can analyze it alongside your product data. It works with both Lago Cloud and self-hosted Lago instances.

## Prerequisites

You need a Lago account with access to create an API key. Self-hosted users also need a publicly reachable Lago host.

## Adding a data source

<SourceSetupIntro />

When linking Lago, you'll need:

- **API key** – create an API key in the Lago dashboard under **Developers > API keys**.
- **API URL** – self-hosted only. Set it to your own Lago host (for example `https://billing.example.com`). Leave it blank to use Lago Cloud.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an invalid key error, generate a new key in the Lago dashboard, then reconnect.
- If your key lacks the required permissions, check the key and try again.
- If the API URL is not allowed, use a publicly reachable host.

<TroubleshootingLink />
