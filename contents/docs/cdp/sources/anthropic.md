---
title: Linking Anthropic as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Anthropic
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import BetaRelease from "../_snippets/beta-release.mdx"

<BetaRelease />

The Anthropic connector syncs users, invites, workspaces, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Anthropic Admin API key to pull your organization's Claude usage, cost, and admin data.

Create an Admin API key (prefixed `sk-ant-admin...`) in your [Anthropic Console](https://console.anthropic.com/settings/admin-keys). Only organization admins can create one, and the Admin API is not available for individual accounts.

Some tables need a Claude Enterprise key instead, created by your primary owner in [claude.ai organization settings](https://claude.ai/admin-settings/api-access). A key works with one API only, so pick the one that matches the tables you want.

The per-seat activity, cost and token usage tables, and the connector, plugin, skill and summary tables, come from the Claude Enterprise Analytics API. They need a Claude Enterprise key carrying the `read:analytics` scope.

The group, group membership and custom role tables come from the Claude Enterprise user management API. They need an Admin API key carrying the `read:rbac_groups` scope for the group tables, or `read:members` for the custom role tables.

You'll be asked for:

- **Admin API key**: for example `sk-ant-admin...`.

## Sync modes

<SyncModes />

Some Anthropic tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the admin API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
