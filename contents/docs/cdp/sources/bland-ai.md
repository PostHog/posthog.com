---
title: Linking Bland AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BlandAI
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Bland AI connector syncs your AI phone call data – calls, per-call transcripts, event logs, conversational pathways, web agents, and eval results – into the PostHog Data warehouse, so you can analyze your voice agents' performance alongside your product data.

## Prerequisites

You need a Bland AI account with access to an API key. The key grants read access to all calls, transcripts, and pathways in your account.

## Adding a data source

<SourceSetupIntro />

When linking Bland AI, you'll need:

- **API key** – find it in the [Bland dashboard](https://app.bland.ai/) under **Settings → API keys**.

## Sync modes

<SyncModes />

The `call_transcripts` and `call_events` tables fetch data for each call individually, so they make one extra API request per call. Both are disabled by default – enable them only if you need utterance-level transcript data or per-call event streams.

The `eval_runs` and `eval_call_results` tables are also disabled by default because Evals must be enabled on your Bland AI organization. Enable these tables only if your organization uses Bland AI Evals.

Incremental syncs on the call tables track the call creation time. Post-call analysis added to older calls after a sync won't be picked up incrementally – run a full refresh if you need to re-sync updated analysis fields.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in the Bland dashboard, then reconnect.

<TroubleshootingLink />
