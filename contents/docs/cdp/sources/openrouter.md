---
title: Linking OpenRouter as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OpenRouter
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[OpenRouter](https://openrouter.ai) is a unified API gateway for LLMs. This connector pulls your OpenRouter usage and account data – models, providers, activity, API keys, credits, organization members, and workspaces – into the PostHog Data Warehouse so you can analyze your LLM usage and spend alongside your product data.

## Prerequisites

An OpenRouter account with an API key. To sync your usage and account tables, you need a management API key.

## Adding a data source

<SourceSetupIntro />

You need an OpenRouter API key. Use a **management API key** – create one under [Settings → Management Keys](https://openrouter.ai/settings/keys) – so the activity, API keys, credits, organization members, and workspaces tables can sync. A regular inference key can only read the models and providers catalogs.

## Sync modes

<SyncModes />

The `activity` table supports incremental sync using its `date` field. The other OpenRouter tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authentication error, confirm the API key is still active in your OpenRouter settings.
- If only the `models` and `providers` tables sync and the account tables (`activity`, `api_keys`, `credits`, `organization_members`, `workspaces`) return no data, you're likely using a regular inference key. Switch to a management API key to sync those tables.

<TroubleshootingLink />
