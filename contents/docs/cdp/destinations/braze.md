---
title: Send PostHog event data to Braze
templateId: template-braze
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You'll also need access to the relevant Braze account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'Braze' and select the destination.
4. Add your Braze API Key at the configuration step.
5. Press 'Create & Enable' and watch your 'Users' list get populated in Braze!

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/braze/template_braze.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />
