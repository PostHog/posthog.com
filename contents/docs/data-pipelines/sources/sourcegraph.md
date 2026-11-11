---
title: Linking Sourcegraph as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Sourcegraph
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Sourcegraph connector syncs repositories, users, organizations, and more into the PostHog Data Warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Sourcegraph instance URL and an access token to pull your Sourcegraph data.

You can create an access token in Sourcegraph under **Settings > Access tokens**.

The `users`, `organizations`, `exported_events`, `code_hosts`, and `external_services` tables require a token created by a **site admin**. The `repositories`, `commits`, and `contributors` tables work with any user's token.

You'll be asked for:

- **Sourcegraph URL**: for example `https://sourcegraph.example.com`.
- **Access token**: for example `sgp_...`.

## Sync modes

<SyncModes />

The `commits` and `exported_events` tables support incremental sync. All other Sourcegraph tables use full refresh, which replaces the contents of the table on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
