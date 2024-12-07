---
title: Send PostHog event data to Make
templateId: template-make
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Trigger scenarios in Make based on PostHog events.

## Requirements

<Requirements />

You'll also need access to the relevant Make account.

## Installation

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.
2. Click the **Destinations** tab.
3. Search for **Make** and select the destination.
4. Add your Make webhook URL at the configuration step.
5. Set up your event and property filters to remove unnecessary events. You only want to send events that you want to trigger scenarios. Filter out unrelated events or ones missing required data.
6. Press **Create & Enable** and watch your **scenarios** get triggered in Make!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/make/template_make.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>