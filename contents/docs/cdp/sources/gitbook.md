---
title: Linking GitBook as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GitBook
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The GitBook connector syncs your documentation workspace into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a GitBook account and a personal access token. The token inherits your account permissions and grants read access to your organizations, spaces, collections, sites, members, teams, change requests, and comments.

## Adding a data source

<SourceSetupIntro />

When linking GitBook, you'll need:

- **API token** – create a personal access token under **Account settings → Developer** in [GitBook](https://app.gitbook.com/account/developer).

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
