---
title: Linking Expo (EAS) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Expo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Expo connector syncs EAS builds and store submissions for one project into the PostHog data warehouse, so you can track build duration, queue time, and failure reasons alongside your product data.

## Prerequisites

An Expo account with access to the project you want to sync, and an access token. A robot user's token works too, and is the better choice for a shared integration.

## Adding a data source

<SourceSetupIntro />

Create a personal access token at [expo.dev under Access tokens](https://expo.dev/settings/access-tokens).

You'll be asked for:

- **Access token**: a personal or robot access token.
- **Project ID**: run `eas project:info` to see it, or copy it from the project page on expo.dev.

One source syncs one project, so add a source per project you want to track.

## Sync modes

<SyncModes />

Both tables are full refresh. EAS pages these collections by offset and offers no date filter, so each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the access token is wrong or has been revoked. Create a new one at expo.dev under Access tokens, then reconnect the source.
- If the connection reports that the project cannot be read, check the project ID and that the token belongs to the account that owns the project.

<TroubleshootingLink />
