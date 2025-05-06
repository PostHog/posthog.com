---
title: Send PostHog conversion events to Reddit Ads (Pixel)
templateId: 
   - template-reddit-pixel
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You should be aware that this destination relies on creating third-party cookies. You'll also need access to the relevant Reddit Ads account.

## Installation

1. Make sure that your `posthog.init` configuration contains `opt_in_site_apps: true`.

2. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.

3. Click the **Destinations** tab.

4. Search for **Reddit Pixel** and select the destination.

5. Find your Pixel ID in the Reddit [Events manager](https://ads.reddit.com/events-manager). Make sure that the intended business is selected.

6. Back in PostHog, add the Pixel ID to the destination configuration.

7. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing required data.

8. Press **Create & enable**, test your destination, and then watch your conversions get sent to Snapchat Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/reddit/template_reddit_pixel.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
