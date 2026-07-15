---
title: Linking Planhat as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Planhat
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Planhat connector syncs your customer success data – companies, end users, users, licenses, assets, and NPS responses – into the PostHog Data warehouse, so you can analyze your customer success metrics alongside your product data.

## Prerequisites

You need a Planhat account with permission to create a Private App under **Settings → Service Accounts**.

## Adding a data source

<SourceSetupIntro />

When linking Planhat, you'll need:

- **API access token** – create a Private App in [Planhat](https://app.planhat.com) under **Settings → Service Accounts**. The token is shown once, so copy it immediately.

## Sync modes

<SyncModes />

All Planhat tables use full refresh sync mode.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API access token is invalid or has been revoked. Generate a new token from a Private App under **Settings → Service Accounts** in Planhat, then reconnect.
- If you see a permissions error, the token does not have access to this data. Check the Private App's scopes in your Planhat account, then reconnect.

<TroubleshootingLink />
