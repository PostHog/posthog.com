---
title: Linking Groq as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Groq
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[Groq](https://groq.com) provides fast LLM inference through an OpenAI-compatible API. This connector pulls your Groq batch jobs, uploaded files, and model catalog into the PostHog Data warehouse, so you can analyze your batch inference operations alongside the rest of your data.

## Prerequisites

- A Groq account.
- A Groq API key, which you can create in the [Groq console](https://console.groq.com/keys).

Groq exposes no usage or spend API, so this source covers batch-job and file bookkeeping plus the model catalog rather than token or cost metrics.

## Adding a data source

<SourceSetupIntro />

When linking Groq, you'll need:

- **API key** – create one under [API Keys](https://console.groq.com/keys) in the Groq console. It starts with `gsk_`.

## Sync modes

<SyncModes />

Groq exposes no server-side timestamp filter on any list endpoint, so every table syncs with full refresh. Batch inputs and outputs expire upstream after about 30 days, so schedule frequent syncs if you want to retain a longer history in the warehouse.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in the [Groq console](https://console.groq.com/keys), then reconnect.
- If a connection validates but a table is empty, confirm your organization has run batch jobs or uploaded files – usage and spend data isn't available through Groq's public API and can't be synced.

<TroubleshootingLink />
