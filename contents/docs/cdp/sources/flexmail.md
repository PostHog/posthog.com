---
title: Linking Flexmail as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Flexmail
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Flexmail connector syncs your email marketing data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Flexmail account, your account ID, and a personal access token. The token grants read access to your contacts, interests, custom fields, preferences, segments, sources, and opt-in forms.

## Adding a data source

<SourceSetupIntro />

When linking Flexmail, you'll need:

- **Account ID** – your Flexmail account ID.
- **Personal access token** – create one under **Settings → API → Personal access tokens** in [Flexmail](https://app.flexmail.eu).

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
