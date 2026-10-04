---
title: Linking Cisco Duo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CiscoDuo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Cisco Duo connector syncs your Duo Admin API data into the PostHog Data warehouse: authentication, administrator, telephony, and activity logs, plus users, groups, phones, admins, and integrations. This lets you analyze MFA success and failure rates, enrollment coverage, and unusual access patterns alongside your product data.

## Prerequisites

You need a Duo account on an edition that includes the Admin API, and a Duo administrator with the **Owner** role to create the Admin API application.

## Adding a data source

<SourceSetupIntro />

When linking Cisco Duo, you'll need credentials from a Duo **Admin API** application:

1. In the [Duo Admin Panel](https://admin.duosecurity.com/), go to **Applications** and click **Protect an Application**.
2. Search for **Admin API** and click **Protect**.
3. Copy the **integration key**, **secret key**, and **API hostname** (e.g. `api-XXXXXXXX.duosecurity.com`) into PostHog.

Grant the application the permissions matching the tables you want to sync:

- **Grant read log** – authentication, administrator, telephony, and activity logs
- **Grant read resource** – users, groups, phones
- **Grant administrators** – admins
- **Grant applications** – integrations

## Sync modes

<SyncModes />

The log tables sync incrementally using Duo's time-based filters. Administrator log events have no unique id, so that table is append-only. The resource tables (users, groups, phones, admins, integrations) are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, the integration key, secret key, or API hostname is wrong, or the keys were revoked. Duo also rejects requests from servers with significant clock skew.
- If you see a permissions error, your Admin API application is missing the permission needed for that table. Grant the matching permission (read log, read resource, administrators, or applications) in the Duo Admin Panel, then try again.
- Duo retains logs for a limited period (around 180 days depending on edition), so the first sync of a log table only reaches back that far.

<TroubleshootingLink />
