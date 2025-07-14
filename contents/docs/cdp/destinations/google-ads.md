---
title: Send PostHog conversion events to Google Ads
templateId:
    - template-google-ads
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

> **IMPORTANT:** This is an experimental destination that we do not provide official support for. Check out [this page](https://github.com/PostHog/posthog/issues/27712#issuecomment-2615849798) for more details on installing the integration.

<Requirements />

You'll also need access to the relevant Google Ads account.

## Installation

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.

2. Click the [Destinations](https://us.posthog.com/pipeline/destinations?search=googleads) tab.

3. Search for **Google Ads Conversions** and click **+ Create**.

4. Connect your Google account at the configuration step.

5. Select your Customer ID.

![Location of the Google Ads Customer ID](https://res.cloudinary.com/dmukukwp6/image/upload/2024_10_31_at_15_15_51_a7a003008c.png)

6. In Google Ads, go to [Goals settings](https://ads.google.com/aw/conversions/customersettings), enable enhanced conversions, set the method to `Google Ads API`, and click **Save**.

![Goal settings](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_01_at_13_38_50_d9c811bebd.png)

7. Create a conversion action inside Google Ads
   1. Under [Goals > Conversions > Summary](https://ads.google.com/aw/conversions), you'll need to create a conversion action
   2. Click **New conversion action**
   3. Enable **Conversions offline** and click **Add data source**
      1. Click **Skip this step and set up a data source later**
      2. Click **Done**
   4. Select the conversion type that you want to capture
   5. Click **Add a conversion action** and select **Add data source later**
   6. Click **Settings**, edit the **Conversion name** and click **Done**
   7. Click **Save and continue** and **Finish**

![Steps to create a conversion action inside Google Ads](https://res.cloudinary.com/dmukukwp6/image/upload/2025_03_04_at_10_35_07_932d14fe5f.gif)

8. Back in PostHog, select the conversion action in the destination configuration.

9. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing data like `gclid`.

10. Press **Create & enable**, test your destination, and then watch your conversions get sent to Google Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

## Why aren't my conversions appearing inside of Google Ads?

Note that it might take around 6-48 hours for Google to process conversions and make them visible inside of Google Ads. Additionally you'll need to wait around 6 hours before new conversion goals will accept incoming data. 

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/google_ads/template_google_ads.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
