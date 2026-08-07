---
title: Send PostHog event data to Braze
templateId:
    - template-braze
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

You can use your PostHog event data to track events and update user attributes in Braze. You'll also need access to the relevant Braze account.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=braze) tab.
3. Search for 'Braze' and click **+ Create**.
4. Add your Braze API Key at the configuration step.
5. Press **Create & Enable** and watch your 'Users' list get populated in Braze!

<HideOnCDPIndex>

### Choosing which events are sent

By default, the destination sends every event it receives to Braze. To send only the events you care about, use the destination's **Filters** section, which is where you choose the events, actions, and property conditions that trigger the destination. Everything that doesn't match is dropped before a request is made to Braze. See [filtering destinations](/docs/cdp/destinations#filtering) for the full set of options.

A few things worth filtering on for Braze:

- **Specific events.** Add only the events you want to appear in Braze, such as `purchase_completed` or `subscription_started`, rather than the full firehose. Braze bills on data points, so sending `$pageview` and other high-volume autocaptured events gets expensive quickly.
- **Events from known users.** Braze matches users on `external_id`, which this destination maps from the event's `distinct_id`. Events from anonymous users create records in Braze keyed on a randomly generated ID, so it's usually worth filtering to identified users only.
- **A required property.** If your `attributes` mapping depends on a person property such as `email`, filter to events where that property is set so you don't create incomplete profiles.

You can also change *what* gets sent for each matched event. The **Attributes to set** and **Event payload** fields are templated, so you control which person and event properties are included in the request body. See [customizing destinations](/docs/cdp/destinations/customizing-destinations) for the templating syntax.

### Testing

Once you've configured your Braze destination, click **Start testing** to verify everything works the way you want. Clicking **Test function** sends a test event to Braze so you can confirm the user and event show up in your account.

***

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/braze/template_braze.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
