---
title: Create and update Brevo contacts from analytics events
templateId: template-brevo
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

You can use your PostHog event data to create and update contacts in Brevo. Here's everything you need to get started.

<Requirements />

## Configuring Brevo

First, [create](https://app.brevo.com/settings/keys/api) a new **API key** in Brevo and copy it for the next step.

## Configuring PostHog’s Brevo destination

1. In PostHog, click the **[Data pipeline](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the **Destinations** tab.
3. Click **New destination** and choose Brevo's **Create** button.

Paste your API key and then add any other values you want to pipe from PostHog person properties into Brevo, using the **attributes** fields.

<HideOnCDPIndex>

### Filtering

At a minimum, you should filter to only send events that have an email property set, as Brevo will use this to identify contacts.

![Filtering events](https://res.cloudinary.com/dmukukwp6/image/upload/filter_person_email_86c1d7a350.png)

### Testing

Once you’ve configured your Brevo destination, click **Start testing** to verify everything works the way you want. Clicking **Test function** will send a test event to Brevo, creating a new contact if it doesn't exist in your account.

***

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/webhook/template_airtable.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>