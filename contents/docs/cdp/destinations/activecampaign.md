---
title: Send PostHog person data to ActiveCampaign
templateId: template-activecampaign
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You'll also need access to the relevant ActiveCampaign account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'ActiveCampaign' and select the destination.
4. Add your ActiveCampaign API Key at the configuration step.
5. Press 'Create & Enable' and watch your 'Events' list get populated in ActiveCampaign!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/activecampaign/template_activecampaign.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>