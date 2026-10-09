---
title: Linking Langfuse as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Langfuse
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Langfuse connector syncs your LLM observability data – observations, evaluation scores, prompts, models, and datasets – into PostHog, so you can analyze your AI application's behavior, cost, and quality alongside your product data.
It works with Langfuse Cloud (all regions) and self-hosted Langfuse instances.

> **Note:** New Langfuse sources use API version v3, which doesn't include the `traces` and `sessions` tables. Trace and session data is available through the `observations` table, which includes `traceId`, `sessionId`, `userId`, `traceName`, `tags`, and `release` fields. Existing sources on v1/v2 that sync these tables continue to work until November 16, 2026. See [API versions](#api-versions) for details.

## Prerequisites

You need a Langfuse project and its API key pair.
API keys are project-scoped and available on all Langfuse plans.
Self-hosted users also need a publicly reachable Langfuse host.

## Adding a data source

<SourceSetupIntro />

When linking Langfuse, you'll need:

- **Public key** and **Secret key** – find both in the Langfuse dashboard under **Project settings > API keys**.
- **Host** – set it to your Langfuse region: `https://cloud.langfuse.com` (EU, the default), `https://us.cloud.langfuse.com` (US), `https://jp.cloud.langfuse.com` (JP), or `https://hipaa.cloud.langfuse.com` (HIPAA). Self-hosted users should set it to their own Langfuse host. Leave it blank to use Langfuse Cloud EU.

## Sync modes

<SyncModes />

Observations, scores, and prompts support incremental sync using Langfuse's creation/start-time filters.
Each incremental run re-reads a trailing one-hour window to pick up late-arriving updates.
Prompts also sync incrementally, using the last-updated filter.
Datasets, dataset items, and models are full refresh only.

On legacy v1/v2 sources, `traces` and `sessions` also support incremental sync.

## API versions

New Langfuse sources use API version **v3** by default.

- **v3** syncs observations, scores, prompts, datasets, dataset items, models, score configs, annotation queues, and annotation queue items. It doesn't include the `traces` or `sessions` tables.
- **v1** and **v2** are deprecated and sunset on **November 16, 2026**. After that date, Langfuse Cloud stops serving the `traces` and `sessions` endpoints, and syncs for those tables fail.

Trace and session data is available on v3 through the `observations` table, which includes `traceId`, `sessionId`, `userId`, `traceName`, `tags`, and `release` fields. You can reconstruct trace- or session-level views by grouping observation rows by `traceId` or `sessionId` in a [SQL insight](/docs/product-analytics/sql).

### Migrating from v1/v2

If your source syncs `traces` or `sessions`, you need to migrate before November 16, 2026:

1. Make sure the `observations` table is syncing.
2. Update queries that use the `traces` or `sessions` table to use `observations` instead, grouping by `traceId` or `sessionId`.
3. Contact support to repin your source to v3. On the next sync, the `traces` and `sessions` schemas show as disabled and existing warehouse tables keep their data.

Sources on v1/v2 that don't sync `traces` or `sessions` are automatically migrated to v3.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an invalid key error, confirm the public/secret key pair in **Project settings > API keys** and make sure the host matches your project's region – keys only work against the region they were created in.
- Langfuse rate limits its read APIs by plan (as low as 15 requests/minute on the Hobby plan). The connector backs off and retries automatically, but large first syncs on lower plans can take a while.
- If the host is not allowed, use a publicly reachable host.

<TroubleshootingLink />
