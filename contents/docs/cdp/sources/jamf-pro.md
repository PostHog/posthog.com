---
title: Linking Jamf Pro as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: JamfPro
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Jamf Pro connector syncs your Apple device management data – computer inventory, mobile devices, groups, buildings, departments, categories, sites, scripts, and packages – into PostHog.

## Prerequisites

You need a Jamf Pro instance (cloud-hosted like `yourcompany.jamfcloud.com`, or self-hosted) and either an API client or a user account with read access to the objects you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Jamf Pro, you'll need your **Jamf Pro URL** (e.g. `yourcompany.jamfcloud.com`) and one of the following:

### Option 1: API client (recommended)

1. In Jamf Pro, go to **Settings** > **System** > **API roles and clients**.
2. On the **API roles** tab, create a role with **read** privileges for the objects you want to sync, for example: Computers, Mobile Devices, Buildings, Departments, Categories, Sites, Smart Computer Groups, Static Computer Groups, Scripts, and Packages.
3. On the **API clients** tab, create a client, assign it the role, and click **Enable API client**.
4. Copy the **client ID** and generate a **client secret**. The secret is only shown once.

### Option 2: Username and password

Use a Jamf Pro user account with read access to the objects you want to sync. PostHog only uses the credentials to mint short-lived API tokens.

## Sync modes

<SyncModes />

The `computers` table supports incremental syncs using the inventory report date, so only computers that submitted inventory since the last sync are fetched. Jamf collects device inventory once a day by default, so syncing more often than every few hours rarely surfaces new data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If a sync fails with a permissions error, check that the API role grants the **read** privilege for each object you selected – Jamf Pro privileges are granted per object type.

<TroubleshootingLink />
