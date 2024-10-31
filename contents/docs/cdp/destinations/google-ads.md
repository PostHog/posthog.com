---
title: Send conversion events to Google Ads
templateId: template-google-ads
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Send conversion events from PostHog to Google Ads.

<Requirements />

You'll also need access to the relevant Google Cloud, Google Ads and Google Ads Manager account.

## Installation

1. Apply for a Google Ads developer token using [these steps](https://developers.google.com/google-ads/api/docs/get-started/dev-token).

2. Enable the Google Ads API in your [Google Cloud settings](https://console.cloud.google.com/marketplace/product/google/googleads.googleapis.com).

3. Enable Enhanced conversions under the [Goal settings](https://ads.google.com/aw/conversions/customersettings) and set the method to `Google Ads API`.

4. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.

5. Click the **Destinations** tab.

6. Search for **Google Ads Conversions** and select the destination.

7. Connect your Google account at the configuration step.

8. Fill out your Customer ID.
<img alt="Location of the Google Ads Customer ID" src="https://res.cloudinary.com/dmukukwp6/image/upload/2024_10_31_at_15_15_51_a7a003008c.png"/>

9. Create a conversion action inside Google Ads
   1. You'll need to create a conversion goal under [Goals > Conversions > Summary](https://ads.google.com/aw/conversions)
   2. Click Create conversion action
   3. Select Website
   4. Scan your website
   5. Click Add a conversion action manually and enable Enhanced conversions
   6. Click save and continue
   7. Click see the event snippet
   8. It should show something like `gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXXXX/XXXXXXXXXXXXXXXXXX'})`
   9. In this case, the Conversion action ID is going to be the `send_to` value before the forward slash like `AW-XXXXXXXXXXX`
   <img alt="Steps to create a conversion action inside Google Ads" src="https://res.cloudinary.com/dmukukwp6/image/upload/2024_10_30_at_15_04_47_772e736817.gif"/>

10. Press 'Create & Enable' and watch your 'conversions' get sent to Google Ads!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/google_ads/template_google_ads.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
