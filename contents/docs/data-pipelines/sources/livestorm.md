---
title: Linking Livestorm as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Livestorm
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Livestorm connector syncs your webinar and meeting data into PostHog — events, sessions, registrants, chat messages, Q&A, team members, and registration field definitions — so you can analyze it alongside your product data.

## Prerequisites

You need a Livestorm API token. Create one in Livestorm under **Account settings > Integrations > Public API**.

- For the `events`, `sessions`, `people`, `session_people`, `session_chat_messages`, and `session_questions` tables, give the token read access to the **Events** scope.
- For the `team_members` and `people_attributes` tables, give the token read access to the **Admin** scope.

## Adding a data source

<SourceSetupIntro />

Enter your Livestorm API token, then select the tables you want to sync.

You'll be asked for:

- **API token** – The token you created in Livestorm under **Account settings > Integrations > Public API**.

## Sync modes

<SyncModes />

Some Livestorm tables support incremental syncing using the `updated_at` field. The rest use full refresh, reloading all data on every sync.

| Table                   | Sync mode                   |
| ----------------------- | --------------------------- |
| `events`                | Incremental or full refresh |
| `sessions`              | Incremental or full refresh |
| `people`                | Full refresh                |
| `session_people`        | Incremental or full refresh |
| `session_chat_messages` | Full refresh                |
| `session_questions`     | Full refresh                |
| `team_members`          | Full refresh                |
| `people_attributes`     | Full refresh                |

## Available tables

| Table                   | Description                                                           | On by default | Notes                        |
| ----------------------- | --------------------------------------------------------------------- | ------------- | ---------------------------- |
| `events`                | Webinar or meeting series with one or more sessions                   | Yes           |                              |
| `sessions`              | Individual scheduled occurrences of an event                          | Yes           |                              |
| `people`                | Every person in the workspace: team members and participants          | Yes           |                              |
| `session_people`        | Registrants and attendees of each session, one row per person/session | Yes           | Reads every session per sync |
| `session_chat_messages` | Chat messages sent during sessions                                    | No            | Reads every session per sync |
| `session_questions`     | Questions asked during sessions and the answers                       | No            | Reads every session per sync |
| `team_members`          | Workspace team members                                                | No            | Requires Admin read scope    |
| `people_attributes`     | Built-in and custom person field definitions                          | No            | Requires Admin read scope    |

> **API quota:** Livestorm allows 10,000 API calls per 30 days per account. `session_people`, `session_chat_messages`, and `session_questions` each make at least one request per session on every sync. If you have many sessions, sync these tables less often or deselect them to stay within the quota.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized** – The API token is invalid or expired. Create a new token in Livestorm, then reconnect the source.
- **403 Forbidden** – The token lacks the required scope. Check that it has **Events** read access (or **Admin** read access for `team_members` and `people_attributes`).
- **429 Too Many Requests** – The account's 30-day API quota is used up. Syncs resume automatically after the quota resets. To reduce usage, sync less often, deselect session-level tables, or contact Livestorm for a higher quota.

<TroubleshootingLink />
