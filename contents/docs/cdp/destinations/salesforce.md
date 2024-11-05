---
title: Send PostHog event data to Salesforce
templateId: template-salesforce-create
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

This destination connects to your Salesforce instance, sending events from PostHog to Salesforce as they are ingested.

<Requirements />

You'll also need access to the relevant Salesforce account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'Salesforce' and select the destination.
4. Connect your Salesforce account at the configuration step.
5. Press 'Create & Enable' and watch your 'Objects' get populated in Salesforce!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/salesforce/template_salesforce.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>