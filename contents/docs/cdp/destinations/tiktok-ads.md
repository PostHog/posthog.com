---
title: Send PostHog conversion events to TikTok Ads
templateId: 
   - template-tiktok-ads
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You should be aware that this destination relies on creating third-party cookies. You'll also need access to the relevant TikTok Ads account.

## Installation

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.

2. Click the [Destinations](https://us.posthog.com/pipeline/destinations?search=tiktok) tab.

3. Search for **TikTok Ads Conversions** and click **+ Create**.

4. Visit the [TikTok Events Manager](https://ads.tiktok.com/i18n/events_manager/home).
   1. If you’ve already set up a Pixel for your website, we recommend that you use the same Pixel for your browser and server events.
      1. To create a new Pixel, click **Connect data source** and select **Web**.
      2. Skip the **Add your website** step.
      3. For the connection method, select **Manual setup** and **Events API**.
      4. Enter a name for your Pixel and click **Create**.
   2. Go to your Pixel via **Data sources**.
   3. Switch to the **Settings** tab and your Pixel ID will be listed as **ID**.
   4. You can create an access token by clicking **Generate Access Token**.

5. Back in PostHog, add the Pixel ID and Access token to the destination configuration.

6. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing required data.

7. Press **Create & enable**, test your destination, and then watch your conversions get sent to TikTok Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/tiktok_ads/template_tiktok_ads.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
