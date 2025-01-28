---
title: Create and update Attio CRM contacts from analytics events
templateId: template-attio
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

You can use your PostHog event data to create and update contacts in Attio. Here's everything you need to get started.

<Requirements />

## Configuring Attio

First, [create](https://attio.com/help/reference/integrations-automations/generating-an-api-key) a new **access token** in your Attio workspace. You’ll need to set read-write on the `Records` and `Object Configuration` scopes so that PostHog can communicate with Attio.

![Attio scopes](https://res.cloudinary.com/dmukukwp6/image/upload/attio_scopes_e335544ba3.png)

Close the scopes section and copy your new access token for the next step.

## Configuring PostHog’s Attio destination

1. In PostHog, click the **[Data pipeline](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the **Destinations** tab.
3. Click **New destination** and choose Attio's **Create** button.

Paste in your access token and then add any other values you want to pipe from PostHog person properties into Attio, using **additional person attributes**.

<HideOnCDPIndex>

### Filtering

At a minimum, you should filter to only send events that have an email property set, as Attio will use this to identify contacts.

![Filtering events](https://res.cloudinary.com/dmukukwp6/image/upload/filter_person_email_86c1d7a350.png)

### Testing

Once you’ve configured your Attio destination, click **Start testing** to verify everything works the way you want. Switch off **Mock out async functions** in order to send a test event to Attio and see a new record.

***

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/attio/template_attio.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>