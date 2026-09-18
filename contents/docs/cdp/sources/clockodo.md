---
title: Linking Clockodo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clockodo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Clockodo connector syncs your Clockodo time-tracking data into PostHog, so you can analyze time and project data alongside your product data.

## Prerequisites

You need a Clockodo account with access to your personal API key. Credentials are scoped to that co-worker's permissions, so connect a user that can see the data you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Clockodo, you'll need:

- **Email** – the email address of the Clockodo user whose API key you're using.
- **API key** – find your personal API key under **Personal data** in your Clockodo account.

## Sync modes

<SyncModes />

Clockodo exposes no server-side modified-since filter, so this source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, check that your email and API key are correct. Find your API key under **Personal data** in Clockodo, then reconnect.
- If you see a permission error, Clockodo credentials are scoped per co-worker. Check the user's permissions, then reconnect.

<TroubleshootingLink />
