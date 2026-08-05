---
title: Linking noCRM.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: NoCRM
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The noCRM.io connector syncs your noCRM.io data – leads, users, teams, pipelines, and more – into PostHog.

## Prerequisites

You need a noCRM.io account and account admin access to create an API key. The key is account-level and grants read access to your leads, users, teams, pipelines, and the other tables it supports.

## Adding a data source

<SourceSetupIntro />

When linking noCRM.io, you'll need:

- **Subdomain** – the first part of your noCRM.io URL. For `acme.nocrm.io`, enter `acme`.
- **API key** – create one as an account admin under **Admin panel → API & Webhooks → API keys**. The key is account-level and grants read access to leads, users, teams, pipelines, and the other supported tables.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
