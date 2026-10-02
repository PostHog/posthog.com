---
title: Linking Infisical as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Infisical
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Infisical connector syncs audit logs, projects, identities, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect an Infisical machine identity to pull your organization's audit logs, projects, identities, and memberships. Secret values are never synced.

In Infisical, create a machine identity under **Organization settings > Access control > Identities**, add a **Universal Auth** method to it, and grant it read permissions for the data you want to sync (audit logs, projects, identities, and memberships). Note that audit log access is plan-gated on Infisical Cloud.

- **Base URL**: `https://app.infisical.com` (US cloud), `https://eu.infisical.com` (EU cloud), or your self-hosted URL.
- **Organization ID**: found in your Infisical URL after `/org/`, or in organization settings.
- **Client ID / Client secret**: from the identity's Universal Auth configuration.

You'll be asked for:

- **Base URL**: for example `https://app.infisical.com`.
- **Organization ID**: for example `00000000-0000-0000-0000-000000000000`.
- **Client ID**
- **Client secret**

## Sync modes

<SyncModes />

All Infisical tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
