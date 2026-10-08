---
title: Linking Render as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Render
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Render connector syncs your services, deploys, one-off jobs, service events, and managed databases into the PostHog Data warehouse, so you can analyze deploy frequency, job outcomes, and infrastructure changes alongside your product data.

## Prerequisites

You need a Render account with permission to create an API key. An API key grants access to every workspace your user belongs to.

## Adding a data source

<SourceSetupIntro />

When linking Render, you'll need:

- **API key** – create one under **Account settings → API keys** in the [Render Dashboard](https://dashboard.render.com/settings#api-keys).
- **Workspace ID** (optional) – if your user belongs to multiple workspaces and you only want to sync one, enter its workspace ID (starts with `tea-`). You can find it in your workspace settings, or by syncing the `owners` table first. Leave empty to sync every workspace the key can access.

## Sync modes

<SyncModes />

Deploys, jobs, and events are fetched per service, so syncs make one or more requests for each service in your workspace. Use incremental sync for these tables to keep ongoing syncs fast.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in your Render account settings, then reconnect.
- Render rate limits API requests per user. Syncs back off and retry automatically, but very large workspaces may sync slowly on the first run.

<TroubleshootingLink />
