---
title: Linking Google Webfonts as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GoogleWebfonts
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Google Webfonts connector syncs the Google Fonts catalog into PostHog, so you can analyze font metadata alongside your product data.

## Prerequisites

You need a Google API key with the **Web Fonts Developer API** enabled. No OAuth or scopes are required – the API is a public, read-only metadata catalog.

## Adding a data source

<SourceSetupIntro />

When linking Google Webfonts, you'll need:

- **API key** – create an API key in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and enable the **Web Fonts Developer API** for the project.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
