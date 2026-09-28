---
title: Linking PayFit as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PayFit
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The PayFit connector syncs collaborators, contracts, absences, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your PayFit API key to pull your HR and payroll data.

You can create an API key from the **API access** tab on the [integrations page](https://app.payfit.com/integrations/hub/api) of your PayFit admin account. Grant it the `collaborators:read`, `contracts:read`, `time:read`, and `contracts:payslips:read` scopes so every table can sync.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All PayFit tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
