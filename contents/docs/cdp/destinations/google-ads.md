---
title: Send PostHog conversion events to Google Ads
templateId: template-google-ads
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

> **IMPORTANT:** The Google Ads integration is currently unavailable pending changes to improve the experience, which are currently under active development.

<Requirements />

You'll also need access to the relevant Google Cloud, Google Ads and Google Ads Manager account.

## Installation

1. Apply for a Google Ads developer token using [these steps](https://developers.google.com/google-ads/api/docs/get-started/dev-token).

2. Enable the Google Ads API for your organization in your [Google Cloud settings](https://console.cloud.google.com/marketplace/product/google/googleads.googleapis.com).

3. In Google Ads, go to [Goals settings](https://ads.google.com/aw/conversions/customersettings), enable enhanced conversions, set the method to `Google Ads API`, and click **Save**.

![Goal settings](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_01_at_13_38_50_d9c811bebd.png)

4. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.

5. Click the **Destinations** tab.

6. Search for **Google Ads Conversions** and select the destination.

7. Connect your Google account at the configuration step.

8. Add your developer token and customer ID.

![Location of the Google Ads Customer ID](https://res.cloudinary.com/dmukukwp6/image/upload/2024_10_31_at_15_15_51_a7a003008c.png)

9. Create a conversion action inside Google Ads
   1. Under [Goals > Conversions > Summary](https://ads.google.com/aw/conversions), you'll need to create a conversion goal
   2. Click **New conversion action**
   3. Select **Website**
   4. Enter your domain and scan your website
   5. Click **Add a conversion action manually**, fill in the details about the category name, and enable enhanced conversions (if not already)
   6. Press **Done** and **Save and continue**
   7. Click **See the event snippet**. It should show something like `gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXXXX/XXXXXXXXXXXXXXXXXX'})`. You want the conversion action ID which is the `send_to` value before the forward slash like `AW-XXXXXXXXXXX`

![Steps to create a conversion action inside Google Ads](https://res.cloudinary.com/dmukukwp6/image/upload/2024_10_30_at_15_04_47_772e736817.gif)

10. Back in PostHog, add the conversion action ID to the destination configuration.

11. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing data like `gclid`.

12. Press **Create & enable**, test your destination, and then watch your conversions get sent to Google Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/google_ads/template_google_ads.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
