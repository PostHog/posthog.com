---
title: Linking Rollbar as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Rollbar
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Rollbar connector syncs your error tracking data into PostHog, so you can analyze errors alongside your product data.

## Prerequisites

You need a Rollbar project and a project access token with the `read` scope. Each PostHog source connects to one Rollbar project, so add one source per project.

## Adding a data source

<SourceSetupIntro />

When linking Rollbar, you'll need:

- **Project access token** – find or create one in your Rollbar project under **Settings → Project Access Tokens**. A token with the `read` scope is sufficient.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
