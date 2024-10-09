---
title: Slack
templateId: template-slack
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"


Send messages into Slack based on PostHog events.

> If you want to receive regular insight or dashboard subscriptions to Slack, checkout our [subscriptions docs](/docs/product-analytics/subscriptions).

## Requirements

Using this requires either PostHog Cloud, or a self-hosted PostHog instance running a recent version of the docker image.

You'll also need access to the relevant Slack account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'Slack' and select the destination.
<img alt="Creating a Slack destination" src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_create_8b55d6d50f.png"/>
4. Choose an existing Slack connection or click "Connect to Slack". You will be redirected to Slack to install the PostHog app. 
<img alt="Choosing a Slack workspace" src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_choose_2_2802fc3f92.png"/>
5. Press 'Create & Enable' and watch your messages appear in Slack!
<img alt="Example Slack message" src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_example_80bff761a9.png"/>


## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/slack/template_slack.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />
