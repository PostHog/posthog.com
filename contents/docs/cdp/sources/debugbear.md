---
title: Linking DebugBear as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DebugBear
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The DebugBear connector syncs your website performance monitoring data – projects and synthetic Lighthouse / Core Web Vitals test results – into the PostHog Data Warehouse. This lets you analyze web performance metrics alongside your product data, join performance scores with user behavior, and track Core Web Vitals trends over time.

## Prerequisites

You need a [DebugBear](https://www.debugbear.com) account with an Admin API key. Generate one from **Account settings** > **API Keys** in DebugBear – see the [DebugBear API docs](https://www.debugbear.com/docs/api) for details.

An Admin key is required so PostHog can list every monitored project in your account.

## Adding a data source

<SourceSetupIntro />

When linking DebugBear, you'll need:

- **API key** – an Admin API key from your DebugBear account settings. Go to **Account settings** > **API Keys** and generate a new key.

## Sync modes

<SyncModes />

The `PageMetrics` table supports incremental syncs on the `analysis_date` field. The `Projects` table is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a **401 error**, your API key is invalid or expired. Generate a new key from **Account settings** > **API Keys** in DebugBear, then reconnect.
- If you see a **403 error**, your API key doesn't have sufficient permissions. Make sure you're using an Admin API key, not a read-only key.

<TroubleshootingLink />
