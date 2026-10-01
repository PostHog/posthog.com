---
title: Linking Tailscale as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Tailscale
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Tailscale connector syncs devices, users, keys, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync your Tailscale devices, users, keys, and configuration audit logs.

An **OAuth client** is the recommended credential for recurring syncs - API access tokens expire after at most 90 days. Create one in the [Tailscale admin console](https://login.tailscale.com/admin/settings/oauth) under **Settings > OAuth clients**, with read scopes for the tables you want to sync (for example `devices:core:read`, `users:read`, `auth_keys:read`, and `logs:configuration:read`).

Alternatively, generate an API access token under **Settings > Keys**. Leave the tailnet field blank to use the credential's default tailnet.

You'll be asked for:

- **Authentication method**: choose between OAuth client and API access token.

## Sync modes

<SyncModes />

All Tailscale tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the OAuth client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
