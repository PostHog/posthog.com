---
title: Linking GoCardless as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GoCardless
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The GoCardless connector syncs your bank debit payments data into PostHog, including customers, mandates, payments, subscriptions, payouts, refunds, and events.

## Linking GoCardless

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to GoCardless.

3. Select your **Environment** — either **Live** or **Sandbox**. Sandbox and live environments use separate API hosts and tokens, so make sure the environment matches your token.

4. You need an access token from GoCardless. In your [GoCardless dashboard](https://manage.gocardless.com/developers), go to **Developers** > **Create** > **Access token**. Copy the token value.

5. Back in PostHog, paste your access token into the **Access token** field.

6. Click **Next**.

7. Select the schemas you want to sync and configure the sync method and frequency. Click **Import**.

Once the syncs are complete, you can start using GoCardless data in PostHog.

## Available tables

| Table         | Description                         | Sync mode    |
| ------------- | ----------------------------------- | ------------ |
| customers     | Customer records                    | Full refresh |
| mandates      | Bank mandate authorizations         | Full refresh |
| payments      | Payment transactions                | Full refresh |
| subscriptions | Recurring payment subscriptions     | Full refresh |
| payouts       | Payouts to your bank account        | Full refresh |
| refunds       | Refund records                      | Full refresh |
| events        | Change log of all GoCardless events | Incremental  |

## Sync modes

Only the `events` table supports incremental syncing. All other tables use full refresh.

This is because the GoCardless API only supports filtering on `created_at` — there's no `updated_at` filter. Since core records like payments, mandates, and subscriptions mutate their status over time, an incremental sync based on `created_at` alone would miss those changes.

The `events` table is GoCardless's append-only change log, making it the only table where incremental sync reliably captures all data. This is the same pattern used by other GoCardless connectors like Fivetran.

## Configuration

<SourceParameters />
