---
title: Linking Doppler as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Doppler
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Doppler connector syncs your secrets management metadata into the PostHog Data warehouse: projects, environments, configs, workplace members, and the activity log of config and access changes. This is useful for audit, change tracking, and compliance reporting. Secret values are never synced.

## Prerequisites

You need a Doppler API token with read access to your workplace and the projects you want to sync. A [personal token](https://docs.doppler.com/docs/personal-tokens) or a [service account token](https://docs.doppler.com/docs/service-accounts) both work. Service tokens scoped to a single config are too narrow for this connector.

## Adding a data source

<SourceSetupIntro />

When linking Doppler, you'll need:

- **API token** – create a personal token under **Settings → API** in your [Doppler dashboard](https://dashboard.doppler.com), or create a service account with read access and generate a token for it.

## Sync modes

<SyncModes />

The activity log is append-only, so incremental sync is recommended for the `activity_logs` table: each sync only fetches entries newer than the last synced one. The remaining tables are small and only support full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API token is invalid or has been revoked. Create a new token in your Doppler dashboard, then reconnect.
- If you see a permissions error, the token is missing read access to your workplace or one of its projects. Check the token's access, then reconnect.

<TroubleshootingLink />
