---
title: Linking Windmill as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Windmill
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Windmill connector syncs your [Windmill](https://www.windmill.dev) workspace data – completed and queued jobs, scripts, flows, apps, schedules, resources, users, and audit logs – into PostHog, so you can analyze your workflow and job activity alongside your product data. It works with both Windmill Cloud and self-hosted instances.

## Prerequisites

You need a Windmill account and a **personal API token**, created under **User settings → Tokens**.

- For Windmill Cloud, your instance URL is `https://app.windmill.dev`.
- For self-hosted deployments, use your own instance URL.

Syncing the `audit_logs` table requires a workspace-admin token and is a Windmill Enterprise Edition feature.

## Adding a data source

<SourceSetupIntro />

When linking Windmill, you'll need:

- **Instance URL** – `https://app.windmill.dev` for Windmill Cloud, or your own instance URL for self-hosted.
- **Workspace ID** – the ID of the workspace you want to sync.
- **API token** – create a personal API token in your Windmill account under **User settings → Tokens**.

## Sync modes

<SyncModes />

The `completed_jobs` table supports incremental sync on its `created_at` / `started_at` timestamps, so each run only pulls newly completed jobs. All other tables use full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If validation fails, double-check the instance URL and workspace ID, and confirm the API token belongs to that workspace.
- If the `audit_logs` table is empty or fails, note that it requires a workspace-admin token and is a Windmill Enterprise Edition feature.

<TroubleshootingLink />
