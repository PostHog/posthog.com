---
title: Linking Stripe as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

The Stripe connector can link charges, customers, invoices, prices, products, subscriptions, and balance transactions to PostHog. 

## Creating a Stripe API key

You need a Stripe API key to create a connector. Head to your Stripe dashboard > **Developers** > **API keys**, under **Restricted keys**, click [+ Create a restricted key](https://dashboard.stripe.com/apikeys/create).

You need to give your API key the following **Read** permissions:

| Resource Type | Required Read Permissions                                |
|--------------|--------------------------------------------------------|
| Core         | Balance transaction sources, Charges, Customer, Product  |
| Billing      | Invoice, Price, Subscription                            |
| Connected    | All resources                                           |

## Adding a data source 

1. In PostHog, go to the [Data pipeline page](https://us.posthog.com/pipeline/sources) select the **Sources** tab.
2. Click **+ New source** button and select Stripe by clicking the **Link** button.
3. In Stripe, get your Account ID by going to **Settings** > **Business**, selecting the [Account details](https://dashboard.stripe.com/settings/account) tab, and clicking your **Account ID** or pressing `⌘` + `I` to copy your ID.
4. Get a your API key from the [previous section](#creating-a-stripe-api-key)
4. *Optional:* Add a prefix to your table names
6. Click **Next**

> For Stripe tables, incremental syncs will only sync new records and not update existing records. This is a limitation of the Stripe API in which it's not possible to query for updated data. 

The data warehouse then starts syncing your Stripe data. You can see details and progress in the [data pipeline sources tab](https://us.posthog.com/pipeline/sources).