---
title: Send PostHog event data to Zapier
templateId:
    - template-zapier
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Trigger Zaps in Zapier based on PostHog events.

## Requirements

Using this requires either PostHog Cloud, or a self-hosted PostHog instance running a recent version of the docker image.

You'll also need access to the relevant Zapier account.

## Installation

### Option 1: Via the PostHog app in Zapier  <span class="bg-accent text-gray font-semibold align-middle text-sm p-1 rounded">Recommended</span>

1. In your Zapier dashboard, go to your [zaps](https://zapier.com/app/assets/zaps) and create a new zap.
2. Add the [PostHog app](https://zapier.com/apps/posthog/integrations/webhook) as a trigger.
3. Configure the PostHog trigger accordingly.

Note that the PostHog app in Zapier only supports receiving events from [actions](/docs/data/actions), so you may need to create an action for the event that you want to trigger the zap.

### Option 2: Via PostHog's Data pipelines

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.
2. Click the [Destinations](https://us.posthog.com/pipeline/destinations?search=zapier) tab.
3. Search for **Zapier** and click **+ Create**.
4. In your Zapier dashboard, create a new Zap with a [webhook trigger](https://zapier.com/apps/webhook/integrations) and then add your webhook URL in PostHog under **Zapier hook path**.
5. Press **Create & Enable** and watch your 'Zaps' get triggered in Zapier!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/zapier/template_zapier.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>