---
title: Linking LogRocket as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Logrocket
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Note:** This connector is in **alpha**. The interface and available tables may change.

The LogRocket connector syncs audit logs and session events into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

- A LogRocket account on the Professional plan (required for audit logging).
- An API key created in LogRocket under **Settings** > **API Keys**.
- If you want to sync session events, the legacy [Data Export add-on](https://docs.logrocket.com/docs/data-export) must be enabled. LogRocket has deprecated this add-on for SaaS accounts, so it may not be available.

## Adding a data source

<SourceSetupIntro />

You need three values to connect:

- **API key** – create one in LogRocket under **Settings** > **API Keys**. PostHog authenticates with the `Authorization: token <key>` header.

- **Organization ID** – the organization ID in your LogRocket project URL.

- **Project ID** – the project ID in your LogRocket project URL.

This source connects to `api.logrocket.com`. Self-hosted LogRocket instances aren't supported.

## Sync modes

<SyncModes />

All LogRocket tables use full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The **session_events** table is disabled by default because the Data Export add-on is deprecated for SaaS accounts. Enable it manually if you have the add-on active.

## Troubleshooting

- **Authorization error (401)** – LogRocket rejected your API key. Create a new key in **Settings** > **API Keys**, then reconnect the source.

- **Forbidden error (403)** – LogRocket denied access. Check the API key permissions and confirm the required audit or export add-on is enabled for your account.

- **Session events table shows no data** – The legacy Data Export add-on must be enabled. Check your LogRocket account settings to confirm it's active.

<TroubleshootingLink />
