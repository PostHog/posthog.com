---
title: Linking JumpCloud as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Jumpcloud
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

[JumpCloud](https://jumpcloud.com) is a cloud directory platform for identity, access, and device management. Linking it as a source syncs your users, devices, groups, SSO applications, device policies and their results, alerts, identity risk events, System Insights device data, and Directory Insights activity events into the PostHog data warehouse, so you can join identity and security data with your product data.

## Prerequisites

To connect JumpCloud, you need:

- A JumpCloud administrator account with API access.
- Your admin API key, found in the JumpCloud Admin Portal under your account menu (click your initials in the top-right corner, then **My API Key**).
- A Directory Insights subscription if you want to sync the `events` table. How far back events are available depends on your Directory Insights retention (up to 90 days).
- System Insights enabled for your devices if you want to sync the `system_insights_*` tables.

## Adding a data source

<SourceSetupIntro />

Enter your JumpCloud admin API key to sync your directory and activity data.

Find your API key in the JumpCloud Admin Portal: click your account initials in the top-right corner and select **My API Key**.

The `events` table requires a Directory Insights subscription. If you're an MSP/MTP admin managing multiple organizations, also enter the organization ID the key should act on.

You'll be asked for:

- **API key**
- **Region**: choose between US (console.jumpcloud.com) and EU (console.eu.jumpcloud.com).

## Sync modes

<SyncModes />

The `events` table (Directory Insights) supports **incremental** sync: each run only fetches events newer than the last synced event timestamp. All other tables sync as a **full refresh** — each sync replaces the contents of the table.

The association tables (`user_group_members`, `system_group_members`, `application_users`, `application_user_groups`, and `system_users`) request JumpCloud once per parent group, application, or system, so a large directory takes longer to sync.

The `policies`, `policy_results`, `policy_statuses`, `alerts`, `alert_occurrences`, `identity_risk_events`, and `system_insights_*` tables also sync as a full refresh. `policy_statuses` holds the latest result of each policy on each device, and `alert_occurrences` holds each time an alert fired. Both request JumpCloud once per policy or alert. The `system_insights_*` tables hold device inventory and security posture (installed apps and programs, patches, disk encryption, browser extensions, OS versions, and more). Join them to `systems` on `system_id`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
