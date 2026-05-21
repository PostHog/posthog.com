---
title: Linking RevenueCat as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: RevenueCat
---

The RevenueCat connector syncs your in-app purchase and subscription data into PostHog. It pulls customers, products, entitlements, offerings, and apps via the REST API, and captures subscription events in real time via webhooks.

## Prerequisites

You need:

1. A [RevenueCat v2 secret API key](https://app.revenuecat.com/projects/_/api-keys) with read access to customers, products, entitlements, offerings, apps, and integrations (read/write for automatic webhook setup)
2. Your RevenueCat project ID (found in your dashboard URL: `app.revenuecat.com/projects/<project_id>`)

## Adding the source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select **RevenueCat**.
3. Enter your **Secret API key** (starts with `sk_`).
4. Enter your **Project ID**.
5. (Optional) Add a prefix to your table names.
6. Select the tables you want to import.
7. Click **Import**.

## Available tables

### API tables

These tables sync from RevenueCat's REST API:

| Table | Description |
|-------|-------------|
| `customers` | Customer records with app user IDs and attributes |
| `products` | Products configured in RevenueCat |
| `entitlements` | Entitlements that unlock premium features |
| `offerings` | Offerings that group products for display |
| `apps` | App configurations in your project |

### Webhook table

| Table | Description |
|-------|-------------|
| `events` | Real-time subscription and purchase events |

The `events` table captures all RevenueCat webhook events including initial purchases, renewals, cancellations, billing issues, refunds, and more. This requires setting up the webhook integration.

## Configuration

<SourceParameters />

## Setting up webhooks for real-time events

RevenueCat's REST API doesn't expose a historical events endpoint, so webhooks are the only way to capture subscription activity (purchases, renewals, cancellations, etc.). We recommend enabling webhooks for any RevenueCat source where you want to track subscription lifecycle events.

### Automatic webhook setup

When you create the source, PostHog tries to register a webhook integration in RevenueCat automatically. If it succeeds, you need to complete one additional step:

1. Go to your RevenueCat source in the [Data pipeline sources tab](https://app.posthog.com/data-management/sources).
2. Click the **Webhook** tab.
3. Enter an **Authorization header value** (for example, `Bearer my-secret-value`). This can be any secret string you choose.
4. Click **Save**.

RevenueCat doesn't sign webhook deliveries with HMAC. Instead, it sends a custom `Authorization` header on every request. PostHog verifies that the header matches the value you configure here.

### Manual webhook setup

If automatic registration fails (for example, if your API key lacks integrations write permission), you can create the webhook manually:

1. Go to your RevenueCat source in PostHog and click the **Webhook** tab. Copy the **Webhook URL**.
2. In RevenueCat, go to your **Project** > **Integrations** > **+ New** > **Webhook**.
3. Paste the PostHog webhook URL into the **Webhook URL** field.
4. Generate a secret value and enter it in the **Authorization header** field.
5. Under **Send events**, select **All events**.
6. Click **Save**.
7. Back in PostHog, paste the same authorization header value into the **Authorization header value** field and save.

## Sync behavior

### API tables

The API tables (customers, products, entitlements, offerings, apps) sync using full refresh. RevenueCat's API doesn't support filtering by modification date, so PostHog re-downloads all records on each sync.

### Events table

The events table is webhook-only. Events appear in real time as RevenueCat sends them. There's no historical backfill for events that occurred before the webhook was configured.

## Event types

The `events` table captures all RevenueCat webhook event types:

- `INITIAL_PURCHASE` - First purchase of a subscription or non-consumable
- `RENEWAL` - Subscription renewed
- `CANCELLATION` - Subscription cancelled (may still be active until period ends)
- `UNCANCELLATION` - Cancellation reversed
- `NON_RENEWING_PURCHASE` - One-time purchase
- `SUBSCRIPTION_PAUSED` - Subscription paused
- `EXPIRATION` - Subscription expired
- `BILLING_ISSUE` - Payment failed
- `PRODUCT_CHANGE` - Subscriber changed products
- `TRANSFER` - Subscription transferred between users
- `SUBSCRIPTION_EXTENDED` - Subscription extended (e.g., support grant)
- `TEMPORARY_ENTITLEMENT_GRANT` - Temporary access granted
- `REFUND_REVERSED` - Refund reversed
- `INVOICE_ISSUANCE` - Invoice issued
- `VIRTUAL_CURRENCY_TRANSACTION` - Virtual currency event
- `EXPERIMENT_ENROLLMENT` - User enrolled in a RevenueCat experiment
