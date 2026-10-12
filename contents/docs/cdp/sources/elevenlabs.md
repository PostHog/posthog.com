---
title: Linking ElevenLabs as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ElevenLabs
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The ElevenLabs connector syncs your AI audio data into the PostHog Data warehouse: speech generation history, conversational AI conversations, agents, tools, tool executions, triage tickets, voices, models, and workspace data. Use it to analyze generation volume, character costs, and agent call outcomes alongside your product data.

## Prerequisites

You need an ElevenLabs account with an API key. API keys are available on every plan.

## Adding a data source

<SourceSetupIntro />

When linking ElevenLabs, you'll need:

- **API key** – create one in your ElevenLabs account under [Profile → API keys](https://elevenlabs.io/app/settings/api-keys). If you restrict the key's permissions, grant read access to the endpoints you want to sync: **History**, **Conversational AI** (includes agents, conversations, tools, tool executions, and triage tickets), **Voices**, **Models**, **Workspace** (includes members and groups), and **User** (used to verify the key).

## Sync modes

<SyncModes />

The `history`, `conversations`, and `tool_executions` tables support incremental sync. The `agents`, `voices`, `models`, `triage_tickets`, `workspace_members`, `workspace_groups`, and `tools` tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your ElevenLabs API key may be invalid, revoked, or missing a permission for one of the synced endpoints. Check the key's permissions under Profile → API keys in ElevenLabs, then reconnect.

<TroubleshootingLink />
