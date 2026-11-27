---
title: Linking SingleStore, Inc. as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Singlestore
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The SingleStore, Inc. connector syncs organization, regions, workspace groups, projects, starter clusters, audit logs, and more into the PostHog Data Warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

See the [SingleStore, Inc. API documentation](https://docs.singlestore.com/cloud/reference/management-api/) for how to create the credentials this source needs.

You'll be asked for:

- **API key**: generate an organization API key from the SingleStore Cloud Portal (Org name -> API Keys).

## Sync modes

<SyncModes />

The `audit_logs` table supports incremental sync using `createdAt` or full refresh. The `billing_usage` table also supports incremental sync, using `startTime`. All other SingleStore, Inc. tables, including `projects` and `starter_clusters`, use full refresh. Each full refresh replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
