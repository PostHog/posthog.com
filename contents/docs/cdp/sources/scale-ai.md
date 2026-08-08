---
title: Linking Scale AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ScaleAI
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Scale AI connector syncs your [Scale](https://scale.com) data labeling data – tasks, batches, and projects – into PostHog, so you can analyze annotation throughput, review quality, and labeling cost alongside your product data.

## Prerequisites

You need a [Scale](https://dashboard.scale.com) account with API access. API keys are created in the Scale dashboard under **Settings → API Keys**, and only account **Managers** and **Admins** can access them.

Use a **live-mode** key. Test-mode keys have fully isolated data, so a test key will not sync your production tasks.

## Adding a data source

<SourceSetupIntro />

When linking Scale AI, you'll need:

- **API key** – create one under **Settings → API Keys** in your [Scale dashboard](https://dashboard.scale.com). Use a live-mode key (`live_...`). Scale authenticates the API key as the HTTP Basic auth username, so no other credential is required.

## Sync modes

<SyncModes />

- **Tasks** support incremental sync on `updated_at` or `created_at`. Because Scale exposes a server-side `updated_after` filter for tasks, an incremental run picks up both newly created tasks and status or review changes to existing ones.
- **Batches** support incremental sync on `created_at` only. The batch list endpoint filters solely on creation time, so an incremental run catches newly created batches but not status changes to existing ones. Run a full refresh to re-read batch status.
- **Projects** are a small, slowly-changing catalog with no server-side time filter, so they always sync via full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a **401 Unauthorized** error, the API key is invalid or has been revoked. Create a new live-mode key in the Scale dashboard, then reconnect.
- If you see a **403 Forbidden** error, the key doesn't have permission to read the requested data. Check the key's permissions in the Scale dashboard, then reconnect.
- If a table syncs no rows, confirm you're using a live-mode key – test-mode keys have separate, isolated data.

<TroubleshootingLink />
