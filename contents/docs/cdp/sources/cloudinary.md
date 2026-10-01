---
title: Linking Cloudinary as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cloudinary
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Cloudinary connector syncs your media library metadata into the PostHog data warehouse: images, videos, raw files, folders, transformations, and upload presets. Media files themselves are never downloaded.

## Prerequisites

A Cloudinary account, and the cloud name, API key, and API secret from its console. Read access is enough.

## Adding a data source

<SourceSetupIntro />

Find all three values in your Cloudinary console under Settings, then API Keys.

You'll be asked for:

- **Cloud name**: shown at the top of your Cloudinary console.
- **API key** and **API secret**: from the API Keys page.
- **Region**: match the API host your account uses. Most accounts are on the global host.

## Sync modes

<SyncModes />

All Cloudinary tables are full refresh. Cloudinary's only time filter on the asset lists selects on update time while the list is ordered by creation time, so a watermark built on it would skip rows.

Cloudinary limits Admin API calls per hour, 500 on free plans, so a first sync of a large media library can take a while. PostHog requests the largest page Cloudinary allows to keep the call count down.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, check the API key and secret in your Cloudinary console under Settings, then API Keys.
- If Cloudinary does not recognize the cloud name, copy it from the top of the console rather than from a delivery URL.
- If a sync stops partway, the account may have hit its hourly Admin API limit. The sync picks up where it left off on the next run.

<TroubleshootingLink />
