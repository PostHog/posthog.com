---
title: Linking Abnormal Security as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AbnormalSecurity
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Sync your Abnormal Security (Abnormal AI) threat campaigns, account takeover cases, and vendor cases into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Abnormal Security (Abnormal AI).
3. In Abnormal Security, go to **Settings → Integrations → Abnormal REST API** and create an API token. If your account restricts API access by IP, allow PostHog's outbound IP addresses.
4. Back in PostHog, enter your **API token**, select your **Region** (US or EU), then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Abnormal Security data in PostHog.

## Available tables

| Table          | Description                                                           | Sync method                 |
| -------------- | --------------------------------------------------------------------- | --------------------------- |
| `threats`      | Email threat campaigns with recipient counts and a sample of messages | Full refresh                |
| `cases`        | Account takeover cases                                                | Incremental or full refresh |
| `vendor_cases` | Vendor cases with security insights and a timeline of events          | Incremental or full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

The `threats` table contains one row per campaign, including recipient counts and up to 10 sample messages as returned by the API. Threats use full refresh because campaign details have no reliable timestamp for incremental syncing.

The `cases` and `vendor_cases` tables are **disabled by default**. Enable them from the table selection step during setup. Both tables require an **Account Takeover license** from Abnormal Security.

## Regions

Abnormal Security supports **US** and **EU** regions. Select your region when configuring the source. Dedicated account hosts are not supported.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
