---
title: Linking Calendly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Calendly
---

The Calendly connector syncs your scheduling data – event types, scheduled events, invitees, contacts, groups, organization memberships, and routing forms – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Calendly.
3. Next, you need a personal access token from Calendly. In your Calendly account, go to **Integrations → API & Webhooks** and create a personal access token. Creating a personal access token requires a paid Calendly plan. Copy the token value.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Calendly data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `event_types` | Event types configured in your Calendly organization | Full refresh |
| `event_type_memberships` | Hosts assigned to each event type | Full refresh |
| `scheduled_events` | Scheduled meetings, synced incrementally on `start_time` | Webhook, incremental, or full refresh |
| `invitees` | People who booked a scheduled event, with their answers, tracking, and cancellation details | Full refresh |
| `contacts` | People in your Calendly contacts directory | Full refresh |
| `groups` | Groups within your Calendly organization | Full refresh |
| `organization_memberships` | Members of your Calendly organization, with their roles | Full refresh |
| `routing_forms` | Routing forms configured in your organization | Full refresh |
| `routing_form_submissions` | Completed routing form submissions, and where each respondent was routed | Full refresh |

**Webhook** tables receive each change from Calendly as it happens. **Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
