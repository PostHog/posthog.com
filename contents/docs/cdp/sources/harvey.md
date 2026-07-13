---
title: Linking Harvey as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Harvey
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Harvey connector syncs your workspace data into the PostHog Data warehouse: audit logs, usage and query history, client matters, and Vault project metadata. Use it to analyze how your team uses Harvey alongside your product data.

## Prerequisites

You need a Harvey workspace with API access enabled and an API token. Create a token in Harvey workspace settings under **API Tokens**. If you don't see that section, ask your Harvey Customer Success Manager to enable API access.

Each token carries a per-endpoint permissions list. Grant access for the endpoints you want to sync: audit logs, history exports, client matters, and Vault.

## Adding a data source

<SourceSetupIntro />

When linking Harvey, you'll need:

- **API token** – create one in Harvey workspace settings under **API Tokens**, with permissions for the endpoints you want to sync.
- **Region** – the region your Harvey workspace is hosted in: US (`api.harvey.ai`), EU (`eu.api.harvey.ai`), or AU (`au.api.harvey.ai`). Choosing the wrong region causes authentication or not-found errors.

## Sync modes

<SyncModes />

The `usage_history` and `query_history` tables support incremental sync on their UTC timestamp, and only fetch the last year on the initial sync (a Harvey API limit). The `audit_logs` table supports append-only sync on its timestamp. The `client_matters` and `vault_projects` tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API token is invalid or revoked, is missing a permission for one of the synced endpoints, or the selected region doesn't match your workspace. Check the token's permissions and region, then reconnect.

<TroubleshootingLink />
