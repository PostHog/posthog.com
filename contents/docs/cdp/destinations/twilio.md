---
title: Send SMS messages using Twilio from analytics events
templateId: template-twilio
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

You can use your PostHog event data to send SMS messages via Twilio. Here's everything you need to get started.

<Requirements />

## Configuring Twilio

First, you'll need to create a Twilio account if you don't have one already. Then, gather the following credentials from your Twilio dashboard:

1. **Account SID**: Found on your [Twilio Console Dashboard](https://console.twilio.com/)
2. **Auth Token**: Found on your [Twilio Console Dashboard](https://console.twilio.com/)
3. **From Phone Number**: This is the Twilio phone number you'll be sending messages from. You can find or purchase one in the [Phone Numbers section](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming) of your Twilio account.

## Configuring PostHog's Twilio destination

1. In PostHog, click the **[Data pipeline](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the **Destinations** tab.
3. Click **New destination** and choose Twilio's **Create** button.

Enter your Account SID, Auth Token, and From Phone Number from Twilio. The recipient phone number can be extracted from your event properties.

> **Important:** The SMS body template has a character limit of 1600 characters. Messages exceeding this limit will fail to send.

<HideOnCDPIndex>

### Filtering

Make sure to filter events to only those that contain a valid phone number property, as this is required for sending SMS messages.

### Testing

Once you've configured your Twilio destination, click **Start testing** to verify everything works the way you want. Switch off **Mock out async functions** in order to send a test SMS message via Twilio.

***

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destinations on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/webhook/template_twilio.py) is available on GitHub.

### What happens if the SMS body exceeds 1600 characters?

If your SMS body template generates a message longer than 1600 characters, the message will fail to send. Make sure to keep your templates concise or include logic to truncate long messages.

### What phone number format is required?

Phone numbers should be in E.164 format (e.g., +1234567890). This includes the country code preceded by a plus sign, followed by the phone number without spaces or special characters.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex> 