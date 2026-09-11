---
title: Linking Google Tag Manager as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GoogleTagManager
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Google Tag Manager connector syncs your tagging setup into PostHog: accounts, containers, workspaces, tags, triggers, variables, and container versions. Use it to query and monitor how tags and triggers are configured across your sites and apps.

## Prerequisites

You need a Google account with at least read access to the Tag Manager accounts you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Google Tag Manager, you'll need:

- **Google Tag Manager account** – connect a Google account that has read access to your Tag Manager accounts. PostHog requests the `tagmanager.readonly` scope when you authorize.
- **Account IDs** (optional) – comma-separated Tag Manager account IDs to sync, found in Tag Manager under **Admin**. Leave blank to sync every account the connected Google user can access.

## Sync modes

<SyncModes />

The Google Tag Manager API has no modification-time filter, so every table syncs as a full refresh. The tables hold configuration objects and stay small.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Each row carries a `path` column, the resource's API relative path (for example `accounts/1/containers/2/workspaces/3/tags/4`), which is the table's primary key. Tags, triggers, and variables are workspace-scoped: the same tag appears once per workspace that contains it.

## Troubleshooting

The Google Tag Manager API enforces strict rate limits. Syncs pace their requests to stay within them, so a large setup with many containers and workspaces can take a few minutes to sync. If a sync fails with a quota error, it retries automatically once the quota refills.

<TroubleshootingLink />
