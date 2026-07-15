---
title: Linking Statuspage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Statuspage
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[Statuspage](https://www.atlassian.com/software/statuspage) is Atlassian's status page and incident communication platform. This connector syncs your Statuspage data – pages, components, incidents, subscribers, metrics, and access users and groups – into the PostHog Data Warehouse so you can analyze uptime and incident history alongside your product data.

## Prerequisites

An Atlassian Statuspage account with an API key.

## Adding a data source

<SourceSetupIntro />

You need a Statuspage API key. Create one under **[Manage account → API info](https://manage.statuspage.io/account/api-info)**, then paste it into the connection form. The key has organization-wide management access, so no extra scopes are required.

## Sync modes

<SyncModes />

All Statuspage tables are full refresh only. Incremental sync is not available for this connector.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the connection fails with an authentication error, confirm the API key is still valid under **Manage account → API info**. Regenerating the key in Statuspage invalidates the old one, so you'll need to update the credentials here if you do.

<TroubleshootingLink />
