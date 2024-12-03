---
title: Send PostHog person data to Zendesk
templateId: template-zendesk
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

You can also send person properties to User fields in Zendesk.

<Requirements />

You'll also need access to the relevant Zendesk account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'Zendesk' and select the destination.
4. Add your Zendesk subdomain, user email, and API token at the configuration step.
5. Press 'Create & Enable' and watch your 'Customer' list get populated in Zendesk!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/zendesk/template_zendesk.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>