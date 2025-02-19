---
title: Send PostHog analytics to Airtable
templateId: template-airtable
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

It’s easier than ever to export realtime PostHog data to satisfy the Airtable fanatics in your life.

<Requirements />

## Configuring Airtable

With data pipelines enabled, let’s get Airtable connected.

First, [create](https://airtable.com/create/tokens/new) a **personal access token** in your Airtable account. You’ll need to add the `data.records:write` scope so that PostHog can create new records.

Then add the **base** you want to create new records in.

![Airtable token configuration](https://res.cloudinary.com/dmukukwp6/image/upload/airtable_pat_7ce7c538e6.png)

Next, you’ll want to visit Airtable’s [API reference](https://airtable.com/developers/web/api/introduction) to get your base ID, table name, and field names.

## Configuring PostHog’s Airtable destination

You should have these details now:

- Access token
- Base ID
- Table name
- Field names

With them, we’re ready to set up the Airtable destination.

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the **Destinations** tab.
3. Click **New destination** and choose Airtable's **Create** button.

Now we can plug in the above values.

![Airtable field mapping](https://res.cloudinary.com/dmukukwp6/image/upload/airtable_fields_597f303a7a.png)

The **Fields** editor enables you to map whatever PostHog [values](/docs/cdp/destinations#input-formatting) you like to columns in your Airtable base. The keys on the left should match the names you’ve already set for columns in Airtable. Values on the right can be any property on a `person` or `event` instance.

<HideOnCDPIndex>

### Filtering

In its experimental state, the Airtable destination will not batch its output to your base. If you trigger on events that happen more than five times per second, you’ll hit the Airtable API [rate limit](https://airtable.com/developers/web/api/rate-limits).

So be selective about the events you forward to Airtable. Instead of every pageview, for example, just send the high-impact events like conversions. Use the **Filters** panel to set this up.

### Testing

Once you’ve configured your Airtable destination, click **Start testing** to verify everything works the way you want. Switch off **Mock out async functions** in order to send a test event to Airtable and see a new record.

### A note on data types

Where possible, Airtable will convert values into native datatypes set in your columns. So, if you pass `event.timestamp` to an Airtable `Date` column, that will work just fine.

***

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/airtable/template_airtable.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>