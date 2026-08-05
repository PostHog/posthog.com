---
title: Linking Instatus as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Instatus
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Instatus connector syncs your status pages, components, incidents, maintenances, and more into PostHog, so you can analyze status data alongside your product data.

## Prerequisites

You need an Instatus account with an API key. The key grants access to every status page in your account.

## Adding a data source

<SourceSetupIntro />

When linking Instatus, you'll need:

- **API key** – create an API key under [Developer settings](https://dashboard.instatus.com/developer).

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
