---
title: Linking Customer.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CustomerIO
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Connect your Customer.io workspace using an App API key. PostHog uses the key to pull campaigns, broadcasts, segments, newsletters, and more, and to register a reporting webhook for realtime message activity.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Customer.io.
3. Generate an **App API key** in Customer.io under **API Credentials > App API Keys**. PostHog uses this key both to pull the list endpoints and to manage the reporting webhook automatically. Also note your workspace **Region** — **US** (`api.customer.io`) or **EU** (`api-eu.customer.io`).
4. Back in PostHog, paste the App API key in the **App API key** field, select your **Region**, and click **Next**.
5. To capture realtime message activity, PostHog tries to register a reporting webhook for you using your App API key. Customer.io doesn't return the signing key in the API response, so copy the **Signing key** from the **Reporting Webhooks** page in Customer.io (under **Integrations**) and paste it into the **Signing key** field. If auto-registration failed, add a **Reporting Webhook** integration manually in Customer.io, paste the webhook URL PostHog shows, select the events you want, save and enable it, then copy the signing key.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Customer.io data in PostHog.

## Available tables

The App API list endpoints sync via full refresh, and the webhook-backed event tables capture realtime message activity from Customer.io's reporting webhook.

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `broadcasts` | Broadcasts in your workspace | Full refresh |
| `campaigns` | Campaigns in your workspace | Full refresh |
| `collections` | Collections (data sets) | Full refresh |
| `newsletters` | Newsletters | Full refresh |
| `object_types` | Object type definitions | Full refresh |
| `segments` | Segments | Full refresh |
| `sender_identities` | Sender identities | Full refresh |
| `snippets` | Reusable content snippets | Full refresh |
| `subscription_topics` | Subscription topics | Full refresh |
| `transactional` | Transactional messages | Full refresh |
| `customer_events` | Customer subscription activity from the reporting webhook | Webhook |
| `email_events` | Email delivery activity from the reporting webhook | Webhook |
| `push_events` | Push notification activity from the reporting webhook | Webhook |
| `sms_events` | SMS delivery activity from the reporting webhook | Webhook |
| `in_app_events` | In-app message activity from the reporting webhook | Webhook |
| `slack_events` | Slack message activity from the reporting webhook | Webhook |
| `webhook_events` | Webhook delivery activity from the reporting webhook | Webhook |

**Full refresh** tables reload all data on each sync. **Webhook** tables are populated in realtime as Customer.io sends reporting-webhook events to PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
