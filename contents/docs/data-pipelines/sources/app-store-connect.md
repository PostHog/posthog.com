---
title: Linking Apple (App Store Connect) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AppStoreConnect
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Apple (App Store Connect) connector syncs apps, app store versions, builds, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Pull your App Store apps, versions, builds, reviews and sales reports.

An **Account Holder** or **Admin** creates an API key under **Users and Access → Integrations → App Store Connect API** in App Store Connect. Set the key's access role there - it decides which tables sync. Copy the issuer ID and key ID from that page, then paste the contents of the `.p8` private key file you download. Apple only lets you download that file once, so keep a copy.

Sales and subscription reports also need your vendor number (App Store Connect → **Payments and Financial Reports**) and a key with the **Finance**, **Sales**, or **Admin** role. Leave it blank if you only want app, review and build data.

The analytics tables need a key with the Admin role. Apple lets only an Admin key start an analytics report.

Leave **app IDs** blank to sync every app the key can read. To sync only some of your apps, list their Apple IDs, separated by commas. You can find an app's Apple ID in App Store Connect under **App Information → General Information**. The filter covers the apps, versions, reviews, review responses, in-app purchases, subscription groups and analytics tables. Builds, TestFlight groups and the sales reports cover your whole account, so they are not filtered.

Analytics report tables keep every restatement Apple publishes for a report date (about six days of revisions), so a raw `SUM` grouped by date overcounts. The raw rows preserve the restatement history; to aggregate, keep only the latest restatement per report date and dimension combination, for example:

```
SELECT
    raw.date,
    raw.app_id,
    raw.app_name,
    raw.app_apple_identifier,
    raw.app_version,
    raw.device,
    raw.platform_version,
    raw.source_type,
    raw.page_type,
    raw.app_download_date,
    raw.territory,
    argMax(raw.sessions, raw.processing_date) AS sessions,
    argMax(raw.total_session_duration, raw.processing_date) AS total_session_duration,
    argMax(raw.unique_devices, raw.processing_date) AS unique_devices
FROM appstoreconnect_analytics_app_sessions AS raw
INNER JOIN (
    SELECT app_id, date, max(processing_date) AS processing_date
    FROM appstoreconnect_analytics_app_sessions
    GROUP BY app_id, date
) AS latest
    ON raw.app_id = latest.app_id AND raw.date = latest.date AND raw.processing_date = latest.processing_date
GROUP BY
    raw.date,
    raw.app_id,
    raw.app_name,
    raw.app_apple_identifier,
    raw.app_version,
    raw.device,
    raw.platform_version,
    raw.source_type,
    raw.page_type,
    raw.app_download_date,
    raw.territory
```

This query names the table as connected without a table name prefix; if you set one, add it wherever the table name appears. Each analytics table's description carries the exact query for that table.

You'll be asked for:

- **Issuer ID**: for example `57246542-96fe-1a63-e053-0824d011072a`.
- **Key ID**: for example `2X9R4HXF34`.
- **Private key (.p8 contents)**: for example `-----BEGIN PRIVATE KEY-----`.

## Sync modes

<SyncModes />

All Apple (App Store Connect) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the private key (.p8 contents) is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
