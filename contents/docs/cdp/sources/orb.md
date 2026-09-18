---
title: Linking Orb as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Orb
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Orb connector syncs your billing data into the PostHog Data warehouse, so you can analyze your usage-based billing alongside your product data.

## Prerequisites

You need an Orb account with permission to create an API key. A read-only key is sufficient.

## Adding a data source

<SourceSetupIntro />

When linking Orb, you'll need:

- **API key** – create one in your [Orb account settings](https://app.withorb.com/settings). A read-only key is sufficient.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new API key in your Orb account settings, then reconnect.
- If you see a permissions error, the key does not have permission to read this data. Check the key's permissions in your Orb account settings, then reconnect.

<TroubleshootingLink />
