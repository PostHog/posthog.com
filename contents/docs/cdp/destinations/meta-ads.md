---
title: Send PostHog conversion events to Meta Ads
templateId: template-meta-ads
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You'll also need access to the relevant Meta Ads account.

## Installation

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.

2. Click the **Destinations** tab.

3. Search for **Meta Ads Conversions** and select the destination.

4. Visit the [Meta Events Manager](https://business.facebook.com/events_manager2/overview).
   1. If you’ve already set up a Pixel for your website, we recommend that you use the same Pixel ID for your browser and server events.
      1. To create a new Pixel, click **Connect data** and select **Web**.
      2. For the connection method, select **Set up manually** and **Conversions API**.
   2. Go to your Pixel via **Data sources**.
   3. Switch to the **Settings** tab and your Pixel ID will be listed as **Dataset ID**.
   4. You can create an access token by clicking **Generate access token**.

5. Back in PostHog, add the access token and Pixel ID to the destination configuration.

6. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing required data.

7. Press **Create & enable**, test your destination, and then watch your conversions get sent to Meta Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/meta_ads/template_meta_ads.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
