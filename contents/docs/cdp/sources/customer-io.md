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

The Customer.io connector syncs your Customer.io workspace data into PostHog. It combines two data streams:

- **App API tables**: Campaigns, broadcasts, segments, newsletters, and other workspace configuration pulled via the Customer.io App API
- **Webhook event tables**: Real-time message delivery events streamed via [Reporting Webhooks](https://customer.io/docs/journeys/reporting-webhooks/)

## Available tables

### App API tables

These tables sync from the Customer.io App API and contain your workspace configuration:

| Table | Description |
| ----- | ----------- |
| `broadcasts` | One-time broadcast messages |
| `campaigns` | Automated campaign definitions |
| `collections` | Data collections used for personalization |
| `newsletters` | Newsletter definitions |
| `object_types` | Custom object type definitions |
| `segments` | Audience segments |
| `sender_identities` | Verified sender email addresses |
| `snippets` | Reusable content snippets |
| `subscription_topics` | Subscription topic definitions |
| `transactional` | Transactional message templates |

### Webhook event tables

These tables receive real-time event data via webhooks:

| Table | Description |
| ----- | ----------- |
| `customer_events` | Customer subscription and preference change events |
| `email_events` | Email delivery, open, click, bounce, and complaint events |
| `push_events` | Push notification delivery and interaction events |
| `sms_events` | SMS delivery and status events |
| `in_app_events` | In-app message display and interaction events |
| `slack_events` | Slack message delivery events |
| `webhook_events` | Custom webhook delivery events |

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Customer.io by clicking the **Link** button.
3. Enter your **App API key**. Generate one in Customer.io under [Settings > API Credentials > App API Keys](https://fly.customer.io/settings/api_credentials?keyType=app).
4. Select your **Region** (US or EU) to match your Customer.io workspace.
5. Click **Next** to proceed to table selection and webhook setup.

## Setting up the webhook

PostHog automatically registers a reporting webhook in your Customer.io workspace using your App API key. This webhook streams message delivery events to PostHog in real time.

### Adding the signing key

Customer.io doesn't return the signing key when creating webhooks via API, so you need to copy it manually:

1. In Customer.io, go to **Data & Integrations** > **Integrations** > **Reporting Webhooks**.
2. Find the webhook named **PostHog data warehouse** and click to view details.
3. Copy the **Signing key**.
4. In PostHog, go to the **Webhook** tab on your Customer.io source.
5. Paste the signing key and click **Save**.

PostHog uses HMAC-SHA256 signature verification to authenticate incoming webhook requests. Events with invalid signatures are rejected.

### Manual webhook setup

If auto-registration fails (for example, if your App API key lacks reporting webhook permissions), you can create the webhook manually:

1. In PostHog, go to your Customer.io source and click the **Webhook** tab. Copy the **webhook URL**.
2. In Customer.io, go to **Data & Integrations** > **Integrations** > [**Reporting Webhooks**](https://fly.customer.io/settings/webhooks/new/reporting_webhook).
3. Click **Add Reporting Webhook**.
4. Paste the PostHog webhook URL into the **Endpoint URL** field.
5. Select the events you want to track (customer, email, push, sms, in-app, slack, webhook).
6. Click **Save**.
7. Copy the **Signing key** and add it to PostHog as described above.

## Syncing

App API tables sync on a schedule like other data warehouse sources. You can configure the sync frequency and trigger manual syncs from the source settings.

Webhook event tables receive data in real time as events happen in Customer.io. There's no sync schedule for webhook data.

You can see sync status, event delivery metrics, and errors in the **Metrics** tab of your Customer.io source.

### Disabling and re-enabling

If you disable the Customer.io source in PostHog:
- App API syncs stop running
- The webhook stops accepting events immediately
- Any events Customer.io sends while the source is disabled are lost

When you re-enable the source, PostHog resumes syncing but can't recover missed webhook events from the disabled period.
