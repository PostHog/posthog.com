---
title: Linking Zendesk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Zendesk
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Zendesk connector syncs your customer support data – tickets, users, organizations, groups, brands, and SLA policies – into PostHog, so you can analyze support activity alongside your product data.

## Prerequisites

You need a Zendesk account with access to the [Zendesk API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API). Token access must be enabled in your Zendesk admin settings, and you'll need an API token plus the email address it belongs to.

## Adding a data source

<SourceSetupIntro />

When linking Zendesk, you'll need:

- **Subdomain** – the subdomain of your Zendesk account. For `https://posthoghelp.zendesk.com/`, the subdomain is `posthoghelp`.
- **API token** – create one under **Admin Center → Apps and integrations → Zendesk API → Add API token**.
- **Email** – the email address of the account the API token belongs to.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
