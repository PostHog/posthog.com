---
title: Linking BigQuery as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

You can connect your BigQuery tables to PostHog by configuring it as a source. You must grant a limited set of permissions so the connector can create, query, and delete temporary tables without exposing your entire BigQuery environment.

## Requirements

- [A Google Cloud Service Account](https://cloud.google.com/iam/docs/service-account-overview) with the permissions described below
- Google Cloud JSON Key file for that account's Dataset ID
- (Optional) A Dataset ID for temporary tables

## Configuring BigQuery

To securely connect your BigQuery account to PostHog, create a dedicated service account with the minimum required permissions:

1. **Create a service account:**
- Go to the [**Google Cloud Console.**](https://console.cloud.google.com/)
- Navigate to **IAM & Admin > Service Accounts.**
- Click **Create Service Account.**
- Provide a descriptive name (e.g., `bigquery-posthog-service-account`) and a brief description.
2. **Assign required permissions:**
- For simplicity, you can assign the **BigQuery Data Editor** and **BigQuery Job User** roles if it meets your security requirements.
- Alternatively, create a custom role that includes only these permissions:
    ```
    bigquery.datasets.get
    bigquery.jobs.create
    bigquery.tables.get
    bigquery.tables.list
    bigquery.tables.getData
    bigquery.tables.create
    bigquery.tables.updateData
    bigquery.tables.delete
    ```
3. **Generate and download the service account key:**
- Once the service account is created, click on it and select the **Keys** tab.
- Click **Add Key > Create new key**, choose **JSON**, and download the key file.
- **Important:** Store the JSON key securely, as it contains sensitive credentials.

## How to link

1. Go to the [Data pipeline page](https://us.posthog.com/pipeline/sources) and the sources tab in PostHog
2. Click **New source** and select BigQuery
3. Drag or drop the **Google Cloud JSON Key file** to upload
4. Enter the **Dataset ID** you want to import
5. (Optional) If you're limiting permissions to the service account provided, enter a Dataset ID for temporary tables
6. (Optional) Add a prefix for the table name

## How it works

PostHog creates and deletes [temporary tables](https://cloud.google.com/bigquery/docs/writing-results#temporary_and_permanent_tables) when querying your data. This is necessary for handling large BigQuery tables.
Temporary tables help break down large data processing tasks into manageable chunks. However, they incur storage and query costs in BigQuery while they exist. We delete them as soon as the job is done.

### Costs

We minimize BigQuery costs by keeping queries to a minimum and deleting temporary tables immediately after use. Although the connector automates temporary table management, check [BigQuery’s pricing](https://cloud.google.com/bigquery/pricing) for details on storage and query costs.