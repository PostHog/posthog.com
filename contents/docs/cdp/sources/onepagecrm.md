---
title: Linking OnePageCRM as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Onepagecrm
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The OnePageCRM connector syncs your CRM data – contacts, companies, deals, actions, notes, calls, meetings, users, statuses, and lead sources – into the PostHog Data warehouse, so you can analyze your sales pipeline alongside your product data.

## Prerequisites

You need a OnePageCRM account with API access. The API key grants read access to every record your user can see.

## Adding a data source

<SourceSetupIntro />

When linking OnePageCRM, you'll need:

- **User ID** – find it in [OnePageCRM](https://app.onepagecrm.com) under **Apps & Integrations → API**.
- **API key** – shown in the same place as your User ID.

## Sync modes

<SyncModes />

Contacts, deals, actions, notes, calls, and meetings support incremental sync on the `modified_at` field. Companies, users, statuses, and lead sources are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your User ID or API key is invalid or has been revoked. Check both under **Apps & Integrations → API** in OnePageCRM, then reconnect.
- If you see a permissions error, the key is missing the access needed to sync this data. Check your OnePageCRM user's account permissions, then reconnect.

<TroubleshootingLink />
