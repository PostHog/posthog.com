---
title: Linking Google Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
beta: true
---

You can sync data from all your Google Ads resources by configuring it as a source.

> This source is still under development and is not yet available.

## Requirements
- The [Google Ads customer ID](https://support.google.com/google-ads/answer/1704344) of the account you are trying to sync to Posthog.
- Administrator access to the Google Ads account you want to sync.

## Configure Google Ads

To connect to your Google Ads account, PostHog uses a Google Cloud service account. Thus, you must grant this service account access to your Google Ads account by following these steps:

1. Sign in to your Google Ads account as an administrator.
2. Navigate to **Admin > Access and security**.
3. Click the **+** button under the **Users** tab.

![Screenshot displaying plus button in users tab](https://res.cloudinary.com/dmukukwp6/image/upload/Google_Ads_Screenshot_Plus_a012c89aa6.png)

4. Enter the following service account email into the **Email** field: `google-ads-api@posthog-external.iam.gserviceaccount.com`.
5. Select **Read only** access level.

![Screenshot displaying input of service account email and read only permissions selection](https://res.cloudinary.com/dmukukwp6/image/upload/Google_Ads_Screenshot_Invite_90767abd60.png)

6. All done!

## Configuring PostHog

1. In PostHog, go to the **[Data pipelines](https://us.posthog.com/pipeline/sources)** tab.
2. Open the **+ New** drop-down menu in the top-right and select **Source**.
3. Find Google Ads in the sources list and click **Link**.
4. Enter the **Google Ads customer ID** of the Google Ads account you want to sync.
5. (Optional) Add a prefix for the table name.
