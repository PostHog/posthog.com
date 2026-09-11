---
title: Linking Vellum as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Vellum
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Vellum connector syncs your [Vellum](https://www.vellum.ai) data – workflow and prompt deployments, document indexes, documents, and workflow execution history – into PostHog, so you can analyze your LLM application's deployments and execution activity alongside your product data.

## Prerequisites

You need a [Vellum](https://app.vellum.ai) account with access to API keys. Create a key in your Vellum [workspace settings](https://app.vellum.ai/api-keys).

Vellum API keys are **environment-scoped** (Development, Staging, or Production), so one key syncs one environment. To sync more than one environment, add a separate source for each with that environment's key.

## Adding a data source

<SourceSetupIntro />

When linking Vellum, you'll need:

- **API key** – create one in your Vellum [workspace settings](https://app.vellum.ai/api-keys). The key is scoped to a single environment.

## Sync modes

<SyncModes />

All Vellum tables sync via **full refresh**. Vellum's list endpoints expose no server-side timestamp filter, so there's no reliable cursor for incremental sync, and each sync reloads the whole table (merge-deduplicating on the primary key).

The **workflow execution events** table is off by default. It fans out one request per workflow deployment to pull per-execution history, which multiplies API calls by the number of deployments, so enable it only when you need that data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a **401 Unauthorized** or **403 Forbidden** error, the API key is invalid, revoked, or missing the permissions needed to sync this data. Create a new key in your Vellum workspace settings, then reconnect.
- If a table is missing rows you expect, check that the API key is scoped to the correct environment (Development, Staging, or Production).

<TroubleshootingLink />
