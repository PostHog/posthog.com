---
title: Linking Retell AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: RetellAI
---

The Retell AI connector syncs your AI voice agent data into PostHog, including calls, chats, agents, contacts, test case definitions, batch tests, and test runs. Use it to join your Retell AI call data with product analytics to understand how voice interactions impact user behavior.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Retell AI.
3. You need an API key from Retell AI. In your [Retell AI dashboard](https://dashboard.retellai.com), go to **API Keys** and create a new key or copy an existing one.
4. Back in PostHog, paste the API key in the **API key** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Retell AI data in PostHog.

## Available tables

| Table                   | Description                                                                                                        | Sync method                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `calls`                 | Voice call records with status, analysis, latency, and costs                                                       | Incremental (by `start_timestamp`) |
| `agents`                | Unique voice and chat agents with names, channels, modification times, and tags                                    | Full refresh                       |
| `chats`                 | Chat records with status, timing, analysis, and costs                                                              | Incremental (by `start_timestamp`) |
| `phone_numbers`         | Phone numbers with telephony settings and inbound and outbound agent bindings                                      | Full refresh                       |
| `voices`                | Available voices with providers and voice characteristics                                                          | Full refresh                       |
| `agent_versions`        | Stored versions of every voice and chat agent, with publish state and version lineage                              | Full refresh                       |
| `test_case_definitions` | Simulation test case definitions for every Retell LLM and conversation flow, with prompts, metrics, and tool mocks | Full refresh                       |
| `contacts`              | Contacts that Retell agents call and text, with CRM IDs, tags, custom fields, and conversation counts              | Full refresh                       |
| `batch_tests`           | Batch test jobs for every version of every Retell LLM and conversation flow, with pass, fail, and error counts     | Full refresh                       |
| `test_runs`             | Individual test case runs of every batch test, with results, explanations, and transcript snapshots                | Full refresh                       |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync behavior

The `calls` and `chats` tables support incremental sync by `start_timestamp`. Each sync fetches only records with a `start_timestamp` after the last sync.

Configuration and evaluation tables like `agents`, `phone_numbers`, `voices`, `agent_versions`, `test_case_definitions`, `contacts`, `batch_tests`, and `test_runs` use full refresh because they don't support time-based filtering in the Retell API.

For `batch_tests`, the connector walks every version of every Retell LLM and conversation flow to fetch test results for all engine versions, not just the latest. The `test_runs` table then fetches individual test runs for each batch test.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
