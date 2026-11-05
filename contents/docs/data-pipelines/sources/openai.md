---
title: Linking OpenAI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OpenAI
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The OpenAI connector syncs your organization's API usage, spend, and admin data into the PostHog Data Warehouse, so you can analyze your AI costs alongside your product data. With an optional project API key, you can also sync models, stored chat completions, Batch API jobs, and evaluation results.

## Prerequisites

You need an OpenAI organization and an Admin API key. Only organization owners can create Admin API keys, and a regular project API key can't read organization usage or costs.

To sync models, chat completions, batches, and evals tables, you also need a **project API key**. OpenAI doesn't accept Admin API keys for these endpoints. The project API key only includes data from its project, and a restricted key needs read access to each table you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking OpenAI, you'll need:

- **Admin API key** – create one in your [OpenAI organization settings](https://platform.openai.com/settings/organization/admin-keys) by clicking **Create admin key**. The key starts with `sk-admin`.
- **Project API key (optional)** – create one in your [OpenAI API keys dashboard](https://platform.openai.com/api-keys). The key starts with `sk-proj-`. Enables syncing models, chat completions, batches, and evaluation data. Only includes data from the key's project.

## Sync modes

<SyncModes />

The usage and costs tables sync incrementally on `start_time`, and audit logs on `effective_at`. Each incremental sync re-reads the trailing day of usage and cost buckets, since OpenAI keeps restating a day's bucket as late usage lands; the overlap is deduplicated automatically.

Usage and cost rows are daily buckets broken down by project, API key, model, and the other dimensions OpenAI supports for each endpoint. The `id` column is a synthesized key derived from the bucket start and those dimensions.

The models, chat completions, batches, evals, eval runs, and eval run output items tables use full refresh sync because OpenAI's API doesn't support server-side time filtering for these endpoints.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized (Admin API key)** – your Admin API key is invalid or has been revoked. Create a new one and reconnect.
- **403 Forbidden (Admin API key)** – your key isn't an Admin API key. Ask an organization owner to create one in the [organization settings](https://platform.openai.com/settings/organization/admin-keys).
- **401 Unauthorized (Project API key)** – your project API key is invalid or has been revoked. Create a new one in your [API keys dashboard](https://platform.openai.com/api-keys).
- **403 Forbidden (Project API key)** – your project API key can't read this table. Give the key read access in your OpenAI project settings, or stop syncing that table.

<TroubleshootingLink />
