---
title: Linking babelforce as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Babelforce
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The babelforce connector syncs your contact center data – call reporting, agents, agent groups, queues, service numbers, recordings, SMS messages, and conversations – into PostHog.

## Prerequisites

You need a babelforce account with a user that has manager rights, so you can create API credentials in the manager app.

## Adding a data source

<SourceSetupIntro />

To connect babelforce, you need:

- **Environment (subdomain)**: the subdomain your babelforce account is served from. This is usually `services`, unless you are on a dedicated environment with a custom subdomain (check the URL you use to open the manager app).
- **Access ID** and **Access token**: an API credential pair created in your babelforce manager app. See babelforce's [authentication guide](https://help.babelforce.com/hc/en-us/articles/6418329977108-Authentication-Best-Practice) for how to create one.

## Sync modes

<SyncModes />

The `calls` table supports incremental syncs using the call's `dateCreated` timestamp. All other tables are reference data and use full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the connection fails with an authentication error, check that the environment subdomain matches your account and that the access ID and access token belong to a user with manager rights.

<TroubleshootingLink />
