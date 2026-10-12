---
title: Linking GCP Cloud Billing as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GcpCloudBilling
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The GCP Cloud Billing connector syncs your Google Cloud Platform billing data into the PostHog data warehouse, including billing accounts, projects, subaccounts, services, SKUs, and budgets.

> **Note:** This source is currently in **alpha**.

## Prerequisites

- A [Google Cloud service account](https://cloud.google.com/iam/docs/service-account-overview) with billing permissions
- A service account JSON key file
- The [Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com) enabled in your Google Cloud project
- The [Cloud Billing Budget API](https://console.cloud.google.com/apis/library/billingbudgets.googleapis.com) enabled (required for syncing budgets)

## Configuring Google Cloud

### Step 1: Create a service account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **IAM & Admin** > **Service Accounts**.
3. Click **Create Service Account**.
4. Provide a descriptive name (e.g., `posthog-billing-reader`) and click **Create and continue**.

### Step 2: Grant billing permissions

Grant the service account the **Billing Account Viewer** role (`roles/billing.viewer`) on each billing account you want to sync. This provides read access to billing accounts, linked projects, services, and budgets.

For organization-wide access, grant the role at the organization level. For specific billing accounts, grant the role on each billing account individually.

Alternatively, create a custom role with just these permissions:

- `billing.accounts.list` – list billing accounts
- `billing.accounts.get` – read billing account details
- `billing.resourceAssociations.list` – list projects linked to billing accounts
- `billing.budgets.get` and `billing.budgets.list` – read budgets

### Step 3: Generate a JSON key file

1. In **IAM & Admin** > **Service Accounts**, click your service account.
2. Go to the **Keys** tab.
3. Click **Add Key** > **Create new key**, choose **JSON**, and download the key file.
4. Store the key file securely – you can't download it again.

### Step 4: Enable the APIs

1. Enable the [Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com).
2. Enable the [Cloud Billing Budget API](https://console.cloud.google.com/apis/library/billingbudgets.googleapis.com).

## Adding a data source

<SourceSetupIntro />

Import billing accounts, project links, subaccounts, budgets, and the public price catalog from Google Cloud Platform. Upload the service account JSON key file you created above.

You'll be asked for:

- **Service account JSON key file** – the JSON key file downloaded in the previous step

## Sync modes

<SyncModes />

All GCP Cloud Billing tables use **full refresh** sync. Each sync replaces the contents of the table because the Cloud Billing API doesn't provide timestamp filters for incremental updates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

| Table              | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `billing_accounts` | Billing accounts accessible to the service account                  |
| `projects`         | Projects linked to each accessible billing account                  |
| `sub_accounts`     | Billing subaccounts under each accessible reseller account          |
| `services`         | Google Cloud services in the public price catalog                   |
| `skus`             | Public SKUs and their latest prices in USD for each service         |
| `budgets`          | Budget amounts, cost filters, thresholds, and notification settings |

## Limitations

- The source imports **current public SKU prices in USD only**. Historical pricing isn't available.
- **Negotiated pricing** and committed-use discounts aren't reflected – only public list prices are synced.
- **Detailed cost and usage data** (line-item spend, usage metrics) isn't available through this source. For that, [export your billing data to BigQuery](https://cloud.google.com/billing/docs/how-to/export-data-bigquery) and connect it as a separate [BigQuery source](/docs/cdp/sources/bigquery).

## Troubleshooting

### Invalid service account key

If you see an error about an invalid or missing key:

- Ensure you uploaded the complete JSON key file, not a partial copy or a different file type.
- Generate a fresh key from the [Google Cloud Console](https://console.cloud.google.com/) under **IAM & Admin** > **Service Accounts** > your account > **Keys**.

### Permission denied

If syncing fails with a 403 error:

- Verify the service account has the **Billing Account Viewer** role on the billing accounts you want to sync.
- Confirm both the [Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com) and [Cloud Billing Budget API](https://console.cloud.google.com/apis/library/billingbudgets.googleapis.com) are enabled.
- For organization-level access, grant the role at the organization level rather than on individual projects.

### No billing accounts found

If no data appears after syncing:

- Verify the service account is associated with at least one billing account.
- Check that the Cloud Billing API is enabled in the Google Cloud project that owns the service account.

### Credentials rejected by Google

If you see an error that Google rejected the service account key:

- The key may have been rotated or revoked. Generate a new JSON key file and reconnect the source.
- The service account may have been deleted. Create a new service account and key.

<TroubleshootingLink />
