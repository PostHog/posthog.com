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

The Harvey connector syncs audit logs, usage history, query history, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Harvey API token to pull audit logs, usage and query history, client matters, and Vault project metadata.

Create an API token in Harvey workspace settings under **API Tokens** (if you don't see that section, ask your Harvey Customer Success Manager to enable API access).

Each token carries a per-endpoint permissions list - grant access for the endpoints you want to sync: audit logs, history exports, client matters, and Vault.

You'll be asked for:

- **API token**
- **Region**: choose between US (api.harvey.ai), EU (eu.api.harvey.ai) and AU (au.api.harvey.ai).

## Sync modes

<SyncModes />

All Harvey tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
