---
title: Linking IBM Instana Observability as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Instana
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The IBM Instana Observability connector syncs your events (incidents, issues, and changes), application and service catalogs, monitoring configuration, and infrastructure inventory into the PostHog Data Warehouse, so you can track reliability trends alongside your product data.

## Prerequisites

You need an Instana account (SaaS or self-hosted) with permission to create an API token. The token's permission scopes control which tables can be synced, so grant read access for the data you want to import.

## Adding a data source

<SourceSetupIntro />

When linking Instana, you'll need:

- **Base URL** – the address you use to open the Instana UI, e.g. `https://unit-tenant.instana.io`, or your self-hosted domain.
- **API token** – create one under **Settings → Team Settings → API Tokens** in Instana.

## Sync modes

<SyncModes />

The `events` table supports incremental sync using the event `start` timestamp (epoch milliseconds) and only reaches back 30 days on the initial sync, matching Instana's event retention. The other tables are configuration and topology catalogs without an updated-since filter, so they sync as full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API token is invalid or has been revoked. Create a new token under **Settings → Team Settings → API Tokens**, then reconnect.
- If you see a permissions error, the token is missing the permission scopes needed to sync a table. Grant the required scopes on the token, then reconnect.
- Instana rate-limits API usage to 5,000 calls per hour. Syncs back off and retry automatically, but very frequent sync schedules across many tables can exhaust the budget.

<TroubleshootingLink />
