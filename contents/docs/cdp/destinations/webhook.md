---
title: Send PostHog event data to any webhook
templateId: template-webhook
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Send event data from PostHog into an HTTP Webhook.

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'Webhook' and select the destination.
4. Add your Webhook URL at the configuration step.
5. Press 'Create & Enable' and watch your 'Events' get sent to the Webhook!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/webhook/template_webhook.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>