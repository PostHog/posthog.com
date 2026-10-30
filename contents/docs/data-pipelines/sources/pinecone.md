---
title: Linking Pinecone as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pinecone
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Pinecone connector syncs your vector database data – indexes, collections, backups, restore jobs, namespaces, assistants, and assistant files – into PostHog, so you can analyze your AI infrastructure alongside your product data.

> **Note:** Individual vectors and records are not synced. Fetching records would consume Pinecone read units on every sync, so the connector syncs metadata tables only.

## Prerequisites

You need a Pinecone account with access to the [Pinecone API](https://docs.pinecone.io/reference/api/introduction). You'll need an API key from your Pinecone project.

## Adding a data source

<SourceSetupIntro />

When linking Pinecone, you'll need:

- **API key** – found in your Pinecone console under your project settings.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
