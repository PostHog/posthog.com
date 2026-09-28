---
title: Linking Qualys VMDR as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: QualysVmdr
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Qualys VMDR connector syncs hosts, host list detection, scans, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Qualys API credentials to sync your VMDR vulnerability management data.

Use your account's regional API server URL (for example `qualysapi.qualys.com`, `qualysapi.qg2.apps.qualys.com`, or `qualysapi.qualys.eu`) - you can find it under **Help > About** in the Qualys UI. The user needs API access enabled (a Manager role, or a role granted API access).

The `knowledge_base` table additionally requires the KnowledgeBase download option to be enabled on your Qualys subscription. On API version 4.0 it also needs your account's gateway URL (for example `gateway.qg2.apps.qualys.com`), which you can find under **Help > About** in the Qualys UI. Leave the gateway URL blank if you do not sync the `knowledge_base` table.

You'll be asked for:

- **API server URL**: for example `qualysapi.qualys.com`.
- **Username**
- **Password**

## Sync modes

<SyncModes />

All Qualys VMDR tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the password is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
