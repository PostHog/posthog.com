---
title: Linking EmailOctopus as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: EmailOctopus
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The EmailOctopus connector syncs your email marketing data into the PostHog Data warehouse, so you can analyze your lists and campaigns alongside your product data.

## Prerequisites

You need an EmailOctopus account with access to its API so you can create an API key. The key grants account-wide read access.

## Adding a data source

<SourceSetupIntro />

When linking EmailOctopus, you'll need:

- **API key** – create one in your [EmailOctopus account settings](https://emailoctopus.com/api-documentation). The key grants account-wide read access.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Create a new API key in your EmailOctopus account settings, then reconnect.
- If you see a forbidden error, your key may not have permission to access this data. Check the key in your EmailOctopus account settings, then reconnect.

<TroubleshootingLink />
