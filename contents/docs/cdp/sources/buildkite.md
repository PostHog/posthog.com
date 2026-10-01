---
title: Linking Buildkite as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Buildkite
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Buildkite connector syncs organizations, organization members, pipelines, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Buildkite API access token and organization slug to sync your CI/CD data.

You can create an API access token in your [Buildkite account settings](https://buildkite.com/user/api-access-tokens).

Make sure to grant the following read scopes:
- `read_organizations`
- `read_pipelines`
- `read_builds`
- `read_agents`
- `read_clusters`
- `read_teams`
- `read_suites`

You'll be asked for:

- **API access token**: for example `bkua_...`.
- **Organization slug**: for example `my-organization`.

## Sync modes

<SyncModes />

All Buildkite tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
