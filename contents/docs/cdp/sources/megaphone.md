---
title: Linking Megaphone as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: Megaphone
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Megaphone connector syncs your podcast networks, podcasts and episodes into PostHog. Use it to join your episode catalog with product and marketing data.

## Prerequisites

You need:

- A Megaphone API token. Create one in Megaphone: hover over your initials in the lower-left corner, select **Settings**, then click **Generate new token**.
- Your organization ID. When you are signed in to Megaphone, it is the value after `/organizations/` in the address bar.

## Adding a data source

<SourceSetupIntro />

Paste the API token and the organization ID.

## Sync modes

<SyncModes />

`episodes` supports incremental sync on `updatedAt`. `networks` and `podcasts` sync with a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Known limitations

- Download and impression metrics are not available through the Megaphone API. Megaphone delivers them through its separate metrics and impressions export services.
- Megaphone limits the API to 60 requests per minute. Large catalogs take longer to sync.

## Troubleshooting

**The API token can't read this organization.** Check that the organization ID is correct, and that the user who created the token can see the organization in Megaphone.

<TroubleshootingLink />
