---
title: Linking Vimeo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Vimeo
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Vimeo connector syncs your videos, folders, and showcases into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

You need a Vimeo account and a Vimeo developer app so you can generate an access token.

## Adding a data source

<SourceSetupIntro />

When linking Vimeo, you'll need an **Access token**. To create one:

1. Open your app at [Vimeo Developers](https://developer.vimeo.com/apps).
2. Under **Generate an access token**, select **Authenticated (you)**.
3. Enable `public` and `private` scopes to read your videos, folders, and showcases.
4. Generate the token and paste it into PostHog.

> **Note:** Folders require the `private` scope. Without it, only videos and showcases are accessible.

## Sync modes

<SyncModes />

All Vimeo tables are full refresh only, since the Vimeo API has no server-side time filter for incremental syncing.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your access token is invalid or has been revoked. Generate a new authenticated token for your account at [Vimeo Developers](https://developer.vimeo.com/apps), then reconnect.
- If you get a permission error, your access token is missing the required scopes. Enable `public` and `private` scopes on your token, then reconnect.

<TroubleshootingLink />
