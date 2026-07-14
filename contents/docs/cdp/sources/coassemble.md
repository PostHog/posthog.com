---
title: Linking Coassemble as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Coassemble
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Coassemble connector syncs your courses, collections, learners, and learner progress into PostHog, so you can analyze them alongside your product data.

## Prerequisites

You need a Coassemble workspace with API access enabled on your plan, along with your workspace ID and an API key.

## Adding a data source

<SourceSetupIntro />

When linking Coassemble, you'll need:

- **Workspace ID** – found in your Coassemble workspace.
- **API key** – generate one from your workspace API settings in [Coassemble](https://coassemble.com). API access must be enabled on your workspace plan.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If key generation is unavailable or requests fail with an access error, confirm API access is enabled on your workspace plan, then reconnect.

<TroubleshootingLink />
