---
title: Linking commercetools as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Commercetools
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

The commercetools source is currently in alpha. It has been tested against the commercetools API documentation but not yet battle-tested with live production workloads. If you run into issues, please let us know.

</CalloutBox>

The commercetools connector syncs your commerce data into PostHog, including orders, customers, payments, carts, product projections, categories, discount codes, and inventory.

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select commercetools by clicking the **Link** button.
3. Select your **Region** from the dropdown. This must match the region your commercetools project is hosted in:

| Label                                 | Value                      |
| ------------------------------------- | -------------------------- |
| North America (GCP, us-central1)      | `us-central1.gcp`          |
| North America (AWS, us-east-2)        | `us-east-2.aws`            |
| Europe (GCP, europe-west1)            | `europe-west1.gcp`         |
| Europe (AWS, eu-central-1)            | `eu-central-1.aws`         |
| Australia (GCP, australia-southeast1) | `australia-southeast1.gcp` |

4. Enter your **Project key**. You can find this in the commercetools Merchant Center under **Settings** > **Developer settings**, or on the API client details page alongside your generated credentials.
5. Enter your **Client ID** and **Client secret**. These come from an API client you create in the Merchant Center (see [Creating an API client](#creating-an-api-client) below).
6. Select the tables you want to import.
7. Click **Import**.

The data warehouse then starts syncing your commercetools data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Creating an API client

To connect commercetools to PostHog, create a dedicated API client with read-only scopes:

1. In the commercetools Merchant Center, go to **Settings** > **Developer settings**.
2. Click **Create new API client**.
3. Give it a descriptive name (e.g., "PostHog sync").
4. Grant the following **view** scopes depending on which tables you want to sync:

| Table                 | Required scope        |
| --------------------- | --------------------- |
| `orders`              | `view_orders`         |
| `customers`           | `view_customers`      |
| `payments`            | `view_payments`       |
| `carts`               | `view_orders`         |
| `product_projections` | `view_products`       |
| `categories`          | `view_categories`     |
| `discount_codes`      | `view_discount_codes` |
| `inventory`           | `view_products`       |

5. Click **Create API client**.
6. Copy the **Client ID**, **Client secret**, **Project key**, and **Region** – you'll need all four when linking the source in PostHog.

<CalloutBox icon="IconWarning" title="Save your client secret" type="caution">

The client secret is only shown once when you create the API client. If you lose it, you'll need to create a new API client.

</CalloutBox>

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync modes

commercetools tables support both incremental and full refresh syncing:

- **Incremental** – Only imports records modified since the last sync, using the `lastModifiedAt` field. This is the most efficient option for ongoing syncs.
- **Full refresh** – Re-imports all records from commercetools on every sync.

All tables also support append-only syncing, which adds new records without updating existing ones.

When you enable incremental sync for a table, the first sync performs a full import to establish a baseline. Subsequent syncs only fetch records where `lastModifiedAt` is at or after the last synced value.

## Available tables

All tables use `id` as the primary key and partition data by `createdAt` (monthly).

| Table                 | Description                           |
| --------------------- | ------------------------------------- |
| `orders`              | Customer orders and their line items  |
| `customers`           | Customer accounts and profiles        |
| `payments`            | Payment transactions                  |
| `carts`               | Active and inactive shopping carts    |
| `product_projections` | Product catalog data (projected view) |
| `categories`          | Product category hierarchy            |
| `discount_codes`      | Promotional discount codes            |
| `inventory`           | Stock levels across supply channels   |
