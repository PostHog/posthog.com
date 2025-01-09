---
title: Send PostHog event data to AWS Kinesis
templateId: template-aws-kinesis
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

Send event data from PostHog into an AWS Kinesis stream.

<Requirements />

You'll also need access to the relevant AWS account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'AWS Kinesis' and select the destination.
4. Add your AWS Access Key ID and Secret Access Key at the configuration step.
5. Press 'Create & Enable' and watch your 'Events' get sent to AWS Kinesis!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/aws_kinesis/template_aws_kinesis.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>