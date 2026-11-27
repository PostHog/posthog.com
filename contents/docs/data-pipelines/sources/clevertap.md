---
title: Linking CleverTap as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clevertap
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The CleverTap connector syncs events, profiles, campaigns, message reports, and content blocks into the PostHog data warehouse. This is useful for retention analysis, campaign attribution, and combining CleverTap engagement data with your product analytics.

## Prerequisites

- A CleverTap account with API access enabled.
- Your **Account ID** – find it in the CleverTap dashboard under **Settings > Account**.
- Your **Passcode** – find it in the CleverTap dashboard under **Settings > Passcode**.
- The name of the event you want to sync.
- Knowledge of which [region](https://developer.clevertap.com/docs/common-api-components#region) your CleverTap account is in.

## Adding a data source

<SourceSetupIntro />

You'll be asked for:

- **Account ID** – your CleverTap account identifier.

- **Passcode** – your CleverTap API passcode.

- **Region** – the region your CleverTap account is hosted in:
  - Europe (`eu1`) – default
  - United States (`us1`)
  - India (`in1`)
  - Singapore (`sg1`)
  - Indonesia (`aps3`)
  - United Arab Emirates (`mec1`)

- **Event name** – the CleverTap event to export (for example, `App Launched`).

- **Start date** – the earliest date to export, in `YYYY-MM-DD` format. The export runs from this date through yesterday (UTC).

## Sync modes

<SyncModes />

All CleverTap tables use full refresh. Each sync replaces the contents of the table.

## Available tables

| Table              | Description                                                                                        | Sync method  |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------ |
| `events`           | Occurrences of the configured CleverTap event within the export date range                         | Full refresh |
| `profiles`         | Profiles of users who performed the configured event within the export date range                  | Full refresh |
| `message_reports`  | Messages that started within the configured date range, with channel, status, and delivery metrics | Full refresh |
| `campaigns`        | Campaigns created through the API and scheduled within the configured date range                   | Full refresh |
| `campaign_reports` | Delivery and click metrics for each completed campaign created through the API                     | Full refresh |
| `content_blocks`   | Reusable content blocks with their content, creator, and update details                            | Full refresh |

### Events columns

| Column          | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `event_name`    | The event name selected for this connection                        |
| `ts`            | Event time in account time, stored as a `YYYYMMDDHHMMSS` integer   |
| `event_date`    | The event date in account time, derived from `ts` for partitioning |
| `profile`       | User identifiers, platform, and profile properties for this event  |
| `events`        | Event summaries returned by CleverTap for this user                |
| `event_props`   | Properties associated with this event occurrence                   |
| `session_props` | Session metadata and campaign attribution properties               |

### Profiles columns

| Column         | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| `identity`     | The custom user identifier, when the account has assigned one                |
| `email`        | The user email address, when available                                       |
| `name`         | The user name, when available                                                |
| `profileData`  | Custom profile properties and channel subscription preferences               |
| `platformInfo` | Device and platform metadata, including platform object IDs                  |
| `events`       | Lifetime event counts and the first and last occurrence times for each event |

### Message reports columns

| Column             | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| `message_id`       | Unique identifier for the message                                                 |
| `message_name`     | The name of the campaign                                                          |
| `data`             | Delivery metrics (sent, viewed, clicked), aggregated over the date range          |
| `start_date`       | The campaign start date and time, without the year (for example, Oct 18, 4:08 PM) |
| `device`           | Platforms targeted by the campaign                                                |
| `conversion_event` | The event configured as the conversion goal, or null                              |
| `labels`           | Labels assigned to the campaign                                                   |
| `status`           | Current status of the campaign: scheduled, running, stopped, or completed         |
| `channel`          | The channel used by the campaign, as a display name (for example, InApp)          |
| `delivery`         | The delivery type of the campaign, as a display name                              |

### Campaigns columns

| Column         | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| `id`           | Unique identifier for the campaign                                         |
| `name`         | Name of the campaign as specified at creation                              |
| `scheduled_on` | Scheduled date and time in account time, stored as a YYYYMMDDHHMM integer  |
| `status`       | Current status: scheduled, pending, running, paused, stopped, or completed |

### Campaign reports columns

| Column          | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| `campaign_id`   | Identifier of the campaign this report belongs to                                  |
| `campaign_name` | Name of the campaign                                                               |
| `scheduled_on`  | Scheduled date and time of the campaign in account time, as a YYYYMMDDHHMM integer |
| `sent`          | Number of messages attempted to be sent                                            |
| `clicked`       | Number of users who clicked the message                                            |

### Content blocks columns

| Column      | Description                                          |
| ----------- | ---------------------------------------------------- |
| `id`        | Unique identifier for the content block              |
| `name`      | Name of the content block                            |
| `type`      | Content type of the block: html or text              |
| `content`   | The content of the block                             |
| `createdBy` | Email address of the user who created the block      |
| `createdAt` | Time the block was created, in ISO 8601 format       |
| `updatedBy` | Email address of the user who last updated the block |
| `updatedAt` | Time the block was last updated, in ISO 8601 format  |

## Sync limitations

- The connector exports a single event at a time. To sync multiple events, create a separate source for each one.

- Profiles include only users who performed the configured event within the date range.

- CleverTap excludes the following notification lifecycle events from event exports:
  - Notification Sent
  - Notification Bounce
  - Notification Control Group
  - Notification Rendered
  - Notification System Control Group

- Event timestamps use account time, not UTC.

- Some CleverTap accounts allow only one message report request each hour. If you're syncing the `message_reports` table, use an hourly or slower sync schedule to avoid rate limiting errors.

## Troubleshooting

- **Invalid credentials** – check that your Account ID and Passcode are correct and haven't been rotated.

- **Permission errors** – check that your CleverTap account has API access enabled and that you selected the correct region.

- **Export errors** – check the event name, date range, and API access. CleverTap rejects exports for unsupported notification events.

- **Cursor errors** – if an export cursor expires or becomes invalid, reset the table sync to start a new export.

- **Rate limiting errors** – if you receive 429 errors when syncing `message_reports`, your account may be limited to one request per hour. Use an hourly or slower sync schedule.

<TroubleshootingLink />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
