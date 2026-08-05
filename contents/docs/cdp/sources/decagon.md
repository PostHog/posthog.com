---
title: Linking Decagon as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Decagon
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Decagon connector syncs conversations between your users and your [Decagon](https://decagon.ai/) AI agents into the PostHog Data warehouse, including every message, customer satisfaction (CSAT) ratings, tags, and metadata. Use it to analyze support quality alongside your product data.

## Prerequisites

You need a Decagon account with API access and a Decagon API key.

## Adding a data source

<SourceSetupIntro />

When linking Decagon, you'll need:

- **API key** – find or generate one on the **Developer** page of your Decagon dashboard.

## Sync modes

<SyncModes />

The conversations table syncs as a full refresh. Decagon's export returns conversations oldest first, and a conversation reappears in the export whenever it receives new messages, so each sync picks up the latest version of every conversation.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

Decagon rate limits its API to 1 request per second, and each request returns up to 100 conversations, so accounts with a large conversation history can take a while to complete a sync.

<TroubleshootingLink />
