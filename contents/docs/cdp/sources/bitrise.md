---
title: Linking Bitrise as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Bitrise
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Bitrise connector pulls your CI data into the PostHog data warehouse, including apps, builds, workflows, and build artifacts, so you can analyze build durations, failure rates, and release cadence alongside your product data.

## Prerequisites

You need a Bitrise account with access to the apps you want to sync, and a personal access token or workspace API token.

## Adding a data source

<SourceSetupIntro />

You need a Bitrise API token:

- **Personal access token**: create one in your [Bitrise security settings](https://app.bitrise.io/me/account/security). It has access to the same apps as your user.
- **Workspace API token**: create one from your workspace's settings page. It is scoped to a single workspace and is the more secure option for team use.

Paste the token in the **API token** field and click **Next**.

## Sync modes

<SyncModes />

The `builds` table supports incremental sync on `triggered_at`. Note that the Bitrise API only returns builds from roughly the last 200 days, so older builds are not synced.

The `artifacts` table is disabled by default because it makes one API request per build. Enable it only if you need artifact metadata.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid Bitrise API token**: the token is invalid or has been revoked. Create a new token in your Bitrise security settings and reconnect the source.
- **Missing builds**: the Bitrise API caps the builds listing at roughly the last 200 days. Builds older than that are not available to sync.

<TroubleshootingLink />
