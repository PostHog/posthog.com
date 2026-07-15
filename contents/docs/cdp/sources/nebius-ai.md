---
title: Linking Nebius AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: NebiusAI
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[Nebius AI Studio](https://studio.nebius.com) (Token Factory) is an AI inference platform. This connector pulls your Nebius inference platform metadata – models, files, batches, and fine-tuning jobs – into the PostHog data warehouse so you can analyze your AI workloads alongside your product data.

## Prerequisites

A Nebius AI Studio account with an API key that has read access.

## Adding a data source

<SourceSetupIntro />

You need a Nebius AI Studio API key. Create one in the [Nebius AI Studio console](https://studio.nebius.com/settings/api-keys), then paste it into the connection form. A key with read access is enough to sync models, files, batches, and fine-tuning jobs.

## Sync modes

<SyncModes />

All Nebius AI tables are full refresh only. Incremental sync is not available for this connector.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the connection fails with an authentication error, confirm the API key is still active in the Nebius AI Studio console and has read access to your inference platform resources.

<TroubleshootingLink />
