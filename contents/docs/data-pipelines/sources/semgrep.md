---
title: Linking Semgrep as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Semgrep
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Semgrep connector syncs deployments, projects, findings, scan history, and supply chain dependency inventory into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Semgrep API token to sync your static analysis data - deployments, projects, code (SAST) and supply chain (SCA) findings, and secrets - .

Create a token in Semgrep AppSec Platform under **Settings → Tokens** and grant it the **Web API** scope. The API requires a Semgrep Team or Enterprise plan.

You'll be asked for:

- **API token**

## Sync modes

<SyncModes />

All Semgrep tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Rows in every table except `deployments` carry extra `deployment_id` and `deployment_slug` columns added by PostHog so you can join them back to the `deployments` table. Rows in the `dependency_lockfiles` table also carry `repository_id` and `repository_name`, and rows in the `dependencies` table carry a `dependency_key` column that PostHog computes, because Semgrep gives dependencies no ID.

The `scans` table holds the last 30 days of scans, which is what Semgrep's API returns. The `scans`, `dependencies`, `dependency_repositories`, and `dependency_lockfiles` tables use API endpoints that Semgrep marks as experimental.

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- If sync fails with a 403 for dependency tables, your plan may not include API access to those resources. The `dependencies`, `dependency_repositories`, and `dependency_lockfiles` tables require the Semgrep Supply Chain product. Deselect the affected table or upgrade your Semgrep plan.

<TroubleshootingLink />
