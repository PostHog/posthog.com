---
title: Linking CallRail as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CallRail
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The CallRail connector syncs your call-tracking data into the PostHog Data warehouse, so you can analyze your calls and attribution alongside your product data.

## Prerequisites

You need a CallRail account with API access so you can create an API key. API keys are scoped to the creating user, so the key only sees data that user can access.

## Adding a data source

<SourceSetupIntro />

When linking CallRail, you'll need:

- **API key** – create one under **Account settings → Integrations → API Keys** in CallRail.
- **Account ID** – optional. Leave it blank to use the first account your key can access, or set it to sync a specific account.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your CallRail API key is invalid or has been revoked. Create a new key under **Account settings → Integrations → API Keys**, then reconnect.
- If you get a permission error, your API key does not have access to this data. The key only sees what its creating user can access, so check the user's permissions, then reconnect.

<TroubleshootingLink />
