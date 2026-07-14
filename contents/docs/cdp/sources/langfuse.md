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

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Langfuse connector syncs your LLM observability data – traces, observations, evaluation scores, sessions, prompts, models, and datasets – into PostHog, so you can analyze your AI application's behavior, cost, and quality alongside your product data.
It works with Langfuse Cloud (all regions) and self-hosted Langfuse instances.

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

Traces, observations, scores, and sessions support incremental sync using Langfuse's creation/start-time filters.
Each incremental run re-reads a trailing one-hour window to pick up late-arriving updates, such as traces whose aggregated metrics change as observations arrive.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an invalid key error, confirm the public/secret key pair in **Project settings > API keys** and make sure the host matches your project's region – keys only work against the region they were created in.
- Langfuse rate limits its read APIs by plan (as low as 15 requests/minute on the Hobby plan). The connector backs off and retries automatically, but large first syncs on lower plans can take a while.
- If the host is not allowed, use a publicly reachable host.

<TroubleshootingLink />
