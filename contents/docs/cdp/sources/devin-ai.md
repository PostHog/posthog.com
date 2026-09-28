---
title: Linking Devin AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DevinAI
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Devin AI connector syncs sessions, playbooks, knowledge notes, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Devin service user API key and organization ID to sync your Devin data.

Create a service user API key (prefixed `cog_`) in your [Devin organization settings](https://app.devin.ai/settings). The service user needs the following organization-level permissions:
- `ViewOrgSessions` - Sessions
- `ManageAccountKnowledge` - Playbooks and Knowledge notes
- `ViewOrgMembership` - Members
- `ManageOrgSecrets` - Secrets (metadata only; values are never synced)

Your organization ID is the `org-...` identifier shown in your Devin organization settings.

You'll be asked for:

- **API key**: for example `cog_...`.
- **Organization ID**: for example `org-...`.

## Sync modes

<SyncModes />

All Devin AI tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
