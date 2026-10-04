---
title: Linking Microsoft Clarity as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MicrosoftClarity
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Microsoft Clarity connector syncs engagement and frustration-signal metrics into PostHog's data warehouse. It pulls data from the [Clarity Data Export API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api) using a project-level API token.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/pipeline/new) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Microsoft Clarity.
3. In your Microsoft Clarity project, go to **Settings → Data Export → Generate new API token** and copy the token.
4. Back in PostHog, paste the token into the **API token** field.
5. Choose a **Reporting window** — last 24, 48, or 72 hours — to control how much trailing data each sync pulls.
6. Optionally select up to three **Breakdown dimensions** (e.g. Browser, Device, Country/Region, OS, Source, Medium, Campaign, Channel, URL) to split metrics by.
7. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the sync completes, you can query your Clarity data in PostHog.

## Available tables

| Table                   | Description                                                                                                                                                                                                                   | Sync method |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `project_live_insights` | Engagement and frustration-signal metrics (traffic, scroll depth, engagement time, popular pages, dead/rage/quickback/error clicks, script errors) aggregated over the reporting window, optionally broken down by dimensions | Append only |

**Append only** means each sync adds a new set of snapshot rows (stamped with `synced_at`) rather than updating existing records. This is because the Clarity API only returns a rolling window of the last 1–3 days with no historical cursor — recurring syncs accumulate history over time.

## Sync limitations

- **No historical backfill.** The Clarity Data Export API only returns the last 1–3 days of aggregated data. There is no way to pull older history.
- **10 requests per project per day.** Microsoft Clarity enforces a daily quota of 10 API requests per project. Each PostHog sync uses one request, so schedule syncs accordingly. Credential validation at setup also counts against this quota.
- **Snapshot-based accumulation.** Because the API has no incremental cursor, each sync appends a fresh snapshot. Use the `synced_at` column to distinguish between syncs when querying.

## Troubleshooting

**401 – Invalid or expired API token:** Generate a new token in Microsoft Clarity under **Settings → Data Export** and reconnect the source in PostHog.

**403 – Token not authorized:** The API token doesn't have access to this Clarity project. Verify you generated the token from the correct project.

**429 – Daily quota exhausted:** The project's 10-request daily quota has been used up (possibly by other integrations or manual API calls). The quota resets daily — try again after it resets.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
