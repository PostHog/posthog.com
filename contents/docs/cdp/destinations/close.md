---
title: Create and update Close CRM contacts from analytics events
templateId:
  - template-close
---

import FeedbackQuestions from "../\_snippets/feedback-questions.mdx"
import PostHogMaintained from "../\_snippets/posthog-maintained.mdx"

Sync your PostHog person data to [Close](https://close.com) as contacts. When a person triggers an event, PostHog searches Close for a contact with the same email – updating the existing contact if found, or creating a new lead with an embedded contact if not.

## Configuring Close

You need a Close API key for PostHog to communicate with your account.

1. In Close, go to **Settings** > **Developer** > **API Keys** (or visit [app.close.com/settings/developer/api-keys](https://app.close.com/settings/developer/api-keys/)).
2. Click **Create API Key** and give it a descriptive name (e.g. "PostHog").
3. Copy the API key for the next step.

## Configuring PostHog's Close destination

1. In PostHog, click the **[Data pipeline](https://app.posthog.com/pipeline/destinations)** tab in the left sidebar.
2. Click the **[Destinations](https://app.posthog.com/pipeline/destinations)** tab.
3. Search for **Close** and click the **Create** button.
4. Paste your Close API key.
5. Configure the remaining fields:
   - **Email** – defaults to `{person.properties.email}`. Used to search for existing contacts in Close.

   - **Lead name** – the company name for newly created leads. Defaults to `{person.properties.company}`, falling back to the email address.

   - **First name** / **Last name** – combined into Close's single `name` field on the contact. If both are empty, the name is omitted.

   - **Contact field mapping** – a dictionary of Close contact fields and their values (e.g. `title`, or custom fields using the `custom.cf_FIELD_ID` format). Only mapped fields are sent.

   - **Lead field mapping** – a dictionary of Close lead fields (e.g. `url`), applied only when a new lead is created.

<HideOnCDPIndex>

### Filtering

The destination is pre-configured to fire on `$identify` and `$set` events with test accounts filtered out. At a minimum, make sure events have an email property set – Close uses email to match contacts.

### Testing

Once configured, click **Test function** to verify everything works. Switch off **Mock out async functions** to send a real test event to Close and confirm a lead or contact appears in your account.

---

<TemplateParameters />

## FAQ

### How does the upsert logic work?

PostHog searches Close for an existing contact by email. If a match is found, it updates the contact's mapped fields (but never overwrites the contact's email list, since a `PUT` replaces the entire emails array). If no match is found, it creates a new lead with a single embedded contact.

When multiple contacts share the same email (common in Close, where a lead represents a company), PostHog updates the first match rather than failing.

### Is the source code for this destination available?

PostHog is open source and so are all the destinations on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/close/close.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
