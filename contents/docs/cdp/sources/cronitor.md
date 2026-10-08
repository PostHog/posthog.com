---
title: Linking Cronitor as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cronitor
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Cronitor connector syncs your monitors, their recent job invocations, and time-series reliability metrics into the PostHog Data Warehouse, so you can analyze scheduled-job reliability, run durations, and failure trends alongside your product data.

## Prerequisites

You need a Cronitor account and an API key with the `monitor:read` scope. Cronitor creates default API keys for every account, and you can create additional scoped keys at any time.

## Adding a data source

<SourceSetupIntro />

When linking Cronitor, you'll need:

- **API key** – find or create one under **Settings → API keys** in your Cronitor account. The key needs the `monitor:read` scope.

## Sync modes

<SyncModes />

The `monitors` and `invocations` tables have no server-side time filter in the Cronitor API, so they always sync as a full refresh. The `invocations` table is a snapshot of each monitor's most recent runs; for long-term trends, use the `metrics` table, which syncs incrementally over time windows using its `stamp` field.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in your Cronitor account's API settings, then reconnect.
- If you see a permissions error, the key is missing the `monitor:read` scope. Update the key's scopes, then reconnect.

<TroubleshootingLink />
