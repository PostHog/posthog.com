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

The Statuspage connector syncs pages, components, component groups, component uptime, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync your Atlassian Statuspage data. Create a key under **[Manage account > API info](https://manage.statuspage.io/account/api-info)** and paste it below. The key has organization-wide management access; no extra scopes are required.

You'll be asked for:

- **API key**: for example `Your Statuspage API key`.

## Sync modes

<SyncModes />

All Statuspage tables are full refresh. Each sync replaces the contents of the table.

The **component_uptime** and **component_group_uptime** tables hold one uptime snapshot per component or group. Statuspage calculates it over the last 90 days, or from the component's start date when that is more recent. For a group, Statuspage uses the earliest start date of its components. Each sync replaces the snapshot, so the tables don't keep uptime history.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- If the **component_uptime** table has no row for a component, turn on uptime showcase for that component in Statuspage. A component group gets a **component_group_uptime** row only when at least one of its components has uptime showcase turned on.
- If the **page_access_user_components** table is empty, your pages have no page access users. This table only has rows for audience-specific status pages.

<TroubleshootingLink />
