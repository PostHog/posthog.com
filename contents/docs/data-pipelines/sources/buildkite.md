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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

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
- `read_audit_events` (optional, for audit events – requires the Enterprise plan)

You'll be asked for:

- **API access token**: for example `bkua_...`.
- **Organization slug**: for example `my-organization`.

## Sync modes

<SyncModes />

Most Buildkite tables use full refresh, where each sync replaces the table contents. The following tables support incremental sync:

- **builds** – incremental by `created_at`.
- **jobs**, **artifacts**, **annotations**, **build_tests** – incremental by `build_created_at`, synced alongside their parent builds.
- **organization_usage** – incremental by month. Only recent months are re-synced.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Special requirements

Some tables have additional requirements beyond the standard API scopes:

- **audit_events** – Requires the Buildkite Enterprise plan. The API token must also belong to an organization administrator, not just have the `read_audit_events` scope.
- **jobs**, **artifacts**, **annotations**, **build_tests** – Disabled by default because they make at least one API request per build, which can be expensive for organizations with many builds. Enable them in the source configuration if needed.

## Troubleshooting

- If the connection fails with an authorization error, the API access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- If the `audit_events` table fails with a 403 error, your Buildkite organization may not have the Enterprise plan, or the token owner may not be an organization administrator. Both are required for audit events.

<TroubleshootingLink />
