---
title: Linking CleverTap as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CleverTap
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. The connector works, but hasn't been tested against a live CleverTap account. Expect rough edges.

The CleverTap connector syncs one configured event and the profiles of users who performed that event into the PostHog data warehouse. This is useful for retention analysis, campaign attribution, and combining CleverTap engagement data with your product analytics.

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

Both CleverTap tables use full refresh. Each sync replaces the contents of the table.

## Available tables

| Table      | Description                                                                       | Sync method  |
| ---------- | --------------------------------------------------------------------------------- | ------------ |
| `events`   | Occurrences of the configured CleverTap event within the export date range        | Full refresh |
| `profiles` | Profiles of users who performed the configured event within the export date range | Full refresh |

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

## Troubleshooting

- **Invalid credentials** – check that your Account ID and Passcode are correct and haven't been rotated.

- **Permission errors** – check that your CleverTap account has API access enabled and that you selected the correct region.

- **Export errors** – check the event name, date range, and API access. CleverTap rejects exports for unsupported notification events.

- **Cursor errors** – if an export cursor expires or becomes invalid, reset the table sync to start a new export.

<TroubleshootingLink />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
