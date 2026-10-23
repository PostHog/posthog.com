---
title: Linking Anthropic as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Anthropic
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Anthropic connector syncs your organization's Claude API data into the PostHog Data warehouse: daily token usage and costs, plus organization members, workspaces, and API keys. Use it to analyze Claude spend and usage alongside your product data.

## Prerequisites

You need an **Admin API key** (starts with `sk-ant-admin...`), which only organization admins can create in the [Anthropic Console](https://console.anthropic.com/settings/admin-keys). Regular API keys (`sk-ant-api...`) do not work, and the Admin API is not available for individual (non-organization) accounts.

## Adding a data source

<SourceSetupIntro />

When linking Anthropic, you'll need:

- **Admin API key** – create one in the [Anthropic Console](https://console.anthropic.com/settings/admin-keys) under **Settings → Admin keys**. The key must start with `sk-ant-admin...`.

## Sync modes

<SyncModes />

The `usage_report` and `cost_report` tables support incremental sync, tracking the day each usage or cost bucket starts (`bucket_starting_at`). The `users`, `invites`, `workspaces`, `workspace_members`, and `api_keys` tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Admin API key is invalid or has been revoked, or you used a regular API key (`sk-ant-api...`) instead of an Admin key (`sk-ant-admin...`). Create a new Admin key in the Anthropic Console, then reconnect.

<TroubleshootingLink />
