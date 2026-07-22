---
title: Linking HoorayHR as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: HoorayHR
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The HoorayHR connector syncs your HR data (employees, time off, sick leave, contracts, time tracking, and more) into the PostHog Data warehouse, so you can analyze it alongside your product data.

## Prerequisites

You need the admin role in your HoorayHR company to create an API key. Personal API keys act as the user who created them.

## Adding a data source

<SourceSetupIntro />

When linking HoorayHR, you'll need:

- **API key** – in HoorayHR, go to [Settings → API keys](https://app.hoorayhr.io/settings/api-keys) and click "New API key". The key (prefixed `pk_`) is shown only once, so copy it right away.

## Sync modes

<SyncModes />

This source is full-refresh only. HoorayHR's API exposes no pagination, cursors, or timestamp filters, so every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key under Settings → API keys in HoorayHR, then reconnect.
- If you see a permissions error, the user who created the key may have lost the admin role. API keys act as the user who created them, so make sure that user is still an admin.

<TroubleshootingLink />
