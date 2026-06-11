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

The RevenueCat connector syncs your in-app subscription data into PostHog, including customers, products, entitlements, offerings, and apps. With webhooks enabled, PostHog also receives subscription and purchase events in real time.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select RevenueCat by clicking the **Link** button.
3. You need a **v2 secret API key** from RevenueCat. In your RevenueCat dashboard, go to **Developer tools** > **API keys** and create a new secret API key (it starts with `sk_...`). Grant the key the following permissions:

   | Resource     | Required permission |
   | ------------ | ------------------- |
   | Customers    | Read                |
   | Products     | Read                |
   | Entitlements | Read                |
   | Offerings    | Read                |
   | Apps         | Read                |
   | Integrations | Read + Write        |

   The **Integrations** write permission is required so PostHog can automatically register a webhook for real-time event syncing. If you don't grant write access, you can still [set up the webhook manually](#creating-the-webhook-manually-in-revenuecat).

4. Enter your **Project ID**. This starts with `proj` (e.g., `proj1a2b3c4d5e`). Find it in your RevenueCat dashboard URL: `app.revenuecat.com/projects/<project_id>`. Pasting the full URL works too.
5. _Optional:_ Add a prefix to your table names.
6. Click **Next**.

> **Tip:** If you see a "project not found" error, check that your API key has access to the project you entered. PostHog shows which project IDs your key can reach so you can correct the value and reconnect.

The data warehouse then starts syncing your RevenueCat data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

> RevenueCat has aggressive rate limits, especially on initial syncs. Your first sync may take longer than expected. Subsequent syncs are faster.

## Configuration

<SourceParameters />

## Setting up webhooks for real-time syncing

Webhook syncing gives you real-time visibility into subscription and purchase events. Without it, you only get periodic snapshots of your RevenueCat data through API syncs.

### Creating a webhook

1. Go to your RevenueCat source in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).
2. Click the **Webhook** tab.
3. Enter an **Authorization header** value. This is a secret string that RevenueCat includes in every webhook request so PostHog can verify it's authentic.
4. Click **Create webhook**.

PostHog calls the RevenueCat API to register a webhook endpoint, using the authorization header value you provided. Once set up, the **Webhook** tab shows the webhook status so you can confirm events are flowing.

### Creating the webhook manually in RevenueCat

If automatic webhook creation fails (for example, because your API key doesn't have write access to integrations), you can create the webhook yourself:

1. In PostHog, go to the **Webhook** tab on your RevenueCat source and copy the **webhook URL**.
2. In your RevenueCat project dashboard, go to **Integrations** > **+ New** > **Webhook**.
3. Paste the PostHog webhook URL into the **Webhook URL** field.
4. Set the **Authorization header** to a secret value. RevenueCat sends this value in the `Authorization` header of every webhook request.
5. Under **Events**, select **All events**.
6. Click **Save**.
7. Back in PostHog, paste the same authorization header value into the **Authorization header** field on the **Webhook** tab and save. PostHog uses this to verify that incoming events really came from RevenueCat.

## Synced tables

The RevenueCat connector syncs the following tables:

| Table        | Sync method  | Description                                     |
| ------------ | ------------ | ----------------------------------------------- |
| Customers    | Full refresh | Customer profiles including subscription status |
| Products     | Full refresh | Products configured in RevenueCat               |
| Entitlements | Full refresh | Access entitlements granted to customers        |
| Offerings    | Full refresh | Product offerings and packages                  |
| Apps         | Full refresh | Connected app store apps                        |
| Events       | Webhook      | Real-time subscription and purchase events      |

API-synced tables (customers, products, entitlements, offerings, and apps) use full refresh sync – PostHog re-downloads all rows on each sync. The events table is populated exclusively through webhooks and doesn't backfill historical events.
