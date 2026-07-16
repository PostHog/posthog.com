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

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

Sync your LangSmith LLM observability data – traces and runs, tracing projects, datasets, examples, feedback, and annotation queues – into the PostHog data warehouse, so you can join LLM behavior and cost with your product analytics.

## Prerequisites

You need a LangSmith account with access to the workspace you want to sync. Any member can create a personal access token; workspace-scoped service keys need workspace admin access.

## Adding a data source

<SourceSetupIntro />

You need a LangSmith API key. Create one in your [LangSmith settings](https://smith.langchain.com/settings) under **API Keys**.

Leave the **Host** field blank if your account is on the US cloud (`api.smith.langchain.com`). Set it to `https://eu.api.smith.langchain.com` for EU-region accounts, or to your own host for self-hosted LangSmith deployments.

## Sync modes

<SyncModes />

The `runs` table can be large. Use incremental sync for it: runs are filtered server-side by `start_time`, and the first incremental sync only pulls the last 365 days. Each incremental sync also re-reads a short trailing window so runs that finish (or receive feedback) after they were first synced get updated.

LangSmith rate-limits its run query API, so very large workspaces may see the initial `runs` backfill take a while.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the source fails to connect, check that the API key is valid and that the **Host** field matches your LangSmith region – an EU-region key against the default US host returns a `401` error.

<TroubleshootingLink />
