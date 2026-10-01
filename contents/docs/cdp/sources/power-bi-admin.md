---
title: Linking Power BI admin as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PowerBiAdmin
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Power BI admin connector syncs activity events, groups, datasets, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync tenant-wide Power BI and Fabric governance data: the audit log of views, edits, exports and shares, plus the workspace, semantic model, report, dashboard, dataflow, and capacity inventories.

Create an Entra ID app registration, add a client secret, and put the app in a security group that is allowed to use the read-only admin APIs in the Fabric admin portal. The app must not have any admin-consent Power BI permissions set on it. Then enter the directory (tenant) ID, application (client) ID, and client secret below.

Power BI only serves activity events for the last 28 days, so the first sync starts there and everything after that builds up in your warehouse.

You'll be asked for:

- **Directory (tenant) ID**: for example `00000000-0000-0000-0000-000000000000`.
- **Application (client) ID**: for example `00000000-0000-0000-0000-000000000000`.
- **Client secret**

## Sync modes

<SyncModes />

All Power BI admin tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
