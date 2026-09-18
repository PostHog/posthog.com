---
title: Linking EasyPost as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Easypost
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The EasyPost connector syncs your shipping data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need an EasyPost account with access to your API keys.

## Adding a data source

<SourceSetupIntro />

When linking EasyPost, you'll need:

- **API key** – find your API keys in your [EasyPost account settings](https://www.easypost.com/account/api-keys). Use a production key to sync production data, or a test key to sync test-mode data.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an invalid or revoked key error, create a new key in your EasyPost account settings, then reconnect.
- If the key is inactive or not authorized, activate it (or create a new one) in your EasyPost account settings, then reconnect.

<TroubleshootingLink />
