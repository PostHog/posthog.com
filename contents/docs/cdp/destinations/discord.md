---
title: Send PostHog analytics events to your Discord server
templateId: template-discord
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Send event data from PostHog into the Discord server and channel of your choice.

<Requirements />

## Setup

### Discord: create a webhook

1. In Discord, go to the server you want to send events to.
2. Click the server name in the top left and select **Server Settings**.
3. Select **Integrations**, in the Apps section.
4. Select **Webhooks**, then **New Webhook**.
5. Give the webhook a name and pick the channel you want to send events to.
6. Copy the webhook URL.

![Discord webhook configuration](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_12_12_at_10_24_06_AM_0219cdb837.png)

### PostHog: create a destination

1. Back in PostHog, click the **[Data pipelines](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the **Destinations** tab.
3. Search for **Discord** and select the destination.
4. Add your Webhook URL.
5. Use the **Content** field to format your message. You can include any properties that exist on `event` or `person`.
6. Use the **Filters** panel to set up a query to filter the events you want to send, otherwise you'll get a firehose of all events filling your channel.
7. Press **Create & enable**. Events will now be sent to Discord. If you'd like to send a test event to your channel, hit the **Start testing** button.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/discord/template_discord.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>