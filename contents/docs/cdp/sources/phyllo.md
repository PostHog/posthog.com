---
title: Linking Phyllo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Phyllo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Phyllo connector syncs your creator accounts, profiles, content, and income data into PostHog, so you can analyze creator data alongside your product data.

## Prerequisites

You need a Phyllo account with API credentials from the developer dashboard. Credentials are environment-specific, so sandbox credentials only authenticate against the sandbox environment.

## Adding a data source

<SourceSetupIntro />

When linking Phyllo, you'll need:

- **Client ID** – find it in the [Phyllo developer dashboard](https://dashboard.getphyllo.com) under **API credentials**.
- **Client secret** – shown alongside your client ID in the [Phyllo developer dashboard](https://dashboard.getphyllo.com) under **API credentials**.
- **Environment** – select the environment your credentials belong to. Sandbox credentials only authenticate against the sandbox environment.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If authentication fails, confirm your client ID and secret match the environment you selected, since sandbox credentials only work against the sandbox environment.

<TroubleshootingLink />
