---
title: Linking Katana as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Katana
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Katana connector syncs your Katana Cloud Inventory (MRP) data into PostHog, so you can analyze your manufacturing and inventory data alongside your product data.

## Prerequisites

You need a Katana account with an API key. An active API access add-on or Professional plan is required.

## Adding a data source

<SourceSetupIntro />

When linking Katana, you'll need:

- **API key** – generate it in Katana under **Settings > API**. The key is sent as a Bearer token and has read access to your factory's data.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
