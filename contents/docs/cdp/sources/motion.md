---
title: Linking Motion as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Motion
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Motion connector syncs workspaces, users, projects, and tasks into the PostHog data warehouse, so you can analyze how work moves alongside your product data.

## Prerequisites

A Motion account with API access. Only the account holder can create an API key.

## Adding a data source

<SourceSetupIntro />

Create an API key in Motion under Settings, then API. Motion shows the key once, so copy it before closing the dialog.

You'll be asked for:

- **API key**: the key from your Motion settings.

## Sync modes

<SyncModes />

All Motion tables are full refresh. Motion's list endpoints have no server-side date filter, so each sync replaces the contents of the table.

Motion rate limits API keys, and individual accounts get a smaller allowance than teams. A first sync of a large workspace can take a while, and PostHog waits out the limit rather than failing the sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong or has been revoked. Create a new one in Motion under Settings, then API, and reconnect the source.
- If a sync is slow, check whether other tools share the same Motion API key. The rate limit applies per key.

<TroubleshootingLink />
