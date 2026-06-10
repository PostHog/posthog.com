---
title: Send WhatsApp messages from analytics events
templateId:
  - template-whatsapp
---

import FeedbackQuestions from "../\_snippets/feedback-questions.mdx"
import PostHogMaintained from "../\_snippets/posthog-maintained.mdx"

You can use your PostHog event data to send WhatsApp messages via the WhatsApp Cloud API (Meta Graph API). Here's everything you need to get started.

## Configuring WhatsApp

First, you need a Meta Business account with WhatsApp Cloud API access. Gather the following credentials from the [Meta for Developers](https://developers.facebook.com/) dashboard:

1. **Access token** - Generate a WhatsApp Cloud API access token in your Meta app dashboard. This is found under **WhatsApp** > **API Setup**.
2. **Phone number ID** - The ID associated with your WhatsApp Business phone number. Find this in the [WhatsApp Manager](https://business.facebook.com/wa/manage/) or your Meta app's **WhatsApp** > **API Setup** page.

## Configuring PostHog's WhatsApp destination

1. In PostHog, click the **[Data pipeline](https://app.posthog.com/pipeline/destinations)** tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/pipeline/destinations?search=whatsapp) tab.
3. Click **New destination** and choose WhatsApp's **Create** button.

Enter your access token and phone number ID from Meta. The recipient phone number defaults to `{{ person.properties.phone }}` and supports Liquid templating.

## Message types

WhatsApp supports two message types, selectable via the **Message type** input:

- **Text** - A free-form message body (max 4,096 characters). Text messages can only be sent within WhatsApp's 24-hour customer service window – i.e., within 24 hours after the recipient last messaged you.
- **Template** - A pre-approved message template registered in your WhatsApp Manager. Use templates for business-initiated conversations outside the 24-hour window, such as drip campaigns or transactional notifications. You must provide the template name and the language code it was approved in.

> **Important:** If you're sending business-initiated messages (e.g., marketing campaigns or transactional alerts), you must use the **Template** message type with a pre-approved template. Free-form text messages sent outside the 24-hour window will fail.

<HideOnCDPIndex>

### Filtering

Filter events to only those that contain a valid phone number property, as this is required for sending WhatsApp messages.

### Testing

Once you've configured your WhatsApp destination, click **Start testing** to verify everything works the way you want. Switch off **Mock out async functions** in order to send a test WhatsApp message.

---

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destinations on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/whatsapp/whatsapp.template.ts) is available on GitHub.

### What phone number format is required?

Phone numbers must be in E.164 format (e.g., +1234567890). This includes the country code preceded by a plus sign, followed by the phone number without spaces or special characters.

### What is the 24-hour customer service window?

WhatsApp restricts free-form (text) messages to a 24-hour window that opens when a customer messages you first. After 24 hours of inactivity, you can only send pre-approved template messages. See [Meta's documentation on conversations](https://developers.facebook.com/docs/whatsapp/conversation-types) for details.

### What Graph API version does this use?

The destination defaults to Meta Graph API `v21.0`. You can override this in the **Graph API version** input field if you need a different version.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
