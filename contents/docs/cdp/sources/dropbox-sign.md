---
title: Linking Dropbox Sign as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DropboxSign
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Dropbox Sign connector syncs your Dropbox Sign e-signature data into PostHog, so you can analyze your signature requests and documents alongside your product data.

## Prerequisites

You need a Dropbox Sign account with access to create an API key.

## Adding a data source

<SourceSetupIntro />

When linking Dropbox Sign, you'll need:

- **API key** – create one in your [Dropbox Sign API settings](https://app.hellosign.com/home/myAccount#api). The key is used with HTTP Basic authentication (the key as the username, with a blank password).

## Sync modes

<SyncModes />

Dropbox Sign exposes no server-side timestamp cursor, so this source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Create a new API key in your Dropbox Sign API settings, then reconnect.
- If you see a permission error, check the key's permissions and your plan, then reconnect.

<TroubleshootingLink />
