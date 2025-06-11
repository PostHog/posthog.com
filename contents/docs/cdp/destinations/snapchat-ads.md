---
title: Send PostHog conversion events to Snapchat Ads
templateId: 
   - template-snapchat-ads
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You'll also need access to the relevant Snapchat Business account.

## Installation

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.

2. Click the [Destinations](https://us.posthog.com/pipeline/destinations?search=snapchat) tab.

3. Search for **Snapchat Ads Conversions** and click **+ Create**.

4. Connect your Snapchat Business account at the configuration step.

5. Visit the [Snapchat Business Manager](https://business.snapchat.com/).
   1. If you’ve already set up a Pixel for your website, we recommend that you use the same Pixel ID for your browser and server events.
      1. To create a new Pixel, click **Pixels** and then click **Create Pixel** button.
      2. Choose a name for your Pixel, and then click **Create**.
   2. Go to your Pixel by clicking **Pixels** and then click the Pixel you want to use.
   3. Copy the Pixel ID.

6. Back in PostHog, add the Pixel ID to the destination configuration.

7. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing required data.

8. Press **Create & enable**, test your destination, and then watch your conversions get sent to Snapchat Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/snapchat_ads/template_snapchat_ads.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
