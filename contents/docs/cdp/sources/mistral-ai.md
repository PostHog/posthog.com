---
title: Linking Mistral AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MistralAI
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Mistral AI connector syncs your [Mistral AI](https://mistral.ai) platform data – models, files, fine-tuning jobs, batch jobs, agents, conversations, and libraries – into PostHog, so you can analyze your AI platform activity alongside your product data.

## Prerequisites

You need a Mistral AI account with access to [La Plateforme](https://console.mistral.ai) and an API key.

## Adding a data source

<SourceSetupIntro />

When linking Mistral AI, you'll need:

- **API key** – create one in [La Plateforme](https://console.mistral.ai/api-keys).

## Sync modes

<SyncModes />

The `fine_tuning_jobs` and `batch_jobs` tables support incremental sync on their `created_at` timestamp, so each run only pulls newly created jobs. All other tables use full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a 401 error, your API key is invalid or has been revoked. Create a new key in [La Plateforme](https://console.mistral.ai/api-keys) and reconnect.
- If a table returns no rows, you likely have no records of that type yet – for example, `fine_tuning_jobs` is empty until you've started a fine-tuning job.

<TroubleshootingLink />
