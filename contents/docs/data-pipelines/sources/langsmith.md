---
title: Linking LangSmith as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LangSmith
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

Sync your LangSmith LLM observability data – traces and runs, tracing projects, datasets, examples, feedback, annotation queues, conversation threads, workspaces, and annotation queue runs – into the PostHog data warehouse, so you can join LLM behavior and cost with your product analytics.

## Prerequisites

You need a LangSmith account with access to the workspace you want to sync. Any member can create a personal access token; workspace-scoped service keys need workspace admin access.

## Adding a data source

<SourceSetupIntro />

You need a LangSmith API key. Create one in your [LangSmith settings](https://smith.langchain.com/settings) under **API Keys**.

Leave the **Host** field blank if your account is on the US cloud (`api.smith.langchain.com`). Set it to `https://eu.api.smith.langchain.com` for EU-region accounts, or to your own host for self-hosted LangSmith deployments.

## Sync modes

<SyncModes />

The `runs` and `feedback` tables support incremental sync using `start_time` and `created_at`, respectively. The first incremental sync pulls the last 365 days. Later incremental syncs continue from the last synced timestamp and re-read a trailing hour to pick up recent changes.

The `threads` table uses full refresh only. Each sync replaces the table with conversation threads and statistics over traces that started in the last 365 days. This is a rolling window: a thread with no traces in that window drops out on the next refresh. The other tables use full refresh without this fixed window.

LangSmith rate-limits its run query API, so very large workspaces may see the initial `runs` backfill take a while.

## History and retention

LangSmith data is imported into warehouse tables. PostHog's [events retention periods](/docs/data/events-retention) do not apply to these imports. The 365-day initial lookback for incremental `runs` and `feedback` syncs does not expire imported rows when they become older than 365 days.

PostHog can only import data that LangSmith still makes available through its API. [LangSmith's own retention settings](https://docs.langchain.com/langsmith/data-purging-compliance) can therefore limit the history available to sync. A full refresh replaces the table with what the API returns, so previously imported rows can disappear if LangSmith no longer returns them. Insights that query these tables reflect the data currently in them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the source fails to connect, check that the API key is valid and that the **Host** field matches your LangSmith region – an EU-region key against the default US host returns a `401` error.

<TroubleshootingLink />
