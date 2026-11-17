---
title: Linking Veracode as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Veracode
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Veracode connector syncs applications, sandboxes, findings, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect Veracode with an API service account's **API ID** and **secret key**, generated under **Account settings → API credentials** in the Veracode Platform. Requests are signed with Veracode's HMAC scheme.

The service account needs the **Results API** and **Applications API** roles to read the application portfolio and findings. The `scans` table also needs the **Reporting API** role, and Veracode support must turn on the Reporting API for your account. The `policies` table needs the **Policy Administrator** role, and the `teams` and `business_units` tables need the **Admin API** role. Pick the region your Veracode account lives in - data is isolated per region.

You'll be asked for:

- **API ID**
- **API secret key**
- **Region**: choose between US commercial (api.veracode.com), European (api.veracode.eu) and US federal (api.veracode.us).

## Sync modes

<SyncModes />

All Veracode tables are full refresh. Each sync replaces the contents of the table.

The tables that start with `sca_workspace` hold agent-based Software Composition Analysis (SCA) scan data. Your Veracode account needs agent-based scanning for these tables, so they're off by default.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API ID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
