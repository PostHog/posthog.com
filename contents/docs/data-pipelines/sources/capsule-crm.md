---
title: Linking Capsule CRM as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CapsuleCRM
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Capsule CRM connector syncs your CRM data – parties, opportunities, projects, tasks, activity timeline, and supporting reference data – into PostHog, so you can analyze your sales pipeline alongside your product data.

## Prerequisites

You need a Capsule CRM account with permission to see the records you want to sync, so you can create a Personal Access Token.

## Adding a data source

<SourceSetupIntro />

When linking Capsule CRM, you'll need:

- **Personal Access Token** – create one under **My Preferences → API Authentication Tokens** in your Capsule account. The token inherits your user's permissions, so make sure your user can see the records you want to sync (parties, opportunities, projects, tasks).

## Sync modes

<SyncModes />

Parties, opportunities, and projects support **incremental** syncs using Capsule's `since` change filter (tracked on `updatedAt`), so ongoing syncs only pull records that changed since the last run. The remaining tables (entries, tasks, users, milestones, pipelines, categories, lost reasons, boards, stages, teams, goals, track definitions, and the tag and custom field definition tables) are full refresh only, since Capsule does not expose a server-side change filter for them.

The `entries` table holds your activity timeline: notes, emails, and completed tasks. It's usually the largest table in a Capsule account, and Capsule has no change filter for it, so every sync pulls the full history. Sync it on a schedule that suits its size.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your Personal Access Token is invalid or has been revoked, create a new token in your Capsule account settings, then reconnect.
- If your user does not have permission to read the data, check the user's permissions in Capsule, then reconnect.

<TroubleshootingLink />
