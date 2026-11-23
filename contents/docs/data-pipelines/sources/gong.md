---
title: Linking Gong as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gong
---

Enter your Gong API credentials to pull your Gong data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Gong.
3. In Gong, go to **Company Settings → Ecosystem → API** and create an **Access Key** and **Access Key Secret**. Grant the following read scopes so the connected endpoints can sync: `api:calls:read:basic`, `api:users:read`, `api:settings:scorecards:read`, and `api:workspaces:read`. To also sync the `calls_extensive` table (call participants and CRM associations), additionally grant `api:calls:read:extensive`. To sync the `calls_media` table (call recording download URLs), additionally grant `api:calls:read:media-url`. To sync the `aggregate_activity` table, additionally grant `api:stats:user-actions`. To sync the `logs` table, additionally grant `api:logs:read`.
4. Back in PostHog, enter the `Access key` and `Access key secret`, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Gong data in PostHog.

## Available tables

| Table                   | Description                                         | Sync method  |
| ----------------------- | --------------------------------------------------- | ------------ |
| `calls`                 | Call records                                        | Incremental  |
| `calls_extensive`       | Call records with participants and CRM associations | Incremental  |
| `calls_media`           | Call recording download URLs                        | Full refresh |
| `users`                 | Gong users                                          | Full refresh |
| `scorecards`            | Scorecard settings                                  | Full refresh |
| `workspaces`            | Gong workspaces                                     | Full refresh |
| `aggregate_activity`    | Per-user activity counts for each day               | Incremental  |
| `logs`                  | Audit logs (sign-ins, user activity, call plays)    | Incremental  |
| `user_settings_history` | History of user settings changes                    | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

The `calls` table syncs basic call metadata. The `calls_extensive` table includes the same metadata plus `parties` (participant name, email, and affiliation) and `context` (linked CRM objects such as Salesforce or HubSpot accounts, opportunities, and contacts).

The `calls_media` table provides download URLs for each call's audio and video recording. The `mediaUrls` column contains `audioUrl` and `videoUrl` fields. Gong keeps these URLs valid for only 8 hours, so only URLs from the most recent sync work. This table is disabled by default and requires the `api:calls:read:media-url` scope.

The `aggregate_activity` table provides daily counts of user activities such as calls hosted, attended, and feedback given. The `logs` table captures Gong audit logs including sign-ins, user activity, and call plays across five log types (`AccessLog`, `UserActivityLog`, `UserCallPlay`, `ExternallySharedCallAccess`, `ExternallySharedCallPlay`). Log entries have no native id, so each row receives a hashed id. The `user_settings_history` table tracks changes to each user's recording, import, and active settings over time.

The `logs` and `user_settings_history` tables are disabled by default and must be explicitly selected during setup. Enabling `user_settings_history` makes one request per user on every sync, which counts against Gong's daily API limit. Consider adjusting your sync frequency if you have many Gong users.

## Sync limitations

The `calls`, `calls_extensive`, and `calls_media` tables only sync the last 365 days of data on the initial sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
