---
title: Send PostHog event data to Flywheel
templateId:
    - template-flywheel
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"


You'll also need access to the relevant Flywheel account.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=flywheel) tab.
3. Search for **Flywheel** and click **+ Create**.
4. Add your Flywheel Write API Key at the configuration step. You can find this in your Flywheel dashboard.
5. Press **Create & Enable** and your PostHog events will start flowing to Flywheel!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/flywheel/flywheel.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
