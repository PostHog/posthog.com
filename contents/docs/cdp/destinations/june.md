---
title: Send analytics events to June
templateId: template-june
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

You can send analytics events to June to enrich your customer data in real-time.

<Requirements />

## Configuring June

With data pipelines enabled, let’s get June connected.

Create a **write API key** in your June account:

1. Log into June and go to the settings tab, marked by a gear.
2. Click on the **Developer tools** tab.
3. Click **Create new key** in the **Write API keys** table.

We'll use the new key in the next step.

## Configuring PostHog’s June destination

1. In PostHog, click the "[Data pipelines](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the **Destinations** tab.
3. Click **New destination** and choose June's **Create** button.

Drop in the API key you created in the previous step.

You can map specific properties using the **Trait mapping** table, or switch on **Include all properties as attributes** to send everything.

<HideOnCDPIndex>

### Testing

Once you’ve configured your June destination, click **Start testing** to verify everything works the way you want.

***

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/june/template_june.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>