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

[Buildkite](https://buildkite.com) is a CI/CD platform. This connector syncs your organizations, pipelines, builds, and agents into the PostHog Data Warehouse so you can analyze CI/CD performance alongside your product data.

## Prerequisites

A Buildkite account with an API access token that has read access to the data you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Buildkite, you'll need:

- **API access token** – create one in your [Buildkite account settings](https://buildkite.com/user/api-access-tokens). Grant the following read scopes: `read_organizations`, `read_pipelines`, `read_builds`, and `read_agents`.
- **Organization slug** – the slug of the organization you want to sync (for example, `my-organization`).

## Sync modes

<SyncModes />

The `builds` table supports incremental sync using its `created_at` timestamp. The other Buildkite tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the connection fails with an authentication error, confirm the API access token is still valid and has all four read scopes listed above. If a table syncs no rows, check that the token's user has access to the relevant pipelines in your Buildkite organization.

<TroubleshootingLink />
