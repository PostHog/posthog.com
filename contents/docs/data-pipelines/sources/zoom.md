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

Sync your Zoom users, groups, meetings, webinars, registrants, panelists, attendance, poll and Q&A results, usage reports, AI meeting summaries, and cloud recordings into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Zoom.
3. Create a **Server-to-Server OAuth** app in the [Zoom App Marketplace](https://marketplace.zoom.us/develop/create) and copy its `Account ID`, `Client ID`, and `Client Secret`. Grant the following read scopes:
   - `user:read:list_users:admin`
   - `meeting:read:list_meetings:admin`
   - `webinar:read:list_webinars:admin`
   - `meeting:read:list_registrants:admin` and `webinar:read:list_registrants:admin` (for registrants)
   - `meeting:read:list_past_instances:admin`, `meeting:read:list_past_participants:admin`, `webinar:read:list_past_instances:admin`, and `webinar:read:list_past_participants:admin` (for instances and participants)
   - `group:read:list_groups:admin` and `group:read:list_members:admin` (for groups)
   - `report:read:list_users:admin` (for the host usage report)
   - `cloud_recording:read:list_user_recordings:admin` (for recordings)
   - `report:read:admin` (for the daily usage report)
   - `meeting:read:list_summaries:admin` (for meeting summaries)
   - `webinar:read:list_panelists:admin` (for webinar panelists)
   - `meeting:read:list_poll_results:admin`, `webinar:read:list_past_polls:admin`, and `webinar:read:past_qa:admin` (for poll and Q&A results)
4. Back in PostHog, enter the Account ID, Client ID, and Client secret, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Zoom data in PostHog.

## Available tables

| Table                  | Description                                                                   | Sync method                 |
| ---------------------- | ----------------------------------------------------------------------------- | --------------------------- |
| `users`                | Users in your Zoom account                                                    | Full refresh                |
| `meetings`             | Scheduled meetings per user                                                   | Full refresh                |
| `webinars`             | Webinars per user                                                             | Full refresh                |
| `meeting_registrants`  | Approved registrations for meetings                                           | Full refresh                |
| `webinar_registrants`  | Approved registrations for webinars                                           | Full refresh                |
| `meeting_instances`    | Ended occurrences of meetings                                                 | Full refresh                |
| `webinar_instances`    | Ended occurrences of webinars                                                 | Full refresh                |
| `meeting_participants` | Join sessions of participants in ended meetings                               | Full refresh                |
| `webinar_participants` | Join sessions of participants in ended webinars                               | Full refresh                |
| `groups`               | Groups of users in your Zoom account                                          | Full refresh                |
| `group_members`        | Group memberships of users                                                    | Full refresh                |
| `report_users`         | Monthly host usage per user                                                   | Incremental or full refresh |
| `recordings`           | Cloud recordings of meetings and webinars, with their files                   | Incremental or full refresh |
| `report_daily`         | Account-wide daily usage (new users, meetings, participants, meeting minutes) | Incremental or full refresh |
| `meeting_summaries`    | AI Companion summaries of meetings and webinars                               | Incremental or full refresh |
| `webinar_panelists`    | Panelists assigned to webinars                                                | Full refresh                |
| `meeting_polls`        | Poll results from past meeting instances                                      | Full refresh                |
| `webinar_polls`        | Poll results from past webinar instances                                      | Full refresh                |
| `webinar_qa`           | Q&A results from past webinar instances                                       | Full refresh                |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync. The incremental tables use these fields: `period_start` for `report_users`, `start_time` for `recordings`, `date` for `report_daily`, and `summary_created_time` for `meeting_summaries`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
