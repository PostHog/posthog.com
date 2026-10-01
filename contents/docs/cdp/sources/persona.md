---
title: Linking Persona as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Persona
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Persona connector syncs inquiries, verifications, accounts, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Persona API key to automatically pull your Persona data.

Create an API key in your Persona dashboard under **Settings → API Keys**. The key needs read access to the resources you want to sync (inquiries, verifications, accounts, cases, transactions, events).

Sandbox and production environments use separate API keys - use the one for the environment whose data you want to import.

You'll be asked for:

- **API key**: for example `persona_...`.

## Sync modes

<SyncModes />

All Persona tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
