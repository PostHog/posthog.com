---
title: Linking Gainsight PX as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GainsightPx
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Gainsight PX connector syncs your product-analytics data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Gainsight PX account and an API key with **Read** access, plus the region your subscription is hosted in.

## Adding a data source

<SourceSetupIntro />

When linking Gainsight PX, you'll need:

- **API key** – generate a key with **Read** access under **Administration → REST API** in Gainsight PX.
- **Region** – select the region your subscription is hosted in.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because Gainsight PX's list endpoints don't expose an "updated since" filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If no data is returned or authentication fails, confirm you selected the region your subscription is hosted in, then reconnect.

<TroubleshootingLink />
