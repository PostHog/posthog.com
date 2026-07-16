---
title: Linking Capsule CRM as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CapsuleCRM
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Capsule CRM connector syncs your CRM data – parties, opportunities, projects, and tasks – into PostHog, so you can analyze your sales pipeline alongside your product data.

## Prerequisites

You need a Capsule CRM account with permission to see the records you want to sync, so you can create a Personal Access Token.

## Adding a data source

<SourceSetupIntro />

When linking Capsule CRM, you'll need:

- **Personal Access Token** – create one under **My Preferences → API Authentication Tokens** in your Capsule account. The token inherits your user's permissions, so make sure your user can see the records you want to sync (parties, opportunities, projects, tasks).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your Personal Access Token is invalid or has been revoked, create a new token in your Capsule account settings, then reconnect.
- If your user does not have permission to read the data, check the user's permissions in Capsule, then reconnect.

<TroubleshootingLink />
