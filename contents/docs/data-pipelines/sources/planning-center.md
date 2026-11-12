---
title: Linking Planning Center as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PlanningCenter
---

The Planning Center connector syncs your church management data – people, groups, giving, check-ins, services, and calendars – into the PostHog data warehouse.

## Prerequisites

You need a Planning Center account and a personal access token (application ID and secret). The token determines which Planning Center products the source can read. Giving tables require a user with Giving permissions.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Planning Center.
3. Create a personal access token in your [Planning Center developer account](https://api.planningcenteronline.com/oauth/applications). Copy the **Application ID** and **Secret**.
4. Back in PostHog, paste the **Application ID** and **Secret**, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Planning Center data in PostHog.

> The source reads the data that the token's user can see. If the user doesn't have access to a Planning Center product (e.g. Giving), those tables show as unavailable in the table picker. See [Permissions](#permissions) below.

## Sync modes

Planning Center tables sync in one of two modes depending on whether the underlying API supports filtering by `updated_at`:

- **Incremental sync** – Tables that support `updated_at` filtering sync only new or modified records on each run. These tables use merge-only sync (not append) because the inclusive timestamp filter re-reads rows at the watermark boundary. Merge on the primary key removes these duplicates.
- **Full refresh sync** – Tables without `updated_at` support (including all Groups tables) reload all data on each sync.

### Incremental tables

`people`, `emails`, `phone_numbers`, `households`, `lists`, `workflows`, `campuses`, `field_data`, `notes`, `donations`, `batches`, `batch_groups`, `in_kind_donations`, `check_ins`, `event_times`, `headcounts`, `plans`, `calendar_events`, `event_instances`, `resources`, `resource_bookings`, `calendar_tags`

### Full refresh tables

`addresses`, `forms`, `field_definitions`, `groups`, `group_types`, `group_memberships`, `group_events`, `group_applications`, `funds`, `recurring_donations`, `pledge_campaigns`, `payment_sources`, `check_in_events`, `stations`, `service_types`, `songs`, `teams`, `series`, `calendars`

## Available tables

| Product   | Tables                                                                                                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| People    | `people`, `emails`, `phone_numbers`, `addresses`, `households`, `lists`, `workflows`, `campuses`, `field_definitions`, `field_data`, `notes`, `forms` |
| Groups    | `groups`, `group_types`, `group_memberships`, `group_events`, `group_applications`                                                                    |
| Giving    | `donations`, `funds`, `batches`, `batch_groups`, `recurring_donations`, `pledge_campaigns`, `in_kind_donations`, `payment_sources`                    |
| Check-Ins | `check_ins`, `check_in_events`, `event_times`, `headcounts`, `stations`                                                                               |
| Services  | `service_types`, `plans`, `songs`, `teams`, `series`                                                                                                  |
| Calendar  | `calendar_events`, `event_instances`, `resources`, `resource_bookings`, `calendars`, `calendar_tags`                                                  |

## Permissions

Planning Center grants API access per product. When you connect a source, PostHog probes each product to check whether the token's user can read it. Products the user can't access show an error in the table picker.

- **People** – Most Planning Center users have People access by default.
- **Giving** – Requires a user with Giving permissions in Planning Center.
- **Groups, Check-Ins, Services, Calendar** – Require the token's user to have access to each product.

If your token's user can't read a product, either give them access in Planning Center or deselect those tables.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### Sync failing with "Unauthorized"

Planning Center rejected the personal access token. Create a new token in your [Planning Center developer account](https://api.planningcenteronline.com/oauth/applications), then reconnect the source.

### Sync failing with "Forbidden"

Your Planning Center user can't read one of the products you're syncing. Give the user access to that product in Planning Center, or deselect the affected tables.

For more help, see the [Data Warehouse troubleshooting guide](/docs/data-warehouse/troubleshooting).
