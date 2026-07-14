---
title: Linking Salesforce as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Salesforce
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Salesforce connector syncs your CRM data – accounts, contacts, leads, opportunities, and more – into PostHog, so you can analyze your sales data alongside your product data.

## Prerequisites

You need a Salesforce account that you can authorize PostHog to access. The connection uses OAuth, so you don't need to manually create an API key – you'll sign in to Salesforce and grant access during setup.

## Adding a data source

<SourceSetupIntro />

When linking Salesforce, select an existing Salesforce account to link to PostHog or create a new connection:

- **Salesforce account** – Select the Salesforce account you want to link, then log in to Salesforce and authorize PostHog to access your data. This handles authentication via OAuth.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
