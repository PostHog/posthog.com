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

The Decagon connector syncs your [Decagon](https://decagon.ai/) AI agent data into the PostHog Data warehouse. It covers the conversations between your users and your agents – every message, customer satisfaction (CSAT) rating, tag, and piece of metadata – plus the Agent Assist actions your human agents take, the knowledge base articles the AI answers with and how often each one is used, your tag taxonomy, admin logs, team members, and Watchtower QA jobs. Use it to analyze support quality alongside your product data.

## Prerequisites

You need a Decagon account with API access and a Decagon API key.

## Adding a data source

<SourceSetupIntro />

When linking Decagon, you'll need:

- **API key** – find or generate one on the **Developer** page of your Decagon dashboard.

## Sync modes

<SyncModes />

`conversations` and `admin_logs` sync incrementally. A conversation reappears in Decagon's export whenever it receives new messages, so each sync picks up the latest version of every conversation it has seen change. `agent_assist_actions` is an append-only event stream, one row per action.

The remaining tables sync as a full refresh. `articles`, `tags`, `team_members`, and `watchtower_jobs` are small dimension tables that resolve the ids other tables reference. `article_usage` is a point-in-time snapshot that PostHog replaces on every sync, so it holds current usage counts rather than a history of them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

Decagon rate limits its API to 1 request per second, and each request returns up to 100 conversations, so accounts with a large conversation history can take a while to complete a sync.

<TroubleshootingLink />
