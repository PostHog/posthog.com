---
title: Linking Clerk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clerk
---

The Clerk connector can link users, organizations, organization memberships, and invitations to PostHog. The `users`, `organizations`, and `organization_memberships` tables also support [webhook syncing](#setting-up-webhooks-for-real-time-syncing) for near-real-time updates.

## Choosing a sync mode

Clerk tables can be synced in one of two modes:

- **Webhook sync (recommended for supported tables).** Clerk pushes events to PostHog in real time, so creates and updates land within seconds. This is the only way to get near-real-time Clerk data because the Clerk API doesn't support filtering by `updated_at`. Available for the `users`, `organizations`, and `organization_memberships` tables. See [Setting up webhooks for real-time syncing](#setting-up-webhooks-for-real-time-syncing) below.
- **Full refresh sync.** PostHog re-downloads every row each sync. This is the only option for tables that don't support webhooks. The larger your Clerk instance gets, the slower and more costly each sync becomes.

> Webhook sync does not remove deleted records. Clerk delete events (`user.deleted`, `organization.deleted`) only carry the record ID, so PostHog cannot match them to existing rows. To remove deleted records, resync the table.

To link Clerk:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Clerk.

3. Next, you need a secret key from Clerk. Go to your [API keys settings](https://dashboard.clerk.com/last-active?path=api-keys) in Clerk. Copy the **Secret key** value.

4. Back in PostHog, paste the secret key in the `Secret key` field and click **Next**.

5. On the next page, set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Clerk data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Setting up webhooks for real-time syncing

Webhook syncing is the recommended mode for `users`, `organizations`, and `organization_memberships`. Without it, every sync is a full refresh that re-downloads all rows.

Clerk does not support automatic webhook creation, so you need to set up the webhook manually in the Clerk Dashboard.

1. In PostHog, go to your Clerk source in the [data pipeline sources tab](https://app.posthog.com/data-management/sources) and click the **Webhook** tab. Copy the **webhook URL** shown there.
2. In the [Clerk Dashboard](https://dashboard.clerk.com/), go to **Configure** > **Webhooks** and click **Add Endpoint**.
3. Paste the PostHog webhook URL into the **Endpoint URL** field.
4. Subscribe to the events for the tables you want to sync (see table below).
5. Save the endpoint, then click on it to reveal the **Signing Secret** (it starts with `whsec_`).
6. Back in PostHog, paste the signing secret into the **Signing secret** field on the **Webhook** tab and save.

### Which events to subscribe to

| PostHog table              | Clerk webhook events                                               |
| -------------------------- | ------------------------------------------------------------------ |
| `users`                    | `user.created`, `user.updated`                                     |
| `organizations`            | `organization.created`, `organization.updated`                     |
| `organization_memberships` | `organizationMembership.created`, `organizationMembership.updated` |

> Do **not** subscribe to delete events (`user.deleted`, `organization.deleted`, etc.). They only carry the record ID and cannot be processed. To remove deleted records, resync the table.
