---
title: Linking Telnyx as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Telnyx
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Telnyx connector syncs your messaging, voice, verification, wireless, and media storage detail records into the PostHog Data warehouse, so you can analyze your communication data alongside your product data.

## Prerequisites

You need a Telnyx account with API access so you can create an API v2 key.

## Adding a data source

<SourceSetupIntro />

When linking Telnyx, you'll need:

- **API key** – create one under **API Keys** in the Telnyx portal.

## Sync modes

<SyncModes />

The messaging, verify, wireless, and media storage detail record tables support incremental syncs using the record's `created_at` timestamp. Conference, conference participant, and AMD detail record tables use full refresh since they don't have a documented server-side timestamp filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error (401), your Telnyx API key is invalid or has expired. Generate a new key from **API Keys** in the Telnyx portal, then reconnect.
- If you get a permission error (403), your API key doesn't have the required scopes. Check the key's permissions in the Telnyx portal, then reconnect.

<TroubleshootingLink />
