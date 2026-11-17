---
title: Linking Zoom as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Zoom
---

Sync your Zoom users, groups, meetings, webinars, registrants, attendance, usage reports, and cloud recordings into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Zoom.
3. Create a **Server-to-Server OAuth** app in the [Zoom App Marketplace](https://marketplace.zoom.us/develop/create) and copy its `Account ID`, `Client ID`, and `Client Secret`. Grant the following read scopes:
   - `user:read:list_users:admin`
   - `meeting:read:list_meetings:admin`
   - `webinar:read:list_webinars:admin`
   - `meeting:read:list_registrants:admin` and `webinar:read:list_registrants:admin` for registrants
   - `meeting:read:list_past_instances:admin`, `meeting:read:list_past_participants:admin`, `webinar:read:list_past_instances:admin`, and `webinar:read:list_past_participants:admin` for instances and participants
   - `group:read:list_groups:admin` and `group:read:list_members:admin` for groups
   - `report:read:list_users:admin` for the host usage report
   - `cloud_recording:read:list_user_recordings:admin` for recordings
4. Back in PostHog, enter the Account ID, Client ID, and Client secret, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Zoom data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `users` | Users in your Zoom account | Full refresh |
| `meetings` | Scheduled meetings per user | Full refresh |
| `webinars` | Webinars per user | Full refresh |
| `meeting_registrants` | Approved registrants for each meeting | Full refresh |
| `webinar_registrants` | Approved registrants for each webinar | Full refresh |
| `meeting_instances` | Past instances of each meeting | Full refresh |
| `webinar_instances` | Past instances of each webinar | Full refresh |
| `meeting_participants` | Participants in each past meeting instance | Full refresh |
| `webinar_participants` | Participants in each past webinar instance | Full refresh |
| `groups` | Groups in your Zoom account | Full refresh |
| `group_members` | Members of each group | Full refresh |
| `report_users` | Active and inactive host usage report, one row per host per month | Incremental |
| `recordings` | Cloud recordings, one row per meeting or webinar instance with recordings | Incremental |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

Zoom only gives the host usage report for the last six months, so `report_users` contains the current month and the five months before it. Zoom lists a recording only after it is processed, so each incremental sync of `recordings` reads the last three days again.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
