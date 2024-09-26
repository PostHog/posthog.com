---
title: Slack
templateId: template-slack
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Send messages into Slack based on PostHog events.

## Requirements

Using this requires either PostHog Cloud, or a self-hosted PostHog instance running a recent version of the docker image.

You'll also need access to the relevant Slack account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'Slack' and select the destination.
4. Connect your Slack account and select the channel at the configuration step.
5. Press 'Create & Enable' and watch your Messages appear in Slack!

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/slack/template_slack.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />
