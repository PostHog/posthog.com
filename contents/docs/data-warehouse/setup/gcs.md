---
title: Linking Google Cloud Storage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

You can sync and query files and folders from Google Cloud Storage (GCS) in PostHog by setting up a link.

## Step 1: Creating a bucket in GCS

1. Go to your Google Cloud console.
2. Create a bucket in GCS. 
    - For location, we recommend choosing `us-east1` for US Cloud or `europe-west3` for EU Cloud to keep them close to our servers.
    - For storage class, choose `Standard`.
    - For access control, choose `Uniform`.
3. Upload your data to the bucket. This can be as simple as a `.csv` file like this:

```csv
name,age
John,30
Jane,25
```

## Step 2: Set up a service account

GCS uses service accounts to control access to resources. We need one to connect to GCS. To create one:

1. Go to the [service accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts) in the GCS console and click **Create service account**.
2. Fill in the account name and ID and click **Create and continue**.
3. Grant the account the **Storage Object User** role.
4. Click **Done**.

## Step 3: Set up access keys.

1. Go to the [cloud storage settings page](https://console.cloud.google.com/storage/settings) and click the **Interoperability** tab.
2. Click **Create a key for another service account**.
3. Select the service account you created in step 2 and click **create key**.
4. Copy both the access key and secret. Save them some place safe because you'll need to regenerate them if you lose them.

![Access keys](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_17_at_12_57_42_2x_ace42b1d0e.png)

## Step 4: Create the table in PostHog

1. Go to the [Data pipeline page](https://us.posthog.com/pipeline/sources) and the sources tab in PostHog
2. Click **New source**. Under self managed, look for **Google Cloud Storage** and click **Link**
3. Fill the table name, then use the data from GCS: 
    - For files URL pattern, use `https://storage.googleapis.com/` followed by your bucket and file or folder name like `https://storage.googleapis.com/posthog-warehouse/july12_google_ads_fixed.csv`. You can also use `*` to query multiple files.
    - Chose the correct file format
    - For access key, use your Access Key ID
    - For secret key, use your Secret Access Key
4. Click **Next**

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_17_at_13_03_25_2x_0ec0ddecaf.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_17_at_13_03_43_2x_465b2300b3.png"
    alt="left hand navigation for cohorts" 
    classes="rounded"
/>

## Step 5: Query the table

Once it is done syncing, you can now [query](/docs/data-warehouse/query) your new table using the table name.