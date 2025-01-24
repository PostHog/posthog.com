---
title: Send contacts and analytics events to Klaviyo
templateId: template-klaviyo-event
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

You can use your PostHog event data to create and update contacts in Klaviyo. Here's everything you need to get started.

<Requirements />

## Configuring Klaviyo

First, [create](https://www.klaviyo.com/settings/account/api-keys) a new **API key** in your Klaviyo account settings.

Make sure to set `Read/Write Access` for:

- **Events** to send event data
- **Profiles** to send contact data

## Configuring PostHog’s Klaviyo destination

1. In PostHog, click the **[Data pipeline](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the **Destinations** tab.
3. Click **New destination** and choose a Klaviyo option for either creating/updating contacts or sending events.

Insert your API key. You can also choose a different property to use as the contact's email; PostHog will default to `person.properties.email`.

You can additionally forward all person or event properties to Klaviyo, or include specific ones by updating the property map:

![Property map](https://res.cloudinary.com/dmukukwp6/image/upload/property_map_b81b1aa605.png)

<HideOnCDPIndex>

### Filtering

You should configure the destination filter to only accept events that have an email property set.

![Filtering events](https://res.cloudinary.com/dmukukwp6/image/upload/filter_person_email_86c1d7a350.png)

### Testing

Once you’ve configured your Klaviyo destination, click **Create & enable** then **Start testing** to verify everything works the way you want.

***

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/webhook/template_airtable.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>