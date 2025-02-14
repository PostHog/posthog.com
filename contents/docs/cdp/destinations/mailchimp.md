---
title: Create and update Mailchimp contacts from analytics events
templateId: template-mailchimp
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

You can use your PostHog event data to create and update contacts in Mailchimp. Here's everything you need to get started.

<Requirements />

## Configuring Mailchimp

First, [create](https://mailchimp.com/help/about-api-keys/) a new **API key** in your Mailchimp account.

You'll also need your **[Mailchimp audience ID](https://mailchimp.com/help/find-audience-id/)**.

Finally, while logged into Mailchimp, check the subdomain of your account. You'll need this to configure the destination, as your `Mailchimp datacenter id`.

## Configuring PostHog’s Mailchimp destination

1. In PostHog, click the **[Data pipeline](https://us.posthog.com/pipeline/overview)** tab in the left sidebar.
2. Click the **Destinations** tab.
3. Click **New destination** and choose Mailchimp's **Create** button.

Insert your API key, audience ID, and datacenter ID. You can also choose a different property to use as the contact's email; PostHog will default to `person.properties.email`.

You can additionally forward all event properties to Mailchimp, or select specific ones using the **merge field** section.

<HideOnCDPIndex>

### Filtering

As you'll be collecting or updating contact emails, you should configure the destination filter to only accept events that have an email property set.

![Filtering events](https://res.cloudinary.com/dmukukwp6/image/upload/filter_person_email_86c1d7a350.png)

### Testing

Once you’ve configured your Mailchimp destination, click **Start testing** to verify everything works the way you want.

***

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/mailchimp/template_mailchimp.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>