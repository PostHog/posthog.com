---
title: Linking Attentive as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Attentive
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Connect your Attentive account using a private app API key. Attentive's public API is write-oriented with no bulk read endpoints, so all tables are populated from webhook events as they happen. History before the connection date is not backfilled.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Attentive.
3. Generate an API key in Attentive by going to **Marketplace** > **Create app** and creating a private app. No OAuth is required.
4. Back in PostHog, paste the API key in the **API key** field and click **Next**.
5. PostHog tries to register a webhook for you using your API key. The webhook is initially disabled until you provide the signing key. Attentive doesn't return the signing key in the API response, so copy the **signing key** from the webhook's settings page in Attentive and paste it into the **Signing key** field in PostHog. Once the signing key is saved, PostHog enables the webhook automatically.
6. If auto-registration failed, set the webhook up manually:
   1. In Attentive, go to **Marketplace** > your private app > **Webhooks**.
   2. Paste the webhook URL PostHog shows into the **Destination URL** field.
   3. Select the events you want to track (SMS, email, custom attributes).
   4. Save the webhook, then copy its **signing key** and paste it into PostHog.
7. Select the tables you want to sync, then click **Import**.

Once setup is complete, tables begin populating as Attentive delivers webhook events to PostHog.

## Available tables

All tables are webhook-backed. They populate forward from the moment the source is connected — there is no historical backfill.

| Table                      | Description                 | Sync method |
| -------------------------- | --------------------------- | ----------- |
| `sms_subscribed`           | SMS subscription events     | Webhook     |
| `sms_sent`                 | SMS sent events             | Webhook     |
| `sms_message_link_click`   | SMS link click events       | Webhook     |
| `email_subscribed`         | Email subscription events   | Webhook     |
| `email_unsubscribed`       | Email unsubscription events | Webhook     |
| `email_opened`             | Email opened events         | Webhook     |
| `email_message_link_click` | Email link click events     | Webhook     |
| `custom_attribute_set`     | Custom attribute events     | Webhook     |

Each row includes a synthetic `event_id` (a hash of the full payload for deduplication) and a `created_at` column derived from Attentive's millisecond timestamp for partitioning.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
