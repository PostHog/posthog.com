---
title: Linking Skyvern as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Skyvern
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Skyvern connector syncs your browser-automation data into the PostHog Data warehouse: workflow definitions, task and workflow runs, schedules, browser profiles, and stored credential metadata. Use it to analyze how your automations perform alongside your product data.

## Prerequisites

You need a Skyvern account with an API key. Find your API key in your [Skyvern settings](https://app.skyvern.com/settings).

If you self-host Skyvern, you'll also need the base URL of your deployment.

## Adding a data source

<SourceSetupIntro />

When linking Skyvern, you'll need:

- **API key** – find it in your [Skyvern settings](https://app.skyvern.com/settings).
- **Base URL (self-hosted only)** – set this to your deployment's URL (for example `http://localhost:8000`) if you self-host Skyvern. Leave it blank to use Skyvern Cloud.

Stored credential metadata is synced, but secret values are never returned by the Skyvern API.

## Sync modes

<SyncModes />

The `runs` table supports incremental sync on the immutable run creation time, with a short lookback window so late status changes on recently created runs are picked up. A run whose status changes after it falls below the watermark is only re-fetched on a full refresh. The `workflows`, `schedules`, `browser_profiles`, and `credentials` tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in your Skyvern settings, then reconnect.
- If you self-host Skyvern and the connection fails, check that the base URL points at your deployment and is reachable from PostHog.

<TroubleshootingLink />
