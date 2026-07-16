---
title: Linking MailerSend as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MailerSend
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The MailerSend connector syncs your transactional email data – activity events, domains, recipients, and templates – into PostHog, so you can analyze your email data alongside your product data.

## Prerequisites

You need a MailerSend account with an API token that has read access to the data you want to sync. MailerSend retains email activity for 1-30 days depending on your plan, so the activity table only backfills as far as that retention window on its first sync.

## Adding a data source

<SourceSetupIntro />

When linking MailerSend, you'll need:

- **API token** – create one in your [MailerSend domain settings](https://app.mailersend.com/api-tokens). Grant the token read access to the data you want to sync, such as Email (for activity events), Domains, Recipients, and Templates.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API token is invalid or has been revoked, create a new token in your MailerSend domain settings, then reconnect.
- If your token is missing the read permissions needed to sync some data, grant the required read scopes in your MailerSend domain settings, then reconnect.

<TroubleshootingLink />
