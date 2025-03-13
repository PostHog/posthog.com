---
title: Send contacts and PostHog events to Intercom
templateId:
    - template-intercom
    - template-intercom-event
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You'll also need access to the relevant Intercom account.

## Setting up Intercom as a PostHog destination

1. In PostHog, click the **[Data pipeline](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the **Destinations** tab.
3. Search for **Intercom** and click the **Create** button for either **Contacts** or **Events**.
4. In the destination editor, click **Select Intercom connection** to log into your Intercom account.
5. You can test your destination by sending a test event with **Test function**.
7. When all is as you like it, click **Create & enable**.

<HideOnCDPIndex>

## Configuration details

The Intercom destination requires that contacts **already exist** in Intercom before you can send events associated with them.

You can use the Intercom contact creation destination to ensure those records exist. It is pre-configured to fire on [identify](/docs/product-analytics/identify) events, enabling Intercom to capture the same information on each user that PostHog does.


<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/intercom/template_intercom.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>