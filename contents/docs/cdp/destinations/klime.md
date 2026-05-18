---
title: Send PostHog event data to Klime
templateId:
    - template-klime
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"


You'll also need access to the relevant Klime account.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=klime) tab.
3. Search for 'Klime' and click **+ Create**.
4. Add your Klime Write Key at the configuration step. You can find this in your Klime dashboard.
5. Press **Create & Enable** and watch your events flow to Klime!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/klime/klime.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
