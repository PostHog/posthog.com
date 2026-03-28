---
title: Send PostHog event data to Trophy
templateId:
    - template-trophy
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"


You'll also need access to the relevant Trophy account.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=trophy) tab.
3. Search for **Trophy** and click **+ Create**.
4. Add your Trophy API Key at the configuration step. You can create one at [Trophy's API keys page](https://app.trophy.so/integration/api-keys).
5. Enter the **Metric Key** for the metric you want to send events to.
6. Press **Create & Enable** and your events will start flowing to Trophy!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/trophy/template_trophy.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
