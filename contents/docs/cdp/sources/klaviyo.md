---
title: Linking Klaviyo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Klaviyo
---

The Klaviyo connector can link campaigns, profiles, events, flows, and more to PostHog.

To link Klaviyo:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Klaviyo.

3. Next, you need an API key from Klaviyo. Go to your [API keys settings](https://www.klaviyo.com/settings/account/api-keys) in Klaviyo. Click **Create Private API Key**, give it a name, and select **Read-Only Key** for the access level. Copy the value of the newly created key.

4. Back in PostHog, paste the API key in the `API key` field and click **Next**.

5. On the next page, set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Klaviyo data in PostHog.

## Configuration

<SourceParameters />

## Syncing list membership data

The Klaviyo connector includes an opt-in `list_profiles` table that maps which profiles belong to which list. This is disabled by default — to enable it, toggle it on in the schema configuration when setting up or editing your Klaviyo source.

This table is useful because Klaviyo only exposes list membership as relationship links that can't be queried directly in PostHog. The `list_profiles` table materializes this many-to-many relationship as a flat join table with two columns:

- `list_id` – the Klaviyo list ID
- `profile_id` – the Klaviyo profile ID

Once synced, you can join it with your profiles table to query members of a specific list:

```sql
SELECT p.*
FROM klaviyo_profiles p
JOIN klaviyo_list_profiles lp ON lp.profile_id = p.id
WHERE lp.list_id = 'your_list_id'
```

> **Note:** The `list_profiles` table uses full refresh sync only. Incremental sync isn't available because Klaviyo's relationship API doesn't support filtering by change date. This also means removed memberships are correctly reflected after each sync.
