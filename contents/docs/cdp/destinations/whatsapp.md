---
title: Send WhatsApp messages using the WhatsApp Cloud API
templateId:
    - template-whatsapp
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Send WhatsApp messages to users based on PostHog events using the WhatsApp Cloud API (Meta Graph API). Use this for drip campaigns, transactional notifications, or any event-triggered messaging.

## Requirements

To use this destination, you need:

1. A [Meta for Developers](https://developers.facebook.com/) account
2. A WhatsApp Business account connected to a Meta app
3. An access token with permissions to send messages
4. A phone number ID from your WhatsApp Business account

## Setup

### Meta: get your credentials

1. Go to your [Meta for Developers](https://developers.facebook.com/) dashboard and select your app (or create one).
2. Add the WhatsApp product to your app if you haven't already.
3. In **WhatsApp > API Setup**, find your **Phone number ID** and generate a temporary or permanent **Access token**.

> For production use, create a system user in [Meta Business Suite](https://business.facebook.com/) and generate a permanent access token.

### PostHog: create a destination

1. In PostHog, click the **[Data pipelines](https://app.posthog.com/data-management/destinations)** tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=whatsapp) tab.
3. Search for **WhatsApp** and click **+ Create**.
4. Enter your **Access token** and **Phone number ID** from Meta.
5. Choose your **Message type**:
   - **Text**: For free-form messages (only valid within the 24-hour customer service window)
   - **Template**: For pre-approved message templates (required for business-initiated conversations outside the 24-hour window)
6. Configure the recipient phone number. By default, this uses `{{ person.properties.phone }}`.
7. Set up your filters to control which events trigger messages.
8. Press **Create & enable**.

## Message types

### Text messages

Use text messages when replying to a customer within 24 hours of their last message. The message body supports Liquid templating, so you can personalize content with event and person properties.

**Example message:**
```
Hi {{ person.properties.first_name }}, your order {{ event.properties.order_id }} has shipped!
```

### Template messages

For business-initiated conversations outside the 24-hour window, you must use pre-approved templates. Templates are created and approved in the [Meta Business Suite](https://business.facebook.com/).

To send a template message:
1. Set **Message type** to **Template**
2. Enter your **Template name** exactly as it appears in Meta
3. Select the **Template language** matching your approved template

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### What is the 24-hour customer service window?

WhatsApp allows free-form text messages only within 24 hours of the customer's last message. Outside this window, you must use a pre-approved template. This prevents spam and ensures messages are expected by recipients.

### What phone number format is required?

Phone numbers should be in E.164 format (e.g., `+1234567890`). This includes the country code preceded by a plus sign, followed by the phone number without spaces or special characters.

### How do I create message templates?

Create templates in [Meta Business Suite](https://business.facebook.com/) under **WhatsApp Manager > Message Templates**. Templates require approval from Meta before use, which typically takes a few minutes to a few hours.

### Is the source code for this destination available?

PostHog is open-source and so are all the destinations on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/whatsapp/whatsapp.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
