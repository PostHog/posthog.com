---
title: Linking Vapi as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Vapi
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Vapi connector syncs your AI voice agent data into PostHog, including call transcripts, analysis, cost breakdowns, assistants, phone numbers, and more. Use it to join your Vapi call data with product analytics to understand how voice interactions impact user behavior.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Vapi.
3. You need an API key from Vapi. In your [Vapi dashboard](https://vapi.ai), go to **Organization Settings** and copy your **Private API Key**.
4. Back in PostHog, paste the API key in the **API key** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Vapi data in PostHog.

## Available tables

| Table           | Description                                                                                      | Sync method                                 |
| --------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `calls`         | Phone and web calls with transcripts, analysis, ended reasons, and per-component cost breakdowns | Incremental (by `createdAt` or `updatedAt`) |
| `assistants`    | Configured voice assistants with transcriber, LLM, and voice settings                            | Full refresh                                |
| `phone_numbers` | Phone numbers attached to your org, provisioned through Vapi or brought from other providers     | Full refresh                                |
| `squads`        | Groups of multiple assistants that can transfer calls between them                               | Full refresh                                |
| `tools`         | Tools that assistants can invoke during calls (API requests, transfers, etc.)                    | Full refresh                                |
| `files`         | Files uploaded to Vapi, typically used as knowledge-base sources for assistants                  | Full refresh                                |
| `chats`         | Text-based chat interactions with assistants                                                     | Incremental (by `createdAt`)                |
| `sessions`      | Sessions that group related chats and calls into one conversation context                        | Incremental (by `createdAt`)                |
| `campaigns`     | Outbound call campaigns with live progress counters                                              | Full refresh                                |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync behavior

The `calls` table supports incremental sync by either `createdAt` (default) or `updatedAt`. Using `updatedAt` re-syncs calls whose analysis or artifacts were attached after the call ended. The `chats` and `sessions` tables only support `createdAt` incremental sync since the Vapi API can't sort these by `updatedAt`.

Configuration tables like `assistants`, `squads`, `tools`, and `campaigns` use full refresh because they mutate in place – a `createdAt` watermark would miss updates to existing records.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
