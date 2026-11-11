---
title: Linking Mistral AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MistralAI
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Mistral AI connector syncs models, files, fine-tuning jobs, and batch inference jobs into the PostHog data warehouse. Beta tables for agents, conversations and their entries, libraries and their documents, and observability traces and spans are also available. Use it to analyze fine-tuning progress, batch job throughput, and asset history alongside the rest of your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Mistral AI API key to sync your Mistral AI platform data.

You can create an API key in [La Plateforme](https://console.mistral.ai/api-keys).

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

Fine-tuning jobs and batch jobs support incremental syncing via their server-side `created_after` filter. The beta traces and spans tables support incremental syncing on `start_time`. Models, files, and the beta agents, conversations, conversation entries, libraries, and library documents tables have no creation-time filter in the API, so they sync as a full refresh each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- The beta tables (agents, conversations, conversation entries, libraries, library documents, traces, and spans) are off by default because Mistral marks those endpoint groups as beta and may change their shape. Enable them only if you need them.

<TroubleshootingLink />
