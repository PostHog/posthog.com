---
title: Send PostHog event data to another PostHog instance
templateId:
    - template-posthog-replicator
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You'll also need access to the destination PostHog account.

## Installation

1. In PostHog, click the **[Data pipelines](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the [Destinations](https://us.posthog.com/pipeline/destinations?search=posthog) tab.
3. Search for **PostHog** and click **+ Create**.
4. Add the Host and API Key of the destination at the configuration step.
5. Press **Create & Enable** and watch your 'Events' list get populated in the destination PostHog instance!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/posthog/template_posthog.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>