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

2. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.

3. Click the **Destinations** tab.

4. Search for **Google Ads Conversions** and select the destination.

5. Connect your Google account at the configuration step.

6. Add your developer token and select your Customer ID.

![Location of the Google Ads Customer ID](https://res.cloudinary.com/dmukukwp6/image/upload/2024_10_31_at_15_15_51_a7a003008c.png)

7. In Google Ads, go to [Goals settings](https://ads.google.com/aw/conversions/customersettings), enable enhanced conversions, set the method to `Google Ads API`, and click **Save**.

![Goal settings](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_01_at_13_38_50_d9c811bebd.png)

8. Create a conversion action inside Google Ads
   1. Under [Goals > Conversions > Summary](https://ads.google.com/aw/conversions), you'll need to create a conversion action
   2. Click **New conversion action**
   3. Select **Import**
   4. Click **CRMs, files, or other data sources** and **Track conversions from clicks**
   5. Under data source, select **skip this step and set up a data source later**
   6. Click **Continue**, fill in the conversion type and name
   7. Press **Save and continue**

![Steps to create a conversion action inside Google Ads](https://res.cloudinary.com/dmukukwp6/image/upload/2024_11_09_at_14_52_07_dfb486cd19.gif)

9. Back in PostHog, select the conversion action to the destination configuration.

10. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing data like `gclid`.

11. Press **Create & enable**, test your destination, and then watch your conversions get sent to Google Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/google_ads/template_google_ads.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
