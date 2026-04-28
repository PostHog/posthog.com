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

The Customer.io connector syncs your Customer.io messaging data into PostHog, including email, push notifications, SMS, in-app messages, Slack messages, webhooks, and customer events.

Unlike most data warehouse sources, Customer.io uses webhook-based ingestion exclusively. Customer.io doesn't expose a pull API for messaging activity. Instead, it streams events in real time via [Reporting Webhooks](https://customer.io/docs/journeys/reporting-webhooks/).

## Available tables

Customer.io sends one event type per message channel. Each maps to a separate table in your data warehouse:

| Table | Description |
| ----- | ----------- |
| `email` | Email delivery, open, click, bounce, and complaint events |
| `push` | Push notification delivery and interaction events |
| `sms` | SMS delivery and status events |
| `in_app` | In-app message display and interaction events |
| `slack` | Slack message delivery events |
| `webhook` | Custom webhook delivery events |
| `customer` | Customer attribute and lifecycle events |

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Customer.io by clicking the **Link** button.
3. Click **Next** to proceed to webhook setup.

Because Customer.io streams data via webhooks, you don't need API credentials to create the source. You'll configure the connection during webhook setup.

## Setting up the webhook

Customer.io requires manual webhook configuration in their dashboard. PostHog can't create the webhook automatically because Customer.io doesn't offer a webhook management API.

### Creating the webhook in Customer.io

1. In PostHog, go to your Customer.io source and click the **Webhook** tab. Copy the **webhook URL** shown there.
2. Open your [Customer.io workspace](https://fly.customer.io/settings/webhooks/new/reporting_webhook) and go to **Data & Integrations** > **Integrations** > **Reporting Webhooks**.
3. Click **Add Reporting Webhook**.
4. Paste the PostHog webhook URL into the **Endpoint URL** field.
5. Select the events you want to track. You can choose:
   - **All events** to capture everything
   - **Selected events** to pick specific message types (email, push, sms, in-app, slack, webhook, customer)
6. Click **Save**.

### Adding the signing key

After creating the webhook, Customer.io displays a **Signing key** on the webhook details page. PostHog uses this key to verify that incoming events came from Customer.io.

1. Copy the signing key from Customer.io.
2. In PostHog, go to the **Webhook** tab on your Customer.io source.
3. Paste the signing key into the **Signing key** field.
4. Click **Save**.

PostHog uses HMAC-SHA256 signature verification to authenticate every incoming webhook request. Events with invalid signatures are rejected.

## Syncing

Once the webhook is configured, Customer.io streams events to PostHog in real time. There's no sync schedule to configure – data arrives as events happen.

You can see event delivery status and errors in the **Metrics** tab of your Customer.io source.

### Disabling and re-enabling

If you disable the Customer.io source in PostHog:
- The webhook stops accepting events immediately
- Any events Customer.io sends while the source is disabled are lost

When you re-enable the source, PostHog resumes accepting events but can't recover missed events from the disabled period.
