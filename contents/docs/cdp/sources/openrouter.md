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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The OpenRouter connector syncs your LLM gateway data – usage rollups, API keys, credits, organization members, workspaces, and the models and providers catalogs – into the PostHog Data warehouse, so you can analyze your LLM spend and usage alongside your product data.

## Prerequisites

You need an OpenRouter account with permission to create an API key.

- A **management API key** is required to sync the activity, api_keys, credits, organization_members, and workspaces tables.
- A regular inference key can only sync the public models and providers catalogs.

## Adding a data source

<SourceSetupIntro />

When linking OpenRouter, you'll need:

- **API key** – create a management API key in your [OpenRouter settings](https://openrouter.ai/settings/keys) under **Settings → Management Keys**. A management key unlocks all tables; an inference key can only access the public catalogs.

## Sync modes

<SyncModes />

The `activity` table syncs incrementally by date, fetching daily usage rollups. OpenRouter retains only the last 30 completed UTC days, so both first and incremental syncs are limited to that window.

All other tables (`models`, `providers`, `api_keys`, `credits`, `organization_members`, `workspaces`) sync as full refresh because the OpenRouter API doesn't support time-based filtering for these endpoints.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in your [OpenRouter settings](https://openrouter.ai/settings/keys), then reconnect.
- If you see a permissions error for activity, api_keys, credits, organization_members, or workspaces tables, your key is missing the management scope. Create a management API key under **Settings → Management Keys**, then reconnect.

<TroubleshootingLink />
