---
title: Linking Oura as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Oura
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Oura connector syncs your Oura Ring health data into PostHog, so you can analyze your health and activity metrics alongside your product data.

## Prerequisites

You need an Oura account with access to create a personal access token.

## Adding a data source

<SourceSetupIntro />

When linking Oura, you'll need:

- **Personal access token** – create one in the [Oura developer portal](https://cloud.ouraring.com/personal-access-tokens). Grant the scopes needed for the data you want to sync.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your access token may be invalid or revoked. Create a new personal access token in the Oura developer portal, then reconnect.
- If you see a permission error, your token may be missing the scopes needed to sync this data. Grant the required scopes, then reconnect.

<TroubleshootingLink />
