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

The Persona connector syncs your Persona data – inquiries, accounts, cases, transactions, events, and inquiry templates – into PostHog.

## Prerequisites

You need a Persona account with access to create an API key. The key needs read access to the resources you want to sync (inquiries, accounts, cases, transactions, events). Sandbox and production environments use separate API keys, so use the one for the environment whose data you want to import.

## Adding a data source

<SourceSetupIntro />

When linking Persona, you'll need:

- **API key** – create one in your Persona dashboard under **Settings → API Keys**. The key needs read access to the resources you want to sync (inquiries, accounts, cases, transactions, events). Sandbox and production environments use separate keys – use the one for the environment whose data you want to import.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If a table returns no data, confirm your API key has read access to that resource and belongs to the correct environment (sandbox vs. production), then reconnect.

<TroubleshootingLink />
