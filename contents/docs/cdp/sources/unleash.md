---
title: Linking Unleash as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Unleash
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Unleash connector syncs your feature flags, projects, environments, strategies, segments, and other configuration data into PostHog.

## Prerequisites

You need an Unleash instance and an Admin API token. The token inherits its owner's permissions, and syncing the `users` table additionally requires the Admin root role. The `features` table uses the flag search API, which requires Unleash 5.12 or newer.

## Adding a data source

<SourceSetupIntro />

When linking Unleash, you'll need:

- **Instance URL** – where you open the Unleash UI. For Unleash cloud it includes your instance name (e.g. `https://us.app.unleash-hosted.com/your-instance`); for self-hosted it's your server's URL.
- **API token** – a [personal access token](https://docs.getunleash.io/how-to/how-to-create-personal-access-tokens) or, on Enterprise, a [service account token](https://docs.getunleash.io/reference/service-accounts). It inherits the owner's permissions, and the `users` table additionally requires the Admin root role.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the `users` table fails, confirm the token's owner has the Admin root role.
- If the `features` table fails, confirm your instance is running Unleash 5.12 or newer, since it uses the flag search API.

<TroubleshootingLink />
