---
title: Send PostHog event data to Customer.io
templateId:
    - template-customerio
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"


You'll also need access to the relevant Customer.io account.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=customerio) tab.
3. Search for 'Customer.io' and click **+ Create**.
4. Add your Customer.io site ID and API Key at the configuration step. Note that our integration requires Track API credentials.
5. Press **Create & Enable** and watch your 'People' list get populated in Customer.io!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Why do older events not update a person's attributes?

The destination sends the original PostHog event timestamp to Customer.io. Customer.io uses this timestamp to [order attribute updates](https://docs.customer.io/integrations/api/track/tag/track_v2/entity/). An older update to an attribute doesn't replace a newer value, even when Customer.io returns HTTP 200.

For example, a `plan` update timestamped 10:00 UTC sets the value to `pro`. If you later send a 09:00 UTC update that sets `plan` to `basic`, the profile keeps `pro`.

Check event timestamps when you test the destination or replay historical data. For a new change to the current profile, send an update timestamped when that change occurred.

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/customerio/template_customerio.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
