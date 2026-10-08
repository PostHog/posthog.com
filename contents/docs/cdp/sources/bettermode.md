---
title: Linking Bettermode as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Bettermode
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Bettermode (formerly Tribe) connector syncs your community data into the PostHog Data Warehouse, so you can join community activity (members, spaces, posts, replies, and moderation items) with your product, CRM, and support data.

## Prerequisites

You need a Bettermode plan with API access, and permission to create an app in the [Bettermode developer portal](https://developers.bettermode.com/). The app must be **published and installed on your community** before PostHog can connect.

## Adding a data source

<SourceSetupIntro />

When linking Bettermode, you'll need:

- **Region** – where your community is hosted. Most communities use the US region; pick EU if your community is hosted in Bettermode's EU (eu-central-1) region.
- **Client ID** and **Client secret** – from your app in the Bettermode developer portal. Create an app, publish it, and install it on your community.
- **Network ID** – your community's unique ID, shown for your community in the developer portal.

PostHog exchanges the client ID and secret for a short-lived app access token, and refreshes it automatically on every sync.

## Sync modes

<SyncModes />

The **posts** table supports incremental syncs on `createdAt`, `publishedAt`, or `updatedAt`. Other tables sync as full refreshes: Bettermode's API doesn't expose server-side timestamp filters for them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Reaction data is included on each post and reply row: `reactionsCount` holds the total, and `reactions` holds a per-reaction summary of `{reaction, count}` objects.

The **replies** table fetches the direct replies of every post that has replies, one post at a time, so its sync time grows with the size of your community.

## Troubleshooting

- **App not found** – the client ID or secret is wrong. Copy both again from your app in the developer portal.
- **Forbidden / access errors** – the app isn't published and installed on the community, or the network ID doesn't match the community the app is installed on.
- **Slow syncs** – Bettermode rate-limits API traffic per 10-second window and per day. PostHog honors these limits and retries automatically, but very large communities may take a while to backfill, especially the replies table.

<TroubleshootingLink />
