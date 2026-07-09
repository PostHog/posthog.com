---
title: Linking Zuora as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Zuora
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Zuora connector syncs your subscription billing data into PostHog, so you can analyze billing activity alongside your product data.

## Prerequisites

You need a Zuora tenant and an OAuth client with permission for the objects you want to sync. The OAuth client inherits the permissions of the user it's created under.

## Adding a data source

<SourceSetupIntro />

When linking Zuora, you'll need:

- **Environment** – choose the environment that matches your tenant (US Production, US API Sandbox, US Cloud Production, US Cloud Sandbox, EU Production, EU Sandbox, or Central Sandbox). Credentials only work against their own environment.
- **Client ID** – the OAuth client ID. A Zuora admin can create an OAuth client under **Settings → Administration → Manage Users**.
- **Client secret** – the OAuth client secret shown when the client is created.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
