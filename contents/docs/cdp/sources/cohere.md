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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Cohere connector syncs your LLM platform assets – datasets, connectors, models, fine-tuned models, and embed jobs – into the PostHog Data warehouse, so you can analyze your AI infrastructure alongside your product data.

## Prerequisites

You need a Cohere account with API access so you can create an API key.

## Adding a data source

<SourceSetupIntro />

When linking Cohere, you'll need:

- **API key** – find or create your key in the [Cohere dashboard](https://dashboard.cohere.com/api-keys).

## Sync modes

<SyncModes />

This source is full refresh only. Cohere does not expose reliable server-side timestamp filters across its endpoints, and the synced entities are small and mutable (statuses and timestamps change in place), so full refresh ensures no updates are missed.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Cohere API key may be invalid or revoked. Create a new key in the [Cohere dashboard](https://dashboard.cohere.com/api-keys), then reconnect.

<TroubleshootingLink />
