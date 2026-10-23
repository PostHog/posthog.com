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

The PayFit connector syncs your HR and payroll data – collaborators, contracts, absences, and payslips – into PostHog.

## Prerequisites

You need a PayFit admin account with access to create an API key. Grant the key the `collaborators:read`, `contracts:read`, `time:read`, and `contracts:payslips:read` scopes so every table can sync.

## Adding a data source

<SourceSetupIntro />

When linking PayFit, you'll need:

- **API key** – create one from the **API access** tab on the [integrations page](https://app.payfit.com/integrations/hub/api) of your PayFit admin account. Grant it the `collaborators:read`, `contracts:read`, `time:read`, and `contracts:payslips:read` scopes so every table can sync.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If a table returns no data, confirm your API key has the matching scope (`collaborators:read`, `contracts:read`, `time:read`, or `contracts:payslips:read`), then reconnect.

<TroubleshootingLink />
