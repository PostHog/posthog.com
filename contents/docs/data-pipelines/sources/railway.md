---
title: Linking Railway as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Railway
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Railway connector syncs your [Railway](https://railway.com/) projects, services, environments, deployments, project members, volumes, usage data, metrics, and activity events into PostHog. This is useful for analyzing deployment activity, resource consumption, and failure rates alongside your product data.

## Prerequisites

You need a Railway account with access to the projects you want to sync, and permission to create an API token for your account or workspace.

## Adding a data source

<SourceSetupIntro />

You need a Railway API token:

1. Go to your [Railway account settings](https://railway.com/account/tokens).
2. Create a new token. To sync projects from a specific workspace, select that workspace when creating the token. A token created without a workspace is an account token and syncs all projects your account can access.
3. Back in PostHog, paste the token into the `API token` field and click **Next**.

Project tokens are not supported. They are scoped to a single environment and can't list your projects.

Railway rate limits API requests per plan (as low as 100 requests/hour on the Free plan), so a large initial sync can take a while.

## Sync modes

<SyncModes />

The following tables support incremental syncs:

- **`deployments`**: each run pulls deployments created since the last sync, and also re-syncs the previous day so recent status changes (for example a deployment moving from `DEPLOYING` to `SUCCESS`) are picked up. Status changes on older deployments are only reflected on a full refresh.
- **`deployment_events`**: syncs events for deployments created since the last sync, with a 24-hour lookback for deployments that were still in progress.
- **`usage`**: daily resource usage per project and service. The first sync pulls the last 90 days.
- **`metrics`**: hourly resource metric samples per service and environment. The first sync pulls the last 30 days (Railway only retains about 30 days of metrics).

All other tables (`projects`, `services`, `environments`, `project_members`, `volumes`, `events`, and `estimated_usage`) sync as full refreshes.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

**"Your Railway API token is invalid, revoked, or lacks access"**: create a new account or workspace token in your [Railway account settings](https://railway.com/account/tokens) and reconnect. Make sure you didn't paste a project token.

<TroubleshootingLink />
