---
title: Linking Cohere as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cohere
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[Cohere](https://cohere.com) is an enterprise LLM platform. This connector pulls your Cohere assets and job history – datasets, connectors, models, fine-tuned models, and embed jobs – into the PostHog data warehouse so you can analyze your AI workloads alongside your product data.

## Prerequisites

A Cohere account with an API key.

## Adding a data source

<SourceSetupIntro />

You need a Cohere API key. Create one in your [Cohere dashboard](https://dashboard.cohere.com/api-keys), then paste it into the connection form. Prefer a production key: trial keys are capped at 1,000 API calls per month, which a recurring sync can exhaust.

## Sync modes

<SyncModes />

All Cohere tables are full refresh only. Incremental sync is not available for this connector.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authentication error, confirm the API key is still active in your Cohere dashboard.
- If a recurring sync starts failing with a rate-limit or quota error, check whether you're using a trial key – its 1,000 calls per month can be exhausted by regular syncs. Switch to a production key to resolve this.

<TroubleshootingLink />
