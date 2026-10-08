---
title: Linking StreamElements as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: StreamElements
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The StreamElements connector syncs your channel's tips, activity feed events, loyalty points leaderboards, store items and redemptions, chatbot commands and timers, and channel details into the PostHog Data warehouse, so you can analyze your stream's community and revenue alongside your product data.

## Prerequisites

You need a StreamElements account. Any account can use the API, but the token you connect with only sees the channel it belongs to.

## Adding a data source

<SourceSetupIntro />

When linking StreamElements, you'll need:

- **JWT token** – in the StreamElements dashboard, click your avatar and open your account page, enable **Show secrets** under **Channels**, then copy the JWT token for your channel.

An OAuth2 access token also works in place of the JWT token, as long as it has the `channel:read`, `tips:read`, `activities:read`, `loyalty:read` and `store:read` scopes.

## Sync modes

<SyncModes />

The `tips` and `activities` tables support incremental sync on `createdAt`. Points leaderboards are snapshots of the current standings, so they are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a `401 Unauthorized` error, your token is invalid or expired. Copy a fresh JWT token from the StreamElements dashboard, then reconnect.
- If you see a `403 Forbidden` error, your OAuth2 token is missing a scope needed for one of the selected tables. Reconnect with the scopes listed above, or deselect the tables you don't need.

<TroubleshootingLink />
