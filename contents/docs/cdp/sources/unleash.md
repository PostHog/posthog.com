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

The Unleash connector syncs features, projects, environments, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Unleash instance URL and an Admin API token to sync your feature flags, projects, environments, strategies, segments, and other configuration data.

The instance URL is where you open the Unleash UI - for Unleash cloud it includes your instance name (e.g. `https://us.app.unleash-hosted.com/your-instance`); for self-hosted it's your server's URL. The token is a [personal access token](https://docs.getunleash.io/how-to/how-to-create-personal-access-tokens) or, on Enterprise, a [service account token](https://docs.getunleash.io/reference/service-accounts); it inherits the owner's permissions, and the `users` table additionally requires the Admin root role. The `features` table uses the flag search API, which requires Unleash 5.12 or newer.

You'll be asked for:

- **Instance URL**: for example `https://us.app.unleash-hosted.com/your-instance`.
- **API token**

## Sync modes

<SyncModes />

All Unleash tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
