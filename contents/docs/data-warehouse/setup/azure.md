---
title: Linking Azure as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

The data warehouse can link to data in your Azure storage accounts.

1. Create an Azure storage account
2. Create a blob container
3. Upload data and link to PostHog

## Step 1: Create an Azure storage account

Firstly, log into Azure and go to Storage Accounts, then create a storage account by following [this Azure guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal#create-a-storage-account). In the "Advanced" section, ensure to check "Allow enabling anonymous access on individual containers."

![enabling anonymous access](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_07_15_at_17_48_56_e83877dec0.png)

## Step 2: Create a blob container

Once the storage account has been created, follow [this guide to create a blob container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container).

When creating the container, ensure you set the "anonymous access level" to Blob (anonymous read access).

![container anonymous access level](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_07_15_at_17_54_36_2bb9d63ebd.png)

### Step 3: Upload data and link to PostHog
[Upload your data to the newly created container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#upload-a-block-blob), Parquet files are the recommended format, but PostHog also work with JSON and CSVs too. 

Find the newly created file via the storage browser menu item. Once found, open the details and find the URL property - copy this to your clipboard, we'll need it when linking to the file in PostHog.

![copy blob file](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_07_15_at_17_59_09_2f888aaa2f.png)

1. In PostHog, open your [Data Warehouse tab](https://us.posthog.com/data-warehouse) and hit **Link source** in the top right corner
2. Select Azure from the self managed section
3. Enter a name for your dataset and paste the copied URL into the "Files URL pattern" box
4. Select the correct format for your data
5. Enter the storage account name (this is name of the storage account you created in step 1)
6. Find and paste your storage account key - you can use [this Azure doc](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys) to view your access keys

![linking your data in posthog](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_07_15_at_18_10_06_f93fadf82b.png)

That's it! You should be able to query the data from the PostHog SQL editor.