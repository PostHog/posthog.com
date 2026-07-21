---
title: Linking Buzzsprout as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Buzzsprout
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Buzzsprout connector syncs your podcast data into the PostHog Data warehouse, so you can analyze your podcast performance alongside your product data.

## Prerequisites

You need a Buzzsprout account with access to its API settings so you can obtain an API token and your podcast ID.

## Adding a data source

<SourceSetupIntro />

When linking Buzzsprout, you'll need:

- **API token** – find it in your [Buzzsprout API settings](https://www.buzzsprout.com/my/profile/api).
- **Podcast ID** – shown alongside your API token in the same [Buzzsprout API settings](https://www.buzzsprout.com/my/profile/api) page.

## Sync modes

<SyncModes />

This source is full refresh only. Each sync pulls the complete dataset and merges on the primary key, so mutable fields such as total plays stay up to date.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API token may be invalid or revoked. Create a new token in your Buzzsprout account settings, then reconnect.
- If you see a forbidden error, your token may not have access to this podcast. Check the token and podcast ID, then reconnect.

<TroubleshootingLink />
