---
title: Linking Todoist as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Todoist
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Todoist connector syncs your task and project data into the PostHog Data warehouse, so you can analyze it alongside your product data.

## Prerequisites

You need a Todoist account so you can find your personal API token.

## Adding a data source

<SourceSetupIntro />

When linking Todoist, you'll need:

- **API token** – find your personal API token in [Todoist's integration settings](https://app.todoist.com/app/settings/integrations/developer).

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Todoist API token may be invalid or revoked. Generate a new token in your Todoist integration settings, then reconnect.
- If you see a permission error, your Todoist API token is missing the permissions needed to sync this data. Reconnect with a token that has the required access.

<TroubleshootingLink />
