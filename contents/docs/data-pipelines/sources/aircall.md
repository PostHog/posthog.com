---
title: Linking Aircall as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Aircall
---

The Aircall connector syncs your call center data – calls, contacts, users, teams, numbers, tags, outbound campaigns, user availability, conversation trackers, predicted satisfaction scores, and call summaries – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Aircall.
3. Next, you need an API key from Aircall, which is made up of an API ID and an API token. In your [Aircall dashboard](https://dashboard.aircall.io/integrations/api-keys), create a new API key and copy both the **API ID** and the **API token**. The key has read access to all of your company's data.
4. Back in PostHog, enter the credentials in the `API ID` and `API token` fields and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Aircall data in PostHog.

## Available tables

| Table                    | Description                                                            | Sync method  |
| ------------------------ | ---------------------------------------------------------------------- | ------------ |
| `calls`                  | Phone calls handled in Aircall                                         | Incremental  |
| `contacts`               | Contacts in your Aircall account                                       | Incremental  |
| `users`                  | Agents and other users in your account                                 | Full refresh |
| `teams`                  | Teams of agents                                                        | Full refresh |
| `numbers`                | Phone numbers configured in Aircall                                    | Full refresh |
| `tags`                   | Tags used to label calls                                               | Full refresh |
| `campaigns`              | Outbound calling campaigns                                             | Full refresh |
| `campaign_outcomes`      | Company-wide call outcomes catalog                                     | Full refresh |
| `campaign_stats`         | Progress statistics per campaign                                       | Full refresh |
| `campaign_call_outcomes` | Disposition log per campaign contact                                   | Full refresh |
| `trackers`               | Conversation Intelligence keyword trackers (requires AI Assist add-on) | Full refresh |
| `user_availabilities`    | The current availability of each Aircall user, as shown in the Activity Feed, one row per user | Full refresh |
| `call_predicted_csats`   | AI-predicted customer satisfaction (CSAT) score for a call, with the drivers behind it, one row per call. Requires the AI Assist add-on | Full refresh |
| `call_summaries`         | AI-generated summary of a call, one row per call. Requires the AI Assist add-on | Full refresh |
| `call_custom_summary_results` | Result of a custom summary template applied to a call, one row per call. Requires the AI Assist Pro package | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
