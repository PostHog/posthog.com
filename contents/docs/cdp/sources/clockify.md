---
title: Linking Clockify as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clockify
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Clockify connector syncs your time-tracking data into the PostHog Data warehouse, so you can analyze projects, clients, and time entries alongside your product data.

## Prerequisites

You need a Clockify account. The API key is user-scoped, so use an admin or owner key to sync workspace-wide data such as projects, clients, and every member's time entries.

## Adding a data source

<SourceSetupIntro />

When linking Clockify, you'll need:

- **API key** – generate one on your [Clockify profile settings](https://app.clockify.me/user/settings) page.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Generate a new key in your Clockify profile settings, then reconnect.
- If you see a permissions error, the key lacks the access needed to sync this data. Use an admin or owner key, then reconnect.

<TroubleshootingLink />
