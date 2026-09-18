---
title: Linking Bunny.net as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Bunny
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The bunny.net connector syncs your bunny.net data – pull zones, storage zones, DNS zones, and Stream video libraries – into PostHog, so you can analyze your content delivery and streaming data alongside your product data.

## Prerequisites

You need a bunny.net account with access to your account API key.

## Adding a data source

<SourceSetupIntro />

When linking Bunny.net, you'll need:

- **Account API key** – find it under **Account Settings → API** in the [bunny.net dashboard](https://dash.bunny.net/account/settings). This single key grants read access to the Core API.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is re-synced on each run because bunny.net's list endpoints expose no server-side timestamp filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your account API key is invalid or has been revoked, generate a new key under Account Settings → API, then reconnect.
- If your key does not have access to some data, check the key's permissions, then reconnect.

<TroubleshootingLink />
