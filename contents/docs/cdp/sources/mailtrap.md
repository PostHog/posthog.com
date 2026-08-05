---
title: Linking Mailtrap as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mailtrap
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Mailtrap connector syncs your email sending data – email logs, suppressions, templates, contact lists, sending domains, and accounts – into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Mailtrap account and an API token with access to the accounts and sending domains you want to sync. Email logs are restricted to the domains the token can access.

## Adding a data source

<SourceSetupIntro />

When linking Mailtrap, you'll need:

- **API token** – create one under **Settings → API Tokens** in [Mailtrap](https://mailtrap.io). The token needs access to the accounts and sending domains you want to sync; email logs are restricted to the domains the token can access.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
