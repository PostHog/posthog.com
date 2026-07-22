---
title: Linking BlueTally as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Bluetally
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The BlueTally connector syncs your IT asset management data into PostHog, so you can analyze your assets alongside your product data.

## Prerequisites

You need a BlueTally account with access to create an API key.

## Adding a data source

<SourceSetupIntro />

When linking BlueTally, you'll need:

- **API key** – create one in BlueTally under **Settings → API Keys**, then paste it here.
- **Tenant ID** – optional. If your account has multi-tenancy enabled, enter the tenant ID the key should act on.

## Sync modes

<SyncModes />

BlueTally exposes no server-side timestamp filter, so this source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or expired. Create a new key under **Settings → API Keys** in BlueTally, then reconnect.
- If you see a permission error, check that the key has permission to read the data you want to sync.

<TroubleshootingLink />
