---
title: Send PostHog analytics events to your Microsoft Teams server
templateId:
    - template-microsoft-teams
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Send event data from PostHog into the Microsoft Teams server and channel of your choice.


## Setup

### Microsoft Teams: create a webhook

1. In Microsoft Teams, go to the channel you want to send events to.
2. Click the three dots next to the channel name and select **Workflows**.
3. Select the **Post to a channel when a webhook request is received**, in the templates section.
4. Click **Next**, then **Add workflow**.
5. Copy the webhook URL.

> **Note:** The Microsoft Teams destination supports webhook URLs from:
> - Azure Logic Apps (`logic.azure.com`)
> - Power Platform (`webhook.office.com`)
> - Power Automate (`powerautomate.com` or `flow.microsoft.com`)

### PostHog: create a destination

1. Back in PostHog, click the **[Data pipelines](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the [Destinations](https://us.posthog.com/pipeline/destinations?search=microsoft) tab.
3. Search for **Microsoft Teams** and click **+ Create**.
4. Add your Webhook URL.
5. Use the **Text** field to format your message. You can include any properties that exist on `event` or `person`.
6. Use the **Filters** panel to set up a query to filter the events you want to send, otherwise you'll get a firehose of all events filling your channel.
7. Press **Create & enable**. Events will now be sent to Microsoft Teams. If you'd like to send a test event to your channel, hit the **Start testing** button.

> **Note:** For advanced customization, you can click the **Edit source** button to modify the destination's code directly. This allows you to tailor the destination to your specific needs beyond the standard configuration options. See our guide on [customizing destinations](/docs/cdp/destinations/customizing-destinations) for more details.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/microsoft_teams/template_microsoft_teams.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>