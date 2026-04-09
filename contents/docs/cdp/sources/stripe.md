---
title: Linking Stripe as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Stripe
---

The Stripe connector syncs your Stripe data into PostHog, including charges, customers, invoices, products, subscriptions, and more.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Stripe by clicking the **Link** button.
3. Choose your authentication method:

### Option 1: OAuth (recommended)

1. Select **OAuth connection** as the authentication type.
2. Click the **Connect** button and follow the prompts to authorize PostHog with your Stripe account.
3. _Optional:_ Add your Stripe Account ID. You can find it by going to **Settings** > **Business**, selecting the [Account details](https://dashboard.stripe.com/settings/account) tab, and clicking your **Account ID** or pressing `⌘` + `I` to copy your ID.
4. _Optional:_ Add a prefix to your table names.
5. Click **Next**.

### Option 2: Restricted API key

If you prefer not to use OAuth, you can connect using a restricted API key instead.

1. Select **Restricted API key** as the authentication type.
2. Head to your Stripe dashboard > **Developers** > **API keys**, under **Restricted keys**, click [+ Create a restricted key](https://dashboard.stripe.com/apikeys/create). You need to give your API key the following **Read** permissions:

| Resource Type | Required Read Permissions                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| Core          | Balance transaction sources, Charges and refunds, Customers, Disputes, Payment methods, Payouts, Products |
| Billing       | Credit notes, Invoices, Prices, Subscriptions                                                             |
| Connect       | Click **Read** in the **Connect** header                                                                  |

If you aren't concerned with giving us more permissions than necessary, you can also simply click **Read** on the **Core**, **Billing**, and **Connect** headers to give us the necessary permissions.

If your Stripe account is in a language other than English, we suggest you update it to English before following the steps above to guarantee the correct permissions are set.

3. Paste your API key into PostHog.
4. _Optional:_ Add your Stripe Account ID. You can find it by going to **Settings** > **Business**, selecting the [Account details](https://dashboard.stripe.com/settings/account) tab, and clicking your **Account ID** or pressing `⌘` + `I` to copy your ID.
5. _Optional:_ Add a prefix to your table names.
6. Click **Next**.

> For Stripe tables, incremental syncs only sync new records and don't update existing records. This is a limitation of the Stripe API. To get real-time updates including changes to existing records, [set up webhooks](#setting-up-webhooks-for-real-time-syncing).

The data warehouse then starts syncing your Stripe data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Setting up webhooks for real-time syncing

By default, Stripe data syncs on a schedule. You can set up webhooks to get real-time updates instead, including changes to existing records.

To set up a webhook:

1. Go to your Stripe source in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).
2. Click the **Webhook** tab.
3. Click **Create webhook**.

PostHog automatically creates and registers the webhook on your Stripe account. Once set up, you can view the webhook status, including both PostHog's internal status and the Stripe-side webhook status, from the **Webhook** tab.
