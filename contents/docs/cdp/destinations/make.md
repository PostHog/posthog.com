---
title: Send PostHog event data to Make
templateId: template-make
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Trigger Scenarios in Make based on PostHog events.

## Requirements

Using this requires either PostHog Cloud, or a self-hosted PostHog instance running a recent version of the docker image.

You'll also need access to the relevant Make account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'Make' and select the destination.
4. Add your Make webhook URL at the configuration step.
5. Press 'Create & Enable' and watch your 'Scenarios' get triggered in Make!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/make/template_make.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>