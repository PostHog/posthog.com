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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Klaviyo connector syncs your marketing data – campaigns, profiles, events, flows, lists, and metrics – into PostHog, so you can analyze your email and marketing activity alongside your product data.

## Prerequisites

You need a Klaviyo account and a private API key. Create one in your [Klaviyo account settings](https://www.klaviyo.com/settings/account/api-keys) by clicking **Create Private API Key**, giving it a name, and selecting a **Read-Only Key**. Grant read permissions for the following: Accounts, Campaigns, Events, Flows, Lists, Metrics, and Profiles.

## Adding a data source

<SourceSetupIntro />

When linking Klaviyo, you'll need:

- **API key** – the private API key you created in your Klaviyo account settings (starts with `pk_`).

## Sync modes

<SyncModes />

The `events` table is append-only, since Klaviyo events are immutable. On the initial sync, only the last 365 days of events are imported.

## List profiles

The opt-in `list_profiles` table maps which profiles belong to which list as `{list_id, profile_id, joined_group_at}` rows. This is disabled by default, but can be toggled on in the schema configuration when setting up or editing your Klaviyo source. It supports incremental sync on `joined_group_at` (the datetime when the profile most recently joined the list). Incremental syncs only pick up new joins and re-joins, and will not account for profiles removed from a list. A full refresh is required if profiles need to be removed. Once synced, you can join it with your profiles table:

```sql
SELECT p.*
FROM klaviyo_profiles p
JOIN klaviyo_list_profiles lp ON lp.profile_id = p.id
WHERE lp.list_id = 'your_list_id'
```

> **Note:** List membership isn't the same as subscription. A profile can belong to a list without being subscribed to any of its communications. To check what a profile is actually subscribed to, look at the `$consent` array in the profile's `properties` column — it lists the channels (`sms`, `email`, and/or `push`) the profile currently consents to. Avoid relying on `$consent_timestamp` for this: it records when consent was given, but Klaviyo doesn't always clear it when a profile unsubscribes.

To find profiles that are on a list **and** actually subscribed to a given channel, filter on `$consent` too:

```sql
SELECT p.id, p.email
FROM klaviyo_profiles p
JOIN klaviyo_list_profiles lp ON lp.profile_id = p.id
WHERE lp.list_id = 'your_list_id'
  AND arrayExists(x -> x = 'email', JSONExtractArrayRaw(p.properties, '$consent'))
```

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
