---
title: Linking Gcore as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gcore
---

The Gcore connector syncs your CDN data – resources, origin groups, SSL certificates, and hourly request and traffic statistics – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Gcore.
3. Create an API token in the [Gcore Customer Portal](https://portal.gcore.com/) under **API tokens**. Give the token permission to read CDN data.
4. Back in PostHog, enter your token in the **API token** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Gcore data in PostHog.

## Available tables

| Table              | Description                                                                       | Sync method  |
| ------------------ | --------------------------------------------------------------------------------- | ------------ |
| `resources`        | CDN resources and their delivery domains, status, origins, and configuration      | Incremental  |
| `origin_groups`    | Origin groups that supply content to CDN resources                                | Full refresh |
| `ssl_certificates` | Certificates used for secure CDN delivery, including domains and validity periods | Full refresh |
| `cdn_requests`     | Hourly counts of requests to CDN edge servers, grouped by resource                | Incremental  |
| `cdn_traffic`      | Hourly traffic from CDN servers to clients, grouped by resource                   | Incremental  |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

Statistics tables (`cdn_requests` and `cdn_traffic`) contain hourly values for completed hours, with up to 365 days of history. By default, incremental syncs look back two days to refresh recent values.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
