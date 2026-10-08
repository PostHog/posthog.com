---
title: Linking Aha! Ideas as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AhaIdeas
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Aha! Ideas connector syncs your ideas portal data — ideas, votes, comments, submitters, organizations, themes, and portals — from [Aha!](https://www.aha.io/) into PostHog's data warehouse. Once synced, you can query and join this data alongside your product analytics, revenue data, and other warehouse sources.

## Prerequisites

You need an Aha! account with permission to create API keys. The key inherits your account permissions, so it can only sync data you can see.

## Adding a data source

<SourceSetupIntro />

When linking Aha! Ideas, you'll need:

- **Account domain** – your Aha! subdomain, for example `yourcompany` (from `yourcompany.aha.io`). You can enter either the full URL or the subdomain alone.
- **API key** – create one in your Aha! account under **Settings → Personal → Developer → API keys**.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Create a new key under **Settings → Personal → Developer → API keys** in your Aha! account, then reconnect.
- If you see a permission error, check that the Aha! account tied to the API key has access to the data you're trying to sync, then reconnect. The key can only access data your own account can see.

<TroubleshootingLink />
