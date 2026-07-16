---
title: Linking dbt as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Dbt
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The dbt connector syncs metadata from the dbt platform (dbt Cloud) into PostHog – accounts, projects, environments, job definitions, users, and the full job run history – so you can analyze pipeline reliability, run durations, and failure rates alongside your product data.

## Prerequisites

You need a dbt platform account and an API token:

- A **service account token** (recommended) – available on Team and Enterprise plans under **Account settings** > **API tokens** > **Service tokens**. Read-only access to the resources you want to sync is enough.
- A **personal access token** also works, under **Account settings** > **API tokens** > **Personal tokens**.

Syncing the `users` table requires a token with user read permissions, which many read-only tokens lack. It's deselected by default.

## Adding a data source

<SourceSetupIntro />

When linking dbt, you'll need:

- **Account ID** – the number after `/deploy/` in your dbt URL.
- **API token** – a service account token or personal access token.
- **Region** – where your dbt account is hosted: US (`cloud.getdbt.com`), EMEA (`emea.dbt.com`), or APAC (`au.dbt.com`).
- **Custom base URL** (optional) – for cell-based or single-tenant deployments (for example `https://ab123.us1.dbt.com`). When set, it overrides the region.

## Sync modes

<SyncModes />

The `runs` table supports incremental sync on `created_at`: each sync fetches runs newest-first and stops once it reaches already-synced rows, with a 24 hour overlap so recently created runs pick up their final status. The other tables are small and sync as a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
