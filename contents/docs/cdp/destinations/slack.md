---
title: Send PostHog event data to Slack webhooks
templateId: template-slack
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Use this destination to send custom messages into Slack based on PostHog events or actions. 

> If you want to receive regular insight or dashboard subscriptions to Slack, checkout our [subscriptions docs](/docs/product-analytics/subscriptions).

## Requirements

Using this requires either PostHog Cloud, or a self-hosted PostHog instance running a recent version of the Docker image.

You'll also need access to the relevant Slack account.

## Installation

1. In PostHog, click the [Data pipeline tab](https://us.posthog.com/pipeline/overview) in the left sidebar.

2. Click the **Destinations** tab.

3. Search for **Slack** and select the destination.
<img alt="Creating a Slack destination" src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_create_8b55d6d50f.png"/>

4. Choose an existing Slack connection or click **Connect to Slack**. You will be redirected to Slack to install the PostHog app. Make sure the PostHog app is added to the channel you want to send messages to.
<img alt="Choosing a Slack workspace" src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_choose_2_2802fc3f92.png"/>

5. Choose your event or action matching and customize your message using Slack's [block kit](https://api.slack.com/block-kit/building). 

5. Once done, press **Create & Enable** and watch your messages appear in Slack.
<img alt="Example Slack message" src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_example_80bff761a9.png"/>

You can see a full example of this in our tutorial on [how to send survey responses to Slack](/tutorials/slack-surveys)

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/slack/template_slack.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>