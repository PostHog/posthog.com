---
title: Linking Less Annoying CRM as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LessAnnoyingCRM
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Less Annoying CRM connector syncs your CRM data – users, teams, contacts, tasks, notes, and events – into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Less Annoying CRM account and an API key with read access. API keys can't be retrieved after creation, so store the key somewhere safe when you create it.

## Adding a data source

<SourceSetupIntro />

When linking Less Annoying CRM, you'll need:

- **API key** – create one on the [Programmer API settings page](https://account.lessannoyingcrm.com/app/Settings/Api). Grant the key **read** access – the tables sync via the `GetUsers`, `GetTeams`, `GetContacts`, `GetTasks`, `GetNotes`, and `GetEvents` functions.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
