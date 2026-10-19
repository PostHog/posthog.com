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

The OpenRouter connector syncs your LLM gateway data – usage rollups, API keys, credits, organization members, workspaces, end users, batches, and the models and providers catalogs – into the PostHog Data warehouse, so you can analyze your LLM spend and usage alongside your product data.

## Prerequisites

You need an OpenRouter account with permission to create an API key.

- A **management API key** is required to sync the activity, api_keys, credits, organization_members, workspaces, and end_users tables.
- A **regular inference key** is required to sync the batches table. Management keys cannot access batch data.
- A regular inference key can also sync the public models and providers catalogs.

> To sync all tables, connect two separate OpenRouter sources: one with a management key and one with a regular inference key.

## Adding a data source

<SourceSetupIntro />

When linking OpenRouter, you'll need:

- **API key** – create a management API key in your [OpenRouter settings](https://openrouter.ai/settings/keys) under **Settings → Management Keys**. A management key unlocks most tables (activity, api_keys, credits, organization_members, workspaces, end_users). To sync the batches table, connect a second source with a regular inference key.

## Sync modes

<SyncModes />

The `activity` table syncs incrementally by date, fetching daily usage rollups. OpenRouter retains only the last 30 completed UTC days, so both first and incremental syncs are limited to that window.

All other tables (`models`, `providers`, `api_keys`, `credits`, `organization_members`, `workspaces`, `end_users`, `batches`) sync as full refresh because the OpenRouter API doesn't support time-based filtering for these endpoints.

The `batches` table is off by default and requires a regular API key (not a management key). A batch's status, request counts, and usage keep changing after creation, so only full refresh is supported.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in your [OpenRouter settings](https://openrouter.ai/settings/keys), then reconnect.
- If you see a permissions error for activity, api_keys, credits, organization_members, workspaces, or end_users tables, your key is missing the management scope. Create a management API key under **Settings → Management Keys**, then reconnect.
- If you see a permissions error for the batches table, note that this endpoint requires a regular inference key. Management keys cannot access batch data. Connect a second OpenRouter source with a regular inference key to sync batches.

<TroubleshootingLink />
