---
title: Linking Promptwatch as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Promptwatch
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Promptwatch connector syncs your LLM monitoring data – prompts, responses, monitors, tags, topics, and personas – into PostHog, so you can analyze AI model performance alongside your product data.

## Prerequisites

- A [Promptwatch](https://promptwatch.com) account on the **Explore plan** or higher (required for API access).
- A read-only API key from **Settings > API Keys** in Promptwatch. Read-only keys are enough – PostHog only reads data.
- If you're using an **organization API key**, you also need the project ID for the project you want to sync.

## Adding a data source

<SourceSetupIntro />

You'll be asked for:

- **API key** (required) – a read-only API key from Promptwatch **Settings > API Keys**.
- **Project ID** (optional) – required only when using an organization API key. You can find it in your Promptwatch project settings.
- **Response start date** (required) – the earliest date to sync responses from, in `YYYY-MM-DD` format. Only the `responses` table uses this value.

## Sync modes

<SyncModes />

The `responses` table supports incremental sync using the `createdAt` field – each sync picks up new responses since the last run. All other tables (`prompts`, `monitors`, `tags`, `topics`, `personas`) use full refresh.

## Sync limits

Syncs count against your Promptwatch account's **hourly API request quota**. Each paginated table (`prompts` and `responses`) syncs up to **1,000 rows** per run (50 rows per page, 20 pages max).

- For a **full refresh** sync that hits the 1,000-row cap, the sync fails with an error. Use a smaller project or narrow the response start date.
- For an **incremental** `responses` sync, the sync stops at the cap and picks up where it left off on the next run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 error** – Promptwatch rejected your API key. Check the key in **Settings > API Keys** and make sure it hasn't been revoked.
- **403 error** – Promptwatch denied access. If you're using an organization API key, make sure you entered the correct project ID.
- **Hourly quota exceeded** – Promptwatch reached its hourly API request limit. Wait until the next UTC hour or upgrade your Promptwatch plan.
- **Row limit exceeded** – The table has more than 1,000 rows. Use a later response start date or a smaller project to reduce the row count.

<TroubleshootingLink />
