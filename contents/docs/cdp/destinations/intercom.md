---
title: Send PostHog events to Intercom
templateId: template-intercom
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You'll also need access to the relevant Intercom account.

## Configuring Intercom

In your Intercom account, go to **Settings** and then **Integrations.**

Access the **Developer hub** to create a new app. Name it something like "PostHog" for your future reference. Once created, Intercom will give you an access token. Copy it for the next step.

## Configuring PostHog's Intercom destination

1. In PostHog, click the **[Data pipeline](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the **Destinations** tab.
3. Search for **Intercom** and click its **Create** button.
4. Add your Intercom access token.
5. Select the data region your account is in.
6. You can test your destination by sending a test event with **Test function**.
7. When all is as you like it, click **Create & enable**.

<HideOnCDPIndex>

## Configuration

The Intercom destination requires that contacts **already exist** in Intercom before you can send events attached to them.

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/intercom/template_intercom.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>