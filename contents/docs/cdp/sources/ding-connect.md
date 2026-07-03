---
title: Linking DingConnect as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DingConnect
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The DingConnect connector syncs your DingConnect data into the PostHog Data warehouse, so you can analyze your top-up transactions and account balances alongside your product data.

## Prerequisites

You need a DingConnect account with API access so you can generate an API key.

## Adding a data source

<SourceSetupIntro />

When linking DingConnect, you'll need:

- **API key** – generate one under the **Developer** tab of your [DingConnect account settings](https://www.dingconnect.com/Account/Settings).

## Sync modes

<SyncModes />

All DingConnect tables are full refresh only, since the API exposes no incremental sync filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your DingConnect API key is invalid or has been revoked. Generate a new key under the **Developer** tab of your account settings, then reconnect.
- If you get a permission error, your API key does not have access to this data. Check the key's permissions in your DingConnect account settings, then reconnect.

<TroubleshootingLink />
