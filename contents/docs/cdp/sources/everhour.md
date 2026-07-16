---
title: Linking Everhour as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Everhour
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Everhour connector syncs your time-tracking data into the PostHog Data warehouse, so you can analyze your time entries and projects alongside your product data.

## Prerequisites

You need a paid Everhour plan, as API access is not available on the free tier.

## Adding a data source

<SourceSetupIntro />

When linking Everhour, you'll need:

- **API key** – find it in your [Everhour profile settings](https://app.everhour.com/#/account/profile) under the API section.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Generate a new key in your Everhour profile settings, then reconnect.
- If you see a permissions error, the key does not have access to this data. Check the key's permissions in Everhour, then reconnect.

<TroubleshootingLink />
