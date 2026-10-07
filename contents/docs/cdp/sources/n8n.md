---
title: Linking n8n as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: N8n
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The n8n connector syncs workflows, executions, tags, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your n8n instance to pull your workflow automation data.

Works with n8n Cloud and self-hosted instances. Enter your instance URL (e.g. `https://myorg.app.n8n.cloud`) and an API key created under **Settings > n8n API**.

Some tables (users, projects, variables) require an owner/admin key or an Enterprise plan; deselect them if your key can't access them.

You'll be asked for:

- **Instance URL**: for example `https://myorg.app.n8n.cloud`.
- **API key**: for example `n8n_api_...`.

## Sync modes

<SyncModes />

All n8n tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
