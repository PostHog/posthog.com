---
title: Linking Dialpad as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Dialpad
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Note:** The Dialpad source is currently in **beta**.

The Dialpad connector syncs your communication data – calls, users, call centers, departments, offices, contacts, numbers, rooms, channels, coaching teams, and call labels – into PostHog, so you can analyze your call activity alongside your product data.

## Prerequisites

You need:

- A Dialpad account with company admin access.

- A **company-level API key**. User-level keys are rejected because they only import one user's data. A company admin can create the key in Dialpad under **Admin Center → Authentication → API keys**.

- To import the `calls` table, the API key needs the `calls:list` scope.

## Adding a data source

<SourceSetupIntro />

When linking Dialpad, you'll need:

- **API key** – a company admin API key from your Dialpad account. Create one under **Admin Center → Authentication → API keys**. Use a company API key so the import includes your whole company.

## Sync modes

<SyncModes />

The `calls` table supports incremental sync using the `date_started` field. Each sync starts with a 3-hour lookback window because Dialpad only lists a call after it ends – this ensures recently completed calls aren't missed. Duplicate rows are deduplicated automatically by `call_id`.

All other tables use full refresh sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### "Your API key can't read your whole Dialpad company"

You're using a user-level API key instead of a company-level key. Create a company admin API key in Dialpad under **Admin Center → Authentication → API keys**.

### "Your API key can't read this table"

Some tables require specific permissions. The `calls` table needs an API key with the `calls:list` scope. The `numbers` table needs a company admin API key. The table picker marks tables your key can't access.

### "Dialpad rejected this API key"

Your API key is invalid or has been revoked. Create a new key in Dialpad under **Admin Center → Authentication → API keys**, then update the source in PostHog.

<TroubleshootingLink />
