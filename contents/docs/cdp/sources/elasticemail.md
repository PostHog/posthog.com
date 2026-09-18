---
title: Linking Elastic Email as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Elasticemail
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Elastic Email connector syncs your email marketing data – contacts, campaigns, templates, reports, and more – into PostHog, so you can analyze your email data alongside your product data.

## Prerequisites

You need an Elastic Email account with an API key that has read access to the data you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Elastic Email, you'll need:

- **API key** – create one in your [Elastic Email account settings](https://app.elasticemail.com/marketing/settings/new/manage-api). Grant the key read access to the data you want to sync, such as Contacts, Campaigns, Templates, and Reports.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API key is invalid, expired, or missing the required read permissions, create a new key in your Elastic Email account settings, then reconnect.

<TroubleshootingLink />
