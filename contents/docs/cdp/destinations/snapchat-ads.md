---
title: Send PostHog conversion events to Snapchat Ads
templateId: template-snapchat-ads
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You'll also need access to the relevant Snapchat Ads account.

## Installation

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.

2. Click the **Destinations** tab.

3. Search for **Snapchat Ads Conversions** and select the destination.

4. Log in to [Snapchat Ads Manager](https://ads.snapchat.com/).

   1. Click the menu in the top corner and select **Events Manager**.
   2. Click **new event source** and select **Web**.
   3. For the connection method, select **Conversions API**.
   4. If you’ve already set up a Pixel for your website, we recommend that you use the same Pixel for your browser and server events.
      1. To create a new Pixel, click **Create new Pixel** and enter a name for your Pixel and click **Confirm**.
   5. Select **Create new token** and click **Generate**.
   6. Select **Set up manually** and click **Next**.
   7. You can create an access token by clicking **Generate Access Token**.
   8. Configure your Events and copy your **access token**
   9. Select your Pixel from the event sources list and copy your **Pixel ID**.

5. Back in PostHog, add the Pixel ID and Access token to the destination configuration.

6. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing required data.

7. Press **Create & enable**, test your destination, and then watch your conversions get sent to Snapchat Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/snapchat_ads/template_snapchat_ads.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>