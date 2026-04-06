---
title: Create and update Mailchimp contacts from analytics events
templateId:
  - template-mailchimp
---

import FeedbackQuestions from "../\_snippets/feedback-questions.mdx"
import PostHogMaintained from "../\_snippets/posthog-maintained.mdx"

<CalloutBox icon="IconInfo" title="Where to find Mailchimp" type="fyi">

The Mailchimp destination is available in PostHog under [**Data pipelines**](https://app.posthog.com/data-management/destinations) > **Destinations**. Search for "Mailchimp" or [go directly to it](https://app.posthog.com/data-management/destinations?search=mailchimp).

</CalloutBox>

Use the Mailchimp destination to automatically create or update contacts in your Mailchimp audience based on PostHog events. This is useful for syncing user data, tagging contacts based on behavior, or triggering email campaigns from product activity.

## Requirements

- A Mailchimp account with an existing audience
- A Mailchimp [API key](https://mailchimp.com/help/about-api-keys/)
- Your [Mailchimp audience ID](https://mailchimp.com/help/find-audience-id/)
- Your Mailchimp datacenter ID (the subdomain in your Mailchimp account URL)

## Setup

1. In your Mailchimp account, [create a new API key](https://mailchimp.com/help/about-api-keys/).
2. Find your [audience ID](https://mailchimp.com/help/find-audience-id/) and note the subdomain of your Mailchimp account URL (this is your datacenter ID).
3. In PostHog, go to the [**Data pipelines**](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
4. Click [**Destinations**](https://app.posthog.com/data-management/destinations?search=mailchimp) and search for "Mailchimp".
5. Click **New destination** and choose Mailchimp's **Create** button.
6. Enter your API key, audience ID, and datacenter ID.

You can also choose a different property to use as the contact's email. PostHog defaults to `person.properties.email`.

To forward event properties to Mailchimp, use the **merge field** section. You can forward all properties or select specific ones.

<HideOnCDPIndex>

### Filtering

As you'll be collecting or updating contact emails, you should configure the destination filter to only accept events that have an email property set.

![Filtering events](https://res.cloudinary.com/dmukukwp6/image/upload/filter_person_email_86c1d7a350.png)

### Testing

Once you’ve configured your Mailchimp destination, click **Start testing** to verify everything works the way you want.

---

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/mailchimp/template_mailchimp.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
