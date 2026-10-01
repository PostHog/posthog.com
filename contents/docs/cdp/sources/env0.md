---
title: Linking env0 as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Env0
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The env0 connector syncs organizations, projects, teams, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your env0 API key credentials to pull your env0 data.

You can create an organization API key in your env0 [Organization Settings > API Keys](https://docs.envzero.com/docs/api-keys), or a personal API key from your user settings. The key needs read access to the organizations you want to sync.

Environment cost data is only available for environments with [cost monitoring](https://docs.envzero.com/docs/cost-monitoring) configured.

You'll be asked for:

- **API key ID**
- **API key secret**

## Sync modes

<SyncModes />

All env0 tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key ID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
