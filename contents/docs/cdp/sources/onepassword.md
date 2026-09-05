---
title: Linking 1Password as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OnePassword
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The 1Password connector pulls your security event streams – sign-in attempts, item usages in shared vaults, and audit events – into the PostHog data warehouse via the [1Password Events API](https://developer.1password.com/docs/events-api/), so you can join access and audit data with the rest of your analytics for security monitoring and compliance reporting.

## Prerequisites

The Events API requires a **1Password Business or Enterprise plan**. You need to be an owner or administrator of the 1Password account to set up an Events Reporting integration.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to 1Password.
3. [Set up an Events Reporting integration](https://support.1password.com/events-reporting/) in your 1Password admin console and issue a bearer token. Scope the token to the event types you want to sync: sign-in attempts, item usages, and audit events. Tables whose event type isn't included in the token can't be synced.
4. Paste the token into the **Events Reporting token** field.
5. Select the **Account region** matching where your 1Password account is hosted (1Password.com, 1Password.ca, 1Password.eu, or 1Password Enterprise) – the Events API is served from a region-specific address.
6. Click **Next**, select the tables you want to sync, set the sync method and frequency, then click **Import**.

## Available tables

| Table              | Description                                                                                                        | Sync method |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| `sign_in_attempts` | Sign-in attempt events: who attempted to sign in, from which client and IP address, and the cause of any failure   | Incremental |
| `item_usages`      | Item usage events in shared vaults: which item was accessed or used, by whom, and from which client                | Incremental |
| `audit_events`     | Admin audit events: administrative actions performed by team members, including the type and object of each action | Incremental |

All three tables support **incremental** sync on the event's `timestamp`, using the API's server-side `start_time` filter. Events are immutable, so incremental sync is the recommended mode. The first sync pulls up to a year of retained history.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized** – the bearer token is invalid, revoked, or doesn't include the event type for the table being synced (1Password returns 401 for both cases). Issue a new token with the required event types in your 1Password admin console and reconnect. Also check that the selected account region matches where your account is hosted.
- **A table shows a permission warning in the schema picker** – the token wasn't issued with that event type. Issue a new token that includes it, or deselect the table.
