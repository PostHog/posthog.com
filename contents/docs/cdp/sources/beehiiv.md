---
title: Linking beehiiv as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Beehiiv
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The beehiiv connector syncs authors, automations, complimentary access, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Create an API key in beehiiv under **Settings > Integrations > API**, then paste it below along with your publication ID. The key needs read access to the resources you want to sync, for example `subscriptions:read`, `posts:read` and `publications:read`. API access requires a paid beehiiv plan.

You'll be asked for:

- **API key**
- **Publication ID**: for example `pub_00000000-0000-0000-0000-000000000000`.

## Sync modes

<SyncModes />

All beehiiv tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
