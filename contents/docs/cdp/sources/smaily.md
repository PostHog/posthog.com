---
title: Linking Smaily as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Smaily
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Smaily connector syncs your email marketing data – campaigns, statistics, segments, subscribers, templates, automations, A/B tests, and users – into PostHog.

## Prerequisites

You need a Smaily account and an API user, which you create under **Account preferences → Integrations → API users**.

## Adding a data source

<SourceSetupIntro />

When linking Smaily, you'll need:

- **Smaily subdomain** – the first part of your Smaily URL, e.g. `mycompany` for `mycompany.sendsmaily.net`.
- **API username** – the username of the API user you create in [Smaily](https://smaily.com) under **Account preferences → Integrations → API users**.
- **API password** – the password for that API user.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If authentication fails, confirm your subdomain, API username, and API password are correct and that the API user still exists under **Account preferences → Integrations → API users**.

<TroubleshootingLink />
