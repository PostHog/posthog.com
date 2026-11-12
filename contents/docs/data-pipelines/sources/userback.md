---
title: Linking Userback as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Userback
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Userback connector syncs your feedback, feedback comments, session recordings, projects, members, and workflows into PostHog, so you can analyze customer feedback alongside your product data.

> **Note:** This source is in **beta**.

## Prerequisites

You need:

- A Userback account on a **Premium plan** (required for REST API access).
- An **admin** account in Userback.
- A Userback **API token**, created under **Workspace settings → API tokens** in Userback.

## Adding a data source

<SourceSetupIntro />

When linking Userback, you'll need:

- **API token** – create one under **Workspace settings → API tokens** in your Userback dashboard.

## Sync modes

<SyncModes />

The `feedback`, `feedback_comments`, and `session_recordings` tables support incremental sync. `feedback` and `feedback_comments` use `modified` as the default cursor (with `created` available as an alternative), while `session_recordings` uses `created`.

The `projects`, `members`, and `workflows` tables do not have incremental fields and are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized** – Userback rejected your API token. Create a new token in Userback under **Workspace settings → API tokens**, then reconnect the source.
- **403 Forbidden** – Userback refused API access for this token. The REST API needs a Premium plan and an admin account. Check your plan and account role, then reconnect the source.

<TroubleshootingLink />
