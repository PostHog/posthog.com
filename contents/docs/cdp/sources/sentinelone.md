---
title: Linking SentinelOne as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Sentinelone
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The SentinelOne connector syncs your endpoint security data into the PostHog Data warehouse, so you can trend threat volume, mitigation rates, and fleet health alongside your product data.

## Prerequisites

You need a SentinelOne account with access to the management console so you can generate an API token. The token inherits your user's role and scope (account, site, or group), which determines which records sync.

## Adding a data source

<SourceSetupIntro />

When linking SentinelOne, you'll need:

- **Console URL** – your management console hostname, like `your-tenant.sentinelone.net`. It's tenant and region specific, so copy it from your browser's address bar when logged in to the console.
- **API token** – in the management console, click your user name, then **My User** > **Actions** > **API Token Operations** > **Generate API token**. Copy the token right away, as it's only shown once. Tokens expire (typically after six months), so you'll need to regenerate and reconnect when yours does.

## Sync modes

<SyncModes />

Threats, agents, and activities support incremental sync using SentinelOne's timestamp filters. Groups and sites are small tables and sync as full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your API token is invalid or expired. Generate a new token under **My User** > **Actions** > **API Token Operations**, then reconnect.
- If some records are missing, your token's user may be scoped to a specific site or group. Reconnect with a token from a user scoped to the account level to sync everything.

<TroubleshootingLink />
