---
title: Linking Descope as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Descope
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Descope connector syncs your identity and access management data – users, audit trail events, tenants, roles, and access keys – into the PostHog data warehouse, so you can analyze authentication patterns, user management, and security events alongside your product data.

## Prerequisites

- A [Descope](https://www.descope.com/) project.
- A Management Key with read permissions. You can create one in the [Descope Console](https://app.descope.com) under **Project Settings** > **Company/Management Keys**.

## Adding a data source

<SourceSetupIntro />

When linking Descope, you'll need:

- **Project ID** – your Descope project identifier. Find it in the [Descope Console](https://app.descope.com) under **Project Settings**.
- **Management Key** – create one in the Descope Console under **Project Settings** > **Company/Management Keys**. The key must have read permissions for the data you want to sync.

## Sync modes

<SyncModes />

The `users` table supports incremental sync on either `createdTime` or `modifiedTime`. The `audit` table supports incremental sync on `occurred`. The `tenants`, `roles`, and `access_keys` tables are full refresh only because the Descope API doesn't expose incremental filters for these endpoints.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authentication errors** – Your Project ID or Management Key may be invalid or expired. Verify them in the [Descope Console](https://app.descope.com) under **Project Settings** and reconnect.
- **Missing data in the audit table** – The audit table generates a synthetic unique ID from event fields because the Descope API doesn't provide one. Audit data is available for up to the last 30 days. If you see unexpected duplicates, contact support.
- **Permissions errors** – Your Management Key may not have sufficient read permissions. Check key permissions in the Descope Console.

<TroubleshootingLink />
