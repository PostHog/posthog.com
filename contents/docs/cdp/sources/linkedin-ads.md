---
title: Linking LinkedIn Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LinkedinAds
---

You can sync data from LinkedIn Ads reports by configuring it as a source in PostHog. The supported reports that can be synced include Accounts, Campaigns, Campaign Stats, Campaign Groups, Campaign Group Stats, Creatives, and Creative Stats, as described here:

- [Accounts](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-accounts?view=li-lms-2025-08&tabs=http)
- [Campaigns](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-campaigns?view=li-lms-2025-08&viewFallbackFrom=li-lms-2023-05&tabs=http#search-for-campaigns)
- [Campaign Groups](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-campaign-groups?view=li-lms-2025-08&viewFallbackFrom=li-lms-2023-05&tabs=http#search-for-campaign-groups)
- [Campaign Stats](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?view=li-lms-2025-08&viewFallbackFrom=li-lms-2023-05&tabs=curl#ad-analytics): Ad analytics by CAMPAIGN
- [Campaign Group Stats](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?view=li-lms-2025-08&viewFallbackFrom=li-lms-2023-05&tabs=curl#ad-analytics): Ad analytics by CAMPAIGN_GROUP
- [Creatives](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-creatives?view=li-lms-2025-08&tabs=http): Ad-level creative objects
- [Creative Stats](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting?view=li-lms-2025-08&viewFallbackFrom=li-lms-2023-05&tabs=curl#ad-analytics): Ad analytics by CREATIVE

Additional reports will be added based on user feedback we receive via our [in-app support form](https://app.posthog.com/#panel=support%3Afeedback%3Adata_warehouse%3Alow%3Atrue).

## Requirements

- A LinkedIn Ads account with permission to access data from accounts you want to sync.
- Your numeric account ID from the campaign manager (digits only – see how to find it in the image below, or take it from the URL like `https://www.linkedin.com/campaignmanager/accounts/(ID here)/overview?businessId=personal`)

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_09_04_at_5_12_47_PM_073654a608.png"
    classes="rounded"
    alt="LinkedIn account ID"
/>

## Configuring PostHog

Connect PostHog to your LinkedIn Ads account using a LinkedIn account. The LinkedIn account must have permission to access data.

1. In PostHog, go to the **[Data pipelines](https://app.posthog.com/data-management/sources)** tab.
2. Open the **+ New** drop-down menu in the top-right and select **Source**.
3. Find LinkedIn Ads in the sources list and click **Link**.
4. Enter the numeric **Account ID** of the LinkedIn Ads account you want to sync (digits only).
5. Select an existing LinkedIn Ads account, or create a new integration
6. (Optional) Add a prefix for the table name.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### Account not found

If your sync fails with the error "LinkedIn could not find the configured ad account", it means LinkedIn returned a `RESOURCE_NOT_FOUND` response. This happens when:

- The **Account ID** in your source settings is incorrect or doesn't exist.
- PostHog no longer has access to the LinkedIn ad account.

To resolve this:

1. Verify the **Account ID** is the correct numeric ID from your [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/).
2. Confirm PostHog still has access to the ad account by re-authorizing the LinkedIn Ads integration.
3. Re-sync the source.

### Invalid Account ID format

If you see the error "The LinkedIn Ads Account ID must be the numeric account ID from your LinkedIn Campaign Manager (digits only)" when setting up your LinkedIn Ads source, it means the **Account ID** you entered is not in the correct format. PostHog validates this during setup so you can fix it immediately. This happens when:

- You entered a LinkedIn URL instead of the numeric ID.
- You entered a company name or other text instead of the numeric ID.
- The value contains extra whitespace or special characters.

To resolve this:

1. Go to your [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/).
2. Find your numeric Account ID – it appears in the URL (e.g., `https://www.linkedin.com/campaignmanager/accounts/123456789/overview`) or in the account dropdown.
3. Enter the numeric ID only (e.g., `123456789`) and try linking again.

### Restricted member account

If your sync fails with an error mentioning `RESTRICTED_MEMBER` or "Member is restricted", it means LinkedIn has restricted the account that authorized this integration. This is a LinkedIn-side restriction (such as a suspended or flagged account) that prevents PostHog from accessing your ad data. Retrying won't help until the restriction is lifted.

To resolve this:

1. Contact LinkedIn to resolve the account restriction.
2. Once the restriction is lifted, re-authorize the LinkedIn Ads integration in PostHog.
3. Re-sync the source.
